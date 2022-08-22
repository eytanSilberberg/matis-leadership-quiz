import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/imgs/blue_logo.png'

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
        const requestedHeight = 0.2 / height * 100
        console.log(requestedHeight);
    }
    return <header style={{ height: `${setHeight()}vh` }}>
        <img src={Logo} alt="" />
    </header>
}