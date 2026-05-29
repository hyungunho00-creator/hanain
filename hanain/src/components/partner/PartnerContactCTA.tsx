import { usePartner } from '../../context/PartnerContext'
import { trackPartnerEvent } from '../../lib/partner/partnerAnalytics'

function sanitizePhone(value) {
  return String(value || '').replace(/[^0-9+]/g, '')
}

export async function downloadPartnerVCard(partner) {
  const name = partner?.displayName || partner?.name || '파트너'
  const org = partner?.organization || 'Phlorotannin Partners Archive'
  const phone = sanitizePhone(partner?.phone || partner?.phoneDisplay || '')
  const slug = partner?.partnerSlug || partner?.slug || partner?.id || 'demo'
  const url = `https://phlorotannin.com/p/${slug}`

  let blob = null
  try {
    const response = await fetch(`/api/vcard/${slug}`)
    if (response.ok) {
      blob = await response.blob()
    }
  } catch {
    // ignore and fallback
  }

  if (!blob) {
    const body = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `ORG:${org}`,
      phone ? `TEL;TYPE=CELL:${phone}` : '',
      `URL:${url}`,
      'NOTE:Phlorotannin Partners Archive',
      'END:VCARD',
    ].filter(Boolean).join('\r\n')
    blob = new Blob([body], { type: 'text/vcard;charset=utf-8' })
  }

  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = `${name}.vcf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(blobUrl)

  trackPartnerEvent('partner_vcard_download', {
    partnerSlug: slug,
    contentType: 'partner_card',
  })
}

export default function PartnerContactCTA() {
  const partner = usePartner()
  const partnerSlug = partner?.partnerSlug || partner?.slug || partner?.id || null

  const trackContact = (channel) => {
    trackPartnerEvent('partner_contact_click', {
      partnerSlug,
      contentType: channel,
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-600 mb-3">이 자료를 공유한 파트너</p>
      <p className="text-base font-semibold text-gray-900">{partner?.displayName || partner?.name || '플로로탄닌 파트너스'}</p>
      {partner?.region ? <p className="text-sm text-gray-500">{partner.region}</p> : null}
      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
        {partner?.phone ? <a href={`tel:${partner.phone}`} onClick={() => trackContact('phone')} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-center">전화</a> : null}
        {partner?.sms ? <a href={`sms:${partner.sms}`} onClick={() => trackContact('sms')} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-center">문자</a> : null}
        {partner?.kakaoUrl ? <a href={partner.kakaoUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('kakao')} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-center">카카오</a> : null}
        <button onClick={() => downloadPartnerVCard(partner)} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-center">명함 저장</button>
      </div>
    </div>
  )
}
