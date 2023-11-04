from fastapi import FastAPI

app = FastAPI()


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
