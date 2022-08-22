import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/imgs/logo.png'

export const AppHeader = () => {

    const [isMenuOpen, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!isMenuOpen)
    }

    let checkSize = () => {
        console.log(window.innerWidth);
        if (window.innerWidth > 600) {
            setMenu(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', checkSize)
    }, [])

    const setHeight = () => {
        const height = window.innerHeight
        const requestedHeight = height * 0.1
        return requestedHeight
    }

    return <header className='full' style={{ height: `${setHeight()}vh` }}>
        {isMenuOpen && <div onClick={toggleMenu} className='clear-screen'></div>}
        <section className='header-content-wrapper flex'>
            <div className='logo'><img src={Logo} alt="" /></div>
            <nav className={isMenuOpen ? 'open' : ''}>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>Contact</NavLink>
            </nav>
            <button onClick={toggleMenu}>☰</button>

        </section>
    </header>
}