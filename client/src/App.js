import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Country from './pages/Country';
import AllCountries from './pages/AllCountries';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/country' element={<Country/>}/>
      <Route path='/countries' element={<AllCountries/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
