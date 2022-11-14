import Banner from '../assets/imgs/banner.jpeg'
import Globe from './globe'
import { useTranslation } from 'react-i18next';
import Mati_img from '../assets/imgs/mati_img.jpeg'

export const Hero = ({ language, isLanguagePickerOpen, toggleLanguagePicker, languages, changeLang }) => {
    const { t: translate } = useTranslation()

    return <div className="hero full">
        <img className='banner' src={Banner} alt="" />
        <div className={`languages-wrapper ${language === 'he' ? 'rtl' : 'ltr'} ${isLanguagePickerOpen ? 'open' : ''}`}>
            <button onClick={toggleLanguagePicker}>{<Globe />}</button>
            <ul className='languages'>
                {languages.map(lang => {
                    return <li key={lang.code} onClick={() => changeLang(lang.lang)} className={`fi fi-${lang.code}`}>
                    </li>
                })}
            </ul>
        </div>
        <div className='text-wrapper'>
            <h1>
                <span>{translate('hero_span1')}</span>
                <span>{translate('hero_span2')}</span>
            </h1>
        </div>
        <div className='decoration' >
            <div className='decoration-color'></div>
            <img className='mati' src={Mati_img} alt='' />
        </div>
    </div>
}