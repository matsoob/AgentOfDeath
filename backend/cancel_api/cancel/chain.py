import os
from langchain.chat_models.anthropic import ChatAnthropic
from langchain.chat_models.openai import ChatOpenAI
from langchain.tools.brave_search.tool import BraveSearch
from langchain.schema.runnable import RunnableLambda, RunnableBranch
from langchain.schema import StrOutputParser, AIMessage
from langchain.prompts import PromptTemplate
from langchain.output_parsers import XMLOutputParser

from .templates import (
    CUSTOMER_SERVICE_EMAIL_PROMPT,
    CANCELLING_PROMPT,
    WRITE_EMAIL_PROMPT,
)

LLM = ChatAnthropic(model_name="claude-2", temperature=0)


def search_brave(query: str):
    """Use brave search tool to get results given a query"""
    brave_search = BraveSearch.from_api_key(os.environ["BRAVE_SEARCH_API_KEY"])

    results = brave_search.run(query)

    return results


def add_xml_root_tags(input: AIMessage):
    """Add root tags to xml text"""
    return f"<root>{input.content.strip()}</root>"


def build_extract_email_chain():
    """Build chain for extracting email from search results"""
    query_template = "what is the customer service email for {service} in UK"

    find_cs_email = lambda service: search_brave(query_template.format(service=service))

    prompt_template = PromptTemplate.from_template(CUSTOMER_SERVICE_EMAIL_PROMPT)

    return (
        {
            "service": lambda inputs: inputs["service"],
            "search_results": RunnableLambda(find_cs_email),
        }
        | prompt_template
        | LLM
        | RunnableLambda(add_xml_root_tags)
        | XMLOutputParser()
    )


def build_how_to_cancel_chain():
    """Build the chain of how to cancel a subscription"""

    query_template = "how to cancel {service} for a deceased person"

    how_to_cancel = lambda service: search_brave(query_template.format(service=service))

    prompt_template = PromptTemplate.from_template(CANCELLING_PROMPT)
    return (
        {
            "service": lambda inputs: inputs["service"],
            "search_results": RunnableLambda(how_to_cancel),
        }
        | prompt_template
        | LLM
        | StrOutputParser()
    )


def build_write_email_chain():
    """Build the chain of to get the cancel email and create the cancel email for a subscription"""
    prompt_template = PromptTemplate.from_template(WRITE_EMAIL_PROMPT)
    return (
        {
            "service": lambda inputs: inputs["service"],
            "name": lambda inputs: inputs["name"],
            "sender_email": lambda inputs: inputs["sender_email"],
        }
        | prompt_template
        | LLM
        | RunnableLambda(add_xml_root_tags)
        | XMLOutputParser()
    )


def run_cancel_chain(service: str, sender_email: str, name: str):
    """Build the full cancel chain with routing depending on output"""
    extract_email_chain = build_extract_email_chain()
    res = extract_email_chain.invoke({"service": service})
    cs_email = res["root"][0]["email"]
    if "none" in cs_email.lower():
        how_to_cancel_chain = build_how_to_cancel_chain()
        res = how_to_cancel_chain.invoke({"service": service})
        return {"message": res, "email": "UNKNOWN", "subject": "UNKNOWN"}

    write_email_chain = build_write_email_chain()
    res = write_email_chain.invoke(
        {"service": service, "sender_email": sender_email, "name": name}
    )
    return {
        "message": res["root"][0]["message"].strip(),
        "subject": res["root"][1]["subject"].strip(),
        "email": cs_email,
    }
