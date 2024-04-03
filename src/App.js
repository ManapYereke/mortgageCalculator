import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './Calculator/Calculator';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Calculator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
