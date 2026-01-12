const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const messageListContainer = document.getElementById("messages-list");
const chatInput = document.getElementById("chat-input");



function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
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

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("messagesdata", messageListContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    messageListContainer.innerHTML = localStorage.getItem("messagesdata");
}


function sendMessage(){
    if(chatInput.value === ''){
        alert("Message is empty!");
    }
    else{
        let message = document.createElement("li");
        message.innerHTML = chatInput.value;
        message.classList.add("messageSent");
        messageListContainer.appendChild(message);
    }
    chatInput.value = "";
    saveData();
}

function deleteMessages(){
    messageListContainer.innerHTML = "";
    saveData();
}


showTask();