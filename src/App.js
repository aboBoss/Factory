import './App.css';
import {Home} from './Home';
import {Stock} from './Stock';
import {Employee} from './Employee';
import {Contractor} from './Contractor';
import { Order } from './Order';
import { Menu } from './Menu';
import Login from './Login';
import Regster from './Register';
import {Navigation} from './Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       ניהול מפעל ברזל
     </h3>
     
     <Switch>
     <Route path='/' exact>
        <Login/>
        </Route>
       <Route path='/register' excat >
        <Regster/>
        </Route> 

        <Route path='/home' excat >
        <Navigation/>
        <Home/>
        </Route> 

        <Route path='/stock' excat>
        <Navigation/>
        <Stock/>
        </Route> 
        <Route path='/employee' excat >
        <Navigation/>
        <Employee/>
        </Route> 
        <Route path='/contractor' excat>
        <Navigation/>
        <Contractor/>
        </Route> 
        <Route path='/menu' excat>
        <Navigation/>
        <Menu/>
        </Route> 
        <Route path='/orders' excat>
        <Navigation/>
        <Order/>
        </Route> 
       {/* <Route path='/home' component={Home}/>
       <Route path='/stock' component={Stock}/>
       <Route path='/employee' component={Employee}/>
       <Route path='/contractor' component={Contractor}/>
       <Route path='/menu' component={Menu}/>
       <Route path='/orders' component={Order}/> */}
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
