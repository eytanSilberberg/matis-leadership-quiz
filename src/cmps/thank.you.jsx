import { useTranslation } from "react-i18next"

export const ThankYou = () => {

    const { t } = useTranslation()
    return <div className='thank-you'>
        <p>{t('thank_you_span1')}</p>
        <p>{t('thank_you_span2')}</p>
    </div>
}
