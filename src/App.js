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
          <Route path = "/" exact component = {Login} />
          <Route path = "/login" component = {Login} />
          <Route path = "/*" component = {NavbarComp} />
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
