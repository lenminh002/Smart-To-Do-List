from openai import OpenAI

client = OpenAI(api_key="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")

def chatbot_response(prompt: str) -> str:
    respone = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that help the user generate a smart, logical, and productive To-Do list item."},
            {"role": "user", "content": prompt}
        ]
    )
    return respone.choices[0].message.content.strip()

def main():
    print("Assistant: Welcome to the smart To-Do List Generator! How can I assist you today? Type 'exit' or 'q' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower().strip() in ['exit', 'q']: 
            print("Assistant: Goodbye and hope to see you again!")
            break
        response = chatbot_response(user_input)
        print(f"Assistant: {response}")

if __name__ == "__main__":
    main()
