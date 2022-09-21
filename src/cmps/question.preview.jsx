import React from "react";


export const QuestionPreview = ({ question, setAnswer }) => {
    return <div className="question-preview">
        <h1>{question.questionText}</h1>

        <div className="answers-wrapper">
            {question.answers.map((answer, idx) => {
                return <div key={idx} className="answer-wrapper">
                    <div style={{ borderRadius: '50%' }} onClick={() => setAnswer(answer.value, question._id)} className={`radio-button ${answer.value === question.answerValue ? 'picked' : ''}`}></div>
                    <span>{answer.answerText}</span>
                </div>
            })}
        </div>
    </div>
}