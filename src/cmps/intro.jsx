import { useTranslation } from "react-i18next"
import Mati_img from '../assets/imgs/mati_img.jpeg'


export const Intro = ({ StartAnsweringForm, language }) => {

    const { t } = useTranslation()
    return <section className='intro' >
        <div className='intro-text'>

            <p><span>{t('intro_welcome')}</span>
                <br />
                <br />
                {t('intro_p1')}
                <br />
                <br />
                {t('intro_p2')}
                <br />
                <br />
                <strong>
                    {t('intro_p3')}
                </strong>
                <br />
                <br />
                {t('intro_p4')}
                <br />
                <br />
                {t('intro_goodLuck')}
                <br />
                {t('intro_p5')}
                <br />
                <br />
                {t('intro_p6')}
                <br />
                <br />
            </p>
            <button onClick={StartAnsweringForm}>{t('intro_button')}</button>
        </div>
        <div className={`decoration ${language === 'he' ? 'rtl' : 'ltr'}`}>
            <div className='decoration-color'></div>
            <img className='mati' src={Mati_img} alt='' />
        </div>
    </section>
}
