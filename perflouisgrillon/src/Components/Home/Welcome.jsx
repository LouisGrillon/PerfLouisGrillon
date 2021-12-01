import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import welcome from '../../Assets/welcomeh496h.png'
import { useTranslation } from 'react-i18next';
import './Welcome.css'

export default function Welcome() {
    const { t } = useTranslation()

        return(
            <>
                <div className="welcome" id="welcome" >
                    <div className="welcome_Desktop">
                        <Link to="/" className="link_to_home">
                        <span className='welcome_Title lgp'>{t('Welcome')}</span> <br /> <br />
                        <p className="welcome_Paragraphs">{t('welcome_part_1')}<span className='principal lgp_Welcome'>{t('welcome_part_2')} </span> 
                        {t('welcome_part_3')} 
                        <span className='principal lgp_Welcome'>{t('welcome_part_4')}</span><br />{t('welcome_part_5')}
                        <span className='principal lgp_Welcome'>TRIAL</span> {t('welcome_part_6')} <span className='principal lgp_Welcome'>{t('welcome_part_7')}</span>.</p>
                        
                        <p className="welcome_Paragraphs">{t('welcome_part_8')}
                        <span className='principal lgp_Welcome'>informations </span> 
                        {t('welcome_part_9')} <br />    
                        {t('welcome_part_10')}
                        <span className='principal lgp_Welcome'>TRIAL</span> <br /> {t('welcome_part_11')}.
                        </p>

                        <p className="welcome_Paragraphs"><span className='lgp_Welcome'>Louis Grillon Performance</span>
                        {t('welcome_part_12')}
                        {t('welcome_part_13')}<br />
                        {t('welcome_part_14')}.
                        </p>

                        <p className="welcome_Paragraphs"><span className='lgp_Welcome'>Louis Grillon Performance</span>
                        {t('welcome_part_15')}
                        {t('welcome_part_16')}.
                        </p>

                        <p className="welcome_Paragraphs"><span className='lgp_Welcome'>Louis Grillon Performance</span>
                        {t('welcome_part_17')}<br />
                        {t('welcome_part_18')}.
                        </p>
                        </Link>

                    </div>

                </div>
                <Layout/>  
                <footer>
                    <Footer/>
                </footer>
            </>
        )
}