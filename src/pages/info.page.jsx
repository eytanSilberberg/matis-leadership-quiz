import React, { useEffect, useRef, useState } from "react";
import { formService } from "../services/form/form.service";
import { MuiTable } from '../cmps/mui.table.jsx'




export const InfoPage = () => {
    const [forms, setForms] = useState(null)
    const [isWindowLarge, setIsWindowLarge] = useState(false)
    useEffect(() => {

        getForms()
    }, [])

    const getForms = async () => {
        const requestedForms = await formService.query()
        setForms(requestedForms)
    }

    useEffect(() => {
        window.addEventListener('resize', checkSize)
        checkSize()
        return () => window.removeEventListener('resize', checkSize)
    }, [])

    const checkSize = () => {
        const windowWidth = window.innerWidth
        if (windowWidth < 800) {
            setIsWindowLarge(false)
        } else {
            setIsWindowLarge(true)
        }
    }



    if (!forms) return <div>טוען...</div>
    return <section className={`info-page ${isWindowLarge ? '' : 'full'}`}>
        <MuiTable isWindowLarge={isWindowLarge} forms={forms} />
        <h2>סה״כ טפסים שמולאו:{forms.length}</h2>
    </section>
}