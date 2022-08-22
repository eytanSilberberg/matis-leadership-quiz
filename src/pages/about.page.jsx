import React from "react";
import { useForm } from '../hooks/useForm'
import Me from '../assets/imgs/me.jpeg'

export const AboutPage = () => {
    const [contactForm, handleChange] = useForm({
        name: '',
        email: '',
        message: ''
    })

    const saveForm = (ev) => {
        ev.preventDefault()
        ev.target.reset()
    }

    return <section className="about-page">
        <main className="form-section flex">
            <div className="content-wrapper">
                <h1>Let's get in touch!</h1>
                <span>Fill the form below and ill get back to you soon.</span>
                <form className="flex " onSubmit={saveForm}>
                    <input name="name" type="text" placeholder="Enter full name" onChange={handleChange} />
                    <input name="email" type="email" placeholder="Enter email address" onChange={handleChange} />
                    <textarea name="message" placeholder="Write your message here..." id="" cols="30" rows="10" onChange={handleChange}></textarea>
                    <button>submit</button>
                </form>
            </div>
            <div className="img-wrapper">
                <img src={Me} alt="" />
            </div>
        </main>

    </section>
}