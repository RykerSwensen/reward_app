import React from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup';
import Account from './components/Account';
import { BrowserRouter, Switch, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DropDown from './components/AccordionRender';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
function App() {


  return (
    <div>
      <Header />
      <h1 className='text-center text-3xl font-bold'>
        Welcome to the Reward App
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/student' element={<DropDown />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/about' element={<About />} />
          <Route path='/addedit' element={<AddEdit />} />
          <Route path='/view' element={<View />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;