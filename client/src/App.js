import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Country from './pages/Country';
import AllCountries from './pages/AllCountries';
import CountryDetails from './pages/CountryDetails';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<AllCountries />} />
    <Route path="/country/:id" element={<CountryDetails />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
