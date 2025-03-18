from dotenv import load_dotenv
import os
load_dotenv()

from langchain.chains import LLMChain
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.document_loaders import PyPDFLoader

api_key = os.getenv("OPENAI_API_KEY")


# 1. 문서 로드
loader = PyPDFLoader("250211프로젝트 기획서.pdf")
documents = loader.load()

# 모델설정
llm = ChatOpenAI(model_name = "gpt-4o-mini") 

# 프롬프트 작성
summary_prompt = PromptTemplate.from_template(
    "다음 문서를 한 문단으로 요약하시오. : \n\n{text}\n\n"
)

#LLM 체인 생성
summary_chain = LLMChain(llm=llm, prompt = summary_prompt)


#문ㅅ너에서 텍스트 추출
documents_texts = "\n".join([doc.page_content for doc in documents])

##d 요약 실행

summary = summary_chain.invoke({"text" : documents_texts})

print(summary)
