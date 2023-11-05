from claudeService import ClaudeService
from subscriptionService import SubscriptionService
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from exampleService import ExampleService
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8001",
    "http://localhost:8002",
]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fistTimeUser = True


class BankStatementPayload(BaseModel):
    statementContent: str


@app.get("/")
async def main_route():
    return {"message": "Hey, It is me Goku"}


@app.get("/cancel")
async def cancel():
    # implement cancel code here

    return True


@app.get("/findSubs")
async def findSubs():
    # implement find subs code here
    return True


@app.get("/introFlow")
async def introFlow():
    # implement intro flow code here
    return True


@app.get("/notes")
async def notes():
    return '{"testField": "foo"}'


# here's an example of a stateful service
# in case you want to do in-memory persistence
example_service = ExampleService()


@app.get("/is-first-time-user")
async def firstTimeUser():
    res = example_service.get_first_time_user()
    return res


subscription_service = SubscriptionService()


@app.get("/get-all-subs")
async def getAllSubs():
    res = subscription_service.get_list_of_subs()
    return res


@app.get("/add-sub")
async def addSub(name_of_sub: str, status: str = "UNKNOWN"):
    if not status:
        status = "UNKNOWN"
    subscription_service.add_sub(name_of_sub=name_of_sub, status=status)
    return


claude_service = ClaudeService()


@app.get("/get-personal-welcome-message")
async def get_welcome(name_of_deceased: str):
    result = claude_service.getPersonalMessage(name_of_deceased=name_of_deceased)
    return {"message": result}


@app.get("/example-claude-endpoint")
async def example(prompt: str):
    result = claude_service.custom_prompt(prompt=prompt)
    return {"message": result}


@app.post("/submit-bank-statement")
async def submitBankStatement(data: BankStatementPayload):
    statement_extracted = data.statementContent
    if not statement_extracted:
        print("SOMETHING WENT WRONG")
    else:
        result = claude_service.parse_bank_statement(
            statement_extracted=statement_extracted
        )
        return {"message": result}
