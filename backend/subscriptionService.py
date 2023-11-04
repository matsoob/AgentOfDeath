STATUSES = ["UNKNWON", "IT_EXISTS", "CANCELLING", "CANCELLED", "FAILED"]
# class Subscription:
#     def __init__(self, name_of_sub: str, status: str):
#         self.name_of_sub = name_of_sub
#         if status not in STATUSES:
#             raise Exception('We got an unrecognised type of subscription insertion into DB')
#         self.status = status
#     def __str__(self) -> str:
#         return f'{ }'


class SubscriptionService:
    def __init__(self):
        self.list = []

    def get_list_of_subs(self):
        return self.list

    def add_sub(self, *, name_of_sub: str, status: str):
        if status not in STATUSES:
            raise Exception(
                "We got an unrecognised type of subscription insertion into DB"
            )
        self.list.append({name_of_sub: name_of_sub, status: status})
