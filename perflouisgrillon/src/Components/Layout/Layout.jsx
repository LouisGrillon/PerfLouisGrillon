import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie'
import i18next from 'i18next'

import './Layout.css'
import buble from '../../Assets/bubulle.png';


const fr =  [   {
    code: 'fr',
    country_name: 'FR',
  //   country_code: 'fr',
  }]
const eng = 
[
    {
      code: 'en',
      country_name: 'EN',
    //   country_code: 'gb',
    }
  ]

function Layout() {
    const { t } = useTranslation()
    const currentLanguageCode = cookies.get('i18next') || 'fr'
    // const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

    const [showLinks, setShowLinks]= useState(false)
    const handleShowlinks = () =>{
        setShowLinks(!showLinks)
    }


    const [isChecked, setIsChecked] = useState(false)
    const handleChecked= () => setIsChecked(!isChecked)

    return (
        <>
            <nav className={`navbar ${showLinks ? "show_nav" : "" } `}>
                
            <div className="switch_Wrap">
                <label className="switch_Btn" >{eng.map(({code,country_name}) =>(
                <>
                    <input key={code} type="checkbox" onClick={() => i18next.changeLanguage(code)} onChange={handleChecked} checked={isChecked} disabled={isChecked} />
                    <span className="checkbox_slider" />
                </>

            ))
                }
            </label>

            <label className="second_switch_Btn">{fr.map(({code,country_name}) =>(
                <> 
                    <input key={code} type="checkbox" onClick={() => i18next.changeLanguage(code)} onChange={handleChecked} checked={!isChecked} disabled={!isChecked} />
                    <span className="checkbox_slider" />
                </>

            )) 
                } 
            </label>
            </div>

                

                <ul className="link_list">
                    <li className="navbar_item slideDown_1" id="navbar_item" alt="home" >
                        <Link className="navbar_link" to="/">{t('home')}</Link>
                    </li>

                    <li className="navbar_item slideDown_2" id="navbar_item" alt="about" >
                        <Link className="navbar_link" to="/about">{t('about')}</Link>
                    </li>

                    <li className="navbar_item slideDown_3" id="navbar_item" alt="stages" >
                        <Link className="navbar_link" to='/stages'>{t('internship')}</Link>
                    </li>
                    
                    <li className="navbar_item slideDown_4" id="navbar_item" alt="gallery" >
                        <Link className="navbar_link" to="/gallery">{t('gallery')}</Link>
                    </li>

                    <li className="navbar_item slideDown_5" id="navbar_item" alt="partners" >
                        <Link className="navbar_link" to="partners">{t('partners')}</Link>
                    </li>
                </ul>
                <button className="navbar_burger" onClick={handleShowlinks}>
                    <span className="burger_line"></span>
                </button>
            </nav>

            <Link className="contact_Link" to="/contact" alt="contact" >
                <img src={buble} alt="contact" className="contact_Buble" />
            </Link>

           
        </>
    )
}

export default Layout