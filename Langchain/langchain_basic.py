from dotenv import load_dotenv
import os


# .env 파일 로드
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# print(api_key)



#랭체인을 활용해서 gpt 응답받기
from langchain_openai import ChatOpenAI # 챗GPT

# # 모델 선택
# llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0 )
# # temparature : 창의력 지수. 0이면 경직, 1이면 다양하다. 
# # 높은 온도 값에서는 모델이 더 다양한 출력을 생성
# # 낮은 온도에서는 모델이 더 "차가운" 방식으로 작동하여, 안정적이고 일관된 답변을 생성

# response = llm.invoke("'yes'라고 해")
# #invoke : 호출하다, 부르다. llm 부르기. 
# print(response)



from langchain.prompts import PromptTemplate

# 기분에 맞춰서 답변하는 LLM 모델
# 기분 : 우울, 내용 : 오늘 여자친구랑 헤어졌어. 
# 다정다감하고 따뜻하고 친근하고. 
template = PromptTemplate (
    input_variables = ["feel", "user_input" , "attitude"],
    template = "사용자가 {feel}기분 일 때, 다음 말에 대하여 {attitude}처럼 대답해 주세요 : {user_input}"

)

print(template.format(feel = '슬픔', attitude = '차가운', user_input = "배고파"))

llm = ChatOpenAI(model_name="gpt-4o-mini", temperature = 1)
request = template.format(feel = '절망', attitude = '귀엽고, 센스있고, 다정한 Customer service 전문가', user_input = "배고파")
response = llm.invoke(request)
print(response)