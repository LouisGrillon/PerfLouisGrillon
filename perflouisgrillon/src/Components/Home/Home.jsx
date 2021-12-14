import { Link, Outlet } from 'react-router-dom'
import './Home.css'
import Footer from '../Footer/Footer'
import logowhite from '../../Assets/lgplogo.png'
import Layout from '../Layout/Layout'

export default function Home() {

        return (
            <>
                <div className="home" id="home" >
                    <div className="logo_Desktop" >
                        <Link to="/welcome" >
                            <img src={logowhite} alt="logo" className="logo" id="logo_white" />
                        </Link>
                    </div>
                </div> 
                <Layout/>  
                <footer>
                    <Footer/>
                </footer>
                {/* <Outlet/> */}
            </>
        )
    
}