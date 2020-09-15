import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'// нужен для перехода по роутам 
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'//1:54:00 применяем hook авторизации
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, ready} = useAuth() //получам параметры и методы с сервера для авторизации и хотим эти значения 
  // через contex передавать в нужные модули 1:54:37  создаем /context/Auth.Context.js
  //1:56:50
  
  const isAuthenticated = !!token //получаем значение флага основываясь на значении токина (а не на его объявлении как null), поэтому 2 отрицания
  const routes = useRoutes(isAuthenticated)//передаем меняющееся в зависимости от авторизации пользователя значение значение

  if (!ready) { //если авторизация не прошла просим залогинеться для чего создаем компонент Loader.js 02:36:14
    return <Loader />
  }

  return (
    <AuthContext.Provider value={
      { token, login, logout, userId, isAuthenticated} }>
      <Router> {/* добавляем из {BrowserRouter as Router}для корректной работы <Swiz>  */}
        { isAuthenticated && <Navbar /> }{/* подключаем дополнительно наш навбар (/component/NavBar.js) если авторизировались  */}
        <div className="container">
          {routes}  {/*jsx из routes.js зависит от isAuthenticated*/}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
