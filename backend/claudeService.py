class ClaudeService:
    def getPersonalMessage(self, name_of_deceased: str) -> str:
        #         prompt = f'
        # Please generate a gentle welcome message for our website, where we help this person deal with the death of <name>{name_of_deceased}</name>
        # '
        # TODO: call claude instead of mocked data
        res = f"Sorry for your loss of {name_of_deceased}. let's work through this together"
        return res
