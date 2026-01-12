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
