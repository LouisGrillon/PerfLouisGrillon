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
                <span className='description'>2004 - {t('formation_2004')} <span className="important_Item"> Trialistes de L'Ardoux</span>
                {t('description_part_3')} Mézières-lez-Cléry (45).</span> <br />
                <span className='description'>2005 - {t('description_part_4')}</span> <br />
                <span className='description'>2004 - 2016 - {t('formation_2004_2016')} <span className="important_Item"> Les Trialistes de l'Ardoux</span> {t('and')} Trial Club Cerny</span> <br />
                <span className="description">2017 - 2021 - {t('formation_2017_2021')} <span className="important_Item">Horizon Montluçon</span></span><br />
                <span className='description'>{t('formation_since_2022')} - {t('formation_2022')}{" "} <span className="important_Item">Trial Club Saint Gervais</span></span><br />
                <span className="description">{t('formation_since_2022')} - {t('formation_saran')}{" "}<span className="important_Item">USM Saran BikeTrial</span></span><br />
            </div>

            <div className="trophies_wrapper" >
                <h2 className="trophies_Title">{t('trophies_Title')}</h2>

<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2008')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2009')}</span><br />
<span className="description"><span style={{ color: "#C0C0C0", fontWeight: "bold" }}>{t('trophy_2010').slice(0, 4)}</span>{t('trophy_2010').slice(4)}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2011_europe')}</span><br />
<span className="description">
  <span style={{ color: "#CD7F32", fontWeight: "bold" }}>
    {t('trophy_2011').slice(0, 4)}
  </span>
  {t('trophy_2011').slice(4)}
</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2014_europe')}</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2014')}</span><br />
<span className="description">
  {t('trophy_ufolep_2010_2014').split(/((?:2010,\s*2011,\s*2012,\s*2013\s*(?:et|and)\s*2014))/gi).map((part, i) =>
    /2010,\s*2011,\s*2012,\s*2013\s*(?:et|and)\s*2014/i.test(part) ? (
      <span key={i} style={{
        background: "linear-gradient(90deg, #2875DF 0%, #2875DF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #ED4248 66.66%, #ED4248 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold"
      }}>{part}</span>
    ) : part
  )}
</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2015')}</span><br />
<span className="description">{t('trophy_2015_team')}</span><br />
<span className="description">{t('trophy_high_level')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2016_2017')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2016_2017_junior')}</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>{t('trophy_2017_junior')}</span><br />
<span className="description">{t('trophy_2017_top10')}</span><br />
<span className="description">
  {t('trophy_france').split(/(2017,\s*2019,\s*2020,\s*2021,\s*2022\s*(?:et|and)\s*2023)/gi).map((part, i) =>
    /2017,\s*2019,\s*2020,\s*2021,\s*2022\s*(?:et|and)\s*2023/i.test(part) ? (
      <span key={i} style={{
        background: "linear-gradient(90deg, #2875DF 0%, #2875DF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #ED4248 66.66%, #ED4248 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold"
      }}>{part}</span>
    ) : part
  )}
</span><br />
<span className="description">
  {t('trophy_ufolep').split(/(2019,\s*2021,\s*2022,\s*2023,\s*2024\s*(?:et|and)\s*2025)/gi).map((part, i) =>
    /2019,\s*2021,\s*2022,\s*2023,\s*2024\s*(?:et|and)\s*2025/i.test(part) ? (
      <span key={i} style={{
        background: "linear-gradient(90deg, #2875DF 0%, #2875DF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #ED4248 66.66%, #ED4248 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold"
      }}>{part}</span>
    ) : part
  )}
</span><br />
<span className="description">{t('trophy_2021_top8')}</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2021_team')}</span><br />
<span className="description">{t('trophy_2021_ranking')}</span><br />
<span className="description">{t('trophy_2022_ranking')}</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>{t('trophy_2022_team')}</span><br />
<span className="description">{t('trophy_2023_world')}</span><br />
<span className="description" style={{ color: "#C0C0C0", fontWeight: "bold" }}>{t('trophy_2023_team')}</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2023_europe')}</span><br />
<span className="description">{t('trophy_2023_ranking')}</span><br />
<span className="description">{t('trophy_2024_ranking')}</span><br />
<span className="description">{t('trophy_2025_ranking')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2025_world')}</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2025_team')}</span><br />
<span className="description" style={{ color: "#D4AF37", fontWeight: "bold" }}>{t('trophy_2026_world')}</span><br />
<span className="description" style={{ color: "#CD7F32", fontWeight: "bold" }}>{t('trophy_2026_europe')}</span><br />

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
