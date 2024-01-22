from llama_index import SimpleDirectoryReader
filename_hook = lambda filename: {'file_name': filename}
print(filename_hook)
documents = SimpleDirectoryReader('./data', file_metadata=filename_hook).load_data()
print(documents)