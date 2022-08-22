import React from 'react';
import { useState, useEffect } from 'react';
import Mati_img from '../assets/imgs/mati_img.jpeg'
import Banner from '../assets/imgs/banner.jpeg'


import { formService } from '../services/form/form.service';
import { questionService } from '../services/questions/question.service'

import { useDispatch } from 'react-redux';

import { QuestionList } from '../cmps/questions-list.jsx'
import { ContactForm } from '../cmps/contact-form.jsx'
import { ProgressBar } from '../cmps/progressBar.jsx'

import { useRef } from 'react';



export const HomePage = () => {
    const scores = useRef({ responsibility: 0, selfAcceptance: 0, acceptanceOfOthers: 0, emotionalIndependency: 0, creatibilityAndResilienceOfMind: 0, creatibilityAndFocusOfConsciousness: 0 })
    const [questions, setQuestions] = useState(null)
    const currPageRef = useRef(0)
    const [questionsToShow, setQuestionsToShow] = useState(null)
    const [isFormDone, setIsFormDone] = useState(false)
    const [isFinishedAnswering, setIsFinishedAnswering] = useState(false)
    const [isAnswering, setIsAnswering] = useState(false)
    const questionsAnswered = useRef(0)
    const questionsSection = useRef()
    let amountOfQuestions
    const pageSize = 7


    const dispatch = useDispatch()
    useEffect(() => {
        loadQuestionsToUse()
    }, [])

    const setCurrPage = (diff) => {
        const amountOfPages = Math.floor((questions.length) / pageSize)
        if ((currPageRef.current === 0 && diff === -1) || (currPageRef.current === amountOfPages && diff === 1)) {
            console.log('edge')
            return
        }

        window.scrollTo({
            top: questionsSection.current.offsetTop,
            behavior: 'smooth'
        })

        currPageRef.current = currPageRef.current + diff
        getQuestionsToShow()
    }

    const loadQuestionsToUse = async () => {
        let questionsToUse = await questionService.query()
        setQuestions(questionsToUse)
        amountOfQuestions = questionsToUse.length
        const startIdx = currPageRef.current * pageSize
        const currQuestions = questionsToUse.slice(startIdx, startIdx + pageSize)
        setQuestionsToShow(currQuestions)
    }

    const getQuestionsToShow = () => {
        console.log('currPageRef', currPageRef);
        const startIdx = currPageRef.current * pageSize
        const currQuestions = questions.slice(startIdx, startIdx + pageSize)
        setQuestionsToShow(currQuestions)
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

        <div className={`shadow ${questionsAnswered.current === questions.length ? `visible ${showContent()}` : 'hidden'} `}>
            <ContactForm submitForm={submitForm} name='questions' />
        </div>
        <div className="hero full main-layout ">
            <img className='banner' src={Banner} alt="" />
        </div>
        <section className='intro' >
            <div className='intro-text'>

                <p><span> ברוכים הבאים!</span>
                    השאלון שלפניכם הינו כלי מחקר ואבחון שפותח על-ידי ד&quot;ר מתי הר-לב ומטרתו לבחון את מידת המנהיגות התודעתית
                    שלכם. השאלון מורכב מהיגדים ומהערכות מילוליות הנוגעות לכל היגד.
                    לגבי כל היגד סמנו את ההערכה המילולית הנכונה ביותר עבורכם.
                    ההיגדים מנוסחים בלשון זכר אך מתייחסים לנשים ולגברים כאחד.
                    לכל אחת מן ההערכות המילוליות ישנו ערך מספרי באמצעותו נעשה ניתוח מידת המנהיגות התודעתית על פי עקרונות
                    השיטה. בסיום המילוי ישלח אליכם מייל עם סיכום הנקודות ועם ניתוח התוצאה האישית שלכם. בואו נתחיל!
                </p>
                <button onClick={StartAnsweringForm}>בואו נתחיל</button>
            </div>
            <div className='intro-decoration'>
                <div className='decoration-color'></div>
                <img className='mati' src={Mati_img} alt='' />
            </div>
        </section>
        {!questionsToShow && <React.Fragment></React.Fragment>}
        {questionsToShow && !isFormDone && isAnswering && <React.Fragment>
            <div ref={questionsSection} className='interactive-section full main-layout'>
                <ProgressBar questionsLength={questions.length} questionsAnswered={questionsAnswered.current} fillAllAnswers={fillAllAnswers} />
                <QuestionList questions={questionsToShow} setAnswer={onSetAnswer} />
                <div className='pages-button-wrapper'>
                    <button onClick={() => setCurrPage(-1)}>עמוד הקודם</button>
                    <button onClick={() => setCurrPage(1)}>עמוד הבא</button>
                </div>
            </div>
        </React.Fragment>}



    </div>
}