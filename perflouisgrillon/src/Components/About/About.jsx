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

<span className="description">2009 - Vainqueur des Jeux Mondiaux de la Jeunesse, catégorie Poussin (U10), pour ma première sélection.</span><br />
<span className="description">2010 - Vice-champion des Jeux Mondiaux de la Jeunesse, catégorie Benjamin (U12).</span><br />
<span className="description">2011 - 3e aux Jeux Mondiaux de la Jeunesse, catégorie Benjamin (U12).</span><br />
<span className="description">2015 - 3e aux Jeux Mondiaux de la Jeunesse, catégorie Cadet (U16).</span><br />
<span className="description">2015 - Première sélection en équipe de France junior, avec surclassement depuis la catégorie Cadet.</span><br />
<span className="description">Depuis 2015 - Inscrit sur les listes ministérielles des sportifs de haut niveau.</span><br />
<span className="description">2016 et 2017 - Champion du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2017 - Vice-champion du monde junior en Trial 20 pouces.</span><br />
<span className="description">2017 - Entrée dans le top 10 du classement mondial UCI.</span><br />
<span className="description">2017, 2019, 2020, 2021, 2022 et 2023 - Champion de France Élite en Trial 20 pouces.</span><br />
<span className="description">2019, 2021, 2022, 2023, 2024 et 2025 - Champion de France Élite UFOLEP.</span><br />
<span className="description">2021 - Entrée dans le top 8 du classement mondial UCI.</span><br />
<span className="description">2021 - 3e aux Championnats du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2021 - 7e au classement mondial UCI.</span><br />
<span className="description">2022 - 9e au classement mondial UCI.</span><br />
<span className="description">2022 - Vice-champion du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2023 - Top 6 aux Championnats du monde Élite en Trial 20 pouces.</span><br />
<span className="description">2023 - Vice-champion du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2023 - 3e au Championnat d'Europe Élite de BIKETRIAL.</span><br />
<span className="description">2023 - 6e au classement mondial UCI.</span><br />
<span className="description">2024 - 8e au classement mondial UCI.</span><br />
<span className="description">2025 - 10e au classement mondial UCI.</span><br />
<span className="description">2025 - Champion du monde Élite de BIKETRIAL.</span><br />
<span className="description">2025 - 3e aux Championnats du monde par équipes avec l'équipe de France.</span><br />
<span className="description">2026 - Champion du monde Élite de BIKETRIAL.</span><br />
<span className="description">2026 - 3e au Championnat d'Europe Élite de BIKETRIAL.</span><br />

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
