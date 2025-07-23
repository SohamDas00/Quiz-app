import React, { useEffect, useState } from 'react';

export default function QuizList() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setQuestions(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleSelect = (questionId, option) => {
    if (!showResults) { 
      setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => setShowResults(true);

  const getScore = () => {
    return questions.reduce((score, q) => 
      selectedAnswers[q._id] === q.answer ? score + 1 : score, 0);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🧠 Smart Quiz Portal</h1>

      {questions.map((q, index) => (
        <div key={q._id} className="question-card">
          <div className="question-header">
            <span className="question-index">Q{index + 1}</span>
            <h3>{q.question}</h3>
          </div>
          <ul>
            {q.options.map((opt, i) => {
              const selected = selectedAnswers[q._id] === opt;
              const isCorrect = showResults && opt === q.answer;
              const isWrong = showResults && selected && opt !== q.answer;

              let optionClass = '';
              if (isCorrect) optionClass = 'correct';
              else if (isWrong) optionClass = 'wrong';
              else if (selected) optionClass = 'selected';

              return (
                <li
                  key={i}
                  className={optionClass}
                  onClick={() => handleSelect(q._id, opt)}
                >
                  {opt}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {!showResults && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Answers
        </button>
      )}

      {showResults && (
        <h2 className="score-display">
          🎉 You scored {getScore()} out of {questions.length}
        </h2>
      )}
    </div>
  );
}
