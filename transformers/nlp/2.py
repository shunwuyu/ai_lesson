from transformers import pipeline

question_answerer = pipeline("question-answering")
context = r"""
Machine learning (ML) is the study of computer algorithms that improve automatically through experience. 
It is seen as a subset of artificial intelligence. Machine learning algorithms build a model based on 
sample data, known as "training data", in order to make predictions or decisions without being explicitly 
programmed to do so. Machine learning algorithms are used in a variety of applications, such as email 
filtering and computer vision, where it is difficult or infeasible to develop a conventional algorithm 
for effectively performing the task.
"""
result = question_answerer(question="What is machine learning?", context=context)
print(f"Answer: {result['answer']}")
