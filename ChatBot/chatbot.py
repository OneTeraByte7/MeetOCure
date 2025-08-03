# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from langchain_community.document_loaders import PyMuPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.embeddings import GPT4AllEmbeddings
# from langchain_community.chat_message_histories import ChatMessageHistory
# from langchain.memory import ConversationBufferMemory
# from langchain.prompts import PromptTemplate
# from langchain_together import ChatTogether
# from langchain.chains import ConversationalRetrievalChain
# from langchain_chroma import Chroma
# from langchain_core.messages import HumanMessage, SystemMessage

# import logging
# import os
# from dotenv import load_dotenv


# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# class MedicalAssistant:
#     def __init__(self):
#         load_dotenv()
#         self.TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

       
#         self.embeddings = GPT4AllEmbeddings()

#         self.chroma_db_path = "chroma_db2"
#         self.retriever = Chroma(
#             persist_directory=self.chroma_db_path,
#             embedding_function=self.embeddings
#         ).as_retriever(search_kwargs={"k": 5})

#         # LLM model via ChatTogether
#         self.llm_model = ChatTogether(
#             together_api_key=self.TOGETHER_API_KEY,
#             model="meta-llama/Llama-3.3-70B-Instruct-Turbo"
#         )

#         self.setup_conversation()

#     def setup_conversation(self):
#         self.message_history = ChatMessageHistory()
#         self.memory = ConversationBufferMemory(
#             chat_memory=self.message_history,
#             memory_key="chat_history",
#             input_key="question",
#             output_key="answer",
#             return_messages=True,
#             human_prefix="Human",
#             ai_prefix="AI"
#         )

#         self.combine_docs_prompt = PromptTemplate.from_template("""\
# You are a highly knowledgeable AI assistant specializing in medical information retrieval.

# Previous conversation:
# {chat_history}

# Human question:
# {question}

# Context information from documents:
# {context}

# Provide only the final answer to the question without showing your internal reasoning.
# """)

#         self.conversation_chain = ConversationalRetrievalChain.from_llm(
#             llm=self.llm_model,
#             retriever=self.retriever,
#             memory=self.memory,
#             return_source_documents=True,
#             combine_docs_chain_kwargs={"prompt": self.combine_docs_prompt}
#         )

#     def process_query(self, user_input):
#         try:
#             response = self.conversation_chain.invoke({"question": user_input})
#             return {
#                 "answer": response['answer'],
#                 "success": True,
#                 "sources": [doc.page_content[:200] + "..." for doc in response.get('source_documents', [])]
#             }
#         except Exception as e:
#             logger.error(f"Primary processing error: {str(e)}")
#             try:
#                 docs = self.retriever.invoke(user_input)
#                 context = "\n\n".join([doc.page_content for doc in docs])
#                 result = self.llm_model.invoke([
#                     SystemMessage(content="""You are a medical assistant. Answer based on the context provided. 
# Give the answer in HTML format using <b>, <h4>, <h5>, and bullet points using '-' or Unicode &#8226;. Do not use * or <h1>/<h2> tags."""), 
#                     HumanMessage(content=f"Question: {user_input}\n\nContext:\n{context}")
#                 ])
#                 return {
#                     "answer": result.content,
#                     "success": True,
#                     "fallback": True,
#                     "sources": [doc.page_content[:200] + "..." for doc in docs]
#                 }
#             except Exception as e2:
#                 logger.error(f"Fallback processing error: {str(e2)}")
#                 return {
#                     "answer": "I'm sorry, I encountered an error processing your request. Please try again.",
#                     "success": False,
#                     "error": str(e2)
#                 }

#     def reset_conversation(self):
#         self.setup_conversation()
#         return {"status": "Conversation history has been reset."}


# app = Flask(__name__)


# CORS(app, origins="*", allow_headers="*", methods=["GET", "POST", "OPTIONS"])

# assistant = MedicalAssistant()

# @app.route("/ai-chat", methods=["POST"])
# def chat():
#     try:
#         data = request.json
#         user_message = data.get("message", "")
#         if not user_message:
#             return jsonify({"answer": "No message received.", "success": False}), 400

