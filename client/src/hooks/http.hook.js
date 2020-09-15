// позволяет работать с сервером и экспортирует сущности работы с сервером, это функции для выполнения запроса через fetch в формате hook,
//  state loading , ошибкиесли они есть 
import {useState, useCallback} from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false) //статус загрузки управляется нами
  const [error, setError] = useState(null)//ошибок нет

  // для того что бы при вызове ассинхронной функции не было рекурсии в React, нужно оборачивать такие функции в useCallback
  //useCallback - принимает два прараметра 1 асинхронная функция 2 набор зависимостей []
  //body = null пердается как строка, и для корректной передачи {email password} они должны быть преобразованы из объектов в строку
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {//обработка результатов
      //body !== null то пердается как строка, и для корректной передачи {email password} они должны быть преобразованы из объектов в строку
      if (body) {
        body = JSON.stringify(body) // 1:35:22
        // при работе с JSON по сети мы должны явно этоуказать, иначе работать не будет
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})//это браузерный метод с url и набор опций{}
      const data = await response.json()//распарси ответ

      if (!response.ok) {// если есть ошибка
        throw new Error(data.message || 'Что-то пошло не так') // data.message - это параметр из Backend если не задан то сообщение
      }

      setLoading(false)// закончили загрузку

      return data //возврат данных с сервера
    } catch (e) {
      setLoading(false) //запрос отработал с ошибкой, но окончен
      setError(e.message)// устанавливаем/выводим ошибку
      throw e // для обработки этого в компонентах выбрасываем эту ошибку
    }
  }, [])

  // для чистки ошибок нужно тоже оборачивать в  useCallback если передавать в списке зависимых параметров в useEffect потом
  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
