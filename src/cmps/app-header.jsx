import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import Logo from '../assets/imgs/blue_logo.png'
import { eventBusService } from '../services/basic/event-bus.service'

const linkList = [
    {
        to: 'https://www.matiharlev.com/organizations',
        trans: 'header_organizations'
    }, {
        to: 'https://www.matiharlev.com/public',
        trans: 'header_public'
    }, {
        to: 'https://www.matiharlev.com/about',
        trans: 'header_about'
    }, {
        to: 'https://www.matiharlev.com/digitalcourse',
        trans: 'header_digitalcourse'
    }, {
        to: 'https://www.matiharlev.com/blog',
        trans: 'header_blog'
    },
    {
        to: 'https://www.matiharlev.com/contact',
        trans: 'header_contact'
    },
    {
        to: 'https://www.matiharlev.com/lessons',
        trans: 'header_login'
    }
]

export const AppHeader = () => {

    const [lang, setLang] = useState('he')

    eventBusService.on('change_lang', (lang) => {
        setLang(lang)
    })
    const { t } = useTranslation()

    const [isMenuOpen, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!isMenuOpen)
    }

    const goToWebsite = () => {
        window.location = 'http://matiharlev.com/'
    }
    return <header >

        <img onClick={goToWebsite} src={Logo} alt="" />
        <nav className={`${isMenuOpen ? 'open' : ''} ${lang === 'he' ? 'rtl' : 'ltr'}`}>
            {linkList.map(link => {
                const { to, trans } = link
                return <a key={to} href={`${to}`}>{t(`${trans}`)}</a>
            })}
        </nav>
        <button className='menu-sign' onClick={toggleMenu}>☰</button>
        <div className={`screen ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </header>
}