import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return <header className='full'>
        <section className='header-content-wrapper flex space-between'>
            <div className='logo'>Logo</div>
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </nav>
        </section>
    </header>
}