#         response = assistant.process_query(user_message)
#         return jsonify(response)
#     except Exception as e:
#         logger.error(f"Exception in /chat endpoint: {str(e)}")
#         return jsonify({
#             "answer": "Server error occurred.",
#             "success": False,
#             "error": str(e)
#         }), 500

# @app.route("/reset", methods=["POST"])
# def reset():
#     return jsonify(assistant.reset_conversation())

# @app.route("/", methods=["GET"])
# def health():
#     return "OK", 200


# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port)


from flask import Flask, request, jsonify
from flask_cors import CORS

from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain_together import ChatTogether
from langchain.chains import ConversationalRetrievalChain
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_huggingface import HuggingFaceEmbeddings

import logging
import os
from dotenv import load_dotenv


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MedicalAssistant:
    def __init__(self):
        load_dotenv()
        self.TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

       

        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"  # Lightweight and fast
        )


        self.chroma_db_path = "chroma_db2"
        self.retriever = Chroma(
            persist_directory=self.chroma_db_path,
            embedding_function=self.embeddings
        ).as_retriever(search_kwargs={"k": 5})

        # LLM model via ChatTogether
        self.llm_model = ChatTogether(
            together_api_key=self.TOGETHER_API_KEY,
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"
        )

        self.setup_conversation()

    def setup_conversation(self):
        self.message_history = ChatMessageHistory()
        self.memory = ConversationBufferMemory(
            chat_memory=self.message_history,
            memory_key="chat_history",
            input_key="question",
            output_key="answer",
            return_messages=True,
            human_prefix="Human",
            ai_prefix="AI"
        )

        self.combine_docs_prompt = PromptTemplate.from_template("""\
You are a highly knowledgeable AI assistant specializing in medical information retrieval.

Previous conversation:
{chat_history}

Human question:
{question}

Context information from documents:
{context}

Provide only the final answer to the question without showing your internal reasoning.
""")

        self.conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm_model,
            retriever=self.retriever,
            memory=self.memory,
            return_source_documents=True,
            combine_docs_chain_kwargs={"prompt": self.combine_docs_prompt}
        )

    def process_query(self, user_input):
        try:
            response = self.conversation_chain.invoke({"question": user_input})
            return {
                "answer": response['answer'],
                "success": True,
                "sources": [doc.page_content[:200] + "..." for doc in response.get('source_documents', [])]
            }
        except Exception as e:
            logger.error(f"Primary processing error: {str(e)}")
            try:
                docs = self.retriever.invoke(user_input)
                context = "\n\n".join([doc.page_content for doc in docs])
                result = self.llm_model.invoke([
                    SystemMessage(content="""You are a medical assistant. Answer based on the context provided. 
Give the answer in HTML format using <b>, <h4>, <h5>, and bullet points using '-' or Unicode &#8226;. Do not use * or <h1>/<h2> tags."""), 
                    HumanMessage(content=f"Question: {user_input}\n\nContext:\n{context}")
                ])
                return {
                    "answer": result.content,
                    "success": True,
                    "fallback": True,
                    "sources": [doc.page_content[:200] + "..." for doc in docs]
                }
            except Exception as e2:
                logger.error(f"Fallback processing error: {str(e2)}")
                return {
                    "answer": "I'm sorry, I encountered an error processing your request. Please try again.",
                    "success": False,
                    "error": str(e2)
                }

    def reset_conversation(self):
        self.setup_conversation()
        return {"status": "Conversation history has been reset."}


app = Flask(__name__)


CORS(app, origins=[
    "http://localhost:3000", 
    "https://meet-o-cure.vercel.app"  
], supports_credentials=True)

assistant = MedicalAssistant()

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")
        if not user_message:
            return jsonify({"answer": "No message received.", "success": False}), 400

        response = assistant.process_query(user_message)
        return jsonify(response)
    except Exception as e:
        logger.error(f"Exception in /chat endpoint: {str(e)}")
        return jsonify({
            "answer": "Server error occurred.",
            "success": False,
            "error": str(e)
        }), 500

@app.route("/reset", methods=["POST"])
def reset():
    return jsonify(assistant.reset_conversation())


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)



