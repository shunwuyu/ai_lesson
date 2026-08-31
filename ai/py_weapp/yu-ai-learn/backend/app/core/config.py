from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI 闯关学习后端"
    ai_provider: str = "mock"
    deepseek_api_key: str | None = None
    deepseek_base_url: str = "https://api.deepseek.com"
    deepseek_model: str = "deepseek-chat"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
