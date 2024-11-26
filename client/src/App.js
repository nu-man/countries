import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Country from './pages/Country';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/country' element={<Country/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
