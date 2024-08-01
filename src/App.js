import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import First from './pages/First';
import Second from './pages/Second';
import Third from './component/Third';
import ReducerHook from './pages/ReducerHook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route exact path='/' element={ <First /> } />
        <Route exact path='/second' element={ <Second /> } />
        <Route exact path='/third' element={ <Third /> } />
        <Route exact path='/red_hook' element={ <ReducerHook /> } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
