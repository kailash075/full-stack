import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Sidebar from "./pages/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center"/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/AddEdit/:id' element={<AddEdit/>} />
          <Route path='/Sidebar' element={<Sidebar/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
