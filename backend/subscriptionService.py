STATUSES = ["UNKNOWN", "IT_EXISTS", "CANCELLING", "CANCELLED", "FAILED"]


class SubscriptionService:
    def __init__(self):
        # Uses in-mem storage for now
        self.list = []

    def get_list_of_subs(self):
        return self.list

    def add_sub(self, *, name_of_sub: str, status: str):
        if status not in STATUSES:
            print("bad status")
            print(status)
            raise Exception(
                "We got an unrecognised type of subscription insertion into DB"
            )
        self.list.append({"name_of_sub": name_of_sub, "status": status})
