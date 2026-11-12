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
                <span className="description">2017 - 2021 Licencié à <span className="important_Item">Horizon Montluçon</span></span><br />
                <span className='description'>2022 - {t('description_part_6')}{t('description_part_3_5')} <span className="important_Item">Trial Club Saint Gervais</span></span>
            </div>

            <div className="trophies_wrapper" >
                <h2 className="trophies_Title">{t('trophies_Title')}</h2>

<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2008')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2009')}</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>{t('trophy_2010')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2011_europe')}</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2011')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>2014 - Champion d'Europe U14 de BikeTrial.</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>2014 - 3e au Championnat du monde U14 de BikeTrial.</span><br />
<span className="description" style={{ background: "linear-gradient(90deg, #2875DF 0%, #2875DF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #ED4248 66.66%, #ED4248 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold" }}>2010, 2011, 2012, 2013 et 2014 - Champion de France UFOLEP.</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>2015 - 3e aux Jeux Mondiaux de la Jeunesse, catégorie Cadet (U16).</span><br />
<span className="description">2015 - Première sélection en équipe de France junior, avec surclassement depuis la catégorie Cadet.</span><br />
<span className="description">Depuis 2015 - Inscrit sur les listes ministérielles des sportifs de haut niveau.</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>2016 et 2017 - Champion du monde par équipes avec l'équipe de France.</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>2016 et 2017 - Champion du monde junior de BikeTrial.</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>2017 - Vice-champion du monde junior en Trial 20 pouces.</span><br />
<span className="description">2017 - Entrée dans le top 10 du classement mondial UCI.</span><br />
<span className="description" style={{ background: "linear-gradient(90deg, #2875DF 0%, #2875DF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #ED4248 66.66%, #ED4248 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold" }}>2017, 2019, 2020, 2021, 2022 et 2023 - Champion de France Élite en Trial 20 pouces.</span><br />
<span className="description" style={{ background: "linear-gradient(90deg, #2875DF 0%, #2875DF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #ED4248 66.66%, #ED4248 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold" }}>2019, 2021, 2022, 2023, 2024 et 2025 - Champion de France Élite UFOLEP.</span><br />
<span className="description">2021 - Entrée dans le top 8 du classement mondial UCI.</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>2021 - 3e aux Championnats du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2021 - 7e au classement mondial UCI.</span><br />
<span className="description">2022 - 9e au classement mondial UCI.</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>2022 - Vice-champion du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2023 - Top 6 aux Championnats du monde Élite UCI en Trial 20 pouces.</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>2023 - Vice-champion du monde par équipes avec l'équipe de France.</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>2023 - 3e au Championnat d'Europe Élite de BikeTrial.</span><br />
<span className="description">2023 - 6e au classement mondial UCI.</span><br />
<span className="description">2024 - 8e au classement mondial UCI.</span><br />
<span className="description">2025 - 10e au classement mondial UCI.</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>2025 - Champion du monde Élite de BikeTrial.</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>2025 - 3e aux Championnats du monde par équipes avec l'équipe de France.</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>2026 - Champion du monde Élite de BikeTrial.</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>2026 - 3e au Championnat d'Europe Élite de BikeTrial.</span><br />

            </div>

            <div className="degrees_wrapper" >
                <h2 className="degrees_Title">{t('degrees_Title')}</h2>
                <span className='description'>2020 - {t('description_part_26')} <span className="important_Item">{t('description_part_27')}</span>{t('description_part_28')}</span> <br />
                <span className='description'>2021 - {t('description_part_29')} <span className="important_Item">{t('description_part_30')}</span></span><br />
                <span className="description">2023 - Personal Trainer - Expert Préférences Motrices <span className="important_Item">VOLODALEN</span></span>
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
