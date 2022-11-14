import React from 'react'
import { QuestionPreview } from './question.preview.jsx'


export const QuestionList = ({ questions, setAnswer, language }) => {


    return <section className='question-list'>
        {questions.map(question => {
            return <QuestionPreview key={question._id} question={question} setAnswer={setAnswer} language={language} />
        })}
    </section>
}