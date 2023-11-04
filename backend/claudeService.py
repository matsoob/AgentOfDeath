from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT


class ClaudeService:
    def __init__(self) -> None:
        self.client = Anthropic()

    def getPersonalMessage(self, name_of_deceased: str) -> str:
        print("Beginning of getPersonalMessage")
        prompt = (
            f"\n\nHuman: Please generate a gentle welcome message for our website, where we help this person deal with the death of <name>{name_of_deceased}</name> \n\nAssistant: ",
        )
        response = self._make_claude_call(prompt)
        print("End of getPersonalMessage")
        return response

    def custom_prompt(self, custom_prompt: str) -> str:
        print("Beginning of custom prompt")
        prompt = (f"\n\nHuman: {custom_prompt} \n\nAssistant: ",)
        response = self._make_claude_call(prompt)
        print("End of custom prompt")
        return response

    def _make_claude_call(self, prompt: str) -> str:
        completion = self.client.completions.create(
            model="claude-2",
            max_tokens_to_sample=300,
            prompt=prompt,
        )
        return completion
