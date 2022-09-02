import React from "react"
import { useForm } from "../hooks/useForm"

export const ContactForm = ({ submitForm }) => {
    const [contactForm, handleContactForm] = useForm({ name: '', email: '', })
    const onSubmitForm = (ev) => {
        ev.preventDefault()
        submitForm(contactForm)
    }


    return <div className="form-wrapper">

        <form onSubmit={onSubmitForm}>
            <h1>עוד רגע מסיימים!</h1>
            <label>
                <span>נא הזן את האימייל שלך:</span>
                <input name="email" type="email" required onChange={handleContactForm} />
            </label>
            <label>
                <span>נא הזן את השם המלא שלך:</span>
                <input name="name" type="text" required onChange={handleContactForm} />
            </label>
            <h3>שליחת השאלון מהווה הסכמה לקבלת מייל חוזר עם ניתוח השאלון.</h3>
            <button>שלח</button>
        </form>
    </div>
}