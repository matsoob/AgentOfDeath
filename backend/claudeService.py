from functools import cache
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT, AsyncAnthropic


class ClaudeService:
    def __init__(self) -> None:
        self.client = Anthropic()
        self.async_client = AsyncAnthropic()

    def getPersonalMessage(self, name_of_deceased: str) -> str:
        print("Beginning of getPersonalMessage")
        prompt = f"{HUMAN_PROMPT} Please generate a gentle welcome message for our website, where we help this person deal with the death of <name>{name_of_deceased}</name> {AI_PROMPT} "
        print(prompt)
        response = self._make_claude_call(prompt)
        print("End of getPersonalMessage")
        return response

    def custom_prompt(self, custom_prompt: str) -> str:
        print("Beginning of custom prompt")
        prompt = f"{HUMAN_PROMPT}  {custom_prompt} {AI_PROMPT}: "
        response = self._make_claude_call(prompt)
        print("End of custom prompt")
        return response

    @cache
    def _make_claude_call(self, prompt: str) -> str:
        completion = self.client.completions.create(
            model="claude-2",
            max_tokens_to_sample=300,
            prompt=prompt,
        )
        return completion

    def parse_bank_statement(self, statement_extracted: str):
        print("Beginning bank statement processing")
        # TODO: test better prompt?
        prompt = f"{HUMAN_PROMPT}Here is a parsed bank statement: <bankStatement>{statement_extracted}</bankStatement>. Please pick out all the recurring subscription services. Return the responses without any extra text, with the name of the subscription on each new line {AI_PROMPT} "
        print(prompt)
        response = self._make_claude_call(prompt)
        print("End of bank statement processing")
        return response

    def _make_claude_call_async(self, prompt: str):
        return self.async_client.completions.create(
            model="claude-2",
            max_tokens_to_sample=300,
            prompt=f"{HUMAN_PROMPT} {prompt} {AI_PROMPT}",
        )
