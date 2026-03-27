const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function callAI() {
    const message = userInput.value;
    if (!message) return;

    // Show user message
    const userDiv = document.createElement('p');
    userDiv.className = 'user-msg';
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);
    userInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // This tells the server to expect JSON
            body: JSON.stringify({ message: message }) 
        });

        const data = await response.json();

        // Safely check if the AI sent a response back
        if (data.candidates && data.candidates[0]) {
            const aiText = data.candidates[0].content.parts[0].text;
            const aiDiv = document.createElement('p');
            aiDiv.className = 'bot-msg';
            aiDiv.innerText = aiText;
            chatBox.appendChild(aiDiv);
        } else {
            console.error("AI Response Error:", data);
        }

    } catch (error) {
        console.error("Connection Error:", error);
    }
}