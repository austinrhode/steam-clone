import './css/App.css';
import './css/index.css'
import './css/Collection.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import Home from './pages/Home';
import Users from './pages/Users';
import Search from './pages/Search';


function App() {
  // localStorage.clear();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<Home />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
