import React from "react"
import { useForm } from "../hooks/useForm"

export const ContactForm = ({ submitForm }) => {
    const [contactForm, handleContactForm] = useForm({ name: '', email: '' })
    const onSubmitForm = (ev) => {
        ev.preventDefault()
        submitForm(contactForm)
    }


    return <div className="form-wrapper">

        <form onSubmit={onSubmitForm}>
            <h1>את/ה עוד רגע מסיים!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita facere provident rem voluptas eos, magni necessitatibus cum impedit autem nostrum similique quos laborum minima est. Voluptatum, veritatis repellendus. Fugiat.</p>
            <label>
                <span>נא הזן את האימייל שלך:</span>
                <input name="email" type="email" required onChange={handleContactForm} />
            </label>
            <label>
                <span>נא הזמן את השם המלא שלך:</span>
                <input name="name" type="text" required onChange={handleContactForm} />
            </label>
            <button>שלח</button>
        </form>
    </div>
}