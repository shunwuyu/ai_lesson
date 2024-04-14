import { 
    Document, 
    VectorStoreIndex, 
    SimpleDirectoryReader 
} from "llamaindex"

const documents = await new SimpleDirectoryReader();