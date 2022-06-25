import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

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

    return <header className='full'>
        {isMenuOpen && <div onClick={toggleMenu} className='clear-screen'></div>}
        <section className='header-content-wrapper flex'>
            <div className='logo'>Logo</div>
            <nav className={isMenuOpen ? 'open' : ''}>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </nav>
            <button onClick={toggleMenu}>☰</button>

        </section>
    </header>
}