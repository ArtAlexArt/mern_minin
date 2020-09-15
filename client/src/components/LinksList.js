import React from 'react'
import {Link} from 'react-router-dom'//компонент позволяющий нам открывать ссылку в React

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">Ссылок пока нет</p>
  }
// возврат в виде таблицы 
  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Оригинальная</th>
        <th>Сокращенная</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
        {/* перебрать все ссылки и вывести в виде таблицы */}
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}