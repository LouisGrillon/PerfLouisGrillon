import React from 'react'
import { useTranslation } from 'react-i18next';

import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import './About.css'

function About() {

    const { t } = useTranslation()

    return (
    <div className="pageAbout">
        <div className="aboutContainer" >
            <div className="birthday_wrapper">
                <h2 className="birthday_Title">{t('birthday_Title')}</h2>
                <span className='description'>03 {t('description_part_1')} 1999 - <span className="important_Item">Orléans</span></span>
            </div>

            <div className="formation_wrapper" >
                <h2 className="formation_Title">{t('formation_Title')}</h2>
                <span className='description'>2004 - {t('description_part_2')} <span className="important_Item"> Trialistes de L'Ardoux</span>
                {t('description_part_3')} Mézières-lez-Cléry (45).</span> <br />
                <span className='description'>2005 - {t('description_part_4')}</span> <br />
                <span className='description'>2004 - 2016 - {t('description_part_5')} <span className="important_Item"> Les Trialistes de l'Ardoux</span> {t('and')} Trial Club Cerny</span> <br />
                <span className='description'>2017 - 2021 {t('description_part_6')}<span className="important_Item">Horizon Monluçon</span></span><br />
                <span className='description'>2022 - {t('description_part_6')}{t('description_part_3_5')} <span className="important_Item">Trial Club Saint Gervais</span></span>
            </div>

            <div className="trophies_wrapper" >
                <h2 className="trophies_Title">{t('trophies_Title')}</h2>
                <span className='description'>2009 - {t('description_part_8')} <span className="important_Item">{t('description_part_9')}</span>{t('description_part_9_add_1')}</span> <br />
                <span className='description'>2010 - {t('description_part_925')} <span className="important_Item">{t('description_part_9')}</span>{t('description_part_11')}</span> <br />
                <span className='description'>2011 - {t('description_part_9_add_2')} <span className="important_Item">{t('description_part_9')}</span>{t('description_part_11')}</span> <br />
                <span className='description'>2015 - {t('description_part_10')} <span className="important_Item">{t('description_part_9')}</span></span> <br />
                <span className='description'>2015 - {t('description_part_12')} <span className="important_Item">{t('description_part_13')}</span>{t('description_part_14')}</span> <br />
                <span className='description'>2015 - {t('description_part_15')} </span><br />
                <span className='description'>2016 - 2017 - {t('description_part_16')} <span className="important_Item">{t('description_part_17')}</span></span> <br />
                <span className='description'>2017 - {t('description_part_18')} <span className="important_Item">{t('description_part_19')}</span></span> <br />
                <span className='description'>2017 - {t('description_part_22')} <span className="important_Item">{t('description_part_23')}</span></span> <br />
                <span className='description'>2017 - 2019 - 2020 - 2021 - 2022 - <span className="important_Item">{t('description_part_21')}</span></span> <br />
                <span className='description'>2021 - {t('description_part_24')} <span className="important_Item">{t('description_part_25')}</span></span><br />
                <span className='description'>2021 - <span>{t('description_part_9_add_2')}<span className="important_Item">{t('description_part_16')}</span>{t('description_part_17')}</span></span><br />
                <span className='description'>2021 - n°7 <span className="important_Item">{t('description_part_25')}</span></span><br />
                <span className='description'>2022 - n°9 <span className="important_Item">{t('description_part_25')}</span></span><br />
                <span className='description'>2022 - <span className="important_Item">{t('description_part_18_5')}</span>{t('description_part_17')}</span><br />
            </div>

            <div className="degrees_wrapper" >
                <h2 className="degrees_Title">{t('degrees_Title')}</h2>
                <span className='description'>2020 - {t('description_part_26')} <span className="important_Item">{t('description_part_27')}</span>{t('description_part_28')}</span> <br />
                <span className='description'>2021 - {t('description_part_29')} <span className="important_Item">{t('description_part_30')}</span></span>
            </div>
            

        </div>
        <Layout/>
        <footer>
            <Footer/>
        </footer>
    </div>
    )
}

export default About
