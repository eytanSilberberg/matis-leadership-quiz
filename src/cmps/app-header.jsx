import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/imgs/blue_logo.png'

export const AppHeader = () => {

    const [isMenuOpen, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!isMenuOpen)
    }
    return <header >

        <a href="http://matiharlev.com/"><img src={Logo} alt="" /></a>
        <nav className={`${isMenuOpen ? 'open' : ''}`}>
            <a href="">ארגונים</a>
            <a href="">קהל רחב</a>
            <a href="">אודות מתי</a>
            <a href="">קורס דיגיטלי</a>
            <a href="">מרכז הידע</a>
            <a href="">יצירת קשר</a>
            <a href="">כניסת משתמש</a>
        </nav>
        <button className='menu-sign' onClick={toggleMenu}>☰</button>
        <div className={`screen ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </header>
}