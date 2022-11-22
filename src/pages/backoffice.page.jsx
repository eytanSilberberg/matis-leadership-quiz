import React, { useEffect } from "react";
import { userService } from "../services/user/user.service";
import { useNavigate, Link, Outlet } from "react-router-dom";

export const BackOffice = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const user = userService.getLoggedinUser()
        if (!user) {
            navigate('/login')
        }
    })

    const logout = async () => {
        try {
            await userService.logout()
            navigate('/login')
        } catch (error) {
            console.error(error)
        }

    }

    return <section className='back-office main-layout'>
        <div className='logout-button-wrapper'>
            <button onClick={logout}>התנתק</button>
        </div>
        <div className='options-wrapper'>
            <Link to='/backoffice/info'>נתונים</Link>
            <Link to='/backoffice/question'>שאלות</Link>
        </div>
        <Outlet />
    </section>
}