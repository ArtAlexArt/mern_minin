
// 02:33:40 
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'// для загрузки данных по id что мы получаем в строке запроса
import {useHttp} from '../hooks/http.hook'// для выполнения запроса
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null) // на вход нужна ссылка которую получаем с BackEnd
  const linkId = useParams().id// это номер нашей ссылки по которому мы будем делать запрос

  const getLink = useCallback(async () => {// метод для загрузки ссылки
    try {
      //  `/api/link/${linkId}` используем обратные кавычки для добавления динамических данных `${переменная}`
      // на сервере это точка входа в link.routes.js router.get('/:id',/...)

      const fetched = await request(`/api/link/${linkId}`, 'GET', null/*Body не нужен*/, {
        Authorization: `Bearer ${token}`//токен берем из useContex и для того что бы его добавить в зависимости
      })
      // на выходе уже получим локально сформированную ссылку в fetched
      setLink(fetched)
    } catch (e) {}
  }, [token, linkId, request])//наши зависимости  в массиве Deps useCallBack

  // когда нам нужно делать этот запрос , тогда когда готов компонент и по зависимости мы можем это стартануть
  // в useEffect если разместить getLink сразу в useEffectто можно не использовать usrCallBack 
  useEffect(() => {
    getLink()
  }, [getLink])

  //проверяем флаг загрузки, если он в стадии загрузки мы переходим на компонент Loader,те нам нужно какоето время на получение данных с сервера
  if (loading) {
    return <Loader />
  }

  return (
    <>    {/*такая запись обозначает возврат фрагмента  */}
    {/* 02:42:00 */}
      { !loading && link && <LinkCard link={link} /> } {/* если не в состоянии загрузки, если есть ссылка, то тогда отображаем компонент LinkCard c передачей параметра link */}
    </>
  )
}
