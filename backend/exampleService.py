class ExampleService:
    def __init__(self):
        self.first_time_user = True

    def get_first_time_user(self) -> bool:
        print("foo bar")
        print(self.first_time_user)
        return self.first_time_user

    def set_first_time_user(self, first_time_user: bool):
        self.first_time_user = first_time_user
