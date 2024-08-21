import React, { useState, useEffect } from 'react';
import './App.css';
export const Quiz = {
  topic: 'Javascript',
  level: 'Beginner',
  totalQuestions: 4,
  perQuestionScore: 5,
  questions: [
    {
      question: 'Which function is used to serialize an object into a JSON string in Javascript?',
      choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
      type: 'MCQs',
      correctAnswer: 'stringify()',
    },
    {
      question: 'Which of the following keywords is used to define a variable in Javascript?',
      choices: ['var', 'let', 'var and let', 'None of the above'],
      type: 'MCQs',
      correctAnswer: 'var and let',
    },
    {
      question:
        'Which of the following methods can be used to display data in some form using Javascript?',
      choices: ['document.write()', 'console.log()', 'window.alert', 'All of the above'],
      type: 'MCQs',
      correctAnswer: 'All of the above',
    },
    {
      question: 'How can a datatype be declared to be a constant type?',
      choices: ['const', 'var', 'let', 'constant'],
      type: 'MCQs',
      correctAnswer: 'const',
    },
  ],
};

function App() {
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); 
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit(); 
    }
  }, [timeLeft, submitted]);


  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    Quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore += Quiz.perQuestionScore;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="App">
      <h1>Quiz on {Quiz.topic}</h1>
      <h2>Level: {Quiz.level}</h2>
      <p>Total Questions: {Quiz.totalQuestions}</p>
      <p>Time Left: {timeLeft} seconds</p>     
      <ul className="quiz-list">
        {Quiz.questions.map((q, index) => (
          <li key={index} className="quiz-question">
            <h3>{q.question}</h3>
            <ul className="choices-list">
              {q.choices.map((choice, idx) => (
                <li key={idx}>
                  <input
                    type="radio"
                    id={`q${index}_${idx}`}
                    name={`q${index}`}
                    value={choice}
                    onChange={() => handleAnswerChange(index, choice)}
                    disabled={submitted}
                  />
                  <label htmlFor={`q${index}_${idx}`}>{choice}</label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {!submitted && <button onClick={handleSubmit} className="submit-btn">Submit Quiz</button>}
      {submitted && <p>Your score is: {score}</p>}
    </div>
  );
}

export default App;
