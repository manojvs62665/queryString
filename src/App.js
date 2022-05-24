import './App.css';
import {Router, Switch, Route, Routes, withRouter} from "react-router-dom";
import Home from "./queryString/home";
import QueryString from "./queryString/queryString";
import QueryStringTwo from "./queryString/queryString2";
import QueryStringThree from "./queryString/queryString3";
import QueryStringFour from "./queryString/queryString4";
import QueryStringFive from "./queryString/queryString5";

function App() {

  return (
    <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/query-string" component={QueryString} />
          <Route exact path="/query-string-two" component={QueryStringTwo} />
          <Route exact path="/query-string-three" component={QueryStringThree} />
          <Route exact path="/query-string-four" component={QueryStringFour} />
          <Route exact path="/query-string-five" component={QueryStringFive} />
        </Switch>
    </div>
  );
}

export default withRouter(App);
