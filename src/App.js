import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import thunk from "redux-thunk";

import reducer from "./store/reducer";
import CustomerList from "./components/CustomerList";
import Editor from "./components/Editor";
import "./styles/App.css";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  console.log("app loaded ");

  return (
    <Provider store={store}>
      <div>
        <Router>
          <header className="header">
            <nav>
              <ul className="navList">
                <li>
                  <Link className="navLink" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className="contentContainer">
            <Switch>
              <Route path="/Editor/:id">
                <Editor />
              </Route>
              <Route path="/Editor">
                <Editor />
              </Route>
              <Route path="/">
                <CustomerList />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
