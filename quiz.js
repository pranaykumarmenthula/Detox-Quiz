document.addEventListener('DOMContentLoaded', () => {
    function getRandomQuestion(questions) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      return questions[randomIndex];
    }
    
    fetch(chrome.runtime.getURL('questions.json'))
      .then(response => response.json())
      .then(questions => {
        const questionData = getRandomQuestion(questions);
        const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options-container');
        const res = document.getElementById('result');
        
        correct=questionData.correctAnswer
        questionContainer.textContent = questionData.question;
        let score = 0;
        
        questionData.options.forEach(option => {
          const button = document.createElement("button");
          button.innerHTML = `${option}`;
          button.classList.add("btn");
          optionsContainer.appendChild(button);
          button.addEventListener("click",selectAnswer);
        });
        
        
        function resetState(){
            while(optionsContainer.firstChild){
                optionsContainer.removeChild(optionsContainer.firstChild);
            }
        }

        function selectAnswer(e){
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.innerHTML === questionData.correctAnswer
            if (isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }else{
                selectedBtn.classList.add("incorrect");
            }
            Array.from(optionsContainer.children).forEach(button => {
                if (button.innerHTML === questionData.correctAnswer){
                    button.classList.add("correct");
                }
                button.disabled = true;
                showResults();
            });
        }

        function showResults(){
            if (score == 1){
                res.textContent = 'Correct! Great Job.';
                setTimeout(() => window.close(), 2000);
            }else{
                res.textContent = 'Try Googling about the cuurent question to improve your skills!';
                setTimeout(() => window.close(), 5000);
            }
        }
      })
  });
  