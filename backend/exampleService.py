class ExampleService:
    def __init__(self):
        self.first_time_user = True

    def get_first_time_user(self) -> bool:
        return self.first_time_user

    def set_first_time_user(self, first_time_user: bool):
        self.first_time_user = first_time_user
