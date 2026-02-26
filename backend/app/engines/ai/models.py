from enum import Enum

class AIModel(str, Enum):
    GPT4_MINI = "gpt-4.1-mini"
    GEMINI_PRO = "gemini-pro"
    CLAUDE_3 = "claude-3-sonnet"
    LOCAL_MISTRAL = "local-mistral"
