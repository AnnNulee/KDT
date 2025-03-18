# 1. 파일 불러오기
# 텍스트로더 : txt, csv 파일 가능 /종류별로 로더가 여러가지임 
from dotenv import load_dotenv
import os
from langchain.document_loaders import TextLoader
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter # 기본 토크나이저. 한국어로는 별로 안좋음.

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

loader = TextLoader("회의록.txt", encoding = "utf8")
documents = loader.load() ## 문서로드
print(documents)

# 벡터 생성 전에, tokenize 해야한다. 그래야 embedding 가능
text_splitter = CharacterTextSplitter(
    separator = '\n',
    chunk_size = 10,
    chunk_overlap = 5
)

split_document = text_splitter.split_documents(documents)



# 벡터 저장소 생성 text데이터 추가

vectorstore = Chroma.from_documents(split_document, 
                                    embedding=OpenAIEmbeddings())


# 검색기능 추가
retriever = vectorstore.as_retriever(search_kwargs = {
    "k" : 1
})

query = "회의는 몇시에 진행돼?"
result = retriever.invoke(query)
print(result)
