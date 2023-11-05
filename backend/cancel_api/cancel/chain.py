import os
from langchain.chat_models.anthropic import ChatAnthropic
from langchain.chat_models.openai import ChatOpenAI
from langchain.tools.brave_search.tool import BraveSearch
from langchain.schema.runnable import RunnableLambda
from langchain.schema import StrOutputParser
from langchain.prompts import PromptTemplate

from templates import CUSTOMER_SERVICE_EMAIL_PROMPT, CANCELLING_PROMPT


def search_brave(query: str):
    """Use brave search tool to get results given a query"""
    brave_search = BraveSearch.from_api_key(os.environ["BRAVE_SEARCH_API_KEY"])

    results = brave_search.run(query)

    return results


def build_cancel_chain_v0():
    """Build the chain of how to cancel a subscription"""

    query_template = "how to cancel {service} for a deceased person"

    how_to_cancel = lambda service: search_brave(query_template.format(service=service))

    llm = ChatAnthropic(model_name="claude-2", temperature=0)

    prompt_template = PromptTemplate.from_template(CANCELLING_PROMPT)
    return (
        {
            "service": lambda inputs: inputs["service"],
            "search_results": RunnableLambda(how_to_cancel),
        }
        | prompt_template
        | llm
        | StrOutputParser()
    )


def build_cancel_chain_v1():
    """Build the chain of to get the cancel email and create the cancel email for a subscription"""

    query_template = "what is the customer service email for {service}"

    find_cs_email = lambda service: search_brave(query_template.format(service=service))

    llm = ChatAnthropic(model_name="claude-2", temperature=0)

    prompt_template = PromptTemplate.from_template(CUSTOMER_SERVICE_EMAIL_PROMPT)
    return (
        {
            "subscription_name": lambda inputs: inputs["service"],
            "name": lambda inputs: inputs["name"],
            "sender_email": lambda inputs: inputs["sender_email"],
            "search_results": RunnableLambda(find_cs_email),
        }
        | prompt_template
        | llm
        | StrOutputParser()
    )
