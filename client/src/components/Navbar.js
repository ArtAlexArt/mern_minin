//2:00
import React, {useContext} from 'react'
//при формировании NavBar мы не пользуемся ссылками <a href>, по этому подключаем NavLink
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault() // отменяем дефолтную обработку ссылки, т.е. делаем так что бы не обрабатывалась
    auth.logout()//выходим из системы
    // Для выполнения навигации используем  useHistory объект и переходим в корень 02:03:05
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}> {/* blue darken-1 изменили цвет по умолчанию 02:04:38*/}
        <span className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          {/* обычная ссылка для выхода 2:01:20*/}
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li> 
          
        </ul>
      </div>
    </nav>
  )
}
