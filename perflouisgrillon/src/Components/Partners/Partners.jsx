import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import lasalle from '../../Assets/lasalle.jpg'
import ophycure from '../../Assets/ophycure.jpg'
import volodalen from'../../Assets/volodalen.jpg'
import './Partners.css'

function Partners() {
    return (
        <div>
            <div className="slider" id="slider">
                <figure>
                    <a href="https://www.trial-bikes.com/"><img  src={trialbikes} alt="trialbikes"  id="trialbikes"/></a>  
                    <a href="https://ophycure.com"><img src={ophycure} alt="ophycure" id="ophycure" /></a>
                    <a href="https://volodalen.com/"><img src={volodalen} alt="volodalen" id="volodalen" /></a>
                    <a href="https://lasalle-coaching.fr/"><img src={lasalle} alt="lasalle" id="lasalle"/></a>
                </figure>
            </div>
            <Layout/>
        <footer>
            <Footer/>
        </footer>
        </div>
    )
}

export default Partners