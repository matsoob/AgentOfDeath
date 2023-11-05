import time
import xml.etree.ElementTree as ET

from langchain.chat_models.anthropic import ChatAnthropic
from langchain.chat_models.openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import StrOutputParser

from crawler import Crawler
from templates import BROWSER_PROMPT_TEMPLATE

prompt_template = PromptTemplate.from_template(BROWSER_PROMPT_TEMPLATE)
llm = ChatAnthropic(model_name="claude-2", temperature=0)
# llm = ChatOpenAI(temperature=0)

chain = prompt_template | llm.bind(stop=["</command>"]) | StrOutputParser()


if __name__ == "__main__":
    objective = """
    I want to cancel my netflix account. Search for the login page and sign in using these details:
    Username: gerard2314@gmail.com
    Password: Cardge2314
    """
    start_page = "www.duckduckgo.com"

    crawler = Crawler()
    crawler.go_to_page(start_page)

    res = ""
    while True:
        time.sleep(2)
        browser_content = crawler.crawl()
        res = (
            chain.invoke(
                {
                    "browser_content": "\n".join(browser_content),
                    "objective": objective,
                    "url": crawler.page.url,
                    "previous_command": res,
                }
            )
            + "</command>"
        )
        print(res)
        root = ET.fromstring("<root>" + res + "</root>")
        thought_text = root.find("thought").text.strip()
        commands = root.find("command").text.strip().split("\n")
        for command in commands:
            action_details = command.split()
            action = action_details[0]
            element_id = action_details[1]
            if action == "TYPESUBMIT":
                text_input = " ".join(action_details[2:]).replace('"', "")
                crawler.type(id=element_id, text=text_input)
                crawler.enter()
            elif action == "CLICK":
                crawler.click(id=element_id)
            elif action == "TYPE":
                text_input = " ".join(action_details[2:]).replace('"', "")
                crawler.type(id=element_id, text=text_input)
            else:
                break
