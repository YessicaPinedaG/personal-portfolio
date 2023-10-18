import logo from './logo.svg';
import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar.js";
import { Banner } from './components/Banner';
import { Skills } from './components/Skill';
import { Projects } from "./components/Projects";


function App() {
  return (
    <div className="App">
      <NavBar />      
      <Banner />
      <Skills />
      <Projects />
      
    </div>
  );
}

export default App;