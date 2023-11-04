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
