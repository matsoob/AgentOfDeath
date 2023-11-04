import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cancel_api.models import CancelInput
from cancel_api.cancel.chain import build_cancel_chain_v1


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


@app.get("/")
async def main_route():
    return {"message": "Hey, It is me Goku"}


@app.post("/v0/cancel")
async def cancel(cancel_input: CancelInput):
    cancel_chain = build_cancel_chain_v1()
    out = cancel_chain.invoke(
        {
            "service": cancel_input.service,
            "sender_email": cancel_input.email,
            "name": cancel_input.name,
        }
    )

    return json.loads(out)


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
