from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT

# anthropic = Anthropic()
# completion = anthropic.completions.create(
#     model="claude-2",
#     max_tokens_to_sample=300,
#     prompt=f"{HUMAN_PROMPT} How many toes do dogs have?{AI_PROMPT}",
# )
# print(completion.completion)


class ClaudeService:
    def __init__(self) -> None:
        self.client = Anthropic()

    def getPersonalMessage(self, name_of_deceased: str) -> str:
        print("@@@@@@@@@Beginning of getPersonalMessage")
        #         prompt = f'
        # Please generate a gentle welcome message for our website, where we help this person deal with the death of <name>{name_of_deceased}</name>
        # '
        # TODO: call claude instead of mocked data
        res = f"Sorry for your loss of {name_of_deceased}. let's work through this together"
        completion = self.client.completions.create(
            model="claude-2",
            max_tokens_to_sample=300,
            prompt=f"\n\nHuman: Please generate a gentle welcome message for our website, where we help this person deal with the death of <name>{name_of_deceased}</name> \n\nAssistant: ",
        )
        print(completion)
        return completion
