import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Login from './components/subpages/Login';
import NavbarComp from './components/NavbarComp';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/login" component = {Login}></Route>
          <Route path = "/*" component = {NavbarComp}></Route>
        </Switch>
      </Router>
        
    </div>
  );
}

export default App;
