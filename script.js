const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function callAI() {
    const message = userInput.value; // You defined the variable as 'message' here
    if (!message) return;

    // Add user message to UI
    const userDiv = document.createElement('p');
    userDiv.className = 'user-msg';
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);
    
    userInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // CHANGED: Use 'message' instead of 'userText' so it matches the variable above
            body: JSON.stringify({ message: message }) 
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        // Add AI message to UI
        const aiDiv = document.createElement('p');
        aiDiv.className = 'bot-msg';
        aiDiv.innerText = aiText;
        chatBox.appendChild(aiDiv);

    } catch (error) {
        console.error("Error:", error);
    }
}

sendBtn.addEventListener('click', callAI);