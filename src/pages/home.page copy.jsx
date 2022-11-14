import React from 'react';
import { useState, useEffect } from 'react';


import { formService } from '../services/form/form.service';
import { questionService } from '../services/questions/question.service'

import { Intro } from '../cmps/intro'
import { Hero } from '../cmps/hero'
import { QuestionList } from '../cmps/questions.list.jsx'
import { ContactForm } from '../cmps/contact.form.jsx'
import { ProgressBar } from '../cmps/progress.bar.jsx'
import { ThankYou } from '../cmps/thank.you.jsx'

import { useRef } from 'react';
import { eventBusService, showErrorMsg } from '../services/basic/event-bus.service';
import i18n from '../services/basic/i18n';
import "/node_modules/flag-icons/css/flag-icons.min.css"

// DATA
import languages from '../data/languages';



export const HomePage = () => {
    const scores = useRef({ responsibility: 0, selfAcceptance: 0, acceptanceOfOthers: 0, emotionalIndependency: 0, creatibilityAndResilienceOfMind: 0, creatibilityAndFocusOfConsciousness: 0 })
    const [questions, setQuestions] = useState(null)
    const [questionsToShow, setQuestionsToShow] = useState(null)
    const [isFormDone, setIsFormDone] = useState(false)
    const [isAnswering, setIsAnswering] = useState(false)
    const [language, setLanguage] = useState('he')
    const [isLanguagePickerOpen, setLanguagePicker] = useState(false)

    const questionsAnswered = useRef(0)
    const questionsSection = useRef()
    let amountOfQuestions
    const renderCount = useRef(0)



    useEffect(() => {
        loadQuestionsToUse()
        if (language === 'he') document.body.dir = 'rtl'
        else if (language === 'en') document.body.dir = 'ltr'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    const loadQuestionsToUse = async () => {
        questionsAnswered.current = 0
        let questionsToUse = questions
        if (!renderCount.current) {
            renderCount.current++
            questionsToUse = await questionService.query()
            setQuestions(questionsToUse)
            amountOfQuestions = questionsToUse.length
        }

        if (language === 'he') {
            questionsToUse = questionsToUse.map(question => {
                return {
                    _id: question._id,
                    answerValue: question.answerValue,
                    questionText: question.questionTextHe,
                    category: question.category,
                    answers: question.answersHe

                }
            })

        } else if (language === 'en') {

            questionsToUse = questionsToUse.map(question => {
                return {
                    _id: question._id,
                    answerValue: question.answerValue,
                    questionText: question.questionTextEn,
                    category: question.category,
                    answers: question.answersEn

                }
            })
        }
        setQuestionsToShow(questionsToUse)
    }

    const onSetAnswer = (answer, id) => {
        console.log(answer, id);
        const newQuestions = [...questionsToShow]
        const requestedQuestion = newQuestions.find(question => question._id === id)
        requestedQuestion.answerValue = answer
        const questionsFromCategory = newQuestions.filter(question => question.category === requestedQuestion.category)
        const grade = questionsFromCategory.reduce((acc, question) => {
            return acc + question.answerValue
        }, 0)
        const category = requestedQuestion.category
        const allAnsweredQuestions = questionsToShow.filter(question => question.answerValue)
        scores.current = ({ ...scores.current, [category]: grade })
        questionsAnswered.current = allAnsweredQuestions.length
        console.log(questionsAnswered.current);
        setQuestionsToShow(newQuestions)
    }

    const submitForm = async (contactForm) => {
        const isAllQuestionsFilled = questionsToShow.every(question => question.answerValue)
        if (isAllQuestionsFilled) {
            const form = { scores: scores.current, ...contactForm }
            await formService.save(form)
            setIsFormDone(true)
            setTimeout(() => {
                window.location = 'http://matiharlev.com/'
            }, 2000)
        } else {
            showErrorMsg('user_msg')
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

    const changeLang = (lang) => {
        eventBusService.emit('change_lang', lang)
        i18n.changeLanguage(lang)
        setLanguage(lang)
    }

    const toggleLanguagePicker = () => {
        setLanguagePicker(!isLanguagePickerOpen)
    }

    if (!questions) return <div></div>

    return <div className='main-layout home' >

        {!isFormDone && <React.Fragment>
            <Hero language={language} isLanguagePickerOpen={isLanguagePickerOpen} toggleLanguagePicker={toggleLanguagePicker} languages={languages} changeLang={changeLang} />
            <Intro StartAnsweringForm={StartAnsweringForm} language={language} />
            {!questionsToShow && <React.Fragment></React.Fragment>}
            {questionsToShow && isAnswering && <React.Fragment>
                <div ref={questionsSection} className='interactive-section full main-layout'>
                    <ProgressBar questionsLength={questions.length} questionsAnswered={questionsAnswered.current} />
                    <QuestionList questions={questionsToShow} setAnswer={onSetAnswer} />
                </div>
                <ContactForm submitForm={submitForm} />
            </React.Fragment>}
        </React.Fragment>}

        {isFormDone && <ThankYou />}
    </div>
}

