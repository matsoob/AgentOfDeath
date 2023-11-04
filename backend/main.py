from claudeService import ClaudeService
from subscriptionService import SubscriptionService
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from exampleService import ExampleService

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
    print("GET ALL SUBS")
    res = subscription_service.get_list_of_subs()
    print("GET ALL SUBS")
    return res


@app.get("/add-sub")
async def addSub(name_of_sub: str, status: str = "UNKNOWN"):
    subscription_service.add_sub(name_of_sub=name_of_sub, status=status)
    return


claude_service = ClaudeService()


@app.get("/get-personal-welcome-message")
async def get_welcome(name_of_deceased: str):
    result = claude_service.getPersonalMessage(name_of_deceased=name_of_deceased)
    return {"message": result}
