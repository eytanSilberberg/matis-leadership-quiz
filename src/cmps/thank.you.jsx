import { useTranslation } from "react-i18next"

export const ThankYou = () => {

    const { t: translate } = useTranslation()
    return <div className='thank-you'>
        <p>{translate('thank_you_span1')}</p>
        <p>{translate('thank_you_span2')}</p>
    </div>
}
