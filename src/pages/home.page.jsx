import React from "react";
import { useState, useEffect } from "react";


import { formService } from "../services/form/form.service";
import { questionService } from "../services/questions/question.service"

import { Intro } from "../cmps/intro"
import { Hero } from "../cmps/hero"
import { QuestionList } from "../cmps/questions.list.jsx"
import { ContactForm } from "../cmps/contact.form.jsx"
import { ProgressBar } from "../cmps/progress.bar.jsx"
import { ThankYou } from "../cmps/thank.you.jsx"

import { useRef } from "react";
import { eventBusService, showErrorMsg } from "../services/basic/event-bus.service";
import i18n from "../services/basic/i18n";
import "/node_modules/flag-icons/css/flag-icons.min.css"

// DATA
import languages from '../data/languages';



export const HomePage = () => {
    const [questions, setQuestions] = useState(null)
    const [isFormDone, setIsFormDone] = useState(false)
    const [isAnswering, setIsAnswering] = useState(false)
    const [language, setLanguage] = useState('he')
    const [isLanguagePickerOpen, setLanguagePicker] = useState(false)

    const questionsAnswered = useRef(0)
    const questionsSection = useRef()
    const renderCount = useRef(0)

    useEffect(() => {
        if (!renderCount.current) {
            renderCount.current++
            loadQuestionsToUse()
        }
        if (language === 'he') document.body.dir = 'rtl'
        else if (language === 'en') document.body.dir = 'ltr'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    const loadQuestionsToUse = async () => {
        const questionsToUse = await questionService.query()
        setQuestions(questionsToUse)
    }

    const onSetAnswer = (answer, id) => {
        const newQuestions = [...questions]
        const requestedQuestion = newQuestions.find(question => question._id === id)
        requestedQuestion.answerValue = answer
        const allAnsweredQuestions = questions.filter(question => question.answerValue)
        questionsAnswered.current = allAnsweredQuestions.length
        setQuestions(newQuestions)
    }

    const submitForm = async (contactForm) => {

        const currDate = new Date(Date.now())
        const scores = {
            responsibility: 0,
            selfAcceptance: 0,
            acceptanceOfOthers: 0,
            emotionalIndependency: 0,
            creatibilityAndResilienceOfMind: 0,
            creatibilityAndFocusOfConsciousness: 0,
            internal: 0,
            external: 0
        }

        for (let i = 0; i < questions.length; i++) {
            const currQuestion = questions[i]
            if (currQuestion.answerValue) {
                scores[currQuestion.category] += currQuestion.answerValue
                scores[currQuestion.character] += currQuestion.answerValue
            } else {
                showErrorMsg('user_msg')
                return
            }
        }

        const form = { scores, ...contactForm, dateFilled: currDate }
        try {
            await formService.save(form)
        } catch (error) {
            console.error(error)
            return
        }
        setIsFormDone(true)
        setTimeout(() => {
            window.location = 'http://matiharlev.com/'
        }, 2000)

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

        {!isFormDone && <>
            <Hero language={language} isLanguagePickerOpen={isLanguagePickerOpen} toggleLanguagePicker={toggleLanguagePicker} languages={languages} changeLang={changeLang} />
            <Intro StartAnsweringForm={StartAnsweringForm} language={language} />
            {!questions && <></>}
            {questions && isAnswering &&
                <>
                    <div ref={questionsSection} className='interactive-section full main-layout'>
                        <ProgressBar questionsLength={questions.length} questionsAnswered={questionsAnswered.current} />
                        <QuestionList questions={questions} setAnswer={onSetAnswer} language={language} />
                    </div>
                    <ContactForm submitForm={submitForm} />
                </>}
        </>}

        {isFormDone && <ThankYou />}
    </div>
}

