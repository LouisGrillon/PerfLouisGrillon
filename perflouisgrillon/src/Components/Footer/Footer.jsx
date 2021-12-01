import './Footer.css'
import fb from '../../Assets/FB.png'
import insta from '../../Assets/glyphinsta.png'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        
        <footer className="footerContainer">
                <div className="anim">HELLO ! BIENVENUE ! HELLO ! BIENVENUE ! HELLO ! BIENVENUE ! HELLO ! BIENVENUE ! HELLO ! BIENVENUE ! </div>
            <div className="iconsContainer">
                <a href="https://www.facebook.com/GrillonLouis" className="fb"><img src={fb} alt="facebook" className="iconFb"  /></a>
                <a href="https://www.instagram.com/louisgrillon"><img src={insta} alt="instagram" className="iconInsta" /></a>
            </div>  
            <div className="footerBottom">
                <span className="bottomTxt"><Link to='/contact' className="footer_contact_link">Contact</Link></span>
                <span className="bottomTxt">&copy; Louis Grillon Performance. Tous droits réservés.</span>
                <span className="bottomTxt">Marcilly-en-Villette</span>
            </div> 
        </footer>
    )
}

export default Footer