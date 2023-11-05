from pydantic import BaseModel, StrictStr



class CancelInput(BaseModel):
    name: StrictStr
    email: StrictStr
    service: StrictStr


