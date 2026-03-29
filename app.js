// Pathfindr — Main JavaScript File
// This file controls all logic: marks, quiz, Claude API calls, and results.
<<<<<<< HEAD

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
=======
// i am adding some lines in it to test the commit and push functionality of git

// Global variables
let marks = [];
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
>>>>>>> origin/ayushi-work
