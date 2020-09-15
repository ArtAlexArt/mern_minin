// 2:25:18
import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext) // 02:31:00 нужно передавать на сервер для авторизации
  const {request} = useHttp()
  const [link, setLink] = useState('')

  //для активности поля ввода нужно обновить базовые импуты -  аналогично делаем как в authPage.js 02:30:01
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        //  делаем запрос на сервер отсылая  в качествданных from: link в ответ вернется data
        // но нам нужно передать headers в которые добавить данные об авторизации наш токен
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        // редирект на детальную страницу по этой ссылке
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input // взяли готовый из AuthPage
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)} //меняем локальный state вызывая инлайн функцию
            onKeyPress={pressHandler}// при нажатии Enter  мы будем формировать ссылку
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}
