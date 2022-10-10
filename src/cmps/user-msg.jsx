import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { eventBusService } from '../services/basic/event-bus.service'


export const UserMsg = () => {

  const [msg, setMsg] = useState()
  const [lang, setLang] = useState()



  const { t } = useTranslation()
  let removeEvent
  let removeEvent2

  useEffect(() => {

    removeEvent = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      setTimeout(() => {
        setMsg(null)
      }, 2500)
    })
    removeEvent2 = eventBusService.on('change_lang', (lang) => {
      setLang(lang)
    })
    return () => {
      removeEvent()
      removeEvent2()
    }
  }, [])

  if (!msg) return <span></span>
  const msgClass = msg.type || ''
  return (
    <section className={'user-msg ' + msgClass + ` ${lang === 'he' ? 'rtl' : 'ltr'}`}>
      <button onClick={() => {
        setMsg(null)
      }}>x</button>
      {t(msg.txt)}
    </section >
  )
}
