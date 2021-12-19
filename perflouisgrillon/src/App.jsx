
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home'
import Welcome from './Components/Home/Welcome'
import Contact from './Components/Contact/Contact'
import Stages from './Components/Stages/Stages'
import About from './Components/About/About'
import Partners from './Components/Partners/Partners'
import Gallery from './Components/Gallery/Gallery'
import Video from './Components/Gallery/Video'
import PrivateRoute from './Components/Private/PrivateRoute';
// import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Admin from './Components/Admin/Admin'

function App() {

  return (
  <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/welcome" element={<Welcome />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/stages" element={<Stages />}/>
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />}/>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/video" element={<Video />} />
          <Route path="/login" element={<Login />}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/admin" element={<Admin/>} />
          </Route>
        </Routes>
      </div>
  </BrowserRouter> 
  );
}

export default App;

  {/* <Route path="/signup" element={<Signup />}/> */}