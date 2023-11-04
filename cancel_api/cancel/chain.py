import os
from langchain.chat_models.anthropic import ChatAnthropic
from langchain.tools.brave_search.tool import BraveSearch
from langchain.schema.runnable import RunnableLambda
from langchain.schema import StrOutputParser
from langchain.prompts import PromptTemplate

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


def build_cancel_chain(llm):
    """Build the chain of how to cancel a subscription"""
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


if __name__ == "__main__":
    llm = ChatAnthropic()
    cancel_chain = build_cancel_chain(llm)
    print(cancel_chain.invoke({"subscription_name": "puregym"}))
