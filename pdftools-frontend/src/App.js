import Home from './components/home/home';
import GetStarted from './components/get-started/get-started';
import Header from './components/header/header';
import Myfiles from './components/myfiles/myfiles'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/get-started">
            <GetStarted />
          </Route>
          <Route exact path="/my-files">
            <Myfiles />
          </Route>
        </Switch>
      </Router>
    </>
  );
}



export default App;
