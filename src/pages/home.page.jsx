import React from 'react';
import { useState, useEffect } from 'react';
import Mati_img from '../assets/imgs/mati_img.jpeg'
import Banner from '../assets/imgs/banner.jpeg'


import { formService } from '../services/form/form.service';
import { questionService } from '../services/questions/question.service'


import { QuestionList } from '../cmps/questions-list.jsx'
import { ContactForm } from '../cmps/contact-form.jsx'
import { ProgressBar } from '../cmps/progressBar.jsx'

import { useRef } from 'react';
import { showErrorMsg } from '../services/basic/event-bus.service';

export const HomePage = () => {
    const scores = useRef({ responsibility: 0, selfAcceptance: 0, acceptanceOfOthers: 0, emotionalIndependency: 0, creatibilityAndResilienceOfMind: 0, creatibilityAndFocusOfConsciousness: 0 })
    const [questions, setQuestions] = useState(null)
    const [questionsToShow, setQuestionsToShow] = useState(null)
    const [isFormDone, setIsFormDone] = useState(false)
    const [isAnswering, setIsAnswering] = useState(false)
    const questionsAnswered = useRef(0)
    const questionsSection = useRef()
    let amountOfQuestions



    useEffect(() => {
        loadQuestionsToUse()
    }, [])

    const loadQuestionsToUse = async () => {
        let questionsToUse = await questionService.query()
        setQuestions(questionsToUse)
        amountOfQuestions = questionsToUse.length
        setQuestionsToShow(questionsToUse)
    }

    const onSetAnswer = (answer, id) => {

        const newQuestions = [...questions]
        const requestedQuestion = newQuestions.find(question => question._id === id)
        requestedQuestion.answerValue = answer
        const questionsFromCategory = newQuestions.filter(question => question.category === requestedQuestion.category)
        const grade = questionsFromCategory.reduce((acc, question) => {
            return acc + question.answerValue
        }, 0)
        const category = requestedQuestion.category
        const allAnsweredQuestions = questions.filter(question => question.answerValue)
        scores.current = ({ ...scores.current, [category]: grade })
        console.log(scores.current)
        questionsAnswered.current = allAnsweredQuestions.length
        setQuestions(newQuestions)
    }

    const submitForm = async (contactForm) => {
        const isAllQuestionsFilled = questions.every(question => question.answerValue)
        if (isAllQuestionsFilled) {
            const form = { scores: scores.current, ...contactForm }
            console.log(form)
            await formService.save(form)
            setIsFormDone(true)
        } else {
            showErrorMsg('נא מלא את כל השאלות')
        }

    }

    const StartAnsweringForm = () => {
        setIsAnswering(true)
        setTimeout(() => {
            window.scrollTo({
                top: questionsSection.current.offsetTop,
                behavior: 'smooth'
            })
        }, 500)
    }

    const fillAllAnswers = () => {
        let copiedQuestions = [...questions]
        copiedQuestions.forEach(question => question.answerValue = { answerText: 'true', value: 6 })

    }
    const showContent = () => {
        let string = 'show-content'
        return string
    }
    if (!questions) return <div></div>

    return <div className='main-layout home'>

        {!isFormDone && <React.Fragment>
            <div className="hero full">
                <img className='banner' src={Banner} alt="" />
                <div className='text-wrapper'>

                    <h1>
                        <span>מידת המנהיגות התודעתית</span>
                        <span>שאלון לבחינה עצמית</span>
                    </h1>
                </div>
                <div className='decoration'>
                    <div className='decoration-color'></div>
                    <img className='mati' src={Mati_img} alt='' />
                </div>
            </div>
            <section className='intro' >
                {!isFormDone && <div className='intro-text'>


                    <p><span> ברוכים הבאים!</span>
                        <br />
                        <br />
                        השאלון שלפניכם הינו כלי מחקר ואבחון שפותח על-ידי ד&quot;ר מתי הר-לב ומטרתו לבחון את
                        מידת המנהיגות התודעתית שלכם. השאלון מורכב מהיגדים ומהערכות מילוליות הנוגעות
                        לכל היגד. ההיגדים מנוסחים בלשון זכר אך מתייחסים לנשים ולגברים כאחד.
                        <br />
                        <br />
                        <strong>

                            אין בשאלון תשובות נכונות או לא נכונות - לגבי כל היגד סמנו את ההערכה המילולית
                            המדויקת ביותר עבורכם.
                        </strong>
                        בסיום המילוי ישלח אליכם מייל עם ניתוח התוצאה האישית
                        שלכם על פי עקרונות השיטה.
                        <br />
                        <br />
                    </p>
                    <p className='good-luck'>בהצלחה!
                        <br />
                        ד״ר מתי הר-לב, מפתחת השיטה להתנהגות תודעתית
                    </p>
                    <button onClick={StartAnsweringForm}>בואו נתחיל!</button>
                </div>}
                <div className='decoration'>
                    <div className='decoration-color'></div>
                    <img className='mati' src={Mati_img} alt='' />
                </div>
            </section>
            {!questionsToShow && <React.Fragment></React.Fragment>}
            {questionsToShow && isAnswering && <React.Fragment>
                <div ref={questionsSection} className='interactive-section full main-layout'>
                    <ProgressBar questionsLength={questions.length} questionsAnswered={questionsAnswered.current} fillAllAnswers={fillAllAnswers} />
                    <QuestionList questions={questionsToShow} setAnswer={onSetAnswer} />
                </div>
                <ContactForm submitForm={submitForm} name='questions' />
            </React.Fragment>}
        </React.Fragment>}
        {isFormDone &&
            <div className='thank-you'>
                <p>תודה שמילאת את השאלון!</p>
                <p>ברגעים אלה נשלח למייל שלך ניתוח של השאלון שענית</p>

            </div>}
    </div>
}