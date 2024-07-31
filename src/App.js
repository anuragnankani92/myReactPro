import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import First from './pages/First';
import Second from './pages/Second';
import Third from './component/Third';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route exact path='/' element={ <First /> } />
        <Route exact path='/second' element={ <Second /> } />
        <Route exact path='/third' element={ <Third /> } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
