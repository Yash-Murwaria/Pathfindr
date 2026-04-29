// Pathfindr — Main JavaScript File
// This file controls all logic: marks, quiz, Claude API calls, and results.

document.addEventListener('DOMContentLoaded', () => {
  const marksForm = document.getElementById('marksForm');

  if (marksForm) {
    marksForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data
      const studentData = {
        english: document.getElementById('english').value,
        hindi: document.getElementById('hindi').value,
        maths: document.getElementById('maths').value,
        science: document.getElementById('science').value,
        social: document.getElementById('social').value,
        computer: document.getElementById('computer').value,
        timestamp: new Date().toISOString()
      };

      console.log('Student Marks Data Collected:', studentData);
      
      // Feedback to student
      const btn = e.target.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Profile Saved!';
      btn.style.background = '#4CAF50';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        alert('Your profile has been saved successfully!');
      }, 1500);
    });
  }
});
// ======================
// CHATBOT FUNCTION
// ======================

async function sendMessage() {

    const input = document.getElementById("userInput");

    const message = input.value.trim();

    if (!message) return;

    try {

        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                context: ""
            }),
        });

        const data = await response.json();

        console.log("AI Response:", data);

        // Show AI reply
        const chatBox = document.getElementById("chatBox");

        const aiMessage = document.createElement("div");

        aiMessage.innerHTML = `
            <div style="
                background:#ddd;
                padding:12px;
                border-radius:12px;
                margin:10px;
                max-width:80%;
            ">
                ${data.reply}
            </div>
        `;

        chatBox.appendChild(aiMessage);

    } catch (error) {

        console.error("Frontend Error:", error);

        alert("Frontend connection failed");
    }
}