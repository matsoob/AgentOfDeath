import os
from langchain.chat_models.anthropic import ChatAnthropic
from langchain.tools.brave_search.tool import BraveSearch
from langchain.schema.runnable import RunnableLambda
from langchain.schema import StrOutputParser
from langchain.prompts import PromptTemplate


def build_cancel_chain_v0():
    """Build the chain of how to cancel a subscription"""

    CANCELLING_PROMPT = """
        You are supporting someone who's friend or relative has passed away and they're trying to 
        cancel their subscriptions. Below are the results from an internet search about
        how to cancel {subscription_name} for a deceased person.

        <search_results>
        {search_results}
        </search_results>

        Output the easiest steps the user should take to cancel their subscription.
        """

    def search_how_to_cancel(subscription_name: str):
        """Use the brave search tool to find how to cancel that subscription"""
        query = f"how to cancel {subscription_name} for a deceased person"
        brave_search = BraveSearch.from_api_key(os.environ["BRAVE_SEARCH_API_KEY"])

        results = brave_search.run(query)

        return results

    llm = ChatAnthropic()

    prompt_template = PromptTemplate.from_template(CANCELLING_PROMPT)
    return (
        {
            "subscription_name": lambda inputs: inputs["subscription_name"],
            "search_results": RunnableLambda(search_how_to_cancel),
        }
        | prompt_template
        | llm
        | StrOutputParser()
    )


def build_cancel_chain_v1():
    """Build the chain of to get the cancel email and create the cancel email for a subscription"""

    CANCELLING_PROMPT = """
        You are supporting someone who's friend or relative has passed away and they're trying to 
        cancel their subscriptions. Below are the results from an internet search about
        how to cancel {subscription_name} for a deceased person.

        <search_results>
        {search_results}
        </search_results>


        First find the relevant customer support email for the UK in the search result. If there is no email, then output "No email found".
        Now write an email to cancel the {subscription_name} for customer {name} from {sender_email} in the json format below.

        Output only the json and no other text.

        {{
        message: {{message}},
        to: {{customer_support_email}},
        subject: {{subject}},
        }}

        """

    def search_get_cancel_email(subscription_name: str):
        """Use the brave search tool to the email to cancel a subscription"""
        query = f"what is the email to cancel {subscription_name}"
        brave_search = BraveSearch.from_api_key(os.environ["BRAVE_SEARCH_API_KEY"])

        results = brave_search.run(query)

        return results

    llm = ChatAnthropic()

    prompt_template = PromptTemplate.from_template(CANCELLING_PROMPT)
    return (
        {
            "subscription_name": lambda inputs: inputs["service"],
            "name": lambda inputs: inputs["name"],
            "sender_email": lambda inputs: inputs["sender_email"],
            "search_results": RunnableLambda(search_get_cancel_email),
        }
        | prompt_template
        | llm
        | StrOutputParser()
    )


if __name__ == "__main__":
    cancel_chain = build_cancel_chain()
    print(cancel_chain.invoke({"subscription_name": "puregym"}))
