import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { userService } from "../services/user/user.service"


export const LoginPage = () => {
    const navigate = useNavigate()
    const [form, handleForm] = useForm({ email: '', password: '', })

    const submitForm = async (ev) => {
        ev.preventDefault()
        try {
            await userService.login(form)
            navigate('/backoffice')
        } catch (error) {
            console.log(error);
        }
    }

    return <div className='admin-page main-layout'>
        <div className='log-in-form'>
            <form onSubmit={submitForm} className='log-in-form-wrapper'>
                <label>
                    <h2>נא להזין את שם המשתמש</h2>
                    <input onChange={handleForm} name='email' type='text' />
                </label>
                <label >
                    <h2>נא להזין את הסיסמא </h2>
                    <input onChange={handleForm} name='password' type='password' />
                </label>
                <button>התחבר</button>
            </form>
        </div>
    </div>
}

