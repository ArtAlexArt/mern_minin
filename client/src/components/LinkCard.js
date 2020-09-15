// 02:42:25 вся лог=гика для этой страницы у нас в DetailPage, а тут мы будем только рисовать
import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Ссылка</h2>
{/* target="_blank" открытие ссылки в новом tabbare */}
{/* Для корректной работы React со ссылками обязательно добавить rel="noopener noreferrer" 02:44:44*/}
      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p> {/* link.Click -это данные из базы на backend */}
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>{/* link.date-приводим к норм формату */}
    </>
  )
}
