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



// function sendMessage(){
//     if(chatInput.value === ''){
//         alert("Message is empty!");
//     }
//     else{
//         let message = document.createElement("li");
//         message.innerHTML = chatInput.value;
//         message.classList.add("messageSent");
//         messageListContainer.appendChild(message);
//     }
//     chatInput.value = "";
//     saveData();
// }



// CHATBOT FUNCTIONALITY
async function sendMessage(){
    if(chatInput.value === ''){
        alert("Message is empty!");
        return;
    }
    else{
        const userText = chatInput.value.trim();

        let message = document.createElement("li");
        message.innerHTML = userText;
        message.classList.add("messageSent");
        messageListContainer.appendChild(message);

        chatInput.value = "";

        const res = await fetch("/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: userText})
        });
        const data = await res.json();

        let reply = document.createElement("li");
        reply.innerHTML = data.reply || data.error;
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
function deleteMessages(){
    messageListContainer.innerHTML = "";
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