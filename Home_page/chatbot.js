// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatSendButton = document.querySelector('.chatbot-input button');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    // Toggle chatbot visibility
    chatbotIcon.addEventListener('click', function() {
        chatbotContainer.style.display = 'flex';
        chatbotIcon.style.display = 'none';
        chatInput.focus();
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
        chatbotIcon.style.display = 'flex';
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, 'bot');
            
            // Auto-scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    // Send message on button click or Enter key
    chatSendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        messageDiv.appendChild(messageP);
        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate bot response based on user input
    function generateBotResponse(userInput) {
        const input = userInput.toLowerCase();
        
        // Simple response logic based on keywords
        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return "Hello! How can I help you with disaster preparedness today?";
        } else if (input.includes('earthquake')) {
            return "During an earthquake: DROP to the ground, COVER under sturdy furniture, and HOLD ON. Stay away from windows and heavy objects that might fall.";
        } else if (input.includes('flood')) {
            return "During a flood: Move to higher ground immediately. Avoid walking or driving through flood waters. Just 6 inches of moving water can knock you down.";
        } else if (input.includes('cyclone') || input.includes('hurricane')) {
            return "During a cyclone: Stay indoors away from windows. Keep emergency supplies handy. Evacuate if instructed by authorities.";
        } else if (input.includes('fire')) {
            return "In case of fire: Get out, stay out, and call for help. If trapped, seal yourself in a room and signal for help from a window.";
        } else if (input.includes('help') || input.includes('emergency')) {
            return "For immediate emergency assistance, call: National Emergency - 1070, Disaster Management - 108, Fire Department - 101, Police - 100";
        } else if (input.includes('prepared') || input.includes('kit')) {
            return "An emergency kit should include: water, non-perishable food, flashlight, first aid kit, medications, multi-tool, sanitation items, copies of important documents, and extra batteries.";
        } else if (input.includes('thank')) {
            return "You're welcome! Stay safe and prepared.";
        } else {
            // Default response if no keywords matched
            const defaultResponses = [
                "I'm here to help with disaster preparedness information. You can ask me about earthquakes, floods, cyclones, fires, or emergency procedures.",
                "I'm not sure I understand. Could you ask about disaster preparedness, emergency procedures, or safety tips?",
                "For specific disaster-related queries, try asking about earthquakes, floods, cyclones, or fire safety."
            ];
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
    }
    
    // Add initial bot message if chat is empty
    if (chatMessages.children.length === 0) {
        addMessage("Hello! I'm Saksham Assistant. How can I help you with disaster preparedness today?", 'bot');
    }
});