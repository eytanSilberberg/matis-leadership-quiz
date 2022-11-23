import React, { useEffect, useState } from "react";
import { formService } from "../services/form/form.service";
import { MuiTable } from "../cmps/mui.table.jsx"
import { UsersForm } from "../cmps/users.form.jsx"

export const InfoPage = () => {

    const [forms, setForms] = useState(null)
    const [windowSize, setWindowSize] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false)

    useEffect(() => {
        document.body.dir = 'rtl'
        getForms()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', checkSize)
        checkSize()
        return () => window.removeEventListener('resize', checkSize)
    }, [windowSize])

    const checkSize = () => {
        const windowWidth = window.innerWidth
        if (windowWidth > 1100) setWindowSize('xl')
        else if (windowWidth > 975) setWindowSize('lg')
        else if (windowWidth > 500) setWindowSize('med')
        else setWindowSize('sm')

    }

    const viewUsersForm = (form) => {
        setUserInfo(form)
        setIsUserInfoOpen(!isUserInfoOpen)
    }

    const closeUserForm = () => {
        setIsUserInfoOpen(!isUserInfoOpen)
    }

    const getForms = async () => {
        let requestedForms = await formService.query()
        requestedForms = requestedForms.reverse()
        setForms(requestedForms)
    }

    if (!forms) return <div>טוען...</div>
    return <section className={`info-page ${windowSize !== 'xl' ? 'full' : ''}`}>
        <MuiTable windowSize={windowSize} forms={forms} onViewUsersForm={viewUsersForm} />
        <h2>סה״כ טפסים שמולאו:{forms.length}</h2>
        <UsersForm userInfo={userInfo} isUserInfoOpen={isUserInfoOpen} onExitUsersForm={closeUserForm} />
    </section>
}