from transformers import pipeline
description = """
This is a high quality, solid wood desk. It has a large, smooth surface, perfect for writing, 
working on a laptop, or even dining. The desk has two spacious drawers for storing stationery, 
laptop accessories or other personal items. The classic design and dark wood finish make it a 
great addition to any home or office decor.
"""
summarizer = pipeline("summarization",model="facebook/bart-large-cnn")
print(summarizer(description))
