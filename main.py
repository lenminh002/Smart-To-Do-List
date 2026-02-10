from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

app = Flask(__name__, static_folder=".", static_url_path="")


systemPrompt="""       
            You are a helpful assistant that help the user generate a smart, logical, and productive To-Do list item. 
            Your job is hearing the user desire and generate a logical To-Do list item that can help the user achieve their goal effectively.
            The To-Do list item should be specific, actionable, and relevant to the user's goal.
            
            For example, if the user says "I want to learn a new language", 
            you can generate a To-Do list item like "Sign up for an online language course" 
            or "Practice speaking with a language partner for 30 minutes every day".
            
            """


message_array = [
    {
        "role": "system", 
        "content": systemPrompt
    }
]
def chatbot_response(prompt: str) -> str:
    # add user message to the memory
    message_array.append(
        {
            "role": "user", 
            "content": prompt
        }
    )

    respone = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages=message_array
    )

    ai_response = respone.choices[0].message.content.strip()
    
    # add AI message to the memory
    message_array.append(
        {
            "role": "assistant", 
            "content": ai_response
        }
    )

    return ai_response

@app.get("/")
def index():
    return send_from_directory(".", "index.html")

@app.post("/chat")
def chat():
    data = request.get_json() or {}
    prompt = (data.get("message") or "").strip() 
    if not prompt:
        return jsonify({"error": "Empty message"}), 400
    return jsonify({"reply": chatbot_response(prompt)})

@app.post("/clear-messages")
def clear_messages():
    global message_array
    message_array = [
        {
            "role": "system", 
            "content": systemPrompt
        }
    ]
    return jsonify({"status": "Messages cleared"})

if __name__ == "__main__":
    app.run(debug=True)














# def main():
#     print("Assistant: Welcome to the smart To-Do List Generator! How can I assist you today? Type 'exit' or 'q' to quit.")
#     while True:
#         user_input = input("You: ")
#         if user_input.lower().strip() in ['exit', 'q']: 
#             print("Assistant: Goodbye and hope to see you again!")
#             break
#         response = chatbot_response(user_input)
#         print(f"Assistant: {response}")

# if __name__ == "__main__":
#     main()
