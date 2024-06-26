import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <div className="block h-[2000px] bg-slate-800">

      </div>
    </div>
  );
}

export default App;
