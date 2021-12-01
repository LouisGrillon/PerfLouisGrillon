import React from 'react'
import './Stages.css'
import { useTranslation } from 'react-i18next';

import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import divers from '../../Assets/divers2.jpg'
import pilote from '../../Assets/pilote2.jpg'
import stages from '../../Assets/stages2.jpg'
import indiv from '../../Assets/indiv2.jpg'

function Stages() {
    const { t } = useTranslation()
    
    return (
        <div className="pageStages">
            <div className="cards_Container" >
                <div className="card_1">
                    <img id="img1" className="img" src={indiv} alt="cours" />
                    <div className="card_text1">
                        <div className="card_title card_title1 ">{t('stage_card_1_title_part_1')}<br />{t('stage_card_1_title_part_2')}</div>
                        <p className="para_1">
                            {t('stage_card_1_part_1')}
                            <br />{t('stage_card_1_part_2')} <span className="lgp">LOUIS GRILLON PERFORMANCE</span>
                            <br/>{t('stage_card_1_part_3')}
                            <br /><span className="reduce_Inter">{t('stage_card_1_part_4')}.</span>
                            
                        </p>
                    </div>
                </div>

                <div className="card_2">
                    <img id="img2" className="img" src={stages} alt="stage" />
                    <div className="card_text2">
                        <div className="card_title card_title2">{t('stage_card_2_title_part_1')}<br />{t('stage_card_2_title_part_2')}</div>
                        <p className="para_2">
                        <span className="lgp">LOUIS GRILLON PERFORMANCE</span>
                        <br />{t('stage_card_2_part_1')}
                        <br />{t('stage_card_2_part_2')}
                        <br />{t('stage_card_2_part_3')}. 
                        </p>
                    </div>
                </div>

                <div className="card_3">
                    <img id="img3" className="img" src={pilote} alt="suivi" />
                    <div className="card_text3">
                        <div className="card_title card_title3">{t('stage_card_3_title_part_1')}<br />{t('stage_card_3_title_part_2')}</div>
                        <p className="para_3">
                        <span className="lgp">LOUIS GRILLON PERFORMANCE</span> {t('stage_card_3_part_1')}
                            <br />{t('stage_card_3_part_2')}
                            <br />{t('stage_card_3_part_3')}.
                        </p>
                    </div>
                </div>

                <div className="card_4"> 
                    <img id="img4" className="img" src={divers} alt="divers" />
                    <div className="card_text4">
                        <div className="card_title card_title4">{t('stage_card_4_title')}</div>
                        <p className="para_4">
                        <span className="lgp">LOUIS GRILLON PERFORMANCE</span> {t('stage_card_4_part_1')} 
                        <br />{t('stage_card_4_part_2')}
                        <br />{t('stage_card_4_part_3')}
                        <br />{t('stage_card_4_part_4')}.
                        </p>
                    </div>
                </div>
            </div>
            <Layout/>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Stages