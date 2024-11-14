import './css/App.css';
import './css/index.css'
import './css/Collection.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import Home from './pages/Home';
import Users from './pages/Users';
import Search from './pages/Search';
import Collection from './pages/Collection';


function App() {
  return (
    <BrowserRouter basename='process.env.PUBLIC_URL'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path ='/' element={<Home />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/collection/:collectionId' element={<Collection />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
