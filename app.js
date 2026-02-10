
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const messageListContainer = document.getElementById("messages-list");
const chatInput = document.getElementById("chat-input");


// TODO LIST FUNCTIONALITY
function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
        return;
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}
inputBox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);




// CHATBOT FUNCTIONALITY
async function sendMessage(){
    if(chatInput.value === ''){
        alert("Message is empty!");
        return;
    }
    else{
        const userText = chatInput.value.trim();

        let message = document.createElement("li");
        message.innerHTML = `<strong>You: </strong> ${userText}`;
        message.classList.add("messageSent");
        messageListContainer.appendChild(message);

        chatInput.value = "";

        let data;
        try{
            const res = await fetch("/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: userText})
            });
            data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "Failed to get response from server");
            }
        }
        catch(error){
            alert("Error: " + error.message);
            return;
        }

        const HtmlOutput = marked.parse(data.reply || "No response from server");
        const Purified_Html = DOMPurify.sanitize(HtmlOutput);

        let reply = document.createElement("li");
        reply.innerHTML = `<strong>Assistant: </strong> ${Purified_Html.trim()}`;
        reply.classList.add("messageSent");
        messageListContainer.appendChild(reply);

        saveData();
    }
}


chatInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

async function deleteMessages(){
    messageListContainer.innerHTML = "";

    const res = await fetch("/clear-messages", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
    });
    
        
    if(!res.ok){
        alert("Failed to clear messages");
    }
    else{
        alert("Messages cleared successfully");
    }

    saveData();
}


// LOCAL STORAGE FUNCTIONALITY
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("messagesdata", messageListContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    messageListContainer.innerHTML = localStorage.getItem("messagesdata");
}

showTask();