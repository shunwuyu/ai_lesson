from transformers import pipeline

translator = pipeline("translation_en_to_fr")
result = translator("Hugging Face is a technology company based in New York and Paris", max_length=40)
print(result[0]['translation_text'])
