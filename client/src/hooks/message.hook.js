import {useCallback} from 'react'
// Для вывода ошибок в виде всплывающего окна будем использовать  метод из M из Materialize и создадим свой hook
// Так же оборачиваем для исключения рекурсии в React
export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) {
     //M.toast выводть всплывающее сообщение об ошибке
      window.M.toast({ html: text })
    }
  }, [])
}
