import Summary from "./screens/Summary";
import Home from "./screens/home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Router>
          <Routes>
             <Route exact path="/"element={<Home/>}/>
             <Route exact path="/summary/:id"element={<Summary/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
