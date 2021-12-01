
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import PrivateRoute from './Components/Private/PrivateRoute';
import Home from './Components/Home/Home'
import Welcome from './Components/Home/Welcome'
import Contact from './Components/Contact/Contact'
import Login from './Components/Login/Login'
import Stages from './Components/Stages/Stages'
import About from './Components/About/About'
import Partners from './Components/Partners/Partners'
import Gallery from './Components/Gallery/Gallery'
import Video from './Components/Gallery/Video'
import Admin from './Components/Admin/Admin'
// import Signup from './Components/Signup/Signup'



function App() {

  return (
  <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/welcome" component={Welcome}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/login" component={Login}/>
          <Route path="/stages" component={Stages}/>
          <Route path="/about" component={About} />
          <Route path="/partners" component={Partners}/>
          <Route path="/gallery" component={Gallery} />
          <Route path="/video" component={Video} />
          <PrivateRoute path="/admin" component={Admin}/>
          {/* <Route path="/signup" component={Signup}/> */}
        </Switch>
      </div>
  </BrowserRouter> 
  );
}

export default App;

