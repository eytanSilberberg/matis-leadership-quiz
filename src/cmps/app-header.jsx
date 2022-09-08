import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/imgs/blue_logo.png'

export const AppHeader = () => {

    const [isMenuOpen, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!isMenuOpen)
    }

    const goToWebsite = () => {
        window.location = 'http://matiharlev.com/'
    }
    return <header >

        <img onClick={goToWebsite} src={Logo} alt="" />
        <nav className={`${isMenuOpen ? 'open' : ''}`}>
            <a href="https://www.matiharlev.com/organizations">ארגונים</a>
            <a href="https://www.matiharlev.com/public">קהל רחב</a>
            <a href="https://www.matiharlev.com/%D7%94%D7%A8%D7%A6%D7%90%D7%95%D7%AA">הרצאות</a>
            <a href="https://www.matiharlev.com/about">אודות מתי</a>
            <a href="https://www.matiharlev.com/digitalcourse">קורס דיגיטלי</a>
            <a href="https://www.matiharlev.com/blog">מרכז הידע</a>
            <a href="https://www.matiharlev.com/contact">יצירת קשר</a>
            <a href=" https://www.matiharlev.com/lessons">כניסת משתמש</a>
        </nav>
        <button className='menu-sign' onClick={toggleMenu}>☰</button>
        <div className={`screen ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </header>
}