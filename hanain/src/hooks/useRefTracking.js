import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * URL의 ?ref=slug 파라미터를 감지해서
 * localStorage에 30일간 저장하고
 * click_logs 테이블에 기록
 */
export function useRefTracking() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (!ref) return

    // localStorage에 저장 (30일)
    const expires = Date.now() + 30 * 24 * 60 * 60 * 1000
    localStorage.setItem('ref_partner', ref)
    localStorage.setItem('ref_partner_expires', expires.toString())

    // click_logs에 기록
    const referrer = document.referrer || 'direct'
    supabase.from('click_logs').insert({
      partner_slug: ref,
      referrer: referrer.slice(0, 200),
    }).then(() => {})

  }, [searchParams])
}

/**
 * 저장된 ref 가져오기 (만료 체크)
 */
export function getStoredRef() {
  const ref     = localStorage.getItem('ref_partner')
  const expires = localStorage.getItem('ref_partner_expires')
  if (!ref || !expires) return null
  if (Date.now() > parseInt(expires)) {
    localStorage.removeItem('ref_partner')
    localStorage.removeItem('ref_partner_expires')
    return null
  }
  return ref
}
