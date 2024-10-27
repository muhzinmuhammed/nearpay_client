
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserRegisterPage from './Pages/Register/UserRegister';
import UserLoginPage from './Pages/Login/UserLogin'
import HomePage from './Pages/Home/HomePage';
import PrivateRoute from './components/private/Index';
function App() {
 

  return (
    <>
       <Provider store={store}>
     <Router>
<Routes>
<Route path="/register" element={<UserRegisterPage />} />
<Route path="/login" element={<UserLoginPage />} />
<Route element={<PrivateRoute />}>
      <Route path="/" element={<HomePage />} />
           
            
          </Route>

  </Routes>
  </Router>
  </Provider>
    </>
  )
}

export default App
