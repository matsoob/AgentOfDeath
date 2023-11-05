from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cancel_api.models import CancelInput
from cancel_api.cancel.chain import build_cancel_chain_v0, build_cancel_chain_v1

import requests
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows connections from all origins
    allow_credentials=True,  # Allows cookies to be sent and received
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/v0/cancel/")
async def cancel_service(cancel_input: CancelInput):
    # Your logic to handle the cancellation goes here.
    # For now, we'll just return the input data as JSON.

    # cancel_chain = build_cancel_chain_v0()
    # out = cancel_chain.invoke({"subscription_name": cancel_input.service})

    cancel_chain = build_cancel_chain_v1()
    out = cancel_chain.invoke({"service": cancel_input.service, "sender_email": cancel_input.email, "name": cancel_input.name})

    # return json.loads(out)
    return out


@app.post("/v0/cancel_browser/")
async def cancel_service_from_browser(cancel_input: CancelInput):
    # Your logic to handle the cancellation goes here.

    url = 'http://127.0.0.1:8081/v0/cancel_browser'
    payload = cancel_input.dict()
    print(payload)
    headers = {'Content-Type': 'application/json'}

    # response = requests.post(url, data=payload, headers=headers)
    response = requests.post(url, headers=headers)
    return response


@app.get("/")
async def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
