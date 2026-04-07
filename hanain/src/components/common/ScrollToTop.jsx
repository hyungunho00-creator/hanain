import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// 페이지(경로/쿼리)가 바뀔 때마다 렌더 완료 후 맨 위로 스크롤
export default function ScrollToTop() {
  const { pathname, search } = useLocation()
  const key = pathname + search
  const prevKey = useRef(key)

  useEffect(() => {
    // 경로 또는 쿼리가 바뀐 경우에만 실행
    if (prevKey.current !== key) {
      prevKey.current = key

      // 렌더링 완료 후 두 번의 프레임을 기다려 확실히 최상단으로 이동
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        })
      })
    }
  }, [key])

  return null
}
