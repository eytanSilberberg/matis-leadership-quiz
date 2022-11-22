import React from "react"
import { useForm } from "../hooks/useForm"
import { useTranslation } from "react-i18next"

export const ContactForm = ({ submitForm }) => {
    const { t: translate } = useTranslation()
    const [contactForm, handleContactForm] = useForm({ name: '', email: '', })
    const onSubmitForm = (ev) => {
        ev.preventDefault()
        submitForm(contactForm)
    }


    return <div className='form-wrapper'>

        <form onSubmit={onSubmitForm}>
            <h1>{translate('contact_form_almostDone')}</h1>
            <label>
                <span>{translate('contact_form_email')}</span>
                <input name="email" type="email" required onChange={handleContactForm} />
            </label>
            <label>
                <span>{translate('contact_form_name')}</span>
                <input name="name" type="text" required onChange={handleContactForm} />
            </label>
            <h3>{translate('contact_form_acceptance')}</h3>

            <button>{translate('contact_form_button')}</button>
        </form>
    </div>
}