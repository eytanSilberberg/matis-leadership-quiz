import React from "react";
import { useTranslation } from "react-i18next";


export const QuestionPreview = ({ question, setAnswer, language }) => {
    const { t: translate } = useTranslation()

    let numsOrder = question.direction === "increase" ? [1, 2, 3, 4, 5, 6] : [6, 5, 4, 3, 2, 1]

    if (question.answerValue) console.log(question)

    return <div className="question-preview">
        <h1>{question.questions[language]}</h1>
        <div className="answers-wrapper">
            {numsOrder.map((num, idx) => {
                return <div key={idx} className="answer-wrapper">
                    <div style={{ borderRadius: '50%' }} onClick={() => setAnswer(
                        numsOrder[idx], question._id)} className={`radio-button ${question.answerValue === numsOrder[idx] ? 'picked' : ''}`}></div>
                    <span>{translate(`answer${idx + 1}`)}</span>
                </div>
            })}
        </div>
    </div>
}