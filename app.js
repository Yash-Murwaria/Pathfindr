// Pathfindr — Main JavaScript File
// This file handles data collection for the student profile.

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
        window.location.href = 'quiz.html'; // Navigate to next page
      }, 1500);
    });
  }
});
