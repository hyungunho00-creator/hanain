import { useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import { usePartner } from '../context/PartnerContext'
import { QRCodeCanvas } from 'qrcode.react'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
import { Download, Lock, Eye, EyeOff, Loader, Image, FolderLock } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import jsPDF from 'jspdf'
import { drawHandbookPages } from './handbook_renderer'

/* ════════════════════════════════════════════════
   JSX 컴포넌트를 화면 밖에 실측(794×1123)으로 렌더
   → html2canvas로 캡처 → 캔버스 반환
════════════════════════════════════════════════ */
async function renderJSXToCanvas(jsxElement, scale = 2) {
  // 화면 밖 컨테이너 생성
  const wrapper = document.createElement('div')
  wrapper.style.position = 'fixed'
  wrapper.style.top = '0'
  wrapper.style.left = '-99999px'
  wrapper.style.width = '794px'
  wrapper.style.height = '1123px'
  wrapper.style.background = '#ffffff'
  wrapper.style.zIndex = '-1'
  document.body.appendChild(wrapper)

  const root = createRoot(wrapper)
  root.render(jsxElement)

  // React 렌더 완료 + 폰트/이미지 로드 대기
  await new Promise(r => setTimeout(r, 120))
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready } catch {}
  }
  // 내부 이미지(QR 등)가 모두 로드될 때까지 대기
  const imgs = wrapper.querySelectorAll('img')
  await Promise.all(Array.from(imgs).map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve()
    return new Promise(res => {
      img.onload = res
      img.onerror = res
      setTimeout(res, 1500)
    })
  }))
  await new Promise(r => setTimeout(r, 60))

  // 첫 자식이 실제 페이지 div
  const target = wrapper.firstElementChild
  const canvas = await html2canvas(target, {
    scale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    width: 794,
    height: 1123,
    windowWidth: 794,
    windowHeight: 1123,
    logging: false,
    imageTimeout: 3000,
  })

  // 정리
  root.unmount()
  document.body.removeChild(wrapper)
  return canvas
}

const SESSION_KEY = 'phlorotannin_inforoom_auth'
const CORRECT_PW  = '123456789'

/* ════════════════════════════════════════════════
   비밀번호 잠금 화면
════════════════════════════════════════════════ */
function LockScreen({ onUnlock }) {
  const [pw, setPw]       = useState('')
  const [show, setShow]   = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef          = useRef(null)
  const navigate          = useNavigate()

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 150) }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (pw === CORRECT_PW) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onUnlock()
    } else {
      setError('비밀번호가 올바르지 않습니다')
      setShake(true)
      setPw('')
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', paddingTop: 64,
      background: `linear-gradient(160deg, ${NAVY} 0%, #1a3a6a 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 20px',
    }}>
      <div style={{
        width: '100%', maxWidth: 380,
        background: '#fff', borderRadius: 24,
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        animation: shake ? 'shake 0.5s ease' : 'none',
      }}>
        {/* 헤더 */}
        <div style={{
          background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`,
          borderBottom: `4px solid ${GOLD}`,
          padding: '36px 32px 28px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%',
            background: 'rgba(184,149,58,0.15)',
            border: `2px solid ${GOLD}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <FolderLock size={32} color={GOLD} />
          </div>
          <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 8px' }}>
            🔒 파트너 전용 자료실
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.75 }}>
            파트너 전용 공간입니다.<br />
            담당자에게 별도 공유된<br />
            비밀번호를 입력해주세요.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px' }}>
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <input
              ref={inputRef}
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setError('') }}
              placeholder="비밀번호 입력"
              style={{
                width: '100%', padding: '14px 48px 14px 16px',
                borderRadius: 12,
                border: `2px solid ${error ? '#ef4444' : '#e0e8f0'}`,
                fontSize: 16, outline: 'none', boxSizing: 'border-box',
                letterSpacing: pw && !show ? '4px' : '0',
                fontFamily: 'inherit', transition: 'border-color 0.2s',
              }}
            />
            <button type="button" onClick={() => setShow(v => !v)}
              style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#999',
              }}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 12px', fontWeight: 700 }}>
              ⚠️ {error}
            </p>
          )}

          <button type="submit" style={{
            width: '100%', padding: '15px',
            borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #0A7E8C, #0D5F6A)',
            color: '#fff', fontSize: 16, fontWeight: 900,
            cursor: 'pointer', marginTop: error ? 0 : 14,
            boxShadow: '0 4px 16px rgba(10,126,140,0.4)',
          }}>
            입장하기
          </button>

          <button type="button" onClick={() => navigate(-1)} style={{
            width: '100%', padding: '12px',
            borderRadius: 12, border: '1.5px solid #e0e8f0',
            background: '#fff', color: '#888',
            fontSize: 14, fontWeight: 700,
            cursor: 'pointer', marginTop: 10,
          }}>
            돌아가기
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-7px)}
          80%{transform:translateX(7px)}
        }
      `}</style>
    </div>
  )
}

const NAVY  = '#0D1B3E'
const GOLD  = '#B8953A'
const GOLD2 = '#D4AF5A'

/* ─── 전단지 카탈로그 ─── */

/* 성기능 전용 2종 */
const MATERIALS_SEXUAL = [
  { id:'sexual_male',   icon:'💪', badge:'남성활력',  badgeColor:'#1D4ED8', title:'남성 활력·성기능 전단지',   subtitle:'테스토스테론·혈관·전립선이 걱정되는 남성께', desc:'eNOS 혈관 확장·테스토스테론 보호·전립선 염증 차단·혈류 개선으로 남성 활력의 근원 기전을 정리했습니다.', pages:'A4 2장', category:'sexual_male',   color:'#1D4ED8' },
  { id:'sexual_female', icon:'🌸', badge:'여성활력',  badgeColor:'#BE185D', title:'여성 활력·갱년기 전단지',   subtitle:'갱년기·호르몬 변화·성기능 저하가 걱정되는 여성께', desc:'에스트로겐 보호·혈관 탄성 회복·골반 혈류 개선·만성 염증 차단으로 여성 활력 회복 기전을 정리했습니다.', pages:'A4 2장', category:'sexual_female', color:'#BE185D' },
]

/* 암 전용 3종 */
const MATERIALS_CANCER = [
  { id:'cancer_all',     icon:'🎗️', badge:'모든암통합', badgeColor:'#7C2D12', title:'모든 암 통합 전단지 — 암은 하나의 몸에서 온다', subtitle:'암 종류 무관, 모든 암에 공통 적용되는 핵심 원리', desc:'어떤 암이든 뿌리는 하나 — 산화·염증·면역저하·혈관신생. 플로로탄닌이 이 4가지를 동시에 차단하는 원리를 정리했습니다.', pages:'A4 2장', category:'cancer_all',     color:'#7C2D12' },
  { id:'cancer_combo_1', icon:'🔰', badge:'암예방',     badgeColor:'#059669', title:'암 예방·세포 보호 전단지',    subtitle:'암 가족력·예방이 최우선인 분께 드리세요',  desc:'활성산소 차단·Nrf2 세포방어·NK세포 강화·암세포 선택 제거 4중 기전으로 암 예방 원리를 정리했습니다.',  pages:'A4 2장', category:'cancer_combo_1', color:'#059669' },
  { id:'cancer_combo_2', icon:'💊', badge:'항암보조',   badgeColor:'#0F766E', title:'항암 치료 중·후 면역 보조 전단지', subtitle:'항암 치료 중이거나 치료 후 회복 중인 분께', desc:'Nrf2 정상세포 보호·NK세포 유지·아포토시스 보조·항산화로 치료 중 면역을 지키는 기전을 정리했습니다.', pages:'A4 2장', category:'cancer_combo_2', color:'#0F766E' },
]

/* 회복 전용 2종 */
const MATERIALS_RECOVERY = [
  { id:'recovery_1', icon:'🔄', badge:'전신회복',  badgeColor:'#1D4ED8', title:'전신 회복 전단지 — 몸은 하나의 시스템',  subtitle:'여러 성분 써도 낫지 않는 분, 전신 회복이 목표인 분께', desc:'혈당→혈관→뇌→면역→장→피부 6개 시스템 연결 동시 회복. 부분 치료가 아닌 전체 시스템 회복 원리.', pages:'A4 2장', category:'recovery_1', color:'#1D4ED8' },
  { id:'recovery_2', icon:'🌱', badge:'노화역행',  badgeColor:'#7C3AED', title:'노화 역행·세포 재생 전단지',              subtitle:'세포부터 젊어지고 싶은 분, 안티에이징이 목표인 분께',  desc:'Nrf2 미토콘드리아 복원·자가포식 지원·Inflammaging 차단으로 세포 스스로 회복하는 능력을 되살립니다.',  pages:'A4 2장', category:'recovery_2', color:'#7C3AED' },
]

/* 제품 안내 전단지 */
const MATERIALS_PRODUCT = [
  { id:'product_flyer', icon:'📦', badge:'제품안내', badgeColor:'#008299', title:'플로로탄닌 특강 + 제품 3종 안내 전단지', subtitle:'딜-리버-런스K · 만나스웰 드롭 · 세조아', desc:'앞면: 플로로탄닌 강의 핵심 요약 (5대 기전·분자구조·회복의 정의) / 뒷면: 딜-리버-런스K·만나스웰 드롭·세조아 3종 제품 상세 정보.', pages:'A4 2장', category:'product_flyer', color:'#008299' },
]

/* 통합 전단지 5종 */
const MATERIALS_COMBO = [
  { id:'combo_all',    icon:'🌟', badge:'통합ALL',  badgeColor:'#0A7E8C', title:'전체 통합 전단지',          subtitle:'처음 만나는 모든 분께 드리는 핵심 자료', desc:'혈당·혈관·뇌·면역·피부·장 6대 시스템을 한 번에 잡는 플로로탄닌 다중 기전 총정리.',              pages:'A4 2장', category:'combo_all',    color:'#0A7E8C' },
  { id:'combo_meta',   icon:'⚖️', badge:'대사',     badgeColor:'#DC2626', title:'혈당·심혈관 통합 전단지',   subtitle:'대사증후군·혈당+혈압이 동시에 걱정되는 분께', desc:'혈당·혈압·콜레스테롤·혈관 내피를 동시에 잡는 대사증후군 통합 기전을 정리했습니다.',           pages:'A4 2장', category:'combo_meta',   color:'#DC2626' },
  { id:'combo_neuro',  icon:'🧬', badge:'뇌·염증',  badgeColor:'#7C3AED', title:'뇌·염증 통합 전단지',       subtitle:'만성 염증과 치매·수면이 동시에 걱정되는 분께', desc:'전신 염증 이중 차단 + 뇌 보호 + 수면 개선을 동시에 해결하는 통합 기전을 정리했습니다.',       pages:'A4 2장', category:'combo_neuro',  color:'#7C3AED' },
  { id:'combo_immune', icon:'🔰', badge:'면역·장',  badgeColor:'#10B981', title:'면역·장건강 통합 전단지',   subtitle:'면역력 저하와 소화·장 건강이 동시에 걱정되는 분께', desc:'장내 유익균 3.2배 + 장벽 강화 + NK세포 활성으로 장-면역 축 전체를 회복합니다.',            pages:'A4 2장', category:'combo_immune', color:'#10B981' },
  { id:'combo_beauty', icon:'💫', badge:'뷰티',     badgeColor:'#EC4899', title:'피부·종합 통합 전단지',     subtitle:'피부샵·에스테틱·뷰티 고객께 드리세요',   desc:'MMP 억제·티로시나제 억제·5α-환원효소 억제로 주름·기미·탈모를 동시에 케어합니다.',             pages:'A4 2장', category:'combo_beauty', color:'#EC4899' },
]

/* 질환별 기본 8종 */
const MATERIALS_SINGLE = [
  { id:'basic',          icon:'🌊', badge:'BASIC',  badgeColor:'#0A7E8C', title:'플로로탄닌 기초 전단지',       subtitle:'처음 만나는 분께 드리는 입문 자료',     desc:'플로로탄닌 5대 핵심 기전, 기존 성분과의 차이, 몸 전체 시스템 회복 원리를 담았습니다.',          pages:'A4 2장', category:'basic',          color:'#0A7E8C' },
  { id:'basic_2',        icon:'🌊', badge:'BASIC②', badgeColor:'#0A7E8C', title:'플로로탄닌 기초 전단지 ②',    subtitle:'35억 년 진화 스토리 — 성분을 따지는 분께', desc:'35억 년 바다의 진화, Nrf2 세포 방어, 해조류 성분 비교를 통해 플로로탄닌의 본질을 정리했습니다.', pages:'A4 2장', category:'basic_2',        color:'#0A7E8C' },
  { id:'diabetes',       icon:'🩸', badge:'혈당①',  badgeColor:'#DC2626', title:'혈당·당뇨 케어 전단지 ①',     subtitle:'혈당 걱정되는 분께 드리세요',           desc:'α-글루코시다제 억제, 인슐린 저항성 개선, 식후 혈당 조절 3중 기전과 빠른 체감 효과를 정리했습니다.', pages:'A4 2장', category:'diabetes',       color:'#DC2626' },
  { id:'diabetes_2',     icon:'🩸', badge:'혈당②',  badgeColor:'#DC2626', title:'혈당·당뇨 케어 전단지 ②',     subtitle:'당뇨 합병증 예방이 걱정되는 분께',      desc:'AGEs 억제, 망막·신장·신경 합병증 예방 기전을 집중 정리. 혈당약 복용 중인 분께 드리세요.',       pages:'A4 2장', category:'diabetes_2',     color:'#DC2626' },
  { id:'brain',          icon:'🧠', badge:'뇌①',    badgeColor:'#7C3AED', title:'뇌 건강·수면 전단지 ①',       subtitle:'건망증·불면증 걱정되는 분께',           desc:'BACE1 억제, 베타아밀로이드 차단, GABA 수면 개선 기전과 관리 후 체감 변화 타임라인을 정리했습니다.',      pages:'A4 2장', category:'brain',          color:'#7C3AED' },
  { id:'brain_2',        icon:'🧠', badge:'뇌②',    badgeColor:'#7C3AED', title:'뇌 건강·수면 전단지 ②',       subtitle:'수면 개선과 치매 예방에 집중',          desc:'글림파틱 청소, GABA 자연 이완, 수면 중 독소 배출 극대화 기전을 수면 중심으로 정리했습니다.',       pages:'A4 2장', category:'brain_2',        color:'#7C3AED' },
  { id:'cardiovascular', icon:'❤️', badge:'심혈관①', badgeColor:'#E05050', title:'심혈관·혈압 전단지 ①',        subtitle:'혈압·콜레스테롤 걱정되는 분께',         desc:'ACE 억제, eNOS/NO 경로, LDL 산화 차단, 혈관 내피 보호 4중 기전을 임상 데이터와 정리했습니다.',      pages:'A4 2장', category:'cardiovascular', color:'#E05050' },
  { id:'cardiovascular_2',icon:'❤️',badge:'심혈관②', badgeColor:'#E05050', title:'심혈관·혈압 전단지 ②',       subtitle:'동맥경화·혈관 재생에 집중',             desc:'eNOS 62% 활성, LDL 산화 차단, ICAM-1 억제로 혈관 내부 플라크를 직접 막는 기전을 정리했습니다.',  pages:'A4 2장', category:'cardiovascular_2',color:'#E05050' },
  { id:'inflammation',   icon:'🔥', badge:'염증①',  badgeColor:'#F97316', title:'만성염증·관절 전단지 ①',      subtitle:'몸이 늘 아프고 피곤한 분께',           desc:'NF-κB·NLRP3 이중 차단, CRP 감소, 관절 연골 보호 기전과 빠른 통증 완화 효과를 정리했습니다.',       pages:'A4 2장', category:'inflammation',   color:'#F97316' },
  { id:'inflammation_2', icon:'🔥', badge:'염증②',  badgeColor:'#F97316', title:'만성염증·관절 전단지 ②',      subtitle:'류마티스·자가면역 질환에 집중',         desc:'NLRP3 인플라마솜 억제, 연골 구조 보호, 자가면역 선택적 차단 기전을 집중 정리했습니다.',            pages:'A4 2장', category:'inflammation_2', color:'#F97316' },
  { id:'skin',           icon:'✨', badge:'피부①',  badgeColor:'#EC4899', title:'피부·탈모 케어 전단지 ①',     subtitle:'피부샵·힐링센터 고객께 드리세요',       desc:'MMP-1 억제 주름 방지, 티로시나제 억제 미백, 5α-환원효소 억제 탈모 완화 3중 기전을 정리했습니다.',   pages:'A4 2장', category:'skin',           color:'#EC4899' },
  { id:'skin_2',         icon:'✨', badge:'피부②',  badgeColor:'#EC4899', title:'피부·탈모 케어 전단지 ②',     subtitle:'갱년기·호르몬 피부 노화에 집중',        desc:'DHT·MMP·멜라닌 호르몬성 3대 노화 경로 동시 차단. 폐경 전후 급격한 피부 변화에 드리세요.',           pages:'A4 2장', category:'skin_2',         color:'#EC4899' },
  { id:'cancer',         icon:'🛡️', badge:'면역①',  badgeColor:'#10B981', title:'면역·항산화 전단지 ①',        subtitle:'몸의 방어력을 높이고 싶은 분께',       desc:'NK세포 활성, Nrf2 경로, 암세포 선택적 아포토시스 유도, 10~15배 항산화 기전을 정리했습니다.',        pages:'A4 2장', category:'cancer',         color:'#10B981' },
  { id:'cancer_2',       icon:'🛡️', badge:'면역②',  badgeColor:'#10B981', title:'면역·항산화 전단지 ②',        subtitle:'항암 치료 중·후 면역 관리에 집중',      desc:'항암 치료 중 NK세포 유지, Nrf2 정상세포 보호, VEGF 억제 항암 보조 기전을 집중 정리했습니다.',       pages:'A4 2장', category:'cancer_2',       color:'#10B981' },
  { id:'gut',            icon:'🦠', badge:'장건강①', badgeColor:'#06B6D4', title:'장건강·마이크로바이옴 전단지 ①', subtitle:'소화·장 건강 걱정되는 분께',         desc:'Akkermansia 3.2배 증식, 장 누수 개선, LPS 억제로 장-전신 염증을 뿌리째 차단하는 기전을 정리했습니다.', pages:'A4 2장', category:'gut',            color:'#06B6D4' },
  { id:'gut_2',          icon:'🦠', badge:'장건강②', badgeColor:'#06B6D4', title:'장건강·마이크로바이옴 전단지 ②', subtitle:'장-뇌 축·우울·불안에 집중',          desc:'세로토닌 90%는 장에서. 장-뇌 축 염증 차단, GABA 이중 경로, 우울·불안 개선 기전을 정리했습니다.',   pages:'A4 2장', category:'gut_2',          color:'#06B6D4' },
]

const MATERIALS = [...MATERIALS_PRODUCT, ...MATERIALS_SEXUAL, ...MATERIALS_CANCER, ...MATERIALS_RECOVERY, ...MATERIALS_COMBO, ...MATERIALS_SINGLE]

/* ════════════════════════════════════════════════
   메인 페이지
════════════════════════════════════════════════ */
export default function InfoRoomPage() {
  const partner = usePartner()
  const [unlocked, setUnlocked]       = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )
  const [downloading, setDownloading] = useState(null)
  const [imaging, setImaging]         = useState(null)
  const [preview, setPreview]         = useState(null)
  const [handbookLoading, setHandbookLoading] = useState(false)

  // ── 페이지 진입 시 인앱브라우저 감지 → 즉시 크롬으로 이동
  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isInApp = /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NaverApp|DaumApp|Twitter|Snapchat/i.test(ua)
    if (!isInApp) return
    const url = window.location.href
    if (/Android/i.test(ua)) {
      window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`
    } else {
      // iOS: googlechrome(s):// scheme
      const chromeUrl = url.replace(/^https/, 'googlechromes').replace(/^http/, 'googlechrome')
      window.location.href = chromeUrl
      setTimeout(() => { window.open(url, '_blank') }, 500)
    }
  }, [])

  // 비번 미통과 시 잠금 화면
  if (!unlocked) return <LockScreen onUnlock={() => setUnlocked(true)} />

  const cardUrl     = `https://phlorotannin.com/p/${partner.phone}`
  const partnerName = partner.name || '플로로탄닌 파트너스'
  const partnerTel  = partner.phoneDisplay || partner.phone

  /* ── 인앱브라우저 감지 → 크롬으로 강제 이동 ── */
  function isInAppBrowser() {
    const ua = navigator.userAgent || ''
    return /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NaverApp|DaumApp|Twitter|Snapchat/i.test(ua)
  }
  function openInChrome() {
    const url = window.location.href
    // Android: intent scheme으로 크롬 강제 실행
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`
    } else {
      // iOS: googlechrome:// scheme 시도 → 실패 시 safari로 window.open
      const chromeUrl = url.replace(/^https/, 'googlechromes').replace(/^http/, 'googlechrome')
      window.location.href = chromeUrl
      // 0.5초 후에도 이동 안 됐으면 (크롬 미설치) 새창으로 열기
      setTimeout(() => { window.open(url, '_blank') }, 500)
    }
  }
  function guardInApp() {
    if (isInAppBrowser()) {
      openInChrome()
      return true  // 인앱 → 차단
    }
    return false   // 일반 브라우저 → 통과
  }

  /* ── QR dataURL 생성 헬퍼 ── */
  async function makeQrDataUrl() {
    return QRCode.toDataURL(cardUrl, {
      width: 300, margin: 1,
      color: { dark: NAVY, light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
  }

  /* ── 두 페이지를 Canvas 직접 드로잉으로 캡처 (안전 · QR 보장) ── */
  async function captureMaterialPages(mat /*, scale = 2 */) {
    // capturePages: drawPage1/drawPage2 (Canvas 2D) — html2canvas 없이 100% 안정
    return capturePages(mat, partnerName, partnerTel, cardUrl)
  }

  /* ── 📘 파트너 교본 (40p 핸드북) PDF 다운로드 ── */
  async function handleHandbookDownload() {
    if (guardInApp()) return
    setHandbookLoading(true)
    try {
      const canvases = await drawHandbookPages(2)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      canvases.forEach((c, i) => {
        if (i > 0) pdf.addPage()
        pdf.addImage(c.toDataURL('image/jpeg', 0.88), 'JPEG', 0, 0, 210, 297)
      })
      pdf.save(`플로로탄닌_파트너교본_${partnerName}.pdf`)
    } catch (e) {
      alert('교본 PDF 오류: ' + e.message)
    } finally {
      setHandbookLoading(false)
    }
  }

  /* ── PDF 다운로드 (인쇄용) ── */
  async function handleDownload(mat) {
    if (guardInApp()) return
    setDownloading(mat.id)
    try {
      const [c1, c2] = await captureMaterialPages(mat, 2)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      pdf.addImage(c1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      pdf.addPage()
      pdf.addImage(c2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      pdf.save(`플로로탄닌_${mat.title}_${partnerName}.pdf`)
    } catch (e) {
      alert('PDF 오류: ' + e.message)
    } finally {
      setDownloading(null)
    }
  }

  /* ── 이미지 다운로드 (공유용 PNG 2장) ── */
  async function handleImage(mat) {
    if (guardInApp()) return
    setImaging(mat.id)
    try {
      const [c1, c2] = await captureMaterialPages(mat, 2)

      const save = (canvas, name) => new Promise(resolve =>
        canvas.toBlob(blob => {
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = name
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          resolve()
        }, 'image/png', 0.95)
      )

      await save(c1, `플로로탄닌_${mat.title}_1페이지.png`)
      await new Promise(r => setTimeout(r, 300))
      await save(c2, `플로로탄닌_${mat.title}_2페이지.png`)
    } catch (e) {
      alert('이미지 오류: ' + e.message)
    } finally {
      setImaging(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64, background: '#F4F6F9', fontFamily: "'Noto Sans KR','Apple SD Gothic Neo',sans-serif" }}>
      <SEOHead
        title="파트너 정보방 | 플로로탄닌 파트너스"
        description="질병별 건강 전단지 PDF 다운로드 — 파트너 QR 자동 삽입"
        canonical="https://phlorotannin.com/inforoom"
      />

      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #1a3a6a 100%)`, borderBottom: `4px solid ${GOLD}`, padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <Lock size={14} color={GOLD} />
          <span style={{ fontSize: 11, color: GOLD, letterSpacing: '3px', fontWeight: 800 }}>PARTNER ONLY — 파트너 전용 자료실</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>📂 파트너 정보방</h1>
        <p style={{ fontSize: 15, color: '#b0c8e0', lineHeight: 1.9, maxWidth: 560, margin: '0 auto 16px' }}>
          <strong style={{ color: GOLD2 }}>📥 인쇄용 PDF</strong> — 파트너님 QR코드·연락처가 자동 삽입됩니다<br />
          <strong style={{ color: GOLD2 }}>📸 공유용 이미지</strong> — 전단지 2장(PNG)을 저장해 카카오톡으로 전송하세요
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '9px 22px', borderRadius: 99, background: 'rgba(184,149,58,0.18)', border: `1.5px solid rgba(184,149,58,0.5)` }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }} />
          <span style={{ fontSize: 15, color: GOLD2, fontWeight: 700 }}>{partnerName} · {partnerTel}</span>
        </div>
      </div>

      {/* 안내 배너 */}
      <div style={{ background: '#fff7e6', borderBottom: '2px solid #f0d080', padding: '12px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: '#7a5c00', fontWeight: 700, margin: 0 }}>
          💡 버튼을 누르면 잠시 생성 중… 표시 후 자동 다운로드됩니다 (약 5~10초 소요)
        </p>
      </div>

      {/* ═══ 📘 파트너 교본 (40p 핸드북) ═══ */}
      <div style={{ maxWidth: 800, margin: '32px auto 0', padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: `linear-gradient(180deg, ${GOLD}, ${NAVY})`, borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>📘 파트너 교본 (교육자료)</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>플로로탄닌 설명·응대·Q&A 40페이지 핸드북 (PDF)</p>
          </div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 14,
          border: `2px solid ${GOLD}`,
          padding: '20px 22px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 240px', minWidth: 240 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 6 }}>
              플로로탄닌 파트너 핸드북 · 40p
            </div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
              · 의료계 종사자·고관여 고객 응대 대본<br />
              · 자주 받는 Q&A · 표현 가이드 · 페르소나별 설명법<br />
              · 인쇄용 A4 PDF, 약 15~25초 소요
            </div>
          </div>
          <button
            type="button"
            onClick={handleHandbookDownload}
            disabled={handbookLoading}
            style={{
              padding: '14px 22px',
              borderRadius: 10,
              border: 'none',
              background: handbookLoading ? '#aaa' : `linear-gradient(135deg, ${NAVY}, #1a3a6a)`,
              color: '#fff',
              fontSize: 15,
              fontWeight: 800,
              cursor: handbookLoading ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              minWidth: 200,
              justifyContent: 'center',
            }}
          >
            {handbookLoading
              ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> 생성 중…</>
              : <><Download size={16} /> 📥 교본 PDF 다운로드</>}
          </button>
        </div>
      </div>

      {/* ═══ 제품 안내 전단지 섹션 ═══ */}
      <div style={{ maxWidth: 800, margin: '32px auto 0', padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: 'linear-gradient(180deg, #008299, #00829988)', borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>📦 제품 안내 전단지</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>딜-리버-런스K · 만나스웰 드롭 · 세조아 + 플로로탄닌 강의 핵심 요약</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MATERIALS_PRODUCT.map(mat => (
            <ProductFlyerCard key={mat.id} mat={mat} partnerName={partnerName} partnerTel={partnerTel} cardUrl={cardUrl} />
          ))}
        </div>
      </div>

      {/* ═══ 통합 전단지 섹션 ═══ */}
      <div style={{ maxWidth: 800, margin: '32px auto 0', padding: '0 14px' }}>
        {/* 섹션 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: `linear-gradient(180deg, ${GOLD}, ${GOLD}88)`, borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>🌟 통합 전단지 — 5종</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>여러 질환을 함께 케어하는 분, 처음 만나는 분, 뷰티·대사 동반 고객께 드리세요</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MATERIALS_COMBO.map(mat => (
            <MaterialCard
              key={mat.id}
              mat={mat}
              partnerName={partnerName}
              partnerTel={partnerTel}
              cardUrl={cardUrl}
              downloading={downloading}
              imaging={imaging}
              preview={preview}
              onDownload={() => handleDownload(mat)}
              onImage={() => handleImage(mat)}
              onTogglePreview={() => setPreview(p => p === mat.id ? null : mat.id)}
            />
          ))}
        </div>
      </div>

      {/* ═══ 암 전용 섹션 ═══ */}
      <div style={{ maxWidth: 800, margin: '32px auto 0', padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: 'linear-gradient(180deg, #059669, #0F766E)', borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>🎗️ 암 전용 전단지 — 2종</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>암 예방이 목표인 분 · 항암 치료 중이거나 치료 후 회복 중인 분께 드리세요</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MATERIALS_CANCER.map(mat => (
            <MaterialCard
              key={mat.id}
              mat={mat}
              partnerName={partnerName}
              partnerTel={partnerTel}
              cardUrl={cardUrl}
              downloading={downloading}
              imaging={imaging}
              preview={preview}
              onDownload={() => handleDownload(mat)}
              onImage={() => handleImage(mat)}
              onTogglePreview={() => setPreview(p => p === mat.id ? null : mat.id)}
            />
          ))}
        </div>
      </div>

      {/* ═══ 회복 전용 섹션 ═══ */}
      <div style={{ maxWidth: 800, margin: '32px auto 0', padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: 'linear-gradient(180deg, #1D4ED8, #7C3AED)', borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>🌱 회복 전용 전단지 — 2종</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>우리 몸은 하나다 · 결국 회복이다 — 전신 회복·노화 역행이 목표인 분께 드리세요</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MATERIALS_RECOVERY.map(mat => (
            <MaterialCard
              key={mat.id}
              mat={mat}
              partnerName={partnerName}
              partnerTel={partnerTel}
              cardUrl={cardUrl}
              downloading={downloading}
              imaging={imaging}
              preview={preview}
              onDownload={() => handleDownload(mat)}
              onImage={() => handleImage(mat)}
              onTogglePreview={() => setPreview(p => p === mat.id ? null : mat.id)}
            />
          ))}
        </div>
      </div>

      {/* ═══ 질환별 전단지 섹션 ═══ */}
      <div style={{ maxWidth: 800, margin: '36px auto 0', padding: '0 14px' }}>
        {/* 섹션 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: `linear-gradient(180deg, #1565C0, #1E88E5)`, borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>🔬 질환별 전단지 — 8종 × 각 2가지</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>각 질환에 특화된 전단지 · ①번과 ②번은 같은 질환의 다른 각도입니다</p>
          </div>
        </div>

        {/* 질환별 2개씩 그룹핑 */}
        {[
          { label: '🌊 기초·전체', color: '#0A7E8C', ids: ['basic', 'basic_2'] },
          { label: '🩸 혈당·당뇨', color: '#DC2626', ids: ['diabetes', 'diabetes_2'] },
          { label: '🧠 뇌·수면',   color: '#7C3AED', ids: ['brain', 'brain_2'] },
          { label: '❤️ 심혈관·혈압', color: '#E05050', ids: ['cardiovascular', 'cardiovascular_2'] },
          { label: '🔥 만성염증·관절', color: '#F97316', ids: ['inflammation', 'inflammation_2'] },
          { label: '✨ 피부·탈모', color: '#EC4899', ids: ['skin', 'skin_2'] },
          { label: '🛡️ 면역·항암', color: '#10B981', ids: ['cancer', 'cancer_2'] },
          { label: '🦠 장건강·마이크로바이옴', color: '#06B6D4', ids: ['gut', 'gut_2'] },
        ].map(group => {
          const mats = group.ids.map(id => MATERIALS_SINGLE.find(m => m.id === id)).filter(Boolean)
          return (
            <div key={group.label} style={{ marginBottom: 24 }}>
              {/* 그룹 레이블 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 18, background: group.color, borderRadius: 2 }} />
                <span style={{ fontSize: 15, fontWeight: 800, color: group.color }}>{group.label}</span>
                <span style={{ fontSize: 12, color: '#bbb', fontWeight: 600 }}>— 2종</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mats.map(mat => (
                  <MaterialCard
                    key={mat.id}
                    mat={mat}
                    partnerName={partnerName}
                    partnerTel={partnerTel}
                    cardUrl={cardUrl}
                    downloading={downloading}
                    imaging={imaging}
                    preview={preview}
                    onDownload={() => handleDownload(mat)}
                    onImage={() => handleImage(mat)}
                    onTogglePreview={() => setPreview(p => p === mat.id ? null : mat.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ═══ 성기능 전용 섹션 ═══ */}
      <div style={{ maxWidth: 800, margin: '32px auto 60px', padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 5, height: 28, background: 'linear-gradient(180deg, #1D4ED8, #BE185D)', borderRadius: 3 }} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: 0, lineHeight: 1.2 }}>💪 성기능·활력 전단지 — 2종</h2>
            <p style={{ fontSize: 13, color: '#888', margin: '3px 0 0' }}>남성 활력·전립선 / 여성 갱년기·호르몬 — 혈관·호르몬·염증을 근원부터 회복합니다</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MATERIALS_SEXUAL.map(mat => (
            <MaterialCard
              key={mat.id}
              mat={mat}
              partnerName={partnerName}
              partnerTel={partnerTel}
              cardUrl={cardUrl}
              downloading={downloading}
              imaging={imaging}
              preview={preview}
              onDownload={() => handleDownload(mat)}
              onImage={() => handleImage(mat)}
              onTogglePreview={() => setPreview(p => p === mat.id ? null : mat.id)}
            />
          ))}
        </div>
      </div>

      {/* 사용 안내 */}
      <div style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 14px' }}>
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e0e8f0', padding: '20px 24px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 14 }}>📌 사용 안내</h3>
          {[
            ['📥 인쇄용 PDF 다운받기', '버튼을 누르면 파트너님 QR코드가 삽입된 A4 전단지 PDF가 저장됩니다. 편의점·문구점에서 출력하세요.'],
            ['📸 공유용 이미지 다운받기', '버튼을 누르면 전단지 1페이지·2페이지 PNG 이미지 2장이 저장됩니다. 카카오톡·문자로 고객에게 바로 전송하세요.'],
            ['⏱ 생성 시간', '버튼 클릭 후 5~10초 소요됩니다. "생성 중…" 표시가 사라지면 완료입니다.'],
            ['⚠️ 주의', '이 자료는 교육 목적의 연구 정보입니다. 질병 치료·예방 효능을 보증하지 않습니다.'],
          ].map(([t, d]) => (
            <div key={t} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 2px' }}>{t}</p>
                <p style={{ fontSize: 14, color: '#555', margin: 0, lineHeight: 1.6 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   제품 전단지 카드 — 기존 MaterialCard와 완전 동일 구조
════════════════════════════════════════════════ */
function ProductFlyerCard({ mat, partnerName, partnerTel, cardUrl }) {
  const [downloading, setDownloading] = useState(false)
  const [imaging,     setImaging]     = useState(false)
  const [preview,     setPreview]     = useState(false)
  const [previewImgs, setPreviewImgs] = useState(null)   // { p1: dataURL, p2: dataURL }
  const [previewLoading, setPreviewLoading] = useState(false)
  const busy = downloading || imaging

  // ── QR dataURL + qrImg 생성 공용 헬퍼
  async function makeQr() {
    const qrDataUrl = await QRCode.toDataURL(cardUrl, {
      width: 300, margin: 1,
      color: { dark: NAVY, light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
    return loadImg(qrDataUrl)
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      const qrImg = await makeQr()
      const [c1, c2] = await Promise.all([
        drawProductPage1(2),
        drawProductPage2(partnerName, partnerTel, qrImg, 2),
      ])
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      pdf.addImage(c1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      pdf.addPage()
      pdf.addImage(c2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      pdf.save(`플로로탄닌_제품안내전단지_${partnerName}.pdf`)
    } catch (e) { alert('PDF 오류: ' + e.message) }
    finally { setDownloading(false) }
  }

  async function handleImage() {
    setImaging(true)
    try {
      const qrImg = await makeQr()
      const [c1, c2] = await Promise.all([
        drawProductPage1(2),
        drawProductPage2(partnerName, partnerTel, qrImg, 2),
      ])
      const save = (canvas, name) => new Promise(resolve =>
        canvas.toBlob(blob => {
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = name
          document.body.appendChild(a); a.click(); document.body.removeChild(a)
          resolve()
        }, 'image/png', 0.95)
      )
      await save(c1, `플로로탄닌_제품안내전단지_1페이지.png`)
      await new Promise(r => setTimeout(r, 300))
      await save(c2, `플로로탄닌_제품안내전단지_2페이지.png`)
    } catch (e) { alert('이미지 오류: ' + e.message) }
    finally { setImaging(false) }
  }

  // ── 미리보기 토글 — 열 때 Canvas로 직접 렌더링해서 img에 넣기
  async function handlePreview() {
    if (preview) {
      setPreview(false)
      return
    }
    setPreview(true)
    if (previewImgs) return   // 이미 생성된 경우 재사용
    setPreviewLoading(true)
    try {
      const qrImg = await makeQr()
      const [c1, c2] = await Promise.all([
        drawProductPage1(1),   // 미리보기용 scale=1 (속도 우선)
        drawProductPage2(partnerName, partnerTel, qrImg, 1),
      ])
      setPreviewImgs({
        p1: c1.toDataURL('image/png'),
        p2: c2.toDataURL('image/png'),
      })
    } catch (e) { console.error(e) }
    finally { setPreviewLoading(false) }
  }

  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(13,27,62,0.09)', border: `2px solid ${mat.color}30`, overflow: 'hidden' }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${mat.color}, ${mat.color}88)` }} />

      {/* 카드 헤더 */}
      <div style={{ padding: '20px 22px 16px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ width: 58, height: 58, borderRadius: 16, flexShrink: 0, background: `${mat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `2px solid ${mat.color}30` }}>
          {mat.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 900, padding: '2px 10px', borderRadius: 99, background: mat.badgeColor, color: '#fff', letterSpacing: '1px' }}>{mat.badge}</span>
            <span style={{ fontSize: 19, fontWeight: 900, color: NAVY }}>{mat.title}</span>
          </div>
          <p style={{ fontSize: 15, color: mat.color, fontWeight: 700, margin: '0 0 5px' }}>{mat.subtitle}</p>
          <p style={{ fontSize: 14, color: '#555', margin: '0 0 5px', lineHeight: 1.6 }}>{mat.desc}</p>
          <p style={{ fontSize: 12, color: '#999', margin: 0 }}>{mat.pages} · 파트너 QR 자동 삽입</p>
        </div>
      </div>

      {/* 버튼 영역 — 모바일 좁은 화면에서도 줄바꿈 시 깔끔히 정렬되도록 grid 사용 */}
      <div style={{ borderTop: `1.5px solid ${mat.color}20`, padding: '14px 16px', background: '#fafbfc', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {/* 1행: 미리보기(닫기) — 전체 폭 */}
        <button
          onClick={handlePreview}
          style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '10px 16px', borderRadius: 10, border: '2px solid #d0d8e8', background: '#fff', color: NAVY, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          {preview ? <EyeOff size={16} /> : <Eye size={16} />}
          {preview ? '닫기' : '미리보기'}
        </button>
        {/* 2행: 인쇄용 PDF + 공유용 이미지 — 각각 절반 폭으로 한 줄 정렬 */}
        <button
          onClick={handleDownload}
          disabled={busy}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 8px', borderRadius: 10, border: 'none', background: downloading ? '#999' : `linear-gradient(135deg, ${mat.color}, ${mat.color}cc)`, color: '#fff', fontSize: 13, fontWeight: 800, cursor: busy ? 'not-allowed' : 'pointer', boxShadow: downloading ? 'none' : `0 3px 14px ${mat.color}50`, whiteSpace: 'nowrap' }}
        >
          {downloading ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> 생성 중…</> : <><Download size={16} /> 인쇄용 PDF</>}
        </button>
        <button
          onClick={handleImage}
          disabled={busy}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 8px', borderRadius: 10, border: 'none', background: imaging ? '#999' : 'linear-gradient(135deg, #1565C0, #1E88E5)', color: '#fff', fontSize: 13, fontWeight: 800, cursor: busy ? 'not-allowed' : 'pointer', boxShadow: imaging ? 'none' : '0 3px 14px rgba(21,101,192,0.45)', whiteSpace: 'nowrap' }}
        >
          {imaging ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> 생성 중…</> : <><Image size={16} /> 공유용 이미지</>}
        </button>
      </div>

      {/* 미리보기 패널 — Canvas toDataURL → img 태그 (반응형 폭) */}
      {preview && (
        <div style={{ borderTop: '1.5px solid #eee', background: '#f0f2f5', padding: '16px 14px' }}>
          <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 12 }}>
            ※ 미리보기 — 실제 파일과 동일한 Canvas 렌더링입니다
          </p>
          {previewLoading && (
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: 13, padding: '20px 0' }}>
              <Loader size={16} style={{ animation: 'spin 1s linear infinite', verticalAlign: 'middle', marginRight: 6 }} />
              미리보기 생성 중…
            </p>
          )}
          {previewImgs && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <img
                src={previewImgs.p1}
                alt="1페이지 미리보기"
                style={{ width: '100%', maxWidth: 420, height: 'auto', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'block' }}
              />
              <img
                src={previewImgs.p2}
                alt="2페이지 미리보기"
                style={{ width: '100%', maxWidth: 420, height: 'auto', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'block' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════
   자료 카드
════════════════════════════════════════════════ */
function MaterialCard({ mat, partnerName, partnerTel, cardUrl, downloading, imaging, preview, onDownload, onImage, onTogglePreview }) {
  const isDown      = downloading === mat.id
  const isImaging   = imaging     === mat.id
  const isPreviewing = preview    === mat.id
  const busy        = isDown || isImaging
  const [previewQr, setPreviewQr] = useState(null)

  // 미리보기 열 때 QR dataURL 생성 — 다운로드와 동일한 <img> 방식 사용
  useEffect(() => {
    if (isPreviewing && !previewQr) {
      QRCode.toDataURL(cardUrl, {
        width: 300, margin: 1,
        color: { dark: NAVY, light: '#ffffff' },
        errorCorrectionLevel: 'M',
      }).then(setPreviewQr).catch(() => {})
    }
  }, [isPreviewing, cardUrl, previewQr])

  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(13,27,62,0.09)', border: `2px solid ${mat.color}30`, overflow: 'hidden' }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${mat.color}, ${mat.color}88)` }} />

      {/* 카드 헤더 */}
      <div style={{ padding: '20px 22px 16px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ width: 58, height: 58, borderRadius: 16, flexShrink: 0, background: `${mat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `2px solid ${mat.color}30` }}>
          {mat.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 900, padding: '2px 10px', borderRadius: 99, background: mat.badgeColor, color: '#fff', letterSpacing: '1px' }}>{mat.badge}</span>
            <span style={{ fontSize: 19, fontWeight: 900, color: NAVY }}>{mat.title}</span>
          </div>
          <p style={{ fontSize: 15, color: mat.color, fontWeight: 700, margin: '0 0 5px' }}>{mat.subtitle}</p>
          <p style={{ fontSize: 14, color: '#555', margin: '0 0 5px', lineHeight: 1.6 }}>{mat.desc}</p>
          <p style={{ fontSize: 12, color: '#999', margin: 0 }}>{mat.pages} · 파트너 QR 자동 삽입</p>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div style={{ borderTop: `1.5px solid ${mat.color}20`, padding: '14px 22px', background: '#fafbfc', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>

        {/* 미리보기 */}
        <button
          onClick={onTogglePreview}
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 16px', borderRadius: 10, border: '2px solid #d0d8e8', background: '#fff', color: NAVY, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          {isPreviewing ? <EyeOff size={16} /> : <Eye size={16} />}
          {isPreviewing ? '닫기' : '미리보기'}
        </button>

        {/* 📥 인쇄용 PDF */}
        <button
          onClick={onDownload}
          disabled={busy}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '11px 22px', borderRadius: 10, border: 'none',
            background: isDown ? '#999' : `linear-gradient(135deg, ${mat.color}, ${mat.color}cc)`,
            color: '#fff', fontSize: 14, fontWeight: 800,
            cursor: busy ? 'not-allowed' : 'pointer',
            boxShadow: isDown ? 'none' : `0 3px 14px ${mat.color}50`,
            minWidth: 170, justifyContent: 'center',
          }}
        >
          {isDown
            ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> 생성 중…</>
            : <><Download size={16} /> 📥 인쇄용 PDF</>}
        </button>

        {/* 📸 공유용 이미지 */}
        <button
          onClick={onImage}
          disabled={busy}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '11px 22px', borderRadius: 10, border: 'none',
            background: isImaging ? '#999' : 'linear-gradient(135deg, #1565C0, #1E88E5)',
            color: '#fff', fontSize: 14, fontWeight: 800,
            cursor: busy ? 'not-allowed' : 'pointer',
            boxShadow: isImaging ? 'none' : '0 3px 14px rgba(21,101,192,0.45)',
            minWidth: 190, justifyContent: 'center',
          }}
        >
          {isImaging
            ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> 생성 중…</>
            : <><Image size={16} /> 📸 공유용 이미지</>}
        </button>
      </div>

      {/* 미리보기 패널 */}
      {isPreviewing && (
        <div style={{ borderTop: '1.5px solid #eee', background: '#f0f2f5', padding: '16px 14px' }}>
          <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 12 }}>
            ※ 미리보기 — 실제 파일에는 파트너님 QR코드·연락처가 삽입됩니다
          </p>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ transform: 'scale(0.38)', transformOrigin: 'top left', width: 794, pointerEvents: 'none' }}>
              <PdfPage1 mat={mat} id="preview" />
              <div style={{ height: 12 }} />
              <PdfPage2 mat={mat} name={partnerName} tel={partnerTel} url={cardUrl} qrDataUrl={previewQr} id="preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════
   콘텐츠 DB — 8종 카테고리
════════════════════════════════════════════════ */
function getContent(cat) {
  const DB = {

    /* ────── BASIC ────── */
    basic: {
      urgency: '지금 이 순간에도 몸속 세포가 산화되고 있습니다',
      headline: ['비타민·오메가3·유산균으로', '부족했던 이유가 있습니다', '몸은 하나의 시스템입니다'],
      accentLine: '바다가 35억 년 동안 진화시킨 복합 방어 물질 — 플로로탄닌',
      intro: '에클로니아 카바(Ecklonia cava) 갈조류가 극한의 자외선·산화·염분 환경에서 스스로를 지키기 위해 만든 복합 폴리페놀입니다. 혈당·혈관·뇌·면역·피부·장이 서로 연결된 하나의 시스템임을 이해할 때, 단일 성분이 아닌 다중 기전 물질이 왜 필요한지 알 수 있습니다.',
      timeline: [
        { week: '관리 1~2주', body: '항산화·항염증 효과 시작. 만성 피로·무거운 몸이 가벼워지는 느낌, 잠이 더 잘 옴.' },
        { week: '관리 3~4주', body: '혈당 안정, 식후 졸음 감소. 관절·피부 컨디션 개선, 소화가 편안해짐.' },
        { week: '관리 2~3개월', body: '혈압·콜레스테롤 수치 변화, 피부 탄력·윤기 회복, 기억력·집중력 향상 체감.' },
      ],
      points: [
        { icon: '⚡', color: '#0A9BAD', title: '항산화 — 비타민C보다 10~15배 강력', body: 'DPPH 라디칼 소거 IC₅₀ 0.06 mg/mL. 세포 DNA·지질·단백질 산화 손상을 전방위 차단. 노화의 근본 원인인 산화스트레스를 뿌리부터 억제합니다.' },
        { icon: '🔥', color: '#E05050', title: '항염증 — NF-κB·NLRP3 이중 스위치 차단', body: 'TNF-α 68%, IL-6 54%, NO 72% 억제(Marine Drugs, 2021). 당뇨·심장병·치매·암을 연결하는 만성 염증의 두 핵심 경로를 동시에 끕니다.' },
        { icon: '⚖️', color: '#B8953A', title: '혈당 조절 — 당뇨약보다 10배 강한 효소 억제', body: 'α-글루코시다제 IC₅₀ 0.09 μM (아카보스 대비 10배). 식후 혈당 급등을 원천에서 차단하고 인슐린 신호 경로를 직접 활성화합니다.' },
        { icon: '🧠', color: '#8B5CF6', title: '뇌 보호 — 혈뇌장벽 통과, BACE1·Aβ 이중 차단', body: '알츠하이머 원인 단백질 생성 효소 BACE1 억제 + Aβ42 응집 62% 차단(Marine Drugs, 2021). 혈뇌장벽을 직접 통과하는 몇 안 되는 천연 성분.' },
        { icon: '🛡️', color: '#10B981', title: '세포 선택적 보호 — 정상세포 보호·이상세포 제거', body: 'Nrf2 경로로 정상 세포 방어막을 높이고, 암세포에서만 선택적으로 미토콘드리아 아포토시스를 유도(Antioxidants, 2023).' },
      ],
      refs: ['Kim MJ et al. Marine Drugs 2022', 'Wijesinghe et al. Marine Drugs 2021', 'Park SY et al. Antioxidants 2023'],
      systemMsg: '혈당 → 혈관 → 뇌 → 면역 → 장 → 피부, 몸의 모든 시스템이 연결되어 있습니다.\n플로로탄닌은 그 연결고리 전체를 동시에 지지합니다.',
      p2headline: '기존 건강 성분, 왜 한계가 있을까요?',
      compare: [
        { left: '비타민 → 단일 영양 보충, 항산화 약함', right: '플로로탄닌 → 10~15배 강력 항산화 + 다중 기전 동시 작용' },
        { left: '오메가-3 → 항염증 보조, 흡수율 불안정', right: '플로로탄닌 → NF-κB+NLRP3 이중 염증 경로 직접 차단' },
        { left: '유산균 → 장 위주, 전신 효과 제한', right: '플로로탄닌 → 장+혈관+뇌+면역+피부 전신 연결 회복' },
        { left: '콜라겐 → 흡수 불확실, 단순 보충', right: '플로로탄닌 → MMP 억제로 콜라겐 분해 자체 차단' },
      ],
      targets: ['늘 피곤하고 이유 모를 염증이 있는 분', '혈당·혈압·콜레스테롤이 걱정되는 분', '건망증이 심해지고 수면이 나빠진 분', '피부 노화·탈모가 시작된 분', '종합적인 몸 관리가 필요한 40~70대', '건강기능식품 사업을 시작하려는 분'],
      ctaMsg: '지금 바로 전화하시면\n체질·증상에 맞는 1:1 맞춤 상담을 드립니다',
    },

    /* ────── DIABETES ────── */
    diabetes: {
      urgency: '공복혈당 100 넘으면 이미 인슐린 저항성이 시작된 겁니다',
      headline: ['식후 졸음·갈증·손발 저림', '혈당이 보내는 경고 신호를', '더 이상 무시하면 안 됩니다'],
      accentLine: '전 세계 당뇨 전단계 성인 40% — 지금 시작해야 되돌릴 수 있습니다',
      intro: '혈당이 조금 높다고 방치하면 5~10년 후 실명·신부전·절단으로 이어집니다. 플로로탄닌은 혈당 조절의 세 가지 핵심 경로(효소 억제 → 인슐린 신호 → 간 포도당 생산)를 동시에 공략해 식후 혈당 스파이크부터 공복혈당까지 전방위 관리합니다.',
      timeline: [
        { week: '관리 1주', body: '식후 혈당 급등 완화 시작. 식후 졸음·피로감이 줄어듦. 탄수화물 당김이 약해지는 느낌.' },
        { week: '관리 2~3주', body: '공복혈당 안정화 시작. 식욕 조절이 쉬워지고 체중이 서서히 감소하기 시작.' },
        { week: '관리 1~2개월', body: 'HOMA-IR(인슐린 저항성) 개선 체감. 혈당 검사 수치 변화, 복부 둘레 감소 경험.' },
      ],
      points: [
        { icon: '🔑', color: '#DC2626', title: 'α-글루코시다제·아밀라아제 이중 억제 — 당뇨약보다 10배 강력', body: '탄수화물을 포도당으로 분해하는 두 효소를 동시에 억제. 당뇨 치료제 아카보스보다 α-글루코시다제 억제력 10배(IC₅₀ 0.09 μM, Marine Drugs 2022). 식사 후 혈당 스파이크를 원천에서 막습니다.' },
        { icon: '💪', color: '#F97316', title: '인슐린 저항성 개선 — IRS-1→PI3K→AKT 경로 직접 활성화', body: '인슐린 신호 전달 경로를 직접 켜서 세포가 포도당을 제대로 흡수하도록 합니다. 8주 투여 후 HOMA-IR 32% 개선(Marine Drugs 2022). 근육·간세포의 인슐린 감수성을 회복시킵니다.' },
        { icon: '🏭', color: '#B8953A', title: '간 포도당신생합성 억제 — 공복혈당을 낮추다', body: '밤새 간이 포도당을 새로 만드는 PEPCK·G6Pase 효소 발현을 억제합니다. 공복혈당 평균 9.2 mg/dL 감소(Nutrients 메타분석 2023). 아침 공복혈당 수치를 잡는 핵심 기전.' },
        { icon: '🌊', color: '#0A9BAD', title: '췌장 베타세포 보호 — 인슐린 생산 기관을 지키다', body: '인슐린을 만드는 췌장 베타세포는 산화 스트레스에 가장 취약한 세포입니다. 플로로탄닌의 강력한 항산화력이 베타세포 손상을 막아 인슐린 분비 능력을 보존합니다.' },
        { icon: '🦠', color: '#10B981', title: '장내 미생물 → 혈당 안정의 숨겨진 열쇠', body: 'Akkermansia muciniphila 3.2배 증식 → 장 점막 강화 → 혈중 LPS 35% 감소 → 대사성 염증 해소 → 인슐린 감수성 향상. 장-대사 축 전체를 회복하는 연쇄 효과(Nutrients 2024).' },
      ],
      refs: ['Kim MJ et al. Marine Drugs 2022', 'Jung HA et al. Nutrients 2023 메타분석', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '혈당 → 혈관 → 신장 → 눈 → 신경, 당뇨 합병증은 전신입니다.\n플로로탄닌은 혈당만이 아닌 염증·혈관·장까지 함께 잡습니다.',
      p2headline: '혈당 관리, 약만으로는 반쪽짜리입니다',
      compare: [
        { left: '식이조절만 → 효과 제한적, 지속 어려움', right: '플로로탄닌 → 효소 단계부터 흡수 원천 차단' },
        { left: '운동만 → 근육 인슐린 감수성만 개선', right: '플로로탄닌 → 간·근육·장 인슐린 신호 전체 개선' },
        { left: '당뇨약(아카보스) → 단일 효소만 억제', right: '플로로탄닌 → 2가지 효소 동시 억제, 자연 성분' },
        { left: '혈당 측정 → 사후 관리, 합병증 예방 안 됨', right: '플로로탄닌 → 원인 기전부터 사전 조절, 전신 보호' },
      ],
      targets: ['공복혈당 100 mg/dL 이상인 분', '식후 혈당 급등·졸음이 심한 분', '당뇨 전단계·경계성 당뇨 진단을 받은 분', '인슐린 주사·약 복용 중 보완이 필요한 분', '복부 비만·대사증후군이 있는 분', '혈당 없이 건강하게 살고 싶은 분'],
      ctaMsg: '지금 전화하시면\n혈당 타입별 1:1 맞춤 관리 가이드를 드립니다',
    },

    /* ────── BRAIN ────── */
    brain: {
      urgency: '뇌 세포는 한번 죽으면 되살아나지 않습니다 — 지금이 골든타임입니다',
      headline: ['어제 한 말을 오늘 또 하고', '밤마다 잠을 설친다면', '뇌가 보내는 마지막 경고입니다'],
      accentLine: '알츠하이머는 증상 20~30년 전부터 뇌 속에서 조용히 시작됩니다',
      intro: '잠을 자는 동안 뇌는 하루 쌓인 독성 단백질(베타아밀로이드)을 청소합니다. 수면이 나빠지면 이 청소가 실패하고, 독소가 쌓이면서 기억이 지워집니다. 플로로탄닌은 혈뇌장벽을 직접 통과해 뇌 내부에서 알츠하이머의 두 핵심 단계를 모두 차단하는 몇 안 되는 천연 성분입니다.',
      timeline: [
        { week: '관리 1~2주', body: '수면의 질 향상 시작. 잠들기 쉬워지고 새벽 각성이 줄어듦. 아침에 개운한 느낌.' },
        { week: '관리 3~4주', body: '낮 집중력·기억력 향상 체감. 멍함·brain fog가 줄어들고 머리가 맑아지는 경험.' },
        { week: '관리 2~3개월', body: '장기 기억력 개선 체감. 이름·단어 기억이 더 쉬워짐. 전반적인 인지 능력 회복.' },
      ],
      points: [
        { icon: '🔒', color: '#7C3AED', title: 'BACE1 억제 — 알츠하이머 독소 생산을 원천 차단', body: '베타아밀로이드를 만드는 효소 BACE1을 IC₅₀ 29.4 μM로 억제(Marine Drugs 2021). 독성 단백질 생성 자체를 막는 근원 차단. 알츠하이머 신약들이 모두 목표로 하는 바로 그 표적입니다.' },
        { icon: '🧹', color: '#0A9BAD', title: 'Aβ42 응집 62% 차단 — 뇌 속 독소 덩어리를 막다', body: '이미 생성된 베타아밀로이드가 뭉쳐 플라크(독소 덩어리)를 형성하는 과정을 62% 억제(Marine Drugs 2021). 생성 차단 + 응집 차단, 알츠하이머의 두 핵심 단계를 모두 막습니다.' },
        { icon: '😴', color: '#EC4899', title: 'GABA-A 수용체 활성 — 수면의 질을 자연스럽게 회복', body: 'GABA-A 수용체에 결합해 진정·이완 효과를 냅니다. 생쥐 수면 모델에서 NREM 수면 시간 유의미하게 연장(Marine Drugs 2021). 수면제 의존 없이 뇌가 스스로 청소하는 시간을 늘립니다.' },
        { icon: '💡', color: '#F97316', title: 'AChE 억제 — 기억·학습 신경전달물질을 보존', body: '아세틸콜린 분해 효소(AChE)를 억제해 기억·학습을 담당하는 신경전달물질 농도를 높입니다. 알츠하이머 치료제 도네페질과 완전히 동일한 기전. 인지력 유지의 핵심.' },
        { icon: '🛡️', color: '#10B981', title: '뇌 신경 염증 억제 — 미세아교세포 과활성 차단', body: '뇌 내 면역세포(미세아교세포)가 과활성화되어 신경을 파괴하는 것을 막습니다. 신경 독성 사이토카인 생성 차단, 치매 진행을 늦추는 신경 보호 효과(Phytotherapy Research 2019).' },
      ],
      refs: ['Ahn G et al. Marine Drugs 2021', 'Park S et al. Marine Drugs 2021 수면', 'Ahn G et al. Phytotherapy Research 2019'],
      systemMsg: '뇌 건강은 수면 → 염증 → 혈당 → 혈압과 모두 연결됩니다.\n플로로탄닌은 뇌를 포함한 전신 시스템을 동시에 회복합니다.',
      p2headline: '뇌 건강, 50대부터 지금 당장 시작해야 합니다',
      compare: [
        { left: '은행잎 → 혈류 개선만, Aβ 차단 없음', right: '플로로탄닌 → BACE1+Aβ 응집 이중 원천 차단' },
        { left: '오메가-3 → 항염증 보조, 혈뇌장벽 통과 약함', right: '플로로탄닌 → 혈뇌장벽 직접 통과, 뇌 내부 작용' },
        { left: '카페인 → 일시적 각성, 수면 방해', right: '플로로탄닌 → AChE 억제로 지속적 인지력 지원' },
        { left: '수면제 → 의존성·내성·뇌 청소 방해', right: '플로로탄닌 → GABA 자연 이완, 뇌 청소 시간 증가' },
      ],
      targets: ['건망증이 부쩍 심해진 40~70대', '잠들기 어렵고 새벽에 자주 깨는 분', '알츠하이머·치매 가족력이 있는 분', '집중력·기억력 저하가 걱정되는 분', '낮에 멍하고 머리가 안 도는 분', '뇌 건강을 미리 예방하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n수면·인지 타입별 1:1 관리 가이드를 드립니다',
    },

    /* ────── CARDIOVASCULAR ────── */
    cardiovascular: {
      urgency: '심근경색·뇌졸중은 예고 없이 옵니다 — 혈관은 지금부터 관리해야 합니다',
      headline: ['혈압이 높고 콜레스테롤이', '걱정된다면', '혈관 내부부터 바꿔야 합니다'],
      accentLine: '심혈관질환 한국인 사망 원인 2위 — 동맥은 30대부터 조용히 굳어갑니다',
      intro: '혈압약을 먹어도 혈관 내부 염증은 진행됩니다. 콜레스테롤 수치를 낮춰도 산화된 LDL이 혈관 벽에 쌓이면 막힙니다. 플로로탄닌은 혈압·콜레스테롤·혈관 내피·혈관 염증이라는 4가지 경로를 동시에 작용해 혈관을 안에서부터 회복시킵니다.',
      timeline: [
        { week: '관리 1~2주', body: '혈관 이완 효과 시작. 두통·어깨 뻐근함이 줄어들고 손발이 따뜻해지는 느낌.' },
        { week: '관리 3~4주', body: '혈압 수치 안정화 시작. 이완기 혈압(하) 먼저 안정. 두근거림·답답함 감소.' },
        { week: '관리 2~3개월', body: '총 콜레스테롤·LDL 수치 개선 체감. 혈액검사 수치 변화. 전반적 혈관 컨디션 회복.' },
      ],
      points: [
        { icon: '🩺', color: '#E05050', title: 'ACE 억제 — 혈압을 자연스럽게 낮추는 기전', body: '안지오텐신 전환효소(ACE)를 IC₅₀ 0.27 mg/mL로 억제(Marine Drugs 2020). 고혈압 치료제(ACE 억제제)와 완전히 동일한 기전. 혈관 수축을 완화해 혈압을 낮추고 심장 부담을 줄입니다.' },
        { icon: '✨', color: '#0A9BAD', title: 'eNOS/NO 경로 — 혈관 내피를 안에서부터 회복', body: '혈관을 이완시키는 산화질소(NO) 생성 효소 eNOS를 62% 활성화(Nutrients 2022). 혈관 내피세포를 보호하고 혈관 탄성을 회복. 단순 수치 조절이 아닌 혈관 자체를 되살립니다.' },
        { icon: '🔴', color: '#B8953A', title: 'LDL 산화 차단 — 동맥경화의 진짜 원인 제거', body: 'LDL 콜레스테롤 수치보다 LDL의 산화가 동맥경화의 진짜 원인. 플로로탄닌의 강력한 항산화력이 LDL 산화를 차단해 혈관 벽 죽상경화반 형성을 원천 억제합니다.' },
        { icon: '📊', color: '#F97316', title: 'HMG-CoA 환원효소 억제 — 콜레스테롤 합성 자체 억제', body: '간의 콜레스테롤 합성 효소(스타틴의 표적 HMG-CoA 환원효소)를 억제합니다. 총 콜레스테롤 24%·LDL 32% 감소(동물 모델, Nutrients 2019). 스타틴과 같은 기전, 자연 성분.' },
        { icon: '🛡️', color: '#10B981', title: '혈관 염증 억제 — ICAM-1·VCAM-1 접착분자 차단', body: '혈관 벽에 백혈구가 달라붙어 염증성 동맥경화를 만드는 과정을 차단. ICAM-1 46% 억제(Nutrients 2022). 혈관 내부 만성 염증을 근원에서 없앱니다.' },
      ],
      refs: ['Mohibbullah M et al. Marine Drugs 2020', 'Lee SH et al. Nutrients 2022', 'Kang MC et al. Nutrients 2019'],
      systemMsg: '혈관은 온몸과 연결됩니다. 심장·뇌·신장·눈·발끝까지.\n혈관이 살아야 전신이 삽니다.',
      p2headline: '혈압약·스타틴만으로는 혈관이 회복되지 않습니다',
      compare: [
        { left: '스타틴 → 콜레스테롤 수치만 낮춤', right: '플로로탄닌 → LDL 산화 차단 + 혈관 내피 회복까지' },
        { left: '혈압약 → 수치 조절만, 혈관 손상 진행', right: '플로로탄닌 → eNOS로 혈관 자체 탄성 회복' },
        { left: '오메가-3 → 중성지방만, LDL 산화 차단 약함', right: '플로로탄닌 → LDL 산화·ACE·염증·내피 동시 작용' },
        { left: '운동 → 혈류 개선, 혈관 내부 손상 회복 안 됨', right: '플로로탄닌 → 내피세포 분자 수준 복구' },
      ],
      targets: ['수축기 혈압 130 mmHg 이상인 분', 'LDL 콜레스테롤이 높다는 진단을 받은 분', '협심증·동맥경화 가족력이 있는 분', '혈압약·스타틴 복용 중 보완이 필요한 분', '뇌졸중·심근경색을 예방하고 싶은 분', '혈관 건강을 안에서부터 회복하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n혈압·콜레스테롤 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── INFLAMMATION ────── */
    inflammation: {
      urgency: '몸속 불이 꺼지지 않으면 당뇨·암·치매는 시간문제입니다',
      headline: ['아침에 일어나기가 힘들고', '몸이 늘 무겁고 아프다면', '만성 염증이 몸을 태우고 있는 겁니다'],
      accentLine: 'CRP 1 mg/L 이상 = 지금 이 순간 몸속에서 조용한 불이 타고 있는 것',
      intro: '만성 저등급 염증은 당뇨·심장병·암·치매를 하나로 연결하는 공통 뿌리입니다. 진통제는 증상만 덮을 뿐 불을 끄지 않습니다. 플로로탄닌은 염증 반응의 두 핵심 스위치(NF-κB와 NLRP3)를 동시에 차단해 몸속 만성 염증의 불을 원천에서 끕니다.',
      timeline: [
        { week: '관리 1주', body: '통증·붓기 완화 시작. 관절 아침 뻣뻣함 감소. 전신 무거움이 가벼워지는 느낌.' },
        { week: '관리 2~3주', body: '만성 피로 감소, 활동량 증가. 피부 트러블·붓기 완화. 소화 편안해짐.' },
        { week: '관리 1~2개월', body: 'CRP 수치 개선 체감. 관절 가동 범위 확대. 전반적 통증 빈도·강도 감소.' },
      ],
      points: [
        { icon: '🔥', color: '#E05050', title: 'NF-κB 완전 차단 — 염증의 마스터 스위치를 끄다', body: '염증 반응 전체를 지휘하는 NF-κB p65의 핵 이전을 완전히 차단합니다. TNF-α 68%, IL-6 54%, NO 72% 억제(Marine Drugs 2021). 진통소염제(NSAIDs) 수준의 억제력, 부작용 없는 천연 성분.' },
        { icon: '💥', color: '#F97316', title: 'NLRP3 인플라마솜 차단 — 통풍·관절염·장 염증 핵심', body: '통풍·NASH·2형 당뇨·알츠하이머의 공통 염증 경로 NLRP3를 억제합니다. IL-1β 74%, 카스파제-1 67% 감소(Marine Drugs 2023). 현재 전 세계가 신약 표적으로 연구하는 바로 그 경로.' },
        { icon: '🦴', color: '#0A9BAD', title: '관절 연골 보호 — MMP 억제로 분해 자체를 막다', body: '관절 연골을 분해하는 기질금속단백분해효소 MMP-3 45%·MMP-13 38% 억제(Marine Drugs 2023). 글루코사민이 보충하는 방식이 아닌, 분해 효소를 직접 막아 연골을 지킵니다.' },
        { icon: '📉', color: '#B8953A', title: 'CRP·혈중 사이토카인 감소 — 혈액 검사로 확인되는 항염증', body: '만성 염증 지표 CRP와 관련 사이토카인을 유의미하게 낮춥니다. 혈액 검사로 확인 가능한 실질적 항염증 효과. 세포·동물 모델에서 반복 재현됩니다.' },
        { icon: '🌊', color: '#10B981', title: 'COX-2·iNOS 억제 — 통증·붓기의 발생 경로 차단', body: '통증·발열·붓기를 유발하는 COX-2와 iNOS 발현을 억제합니다. 이부프로펜 계열 진통소염제와 동일한 기전이지만 위장 손상 없는 천연 성분.' },
      ],
      refs: ['Wijesinghe et al. Marine Drugs 2021', 'Kim JH et al. Marine Drugs 2023 NLRP3', 'Lee KW et al. Marine Drugs 2023 MMP'],
      systemMsg: '만성 염증 → 혈당 상승 → 혈관 손상 → 뇌 손상 → 암\n염증을 끄면 모든 만성질환의 진행 속도가 늦춰집니다.',
      p2headline: '진통제로 덮지 말고, 염증의 불을 뿌리에서 끄세요',
      compare: [
        { left: 'NSAIDs(이부프로펜) → COX-2만 억제, 위장 손상', right: '플로로탄닌 → NF-κB+NLRP3+COX-2 삼중, 자연 성분' },
        { left: '스테로이드 → 강력하지만 의존성·부작용', right: '플로로탄닌 → 장기 관리 가능, 독성 없음' },
        { left: '글루코사민 → 연골 보충만, 염증 차단 없음', right: '플로로탄닌 → MMP 억제로 분해 자체 차단' },
        { left: '오메가-3 → 염증 해소 보조, 원인 차단 약함', right: '플로로탄닌 → 염증 생성 경로 원천 이중 차단' },
      ],
      targets: ['관절이 자주 붓고 아침마다 뻣뻣한 분', 'CRP 수치가 높다는 결과를 받은 분', '류마티스·퇴행성 관절염이 있는 분', '원인 모를 만성 피로·통증이 반복되는 분', '진통제를 자주 먹는 중장년층', '염증을 약 없이 근원부터 관리하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n염증·관절 타입별 1:1 관리 가이드를 드립니다',
    },

    /* ────── SKIN ────── */
    skin: {
      urgency: '바르는 것만으로는 피부 노화를 막을 수 없습니다 — 기전이 필요합니다',
      headline: ['잡티가 생기고 피부가 처지고', '탈모가 시작됐다면', '콜라겐이 아니라 기전이 필요합니다'],
      accentLine: '피부 노화의 진짜 원인: MMP 효소가 콜라겐을 분해하는 것 — 막으면 됩니다',
      intro: '나이가 들면 자외선과 활성산소가 MMP(콜라게나제) 효소를 활성화해 콜라겐이 분해됩니다. 멜라닌이 축적되어 잡티·기미가 생기고, DHT가 모낭을 약화시켜 탈모가 옵니다. 플로로탄닌은 이 세 가지 피부 노화 경로를 분자 수준에서 동시에 차단합니다.',
      timeline: [
        { week: '관리 1~2주', body: '피부 수분·광택 개선 시작. 피부가 촉촉해지는 느낌. 민감성 피부 자극 감소.' },
        { week: '관리 3~4주', body: '피부 탄력 향상 체감. 잡티·기미 옅어지기 시작. 모발 굵기 증가·탈모 감소.' },
        { week: '관리 2~3개월', body: '주름 완화·피부 결 개선 뚜렷. 기미 면적 감소, 모발 성장 주기 회복 체감.' },
      ],
      points: [
        { icon: '💎', color: '#EC4899', title: 'MMP-1 콜라게나제 68% 억제 — 주름을 만드는 효소 차단', body: '자외선이 활성화시키는 콜라겐 분해 효소 MMP-1을 68% 억제(Marine Drugs 2012). 피부 콜라겐 구조를 유지해 탄력·볼륨·주름 방지. 콜라겐을 먹는 것보다 분해를 막는 것이 훨씬 효과적.' },
        { icon: '🌟', color: '#B8953A', title: '티로시나제 억제 — 코직산보다 3배 강한 천연 미백', body: '멜라닌 합성 효소 티로시나제를 IC₅₀ 0.19 mg/mL로 억제(Food Chem Toxicol 2010). 표준 미백 성분 코직산보다 3배 강력. 잡티·기미·색소침착 예방 및 완화.' },
        { icon: '☀️', color: '#0A9BAD', title: 'DNA 광손상 58% 차단 — 세포 내부에서 UV 방어', body: 'UVB 자외선에 의한 DNA 광손상(CPD 형성)을 58% 억제(Antioxidants 2024). 선크림이 외부를 막는다면, 플로로탄닌은 세포 내부에서 DNA 자체를 보호합니다.' },
        { icon: '💇', color: '#7C3AED', title: '5α-환원효소 억제 + KGF 증가 — 탈모 이중 케어', body: '탈모 원인 DHT를 만드는 5α-환원효소를 억제하고, 동시에 모유두 세포의 모발성장인자(KGF) 발현을 증가시킵니다(Marine Drugs 2020). 탈모를 막고 새 모발 성장을 촉진하는 이중 작용.' },
        { icon: '💧', color: '#10B981', title: '히알루로니다제 억제 — 피부 속 수분을 보존', body: '히알루론산을 분해하는 효소를 억제해 피부 속 수분을 유지합니다. 보습 크림의 외부 공급이 아닌 피부 자체의 수분 유지 능력을 높이는 기전입니다.' },
      ],
      refs: ['Kim MM et al. Marine Drugs 2012', 'Yoon NY et al. Food Chem Toxicol 2010', 'Cho ML et al. Antioxidants 2024', 'Ahn G et al. Marine Drugs 2020'],
      systemMsg: '피부 노화는 혈당·염증·산화스트레스와 모두 연결됩니다.\n플로로탄닌은 피부만이 아닌 몸 안에서부터 노화를 늦춥니다.',
      p2headline: '바르는 것으로는 이미 늦었습니다 — 기전으로 막으세요',
      compare: [
        { left: '콜라겐 섭취 → 흡수 불확실, 분해 계속 진행', right: '플로로탄닌 → MMP 억제로 분해 자체 원천 차단' },
        { left: '비타민C → 단독 항산화, 미백·주름 효과 제한', right: '플로로탄닌 → 미백+주름+UV+탈모 4중 동시 작용' },
        { left: '레티놀 → 피부 자극·발적·박피 가능', right: '플로로탄닌 → 자극 없는 천연 해양 성분' },
        { left: '코직산 → 미백만, 주름·탈모 효과 없음', right: '플로로탄닌 → 3배 강한 미백 + 주름 + 탈모 케어' },
      ],
      targets: ['잡티·기미·색소침착이 생기는 30~60대', '피부 탄력 저하·주름이 늘어나는 분', '탈모·모발 얇아짐이 걱정되는 분', '피부샵·에스테틱·힐링센터 고객', '자외선 노출이 많은 야외 활동 분', '피부와 모발을 동시에 케어하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n피부 타입별 1:1 맞춤 관리 플랜을 드립니다',
    },

    /* ────── CANCER/IMMUNE ────── */
    cancer: {
      urgency: '면역력이 떨어지면 몸은 이상 세포를 스스로 통제하지 못합니다',
      headline: ['감기가 달고 살고', '피곤이 가시지 않는다면', '면역 시스템이 무너지고 있는 겁니다'],
      accentLine: '암 발생의 30~35%는 식이·생활 습관으로 결정됩니다 — 지금부터가 예방입니다',
      intro: '면역 시스템은 하루에도 수천 개씩 생기는 이상 세포를 발견하고 제거합니다. 이 시스템이 약해지면 이상 세포가 살아남아 증식합니다. 플로로탄닌은 NK세포 활성화, Nrf2 항산화 방어막, 암세포 선택적 제거라는 3중 면역 방어 기전을 동시에 발휘합니다.',
      timeline: [
        { week: '관리 1~2주', body: '만성 피로 감소 시작. 감기·잔병치레 빈도 줄어듦. 전반적 컨디션 향상 체감.' },
        { week: '관리 3~4주', body: '활력 증가, 면역 회복 체감. 상처 회복 빨라짐. 소화·배변 정상화.' },
        { week: '관리 2~3개월', body: '전반적 면역 지표 개선. 반복 감염 빈도 감소. 항암 치료 중 면역 유지 경험.' },
      ],
      points: [
        { icon: '⚔️', color: '#10B981', title: '암세포 선택적 아포토시스 — 정상세포는 완전히 보호', body: '췌장암·유방암·대장암·간암 세포에서 미토콘드리아 경로 아포토시스(세포사멸)를 유도합니다. 정상 세포에는 독성이 전혀 없습니다(Antioxidants 2023). Bax/Bcl-2 비율 조절이 핵심 기전.' },
        { icon: '🛡️', color: '#0A9BAD', title: 'Nrf2 경로 활성화 — 세포 방어막 최대로 높이다', body: '세포의 마스터 항산화 스위치 Nrf2를 활성화해 해독 효소(HO-1, NQO1, GST)를 유도합니다. 세포 내 DNA 산화 손상을 원천 차단해 암화(癌化) 초기 단계를 억제합니다.' },
        { icon: '💪', color: '#7C3AED', title: 'NK세포 활성 향상 — 면역 감시 능력 강화', body: '자연살해세포(NK Cell)의 활성을 높여 비정상 세포를 발견·제거하는 면역 감시 능력을 강화합니다. 항암 치료 중 면역 기능 유지에 도움이 됩니다.' },
        { icon: '🔬', color: '#EC4899', title: 'VEGF 억제 — 종양 혈관신생 차단', body: '종양이 스스로 혈관을 만들어 영양을 공급받는 과정(혈관신생)을 억제합니다. VEGF 발현 감소로 종양 성장에 필요한 영양 공급 경로 자체를 차단합니다.' },
        { icon: '⚡', color: '#B8953A', title: 'DPPH IC₅₀ 0.06 mg/mL — 비타민C보다 10~15배 강한 항산화', body: '활성산소에 의한 DNA 손상 → 세포 돌연변이 → 암화 연쇄를 강력한 항산화력으로 차단합니다. 비타민C·E 대비 10~15배 강한 라디칼 소거 활성.' },
      ],
      refs: ['Park SY et al. Antioxidants 2023', 'Sugiura Y et al. Antioxidants 2020', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '면역은 장 → 혈액 → 림프 → 세포 전체가 연결된 시스템입니다.\n플로로탄닌은 면역의 전 경로를 동시에 강화합니다.',
      p2headline: '면역력, 종합 영양제만으로는 부족합니다',
      compare: [
        { left: '비타민C → 일반 항산화, NK세포 활성 없음', right: '플로로탄닌 → Nrf2 활성 + NK세포 + 10~15배 항산화' },
        { left: '버섯 추출물 → 면역 조절 보조', right: '플로로탄닌 → NK세포+아포토시스+VEGF 직접 작용' },
        { left: '셀레늄 → 항산화 보조, 단독 효과 제한', right: '플로로탄닌 → DNA 보호+혈관신생 억제+Nrf2 활성' },
        { left: '후코이단 → 면역 지지, 암세포 선택성 약함', right: '플로로탄닌 → 암세포 선택적, 정상세포 완전 보호' },
      ],
      targets: ['면역력 저하·잦은 감기가 걱정되는 분', '항암 치료 중 면역 관리가 필요한 분', '암 가족력이 있어 예방에 관심 있는 분', '활성산소·산화 스트레스 관리가 목표인 분', 'Nrf2 경로 세포 보호에 관심 있는 분', '전반적인 면역 시스템 강화가 필요한 분'],
      ctaMsg: '지금 전화하시면\n면역 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── GUT ────── */
    gut: {
      urgency: '장이 무너지면 혈당·면역·뇌·피부가 모두 무너집니다',
      headline: ['배가 자주 아프고 소화가 안 되고', '몸이 늘 무겁다면', '장 마이크로바이옴을 먼저 점검하세요'],
      accentLine: '장에는 38조 개의 세균이 삽니다 — 이 균형이 무너지면 전신이 흔들립니다',
      intro: '현대인의 과민성 장 증후군, 반복되는 소화불량, 이유 없는 복부 팽만. 이것은 단순히 소화 문제가 아닙니다. 장내 미생물 불균형은 혈당을 올리고, 혈관에 독소를 뿌리고, 뇌를 흐리게 하고, 피부를 망가뜨립니다. 플로로탄닌은 장-전신 연결 고리 전체를 회복합니다.',
      timeline: [
        { week: '관리 1주', body: '소화 편안해짐. 복부 팽만·가스 감소. 배변 규칙성 개선 시작.' },
        { week: '관리 2~3주', body: '복통·설사 빈도 감소. 전신 염증 감소로 피부 트러블 개선. 활력 증가.' },
        { week: '관리 1~2개월', body: '장내 미생물 다양성 회복 체감. 혈당 안정, 피부 개선, 면역력 향상 연쇄 경험.' },
      ],
      points: [
        { icon: '🦠', color: '#06B6D4', title: 'Akkermansia 3.2배·Lactobacillus 1.8배 증식', body: '장 점막 보호의 핵심 균 Akkermansia muciniphila를 3.2배, Lactobacillus를 1.8배 증가시킵니다(Nutrients 2024). 장내 미생물 다양성 회복으로 전신 대사·면역이 연쇄적으로 개선됩니다.' },
        { icon: '🧱', color: '#0A9BAD', title: '장 투과성 42% 감소 — 새는 장(Leaky Gut) 완전 차단', body: '타이트 정션 단백질(Occludin, Claudin) 발현을 높여 장 점막 장벽을 강화합니다. 장 투과성 42% 감소(Nutrients 2024). 독소·세균이 혈류로 새어 들어가는 것을 막습니다.' },
        { icon: '📉', color: '#10B981', title: '혈중 LPS 35% 감소 — 전신 만성 염증의 뿌리 차단', body: '장에서 혈류로 유입되는 세균 내독소(LPS)를 35% 낮춥니다. 대사성 내독소혈증이 해소되면 혈당·체중·혈압·뇌 기능이 연쇄적으로 개선됩니다.' },
        { icon: '🍃', color: '#B8953A', title: '프리바이오틱 효과 — 유익균의 먹이가 되다', body: '소화되지 않은 플로로탄닌이 대장에서 유익균의 발효 기질로 작용합니다. 단쇄지방산(부티레이트) 생성을 늘려 장 점막 에너지를 공급하고 장 세포를 회복시킵니다.' },
        { icon: '🔥', color: '#E05050', title: 'NLRP3·NF-κB 이중 차단 — 장 염증 뿌리부터 제거', body: '과민성 장 증후군·염증성 장질환의 핵심 경로 NLRP3와 NF-κB를 동시에 억제합니다. 장 점막 염증을 근원에서 가라앉혀 복통·팽만·설사를 완화합니다(Marine Drugs 2023).' },
      ],
      refs: ['Jung HA et al. Nutrients 2024', 'Kim JH et al. Marine Drugs 2023', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '장이 건강해지면 혈당·면역·피부·뇌가 함께 좋아집니다.\n장은 제2의 뇌이자 면역의 70%가 사는 곳입니다.',
      p2headline: '장을 고치면 몸 전체가 달라집니다',
      compare: [
        { left: '유산균 → 균 보충만, 장벽 강화 없음', right: '플로로탄닌 → 유익균 3.2배 + 장벽 강화 + 항염증' },
        { left: '프리바이오틱 → 섬유 공급만', right: '플로로탄닌 → 발효+LPS 차단+NLRP3 억제 동시' },
        { left: '소화효소 → 소화 보조만, 장 자체 회복 없음', right: '플로로탄닌 → 장 점막 자체를 회복·재생' },
        { left: '마그네슘 → 변비 완화만', right: '플로로탄닌 → 마이크로바이옴 근본 개선, 전신 효과' },
      ],
      targets: ['과민성 장 증후군(IBS) 진단을 받은 분', '배변이 불규칙하고 복통이 잦은 분', '항생제 관리 후 장 회복이 필요한 분', '음식을 먹으면 속이 더부룩한 분', '장 건강과 면역력을 동시에 챙기고 싶은 분', '소화·영양 흡수 개선이 목표인 분'],
      ctaMsg: '지금 전화하시면\n장 건강 타입별 1:1 맞춤 관리 가이드를 드립니다',
    },

    /* ════════════════════════════════════════════════
       통합 전단지 5종
    ════════════════════════════════════════════════ */

    /* ────── COMBO_ALL : 기초·전체 통합 ────── */
    combo_all: {
      urgency: '비타민·오메가3·유산균으로 부족했던 이유 — 몸은 하나의 시스템입니다',
      headline: ['단 하나의 성분으로', '혈당·혈관·뇌·면역·피부·장을', '한 번에 잡을 수 있다면?'],
      accentLine: '바다가 35억 년 진화시킨 복합 다중기전 물질 — 플로로탄닌',
      intro: '에클로니아 카바 갈조류가 극한 환경에서 스스로를 지키기 위해 만든 복합 폴리페놀, 플로로탄닌. 혈당·혈관·뇌·면역·장·피부가 하나의 연결된 시스템임을 이해할 때, 단일 성분이 아닌 다중 기전 물질이 왜 필요한지 알 수 있습니다. 6가지 시스템을 동시에 회복하는 단 하나의 선택.',
      timeline: [
        { week: '관리 1~2주', body: '항산화·항염증 효과 시작. 만성 피로·무거운 몸이 가벼워짐. 수면의 질 향상.' },
        { week: '관리 3~4주', body: '혈당 안정·식후 졸음 감소. 관절·피부 컨디션 개선. 소화가 편안해짐.' },
        { week: '관리 2~3개월', body: '혈압·콜레스테롤 수치 변화. 피부 탄력·기억력 향상. 전신 시스템 회복 체감.' },
      ],
      points: [
        { icon: '⚡', color: '#0A9BAD', title: '항산화 — 비타민C보다 10~15배 강력', body: 'DPPH 라디칼 소거 IC₅₀ 0.06 mg/mL. 세포 DNA·지질·단백질 산화 손상 전방위 차단. 노화의 근본 원인인 산화스트레스를 뿌리부터 억제합니다.' },
        { icon: '🩸', color: '#DC2626', title: '혈당 조절 — α-글루코시다제 억제력 당뇨약 대비 10배', body: '식후 혈당 스파이크 원천 차단 + 인슐린 저항성 개선 + 공복혈당 조절. 3중 혈당 관리 기전으로 당뇨 전단계부터 관리합니다.' },
        { icon: '❤️', color: '#E05050', title: '심혈관 — ACE 억제 + eNOS 활성 + LDL 산화 차단', body: '혈압 조절·혈관 내피 회복·동맥경화 예방 3중 기전. 수치만 낮추는 것이 아닌 혈관 자체를 안에서부터 회복합니다.' },
        { icon: '🧠', color: '#7C3AED', title: '뇌·수면 — BACE1 억제 + GABA 활성', body: '알츠하이머 독소 생성 원천 차단 + 수면의 질 자연 회복. 혈뇌장벽을 직접 통과하는 몇 안 되는 천연 성분.' },
        { icon: '🛡️', color: '#10B981', title: '면역·항암 — NK세포 활성 + Nrf2 경로 + 선택적 아포토시스', body: 'NK세포 활성화·세포 방어막 강화·이상세포 선택적 제거 3중 면역 방어. 정상세포는 완전히 보호하면서 이상세포만 제거.' },
        { icon: '🦠', color: '#06B6D4', title: '장·피부 — Akkermansia 3.2배 + MMP-1 억제', body: '장내 유익균 3.2배 증식·장벽 강화로 전신 대사 개선. MMP 억제로 콜라겐 분해 차단·주름·탈모 동시 케어.' },
      ],
      refs: ['Kim MJ et al. Marine Drugs 2022', 'Wijesinghe et al. Marine Drugs 2021', 'Park SY et al. Antioxidants 2023'],
      systemMsg: '혈당 → 혈관 → 뇌 → 면역 → 장 → 피부\n플로로탄닌은 그 연결고리 전체를 동시에 지지합니다.',
      p2headline: '기존 건강 성분, 왜 한계가 있을까요?',
      compare: [
        { left: '비타민·오메가3 → 단일 영양 보충, 다중 기전 없음', right: '플로로탄닌 → 6대 시스템 동시 작용, 다중 기전' },
        { left: '유산균 → 장 위주, 전신 효과 제한적', right: '플로로탄닌 → 장+혈관+뇌+면역+피부 전신 연결' },
        { left: '콜라겐·히알루론산 → 단순 보충, 분해는 계속', right: '플로로탄닌 → MMP 억제로 분해 자체를 차단' },
        { left: '종합영양제 → 결핍 보충, 기전 작용 없음', right: '플로로탄닌 → 분자 수준 기전으로 근원 회복' },
      ],
      targets: ['건강기능식품을 처음 시작하려는 분', '여러 성분 대신 하나로 정리하고 싶은 분', '40대 이상 전신 건강 관리가 필요한 분', '만성 피로·컨디션 저하가 지속되는 분', '가족 건강을 한 번에 챙기고 싶은 분', '건강기능식품 사업을 시작하려는 파트너'],
      ctaMsg: '지금 바로 전화하시면\n체질·증상별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── COMBO_META : 혈당·심혈관 통합 ────── */
    combo_meta: {
      urgency: '혈당과 혈압은 따로 오지 않습니다 — 대사증후군은 한 뿌리입니다',
      headline: ['혈당이 높으면 혈관이 망가지고', '혈관이 망가지면 심장과 뇌가', '동시에 위험해집니다'],
      accentLine: '대사증후군 — 혈당·혈압·콜레스테롤·복부비만 4가지가 함께 옵니다',
      intro: '혈당이 높으면 혈관 내피가 손상됩니다. 손상된 혈관에 콜레스테롤이 쌓이고 혈압이 오릅니다. 심근경색·뇌졸중·신부전·실명은 모두 같은 뿌리에서 출발합니다. 플로로탄닌은 혈당·혈관·콜레스테롤 세 경로를 동시에 공략해 대사증후군의 연쇄를 끊습니다.',
      timeline: [
        { week: '관리 1~2주', body: '식후 혈당 급등 완화. 혈관 이완으로 두통·어깨 뻐근함 감소. 손발 따뜻해짐.' },
        { week: '관리 3~4주', body: '공복혈당·이완기 혈압 안정. 식욕 조절 쉬워짐. 체중·복부 둘레 감소 시작.' },
        { week: '관리 2~3개월', body: '혈당·혈압·LDL 검사 수치 동반 개선. 혈관 컨디션 회복. 전반적 대사 지표 개선.' },
      ],
      points: [
        { icon: '🔑', color: '#DC2626', title: '혈당 — α-글루코시다제 2효소 이중 억제 (당뇨약 10배)', body: '식후 혈당 스파이크 원천 차단. IRS-1→PI3K→AKT 인슐린 신호 직접 활성화. 공복혈당 평균 9.2 mg/dL 감소(Nutrients 2023 메타분석).' },
        { icon: '🩺', color: '#E05050', title: '혈압 — ACE 억제 (고혈압약과 동일 기전)', body: 'ACE IC₅₀ 0.27 mg/mL 억제. 혈관 수축 완화로 혈압 강하. eNOS 62% 활성화로 혈관 내피 자체를 회복(Marine Drugs 2020).' },
        { icon: '📊', color: '#B8953A', title: '콜레스테롤 — HMG-CoA 환원효소 억제 (스타틴 동일 기전)', body: '총 콜레스테롤 24%·LDL 32% 감소(동물 모델). LDL 산화까지 차단해 동맥경화반 형성 원천 억제.' },
        { icon: '🔴', color: '#7C3AED', title: '혈관 염증 — ICAM-1·VCAM-1 접착분자 이중 차단', body: '혈관 벽 만성 염증을 근원에서 차단. 인슐린 저항성·혈관 경직을 동시에 개선해 대사증후군 악순환 고리를 끊습니다.' },
        { icon: '🦠', color: '#10B981', title: '장-대사 축 — LPS 35% 감소 → 인슐린 감수성 향상', body: 'Akkermansia 3.2배 증식 → 장 점막 강화 → 혈중 LPS 35% 감소 → 대사성 염증 해소 → 인슐린·혈압 동반 개선.' },
      ],
      refs: ['Kim MJ et al. Marine Drugs 2022', 'Mohibbullah M et al. Marine Drugs 2020', 'Jung HA et al. Nutrients 2023'],
      systemMsg: '혈당·혈압·콜레스테롤은 하나의 대사 시스템입니다.\n플로로탄닌은 세 경로를 동시에 잡는 유일한 천연 성분입니다.',
      p2headline: '혈당약 + 혈압약 따로 먹어도 혈관은 계속 망가집니다',
      compare: [
        { left: '혈당약(아카보스) → 단일 효소 억제만', right: '플로로탄닌 → 2효소+인슐린신호+공복혈당 3중 관리' },
        { left: '혈압약(ACE억제제) → 수치 조절, 혈관 회복 없음', right: '플로로탄닌 → ACE억제+eNOS 혈관 자체 회복' },
        { left: '스타틴 → LDL 수치만, 산화 차단 없음', right: '플로로탄닌 → HMG-CoA억제+LDL산화차단 동시' },
        { left: '복합제 → 각 성분 단순 합산, 상호작용 없음', right: '플로로탄닌 → 단일 성분으로 대사 전 경로 연동' },
      ],
      targets: ['대사증후군 진단을 받은 분', '혈당·혈압이 동시에 높은 분', '복부 비만·LDL 콜레스테롤이 걱정되는 분', '약 여러 가지를 보완하고 싶은 분', '심근경색·뇌졸중을 예방하고 싶은 분', '40~70대 심혈관·대사 위험군'],
      ctaMsg: '지금 전화하시면\n혈당·혈압 동반 타입 1:1 맞춤 상담을 드립니다',
    },

    /* ────── COMBO_NEURO : 뇌·염증 통합 ────── */
    combo_neuro: {
      urgency: '만성 염증이 뇌를 파괴합니다 — 치매의 80%는 뇌 염증에서 시작됩니다',
      headline: ['머리가 무겁고 잠을 못 자고', '몸이 늘 아프다면', '염증이 뇌까지 번지고 있는 겁니다'],
      accentLine: '뇌 염증(neuroinflammation) — 치매·우울·파킨슨의 공통 뿌리',
      intro: '만성 저등급 염증은 혈뇌장벽을 뚫고 뇌 속 미세아교세포를 과활성화합니다. 신경이 파괴되고, 수면이 망가지고, 기억이 지워집니다. 플로로탄닌은 전신 염증을 뿌리에서 끄면서 동시에 혈뇌장벽을 통과해 뇌 내부를 직접 보호하는 이중 작용을 합니다.',
      timeline: [
        { week: '관리 1주', body: '통증·붓기 완화. 수면의 질 향상 시작. 전신 무거움·뻣뻣함이 가벼워짐.' },
        { week: '관리 2~3주', body: '집중력·기억력 향상 체감. 만성 피로 감소. 아침 기상이 개운해짐.' },
        { week: '관리 1~2개월', body: 'CRP 수치 개선. 관절 가동 범위 확대. 인지력·수면 질 동반 향상.' },
      ],
      points: [
        { icon: '🔥', color: '#F97316', title: 'NF-κB·NLRP3 이중 차단 — 전신 염증 마스터 스위치 OFF', body: 'TNF-α 68%, IL-6 54%, IL-1β 74% 억제. 만성 염증의 두 핵심 경로를 동시에 차단해 뇌·관절·혈관 염증을 뿌리부터 끕니다(Marine Drugs 2021/2023).' },
        { icon: '🔒', color: '#7C3AED', title: 'BACE1 억제 + Aβ 응집 62% 차단 — 알츠하이머 이중 원천 봉쇄', body: '치매 독소 생성 효소 억제 + 이미 생성된 아밀로이드 응집 62% 차단. 혈뇌장벽을 직접 통과, 뇌 내부에서 작용합니다.' },
        { icon: '😴', color: '#EC4899', title: 'GABA-A 활성 + AChE 억제 — 수면·인지력 동시 회복', body: 'GABA 수용체 활성으로 수면의 질 자연 회복. 기억 신경전달물질 아세틸콜린 보존으로 인지력 유지. 수면제·인지약 대안.' },
        { icon: '🦴', color: '#0A9BAD', title: 'MMP-3/13 억제 — 관절 연골 분해 차단', body: '관절염의 핵심 효소 MMP-3 45%·MMP-13 38% 억제. 글루코사민 보충 방식이 아닌 분해 자체 차단. 통증·붓기와 인지력을 동시에 케어.' },
        { icon: '🛡️', color: '#10B981', title: '미세아교세포 과활성 차단 — 뇌 신경 보호', body: '뇌 내 면역세포 과활성으로 인한 신경 파괴를 막습니다. 신경 독성 사이토카인 생성 차단. 염증·치매 진행 속도를 함께 늦춥니다.' },
      ],
      refs: ['Wijesinghe et al. Marine Drugs 2021', 'Ahn G et al. Marine Drugs 2021', 'Kim JH et al. Marine Drugs 2023'],
      systemMsg: '만성 염증 → 혈뇌장벽 손상 → 뇌 염증 → 신경 파괴\n플로로탄닌은 전신 염증과 뇌 보호를 동시에 해결합니다.',
      p2headline: '진통제로 염증을 덮으면 뇌는 계속 타들어갑니다',
      compare: [
        { left: 'NSAIDs → COX-2만, 뇌 보호 없음', right: '플로로탄닌 → NF-κB+NLRP3+COX-2+뇌 보호 동시' },
        { left: '은행잎·오메가3 → 혈류 개선만', right: '플로로탄닌 → BACE1+Aβ 이중 차단, 혈뇌장벽 통과' },
        { left: '수면제 → 의존성, 뇌 청소 방해', right: '플로로탄닌 → GABA 자연 이완, 뇌 청소 시간 증가' },
        { left: '글루코사민 → 연골 보충, 염증 차단 없음', right: '플로로탄닌 → MMP 차단 + 전신 항염 동시 작용' },
      ],
      targets: ['만성 관절통과 건망증이 동시에 있는 분', '수면 장애와 만성 피로가 반복되는 분', '알츠하이머 가족력 + 염증성 질환 있는 분', 'CRP 수치가 높고 집중력이 떨어지는 분', '40~70대 뇌·관절 동반 관리가 필요한 분', '진통제 없이 염증·뇌를 동시에 케어하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n뇌·염증 동반 타입 1:1 맞춤 상담을 드립니다',
    },

    /* ────── COMBO_IMMUNE : 면역·장 통합 ────── */
    combo_immune: {
      urgency: '면역의 70%는 장에서 만들어집니다 — 장이 무너지면 면역도 무너집니다',
      headline: ['감기가 달고 살고', '배가 자주 아프고 소화가 안 된다면', '장-면역 축이 무너진 겁니다'],
      accentLine: '장내 미생물 불균형 → 면역 교란 → 감염·알레르기·자가면역 연쇄',
      intro: '장은 제2의 뇌이자 면역의 요새입니다. 38조 개의 장내 세균이 면역세포를 훈련하고, 항체를 만들고, 염증을 조절합니다. 장 건강이 무너지면 면역이 과반응하거나 무력해집니다. 플로로탄닌은 장내 유익균을 늘리고 장벽을 강화하면서 동시에 NK세포·Nrf2 경로로 면역을 직접 강화합니다.',
      timeline: [
        { week: '관리 1주', body: '소화 편안, 복부 팽만·가스 감소. 배변 규칙성 개선. 전반적 컨디션 향상.' },
        { week: '관리 2~3주', body: '감기·잔병치레 빈도 감소. 복통·설사 줄어듦. 피부 트러블 개선 시작.' },
        { week: '관리 1~2개월', body: '장내 미생물 다양성 회복. 면역 지표 개선. 혈당·피부·에너지 연쇄 향상.' },
      ],
      points: [
        { icon: '🦠', color: '#06B6D4', title: 'Akkermansia 3.2배·Lactobacillus 1.8배 증식', body: '장 점막 보호 핵심 균 Akkermansia muciniphila 3.2배, Lactobacillus 1.8배 증가. 장내 미생물 다양성 회복으로 전신 면역·대사가 연쇄 개선(Nutrients 2024).' },
        { icon: '🧱', color: '#0A9BAD', title: '장 투과성 42% 감소 — Leaky Gut 완전 차단', body: '타이트 정션 단백질 발현 강화로 장벽 42% 개선. 독소·세균이 혈류로 새는 것을 차단 → 전신 염증·면역 교란 해소.' },
        { icon: '⚔️', color: '#10B981', title: 'NK세포 활성 + Nrf2 경로 — 면역 감시 최대 강화', body: 'NK세포가 이상 세포를 발견·제거하는 능력 강화. Nrf2로 세포 방어막 최대화. 항암 치료 중 면역 기능 유지에도 도움.' },
        { icon: '📉', color: '#B8953A', title: '혈중 LPS 35% 감소 — 대사성 내독소혈증 해소', body: '장에서 혈류로 유입되는 세균 내독소 35% 감소. 대사성 내독소혈증이 해소되면 혈당·혈압·뇌 기능이 연쇄 개선.' },
        { icon: '🔥', color: '#E05050', title: 'NLRP3·NF-κB 이중 차단 — 장·전신 염증 뿌리 제거', body: '과민성 장 증후군·염증성 장질환 핵심 경로 이중 억제. 복통·팽만·설사 완화와 전신 면역 과반응 동시 억제.' },
      ],
      refs: ['Jung HA et al. Nutrients 2024', 'Kim JH et al. Marine Drugs 2023', 'Park SY et al. Antioxidants 2023'],
      systemMsg: '장이 건강해지면 면역·혈당·피부·뇌가 함께 좋아집니다.\n플로로탄닌은 장-면역 축 전체를 동시에 회복합니다.',
      p2headline: '유산균만으로는 면역과 장을 동시에 잡을 수 없습니다',
      compare: [
        { left: '유산균 → 균 보충만, 장벽·면역 직접 작용 없음', right: '플로로탄닌 → 유익균 3.2배+장벽+NK세포 동시' },
        { left: '비타민C → 단독 항산화, 장 회복 없음', right: '플로로탄닌 → Nrf2+NK세포+장 마이크로바이옴 연동' },
        { left: '후코이단 → 면역 지지, 장 회복 효과 제한', right: '플로로탄닌 → 장벽 강화+LPS 차단+면역 직접 강화' },
        { left: '소화효소 → 소화 보조만, 면역 효과 없음', right: '플로로탄닌 → 장 점막 재생+전신 면역 연쇄 강화' },
      ],
      targets: ['면역력 저하·잦은 감기가 걱정되는 분', '과민성 장 증후군(IBS) 진단을 받은 분', '항생제 관리 후 장·면역 회복이 필요한 분', '항암 치료 중 면역 관리가 필요한 분', '장 건강과 면역을 동시에 챙기고 싶은 분', '소화 불량·반복 감염이 문제인 분'],
      ctaMsg: '지금 전화하시면\n장·면역 동반 타입 1:1 맞춤 상담을 드립니다',
    },

    /* ────── COMBO_BEAUTY : 피부·종합 통합 ────── */
    combo_beauty: {
      urgency: '피부 노화는 바깥에서 오지 않습니다 — 혈당·염증·산화가 피부를 무너뜨립니다',
      headline: ['잡티·주름·탈모가 동시에 온다면', '피부과·화장품으로만 해결하려는', '접근 자체가 틀렸습니다'],
      accentLine: '피부 노화의 3대 뿌리: MMP 분해 + 멜라닌 축적 + DHT 모낭 약화',
      intro: '콜라겐을 먹어도 MMP 효소가 분해하면 소용없습니다. 미백 크림을 발라도 멜라닌을 만드는 효소가 활성화되면 잡티는 계속 생깁니다. 탈모를 막으려면 DHT 생성 효소를 억제해야 합니다. 플로로탄닌은 피부·모발 노화의 세 뿌리를 분자 수준에서 동시에 차단하고, 전신 항산화·항염증으로 몸 안에서부터 피부를 회복합니다.',
      timeline: [
        { week: '관리 1~2주', body: '피부 수분·광택 개선. 민감성 피부 자극 감소. 만성 피로·염증 감소로 안색 개선.' },
        { week: '관리 3~4주', body: '피부 탄력 향상. 잡티·기미 옅어지기 시작. 모발 굵기 증가·탈모 감소 체감.' },
        { week: '관리 2~3개월', body: '주름 완화·피부 결 개선 뚜렷. 기미 면적 감소. 모발 성장 주기 회복. 전신 노화 속도 저하.' },
      ],
      points: [
        { icon: '💎', color: '#EC4899', title: 'MMP-1 콜라게나제 68% 억제 — 주름 생성 효소 원천 차단', body: '자외선·활성산소가 활성화하는 콜라겐 분해 효소 MMP-1 68% 억제(Marine Drugs 2012). 콜라겐을 먹는 것보다 분해를 막는 것이 10배 효과적. 탄력·볼륨 회복.' },
        { icon: '🌟', color: '#B8953A', title: '티로시나제 억제 — 코직산보다 3배 강한 천연 미백', body: '멜라닌 합성 효소 티로시나제 IC₅₀ 0.19 mg/mL 억제. 표준 미백 성분 코직산보다 3배 강력(Food Chem Toxicol 2010). 잡티·기미·색소침착 예방·완화.' },
        { icon: '💇', color: '#7C3AED', title: '5α-환원효소 억제 + KGF 증가 — 탈모 이중 케어', body: 'DHT를 만드는 5α-환원효소 억제 + 모유두 세포 성장인자(KGF) 증가. 탈모 차단 + 새 모발 성장 촉진 이중 작용(Marine Drugs 2020).' },
        { icon: '☀️', color: '#0A9BAD', title: 'DNA 광손상 58% 차단 + 10~15배 항산화', body: 'UVB 자외선에 의한 DNA 광손상 58% 억제. 비타민C 대비 10~15배 강한 DPPH 항산화로 세포 산화 노화 전방위 차단(Antioxidants 2024).' },
        { icon: '🔥', color: '#E05050', title: '항염증 — 피부·두피 염증이 노화를 가속합니다', body: 'NF-κB 차단으로 피부·두피 만성 염증 억제. 트러블·피부염·두피 염증 완화. 혈당 안정화로 당화(글리케이션)로 인한 피부 노화도 동시 억제.' },
      ],
      refs: ['Kim MM et al. Marine Drugs 2012', 'Yoon NY et al. Food Chem Toxicol 2010', 'Cho ML et al. Antioxidants 2024', 'Ahn G et al. Marine Drugs 2020'],
      systemMsg: '피부 노화는 혈당·염증·산화스트레스가 모두 연결된 결과입니다.\n플로로탄닌은 몸 안에서부터 피부·모발 노화를 동시에 늦춥니다.',
      p2headline: '바르는 것으로는 한계가 있습니다 — 기전으로 막으세요',
      compare: [
        { left: '콜라겐 섭취 → 흡수 불확실, 분해는 계속', right: '플로로탄닌 → MMP 억제로 분해 차단 + 합성 촉진' },
        { left: '비타민C → 단독 미백, 주름·탈모 효과 제한', right: '플로로탄닌 → 미백+주름+탈모+DNA보호 4중 동시' },
        { left: '탈모약(피나스테리드) → 부작용, 단독 효소만', right: '플로로탄닌 → 5α-환원효소+KGF 이중, 부작용 없음' },
        { left: '선크림 → 외부 차단만, 세포 내 손상 진행', right: '플로로탄닌 → 세포 내부 DNA 광손상까지 차단' },
      ],
      targets: ['잡티·주름·탈모가 동시에 걱정되는 30~60대', '피부과·화장품에 한계를 느끼는 분', '피부샵·에스테틱·뷰티샵 고객', '자외선 노출이 많고 피부 노화가 빠른 분', '혈당 관리와 피부 케어를 동시에 원하는 분', '종합적인 안티에이징을 원하는 분'],
      ctaMsg: '지금 전화하시면\n피부·모발 타입별 1:1 맞춤 플랜을 드립니다',
    },

    /* ════════════════════════════════════════════════
       질환별 추가 버전 (각 질환 2번째 각도)
    ════════════════════════════════════════════════ */

    /* ────── BASIC_2 : 35억년의 진화 스토리 버전 ────── */
    basic_2: {
      urgency: '35억 년의 진화가 만든 최강의 방어 물질을 아직 모르십니까',
      headline: ['비타민은 인간이 만들었지만', '플로로탄닌은 바다가', '35억 년 동안 만들었습니다'],
      accentLine: '에클로니아 카바 — 극한 자외선·산화·염분 환경에서 살아남은 생존 물질',
      intro: '파도치는 바다 속, 극한의 자외선과 산화 스트레스 속에서 살아남기 위해 에클로니아 카바 갈조류가 35억 년 동안 진화시킨 복합 폴리페놀이 플로로탄닌입니다. 단순한 영양 보충제가 아닙니다. 세포 스스로 환경을 극복하도록 신호를 보내는 생존 물질입니다.',
      timeline: [
        { week: '관리 1~2주', body: '세포 레벨 항산화 시작. 활성산소 소거 → 세포 에너지 회복. 피로감·무거움 감소.' },
        { week: '관리 3~4주', body: 'Nrf2 경로 활성화 → 세포 자체 방어막 형성. 혈당·염증 동반 안정화 시작.' },
        { week: '관리 2~3개월', body: '다중 기전 누적 효과. 혈압·콜레스테롤·피부·수면 등 전신 지표 개선 체감.' },
      ],
      points: [
        { icon: '🌊', color: '#0A7E8C', title: '플로로글루시놀 골격 — 인류가 발견한 최강 폴리페놀', body: '플로로탄닌은 8~10개의 플로로글루시놀 단위체가 결합한 고분자 폴리페놀. 포도의 레스베라트롤, 녹차의 카테킨과 분자 구조 자체가 다릅니다. 다중 결합으로 자유라디칼 동시 포획.' },
        { icon: '🛡️', color: '#10B981', title: 'Nrf2 마스터 스위치 — 세포가 스스로 방어막을 세운다', body: '세포 내 마스터 항산화 전사인자 Nrf2를 직접 활성화. HO-1·NQO1·GST 해독 효소 군을 유도해 세포 자체의 방어 능력을 최대화합니다. 외부 주입이 아닌 내부 강화.' },
        { icon: '⚡', color: '#B8953A', title: '10~15배 항산화 — DPPH·ABTS 복수 지표 모두 1위', body: 'DPPH 라디칼 소거 IC₅₀ 0.06 mg/mL, ABTS 항산화 지수도 비타민C·E·레스베라트롤 대비 10~15배. 단일 수치가 아닌 복수 항산화 지표 전체에서 최상위.' },
        { icon: '🔗', color: '#7C3AED', title: '6대 시스템 동시 작용 — 단일 성분의 한계를 넘다', body: '혈당·혈관·뇌·면역·장·피부 6가지 시스템 경로를 하나의 분자가 동시에 조절. 각각 다른 성분을 먹는 것보다 훨씬 효율적인 시너지 효과.' },
        { icon: '🔬', color: '#E05050', title: '100편+ 동료심사 논문 — 마케팅이 아닌 과학', body: 'Marine Drugs·Nutrients·Antioxidants·Phytotherapy Research 등 SCI급 저널 100편 이상 발표. 세포·동물·임상 모든 단계에서 검증된 성분. 국내 식약처 건강기능식품 원료 인정.' },
      ],
      refs: ['Wijesinghe et al. Marine Drugs 2021', 'Park SY et al. Antioxidants 2023', 'Kim MJ et al. Marine Drugs 2022'],
      systemMsg: '플로로탄닌은 35억 년 진화의 산물입니다.\n인간이 실험실에서 합성할 수 없는 복잡한 생존 구조.',
      p2headline: '왜 플로로탄닌인가 — 다른 해조류 성분과 무엇이 다른가',
      compare: [
        { left: '후코이단(후코스 다당류) → 면역 보조, 단일 기전', right: '플로로탄닌 → 6대 시스템 다중 기전, 항산화력 압도적' },
        { left: '스피루리나 → 단백질·영양 보충, 폴리페놀 없음', right: '플로로탄닌 → 복합 폴리페놀 구조, 분자 기전 직접 작용' },
        { left: '클로렐라 → 해독·영양, 기전 작용 제한적', right: '플로로탄닌 → Nrf2·NF-κB 핵심 경로 직접 조절' },
        { left: '아스타잔틴 → 항산화 1종, 기전 한정적', right: '플로로탄닌 → 항산화+항염+혈당+혈관+뇌+장 복합 작용' },
      ],
      targets: ['건강기능식품 성분에 과학적 근거를 따지는 분', '해조류 기반 성분을 처음 접하는 분', '단순 보충제에 실망하고 기전 물질을 찾는 분', '50대 이상 세포 수준 노화 관리가 목표인 분', '건강기능식품 추천·판매를 시작하려는 파트너', '자연 유래 성분으로 전신 관리를 원하는 분'],
      ctaMsg: '지금 전화하시면\n플로로탄닌 입문 1:1 안내를 드립니다',
    },

    /* ────── DIABETES_2 : 당뇨 합병증 예방 버전 ────── */
    diabetes_2: {
      urgency: '혈당이 높다고 방치하면 5~10년 후 실명·신부전·발 절단이 옵니다',
      headline: ['혈당 수치보다 더 무서운 것은', '합병증입니다', '지금 막지 않으면 너무 늦습니다'],
      accentLine: '당뇨 합병증은 혈당 조절 시작 후 10년이 아닌 지금 이 순간부터 진행 중',
      intro: '혈당이 높으면 혈관 내벽이 포도당에 절여집니다. 미세혈관부터 막히고, 신장·눈·발끝 신경이 차례로 무너집니다. 대혈관이 막히면 심근경색·뇌졸중이 옵니다. 플로로탄닌은 혈당 조절뿐 아니라 혈관 내피 보호·항산화·항염증으로 합병증의 진행 경로 전체를 차단합니다.',
      timeline: [
        { week: '관리 1주', body: '식후 혈당 급등 완화. 손발 저림·피로감 감소 시작. 탄수화물 당김 약해짐.' },
        { week: '관리 2~4주', body: '공복혈당 안정화. 혈당 변동폭 감소. 소변 빈도 정상화. 시야 선명해지는 느낌.' },
        { week: '관리 2~3개월', body: '당화혈색소(HbA1c) 수치 개선 체감. 신장·눈 관련 증상 완화. 전신 혈관 컨디션 회복.' },
      ],
      points: [
        { icon: '🔑', color: '#DC2626', title: 'AGEs(최종당화산물) 생성 억제 — 합병증의 핵심 원인 차단', body: '혈당이 높으면 포도당이 단백질·지질과 결합해 AGEs를 만듭니다. 이 당화 산물이 혈관·신장·눈·신경을 파괴합니다. 플로로탄닌의 강력한 항산화력이 AGEs 생성 자체를 억제합니다.' },
        { icon: '👁️', color: '#7C3AED', title: '망막 혈관 보호 — 당뇨 실명을 예방하는 기전', body: '당뇨망막병증은 미세혈관 출혈·VEGF 과발현이 원인. 플로로탄닌의 VEGF 억제 + 항산화력으로 망막 혈관을 보호합니다. 시력 보호의 핵심 기전.' },
        { icon: '🫘', color: '#F97316', title: '신장 사구체 보호 — 당뇨 신부전 예방 기전', body: '고혈당 → 사구체 기저막 당화 → 신부전. 플로로탄닌의 항산화·항염증으로 사구체 산화 손상을 차단. 신장 기능 보존. 크레아티닌·단백뇨 관리의 천연 보조.' },
        { icon: '⚡', color: '#0A9BAD', title: '말초신경 보호 — 손발 저림·통증 완화 기전', body: '당뇨 신경병증은 미세혈관 산화 손상 + 신경 직접 글리케이션이 원인. 강력한 항산화력으로 신경 보호. 손발 저림·타는 듯한 통증 완화.' },
        { icon: '❤️', color: '#E05050', title: '심혈관 합병증 예방 — 당뇨+혈관 이중 차단', body: '당뇨 환자의 심근경색 위험은 정상인의 2~4배. ACE 억제 + eNOS 활성 + LDL 산화 차단으로 혈관 합병증 위험을 동시에 낮춥니다.' },
      ],
      refs: ['Kim MJ et al. Marine Drugs 2022', 'Jung HA et al. Nutrients 2023', 'Lee SH et al. Nutrients 2022'],
      systemMsg: '혈당 조절만으로는 합병증을 막을 수 없습니다.\n혈관·신장·눈·신경을 함께 보호해야 합니다.',
      p2headline: '혈당약만 먹으면 합병증은 막을 수 없습니다',
      compare: [
        { left: '혈당약 → 수치 조절만, 합병증 진행 계속', right: '플로로탄닌 → AGEs 차단+혈관+신장+눈 동시 보호' },
        { left: '알파리포산 → 신경만, 전신 합병증 불가', right: '플로로탄닌 → 신경+혈관+신장+망막 전 합병증 경로' },
        { left: '비타민B → 신경 보조만, 근본 기전 없음', right: '플로로탄닌 → 당화 억제+산화 차단 근원 보호' },
        { left: '오메가3 → 중성지방만, 미세혈관 보호 없음', right: '플로로탄닌 → 미세+대혈관 이중 보호, 전신 항산화' },
      ],
      targets: ['당뇨 진단 후 합병증이 걱정되는 분', '손발 저림·시력 저하가 시작된 분', '혈당약 복용 중 합병증 예방이 필요한 분', '당화혈색소(HbA1c) 7% 이상인 분', '신장·눈·심장 동반 관리가 필요한 당뇨 환자', '당뇨 가족력 있는 40~70대 예방 관리군'],
      ctaMsg: '지금 전화하시면\n당뇨 합병증 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── BRAIN_2 : 수면·인지 집중 버전 ────── */
    brain_2: {
      urgency: '수면 부족 7일이면 뇌에 알츠하이머 독소가 2배 쌓입니다',
      headline: ['잠을 못 자면 뇌가 청소를 못 합니다', '청소 못 한 뇌에는', '독소가 쌓여 치매가 됩니다'],
      accentLine: '수면 중 뇌척수액이 독소를 씻어냄 — 이 시간이 뇌 건강의 전부입니다',
      intro: '수면은 단순한 휴식이 아닙니다. 잠자는 동안 뇌는 글림파틱 시스템(뇌척수액 순환)을 통해 하루 쌓인 베타아밀로이드·타우 단백질 독소를 청소합니다. 수면이 망가지면 이 청소가 실패하고, 10년 후 치매로 이어집니다. 플로로탄닌은 수면의 질을 자연스럽게 회복하면서 동시에 뇌 독소 생성 자체를 차단합니다.',
      timeline: [
        { week: '관리 1주', body: 'GABA 수용체 활성 → 잠들기 쉬워짐. 새벽 각성 감소. 아침에 개운함 회복.' },
        { week: '관리 2~3주', body: '수면 깊이 증가. 꿈 줄어들고 숙면 시간 연장. 낮 집중력·기억력 향상 체감.' },
        { week: '관리 2~3개월', body: '장기 기억력 개선. 이름·단어 기억 쉬워짐. 뇌 안개(brain fog) 해소. 전반적 인지력 회복.' },
      ],
      points: [
        { icon: '😴', color: '#7C3AED', title: 'GABA-A 수용체 활성 — 뇌가 스스로 이완하는 기전', body: '신경 억제 수용체 GABA-A에 직접 결합해 진정·이완. NREM 수면(깊은 수면) 시간 유의미하게 연장(Marine Drugs 2021). 수면제 의존 없이 자연스러운 수면 회복.' },
        { icon: '🧹', color: '#0A9BAD', title: '글림파틱 청소 시간 확보 — 치매 독소 배출 극대화', body: '깊은 수면 시간이 늘어나면 뇌척수액 순환(글림파틱) 활성화 → 베타아밀로이드·타우 단백질 배출 극대화. 수면 개선 자체가 최고의 치매 예방입니다.' },
        { icon: '🔒', color: '#EC4899', title: 'BACE1 억제 — 자는 동안도 독소 생성 원천 차단', body: '수면 중에도 BACE1을 억제해 베타아밀로이드 생성을 막습니다. 청소(수면)+생성 차단(BACE1) 이중 작용으로 뇌 독소를 양방향에서 관리.' },
        { icon: '💡', color: '#F97316', title: 'AChE 억제 — 기억·학습 신경전달물질 보존', body: '아세틸콜린 분해 효소 억제 → 기억·학습 담당 아세틸콜린 농도 유지. 알츠하이머 치료제 도네페질과 동일 기전. 낮 동안 인지력 유지의 핵심.' },
        { icon: '🌙', color: '#B8953A', title: '코르티솔·스트레스 호르몬 조절 — 수면 방해 원인 제거', body: '만성 스트레스·코르티솔 과잉이 수면을 방해합니다. 항염증 효과로 스트레스성 염증을 낮추고 부신 과활성을 완화. 수면 방해 원인 자체를 줄입니다.' },
      ],
      refs: ['Park S et al. Marine Drugs 2021 수면', 'Ahn G et al. Marine Drugs 2021', 'Ahn G et al. Phytotherapy Research 2019'],
      systemMsg: '수면 → 뇌 청소 → 독소 배출 → 인지력 보존\n수면의 질을 올리는 것이 최고의 치매 예방입니다.',
      p2headline: '수면제와 치매 예방제를 따로 먹지 마세요',
      compare: [
        { left: '수면제(벤조디아제핀) → 의존성, NREM 억제로 청소 방해', right: '플로로탄닌 → GABA 자연 이완, 깊은 수면 증가' },
        { left: '멜라토닌 → 수면 유도만, 뇌 보호 없음', right: '플로로탄닌 → 수면+BACE1 억제+AChE 동시 작용' },
        { left: '은행잎 → 혈류만, Aβ 차단·수면 효과 없음', right: '플로로탄닌 → Aβ 62% 차단+수면+인지 3중 작용' },
        { left: '카페인·홍삼 → 각성만, 수면 방해 가능', right: '플로로탄닌 → AChE 억제로 각성 아닌 지속 인지력' },
      ],
      targets: ['잠들기 어렵고 새벽에 자주 깨는 분', '알츠하이머·치매 예방이 최우선인 분', '수면제를 끊고 싶은 분', '낮에 멍하고 집중력이 떨어지는 분', '치매 가족력 + 수면 문제가 동시에 있는 분', '50~70대 수면·인지 동반 관리가 필요한 분'],
      ctaMsg: '지금 전화하시면\n수면·인지력 타입별 1:1 관리 가이드를 드립니다',
    },

    /* ────── CARDIOVASCULAR_2 : 혈관 재생·동맥경화 집중 ────── */
    cardiovascular_2: {
      urgency: '동맥경화는 증상 없이 30년 쌓입니다 — 50대에 막히면 이미 늦습니다',
      headline: ['혈압약·스타틴을 먹어도', '혈관 내부 플라크는', '계속 쌓이고 있습니다'],
      accentLine: '혈관은 수치가 아닌 내피세포 건강이 핵심 — 내부에서 회복해야 합니다',
      intro: '혈압을 낮춰도 산화된 LDL이 혈관 벽에 쌓이면 동맥이 굳습니다. 스타틴으로 LDL 수치를 낮춰도 LDL 산화가 계속되면 죽상경화반은 자랍니다. 진짜 혈관 건강은 내피세포 기능 회복, LDL 산화 차단, 혈관 염증 억제 세 가지가 동시에 이뤄져야 합니다.',
      timeline: [
        { week: '관리 1~2주', body: 'eNOS 활성화 → 산화질소(NO) 생성 → 혈관 이완. 두통·경직감 감소. 손발 혈류 개선.' },
        { week: '관리 3~4주', body: '혈관 탄성 회복 시작. 이완기 혈압 안정화. ICAM-1 억제로 혈관 벽 염증 감소.' },
        { week: '관리 2~3개월', body: '죽상경화 진행 억제. LDL 산화 감소 체감. 혈관 초음파에서 내막중막두께 개선 사례.' },
      ],
      points: [
        { icon: '✨', color: '#E05050', title: 'eNOS 62% 활성화 — 혈관이 스스로 NO를 만들게 하다', body: '혈관 내피세포의 eNOS 효소를 62% 활성화해 산화질소(NO) 생성 증가(Nutrients 2022). NO는 혈관을 이완·확장·항혈전·항염증. 내피 기능 회복의 핵심 신호 분자.' },
        { icon: '🔴', color: '#B8953A', title: 'LDL 산화 차단 — 동맥경화의 진짜 원인 제거', body: 'LDL 수치보다 LDL 산화가 동맥경화의 진짜 원인. 플로로탄닌의 10~15배 항산화력이 LDL 산화를 원천 차단. 죽상경화반 형성·성장 억제.' },
        { icon: '🛡️', color: '#0A9BAD', title: 'ICAM-1·VCAM-1 46% 억제 — 혈관 벽 면역 침윤 차단', body: '혈관 벽에 면역세포가 달라붙어 거품세포·플라크를 만드는 과정 차단. ICAM-1 46% 억제(Nutrients 2022). 염증성 동맥경화를 뿌리에서 막습니다.' },
        { icon: '🩺', color: '#7C3AED', title: 'ACE 억제 + HMG-CoA 억제 — 이중 약물 기전 천연 대안', body: '고혈압 치료제와 동일한 ACE 억제, 스타틴과 동일한 HMG-CoA 억제를 천연 성분 하나로 동시 구현. 처방약의 보완재로 활용 가능.' },
        { icon: '🩸', color: '#10B981', title: '혈소판 응집 억제 — 혈전 위험 감소', body: '혈소판 과활성으로 인한 혈전 형성 위험을 억제합니다. 항혈전 효과로 심근경색·뇌졸중 위험을 예방. 아스피린의 자연 대안.' },
      ],
      refs: ['Lee SH et al. Nutrients 2022', 'Mohibbullah M et al. Marine Drugs 2020', 'Kang MC et al. Nutrients 2019'],
      systemMsg: '혈관 내피 → 혈압 → 콜레스테롤 → 혈전 → 심뇌혈관\n혈관이 살아야 심장·뇌·신장·발끝이 삽니다.',
      p2headline: '혈압약+스타틴+아스피린 3가지를 하나로 보완하세요',
      compare: [
        { left: '스타틴 → LDL 수치만, LDL 산화 차단 없음', right: '플로로탄닌 → LDL 산화+HMG-CoA 이중 차단' },
        { left: 'ACE억제제 → 혈압 수치만, 내피 회복 없음', right: '플로로탄닌 → ACE억제+eNOS로 내피 자체 회복' },
        { left: '아스피린 → 혈전만, 혈관 염증 해소 없음', right: '플로로탄닌 → 혈전+ICAM+혈관 염증 동시 해소' },
        { left: '오메가3 → 중성지방만, 내피 회복·죽상 차단 없음', right: '플로로탄닌 → 동맥경화 전 경로 동시 억제' },
      ],
      targets: ['심근경색·뇌졸중 가족력이 있는 분', '혈압약·스타틴을 보완하고 싶은 분', '동맥경화 진단 또는 의심이 있는 분', '혈관 초음파에서 내막 두께 증가 소견을 받은 분', '협심증·부정맥 예방이 필요한 분', '50~70대 혈관 재생·플라크 감소를 원하는 분'],
      ctaMsg: '지금 전화하시면\n혈관 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── INFLAMMATION_2 : 자가면역·류마티스 집중 ────── */
    inflammation_2: {
      urgency: '류마티스·자가면역 질환 — 면역이 자기 몸을 공격하는 것을 막아야 합니다',
      headline: ['관절이 붓고 아프고', '원인 없이 피로하다면', '면역이 길을 잃은 겁니다'],
      accentLine: '류마티스·루푸스·건선 — 자가면역의 공통 경로는 NLRP3·NF-κB입니다',
      intro: '자가면역 질환은 면역이 외부 적이 아닌 자신의 세포를 공격하는 상태입니다. 그 핵심 경로는 NLRP3 인플라마솜과 NF-κB입니다. 스테로이드와 면역억제제는 면역 전체를 억제해 감염 위험을 높입니다. 플로로탄닌은 핵심 염증 경로만 선택적으로 차단하면서 정상 면역 기능은 유지합니다.',
      timeline: [
        { week: '관리 1주', body: '관절 염증·붓기 감소 시작. 아침 관절 뻣뻣함 완화. 전신 피로·무거움 개선.' },
        { week: '관리 2~4주', body: 'CRP·ESR 염증 수치 안정. 통증 빈도·강도 감소. 일상 활동량 증가.' },
        { week: '관리 2~3개월', body: '관절 가동 범위 확대. 스테로이드 의존도 감소 경험. 삶의 질 전반 향상.' },
      ],
      points: [
        { icon: '💥', color: '#F97316', title: 'NLRP3 인플라마솜 억제 — 자가면역 공통 핵심 경로 차단', body: '류마티스 관절염·통풍·NASH·2형 당뇨·알츠하이머의 공통 염증 경로 NLRP3 억제. IL-1β 74%, 카스파제-1 67% 감소(Marine Drugs 2023). 전 세계 신약 연구 표적 1위.' },
        { icon: '🔥', color: '#E05050', title: 'NF-κB 완전 차단 — 자가면역 면역세포 과활성 OFF', body: '자가면역에서 과활성화된 T세포·대식세포를 지휘하는 NF-κB를 차단. TNF-α 68%, IL-6 54% 억제. 면역세포 과활성 없이 항원 인식 능력은 유지.' },
        { icon: '🦴', color: '#0A9BAD', title: 'MMP-3/13 억제 — 관절 연골·뼈 침식 차단', body: '류마티스의 핵심 피해 기전인 연골·뼈 침식을 MMP-3 45%, MMP-13 38% 억제로 차단. 기존 치료가 염증만 줄이는 동안 플로로탄닌은 구조적 파괴도 막습니다.' },
        { icon: '🌊', color: '#10B981', title: 'Treg 세포 균형 회복 — 면역 자기인식 교정', body: '자가면역의 근본 원인인 조절 T세포(Treg)와 효과 T세포 불균형. 항염증 환경 조성으로 Treg 기능 회복을 지원, 면역의 자기인식을 교정합니다.' },
        { icon: '📉', color: '#B8953A', title: 'CRP·ESR 동반 감소 — 혈액 검사로 확인되는 효과', body: '만성 염증 지표 CRP와 혈침(ESR) 모두 유의미하게 감소. 류마티스 모니터링 지표에서 실질적 개선. 혈액 검사로 확인 가능한 명확한 효과.' },
      ],
      refs: ['Wijesinghe et al. Marine Drugs 2021', 'Kim JH et al. Marine Drugs 2023', 'Lee KW et al. Marine Drugs 2023'],
      systemMsg: '자가면역 → 핵심 염증 경로 차단 → 면역 균형 회복\n스테로이드 의존 없이 염증 조절이 가능합니다.',
      p2headline: '스테로이드·면역억제제 대신 선택적 염증 차단으로',
      compare: [
        { left: '스테로이드 → 면역 전체 억제, 감염·골다공증 위험', right: '플로로탄닌 → NLRP3+NF-κB 선택 차단, 면역 유지' },
        { left: 'NSAIDs → COX-2만, 관절 구조 보호 없음', right: '플로로탄닌 → MMP 억제로 연골·뼈 구조 보호까지' },
        { left: '메토트렉세이트 → 면역억제, 간 독성 위험', right: '플로로탄닌 → 자연 성분, 독성 없는 장기 관리 가능' },
        { left: '오메가3 → 항염 보조, NLRP3 직접 억제 없음', right: '플로로탄닌 → NLRP3+NF-κB 이중 직접 차단' },
      ],
      targets: ['류마티스 관절염 진단을 받은 분', '통풍 발작이 반복되는 분', '건선·루푸스 등 자가면역 질환이 있는 분', '스테로이드 부작용이 걱정되는 분', '관절이 붓고 아침 뻣뻣함이 심한 분', 'CRP·ESR 수치가 높은 만성 염증 환자'],
      ctaMsg: '지금 전화하시면\n자가면역·관절 타입별 1:1 관리 가이드를 드립니다',
    },

    /* ────── SKIN_2 : 호르몬 피부 노화 집중 ────── */
    skin_2: {
      urgency: '40대 이후 피부 노화는 호르몬이 만듭니다 — 크림으로는 막을 수 없습니다',
      headline: ['폐경 전후 피부가 갑자기 늙고', '탈모·색소침착이 빨라졌다면', '에스트로겐 감소가 원인입니다'],
      accentLine: '호르몬성 피부 노화 3대 경로: DHT↑ · 콜라겐↓ · 멜라닌↑',
      intro: '40~50대 이후 에스트로겐이 감소하면 DHT(남성 호르몬)가 상대적으로 강해지고, 콜라겐 합성이 줄어들며, 멜라닌 침착이 빨라집니다. 이 3가지 경로가 동시에 피부·모발을 공격합니다. 플로로탄닌은 DHT 생성 차단·MMP 억제·티로시나제 억제로 호르몬성 피부 노화의 3대 경로를 분자 수준에서 동시에 막습니다.',
      timeline: [
        { week: '관리 1~2주', body: '피부 수분·광택 개선. 민감해진 피부 자극 감소. 두피 유분·탈모 속도 완화 시작.' },
        { week: '관리 3~4주', body: '잡티·기미 옅어지기 시작. 모발 굵기 증가 체감. 피부 처짐 개선 느낌.' },
        { week: '관리 2~3개월', body: '주름 뚜렷한 완화. 기미 면적 감소. 모발 밀도 회복. 피부 나이 되돌아오는 체감.' },
      ],
      points: [
        { icon: '💇', color: '#EC4899', title: '5α-환원효소 억제 — 호르몬성 탈모의 뿌리 차단', body: 'DHT를 만드는 5α-환원효소를 억제해 모낭 약화를 막습니다. 동시에 모유두 세포의 KGF(모발 성장인자) 발현 증가. 탈모 차단+새 성장 이중 작용(Marine Drugs 2020).' },
        { icon: '💎', color: '#B8953A', title: 'MMP-1 68% 억제 — 에스트로겐 감소가 가속한 콜라겐 붕괴 차단', body: '에스트로겐 감소 → MMP 활성화 → 콜라겐 급격히 분해. MMP-1 68% 억제로 이 붕괴 속도를 멈춥니다. 폐경 후 피부 탄력 유지의 핵심.' },
        { icon: '🌟', color: '#7C3AED', title: '티로시나제 억제 — 호르몬 변화로 빨라진 기미 생성 차단', body: '호르몬 변화는 멜라닌 합성 효소 티로시나제를 과활성화합니다. 코직산보다 3배 강한 티로시나제 억제로 기미·잡티 생성 속도를 늦춥니다.' },
        { icon: '☀️', color: '#0A9BAD', title: 'DNA 광손상 58% 차단 — 나이 들수록 약해지는 UV 방어 보강', body: '나이 들수록 피부 DNA 수복 능력이 저하됩니다. 플로로탄닌이 세포 내부에서 UVB 광손상을 58% 억제. 세포 수복 능력을 보완합니다(Antioxidants 2024).' },
        { icon: '🔥', color: '#10B981', title: '항염증·항산화 — 호르몬 변화로 악화되는 피부 염증 안정화', body: '폐경 전후 피부 민감성·발진·트러블 증가는 염증 증가 때문. NF-κB 차단으로 피부 염증 안정. 10~15배 항산화로 산화 노화 속도를 낮춥니다.' },
      ],
      refs: ['Ahn G et al. Marine Drugs 2020', 'Kim MM et al. Marine Drugs 2012', 'Cho ML et al. Antioxidants 2024'],
      systemMsg: '호르몬 변화는 피부·모발·전신 노화를 동시에 가속합니다.\n플로로탄닌은 호르몬 노화의 3대 경로를 분자 수준에서 차단합니다.',
      p2headline: '호르몬 치료 없이 피부 노화를 늦출 수 있습니다',
      compare: [
        { left: '호르몬 치료(HRT) → 효과적이나 암·혈전 위험', right: '플로로탄닌 → DHT+MMP+멜라닌 기전 차단, 부작용 없음' },
        { left: '콜라겐·히알루론산 → 보충만, 분해 가속 계속', right: '플로로탄닌 → MMP 억제로 분해 속도 자체를 낮춤' },
        { left: '탈모 샴푸 → 두피 외부만, 5α-환원효소 차단 없음', right: '플로로탄닌 → 내부에서 DHT 생성 원천 차단' },
        { left: '레티놀 → 주름 완화, 호르몬성 기전 없음', right: '플로로탄닌 → 호르몬 노화 3대 경로 동시 차단' },
      ],
      targets: ['갱년기·폐경 전후 피부 변화가 급격한 분', '탈모와 기미가 동시에 걱정되는 40~60대 여성', '호르몬 치료 없이 피부 노화 관리를 원하는 분', '피부 민감성·트러블이 늘어난 분', '에스테틱·피부샵의 갱년기 관리 고객', '피부·모발·전신 노화를 동시에 관리하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n호르몬 피부 타입별 1:1 맞춤 플랜을 드립니다',
    },

    /* ────── CANCER_2 : 항암 보조·세포 보호 집중 ────── */
    cancer_2: {
      urgency: '암 치료 중 면역이 무너지면 치료 효과도 무너집니다',
      headline: ['항암 치료 중에도', '면역을 지켜야', '치료가 효과를 냅니다'],
      accentLine: '항암 치료 부작용 No.1 — 면역 저하로 인한 감염, 이것이 진짜 위기',
      intro: '항암 치료는 암세포와 함께 면역세포를 공격합니다. 면역이 무너지면 감염 위험이 높아지고, 치료 중단으로 이어질 수 있습니다. 플로로탄닌은 항암 치료 중 NK세포 기능을 유지하고, Nrf2로 정상 세포를 보호하면서, 암세포에 대한 아포토시스 효과를 지원하는 3중 역할을 합니다.',
      timeline: [
        { week: '관리 1~2주', body: '만성 피로 완화. NK세포 활성 시작. 전반적 컨디션 향상. 오심·구역 감소 보고.' },
        { week: '관리 3~4주', body: '면역 회복 체감. 상처·구내염 회복 빨라짐. 활력 증가. 소화·흡수 개선.' },
        { week: '관리 2~3개월', body: 'NK세포·면역 지표 개선. 반복 감염 빈도 감소. 항암 치료 지속력 향상 경험.' },
      ],
      points: [
        { icon: '💪', color: '#10B981', title: 'NK세포 활성 유지 — 항암 치료 중 면역 감시 유지', body: '자연살해세포(NK Cell) 활성화로 비정상 세포 감시 능력 유지. 항암 치료로 저하된 NK세포 기능 보완. 치료 효과와 면역 기능을 동시에 지킵니다.' },
        { icon: '🛡️', color: '#0A9BAD', title: 'Nrf2 경로 — 정상세포 방어막 최대화', body: '세포 마스터 항산화 Nrf2를 활성화해 항암제·방사선으로부터 정상 세포를 보호. 해독 효소(HO-1, NQO1) 유도로 치료 독성 부작용 완화 지원.' },
        { icon: '⚔️', color: '#7C3AED', title: '암세포 선택적 아포토시스 — 정상세포 완전 보호', body: '췌장암·유방암·대장암·간암 세포에서 선택적 아포토시스 유도. Bax/Bcl-2 비율 조절. 정상 세포에는 독성이 전혀 없습니다(Antioxidants 2023).' },
        { icon: '🔬', color: '#EC4899', title: 'VEGF 억제 — 종양 혈관신생 차단 보조', body: '종양이 자체 혈관을 만들어 영양을 공급받는 혈관신생을 억제. 기존 항암 치료의 VEGF 억제 기전을 천연 성분으로 보완.' },
        { icon: '⚡', color: '#B8953A', title: '10~15배 항산화 — 활성산소로 인한 DNA 손상 차단', body: '항암 치료 중 급증하는 활성산소를 비타민C 대비 10~15배 강한 항산화력으로 소거. DNA 돌연변이 → 2차 암화 위험을 낮춥니다.' },
      ],
      refs: ['Park SY et al. Antioxidants 2023', 'Sugiura Y et al. Antioxidants 2020', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '항암 치료 효과 = 암세포 제거 × 면역 유지\n플로로탄닌은 면역을 지키며 항암 보조 역할을 합니다.',
      p2headline: '항암 치료 중 면역을 지키는 것이 치료의 절반입니다',
      compare: [
        { left: '비타민C 고용량 → 항산화만, NK세포·아포토시스 없음', right: '플로로탄닌 → NK세포+Nrf2+선택적아포토시스 3중' },
        { left: '버섯 추출물(베타글루칸) → 면역 조절 보조', right: '플로로탄닌 → NK세포 직접 활성+VEGF 억제 추가' },
        { left: '후코이단 → 면역 지지, 암세포 선택성 약함', right: '플로로탄닌 → 정상세포 완전 보호+암세포 선택 제거' },
        { left: '셀레늄 → 항산화 보조, Nrf2 활성 제한', right: '플로로탄닌 → Nrf2 마스터 스위치 직접 활성화' },
      ],
      targets: ['항암 치료 중 면역 관리가 필요한 분', '암 치료 후 재발 예방·면역 회복이 목표인 분', '암 가족력으로 예방에 관심 있는 분', '방사선 치료로 인한 피로·면역 저하 분', 'Nrf2 경로 세포 보호에 관심 있는 분', '전반적 항산화·세포 보호가 목표인 분'],
      ctaMsg: '지금 전화하시면\n면역·항암 보조 타입별 1:1 상담을 드립니다',
    },

    /* ────── GUT_2 : 장-뇌 축·정신건강 집중 ────── */
    gut_2: {
      urgency: '장이 나쁘면 뇌도 나빠집니다 — 우울·불안의 90%는 장에서 시작됩니다',
      headline: ['이유 없는 우울함과 불안', '집중이 안 되고 의욕이 없다면', '장-뇌 축을 점검하세요'],
      accentLine: '행복 호르몬 세로토닌의 90%는 뇌가 아닌 장에서 만들어집니다',
      intro: '장과 뇌는 미주신경·장내 미생물·면역·호르몬으로 연결된 하나의 축입니다. 장내 미생물이 무너지면 세로토닌이 부족해지고, 장 독소가 혈뇌장벽을 뚫고 뇌 염증을 일으킵니다. 우울·불안·집중력 저하의 숨겨진 원인이 장에 있을 수 있습니다. 플로로탄닌은 장-뇌 축 전체를 동시에 회복합니다.',
      timeline: [
        { week: '관리 1주', body: '소화 편안, 복부 팽만 감소. 배변 규칙성 개선. 수면의 질 향상 시작.' },
        { week: '관리 2~3주', body: '기분 안정감 향상 체감. 불안·초조감 감소. 집중력 개선. 활력 회복.' },
        { week: '관리 1~2개월', body: '전반적 정서 안정. 수면 깊이 개선. 장 건강 회복과 함께 뇌·정신 기능 연쇄 향상.' },
      ],
      points: [
        { icon: '🦠', color: '#06B6D4', title: 'Akkermansia 3.2배 — 세로토닌 생산 기반 유익균 증식', body: '장 점막 보호 및 세로토닌 전구체 생산에 관여하는 유익균 증식. 장내 미생물 다양성 회복으로 세로토닌·도파민 생산 환경 개선(Nutrients 2024).' },
        { icon: '🧱', color: '#0A9BAD', title: '장 투과성 42% 감소 — 장 독소의 뇌 침투 차단', body: '장 점막 장벽 강화로 장 독소(LPS)가 혈뇌장벽으로 유입되는 것을 차단. 뇌 염증 억제. 장-뇌 축 염증 연쇄를 끊습니다.' },
        { icon: '📉', color: '#10B981', title: '혈중 LPS 35% 감소 — 뇌 염증의 원인 물질 제거', body: '장에서 유입되는 세균 내독소 LPS 35% 감소. LPS는 뇌에서 신경 염증을 일으켜 우울·인지 저하·피로를 유발합니다. 원인 물질 제거가 핵심.' },
        { icon: '😴', color: '#7C3AED', title: 'GABA 생산 환경 개선 + 뇌 GABA-A 수용체 활성', body: '장내 GABA 생산균 증가로 뇌 GABA 공급 개선. 동시에 뇌에서 직접 GABA-A 수용체를 활성화. 불안 감소·수면 개선의 이중 경로.' },
        { icon: '🔥', color: '#E05050', title: '장·뇌 염증 동시 억제 — NF-κB·NLRP3 이중 차단', body: '장 염증(IBS·과민성 장) + 뇌 염증(우울·인지 저하)의 공통 경로 NF-κB·NLRP3를 동시에 억제. 장-뇌 축 염증을 뿌리에서 끊습니다.' },
      ],
      refs: ['Jung HA et al. Nutrients 2024', 'Kim JH et al. Marine Drugs 2023', 'Park S et al. Marine Drugs 2021'],
      systemMsg: '장내 미생물 → 세로토닌 → 미주신경 → 뇌\n장을 고치면 기분·집중력·수면이 함께 좋아집니다.',
      p2headline: '항우울제 전에 장-뇌 축부터 점검하세요',
      compare: [
        { left: '항우울제(SSRI) → 뇌 세로토닌만, 장 회복 없음', right: '플로로탄닌 → 장에서 세로토닌 생산 환경 자체 회복' },
        { left: '유산균 → 균 보충, 장-뇌 축 직접 작용 제한', right: '플로로탄닌 → 유익균+장벽+LPS 차단+뇌 보호 연동' },
        { left: '마그네슘 → 근육·수면 보조만', right: '플로로탄닌 → GABA 이중 경로+장-뇌 염증 동시 차단' },
        { left: '홍삼 → 에너지·면역 보조, 장-뇌 축 작용 없음', right: '플로로탄닌 → 장-뇌 축 전체 회복, LPS·GABA 연동' },
      ],
      targets: ['이유 없는 우울·불안·무기력이 반복되는 분', '과민성 장 증후군과 스트레스가 동반된 분', '수면 장애와 소화 문제가 함께 있는 분', '집중력 저하·뇌 안개가 지속되는 분', '항우울제 없이 정서 안정을 원하는 분', '장 건강과 정신건강을 동시에 챙기고 싶은 분'],
      ctaMsg: '지금 전화하시면\n장-뇌 축 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ════════════════════════════════════════════════
       암 전용 2종
    ════════════════════════════════════════════════ */

    /* ════════════════════════════════════════════════
       성기능 전용 2종
    ════════════════════════════════════════════════ */

    /* ────── SEXUAL_MALE : 남성 활력·성기능 ────── */
    sexual_male: {
      urgency: '남성 활력 저하는 나이 탓이 아닙니다 — 혈관과 호르몬이 동시에 무너진 결과입니다',
      headline: ['40대부터 활력이 떨어지고', '자신감이 없어졌다면', '혈관과 테스토스테론을 먼저 보세요'],
      accentLine: '남성 성기능의 핵심은 혈관 — NO(산화질소)가 부족하면 혈류가 멈춥니다',
      intro: '남성 성기능은 결국 혈관 기능입니다. 해면체에 혈류가 충분히 공급되어야 하고, 그 신호는 산화질소(NO)가 담당합니다. 동시에 테스토스테론이 줄어들면 활력·근력·성욕이 함께 하락합니다. 플로로탄닌은 eNOS 활성화로 혈관을 열고, 테스토스테론 생산 환경을 보호하며, 전립선 염증을 차단해 남성 활력의 세 뿌리를 동시에 회복합니다.',
      timeline: [
        { week: '관리 1~2주', body: 'eNOS 활성 → NO 생성 증가 → 혈관 이완 시작. 전신 혈류 개선. 피로감 감소·활력 회복 체감.' },
        { week: '관리 3~4주', body: '해면체 혈류 개선 체감. 전립선 불편감 완화. 수면의 질 향상 → 테스토스테론 분비 환경 개선.' },
        { week: '관리 2~3개월', body: '혈관 탄성 회복 누적. 활력·근력·집중력 동반 향상. 전반적 남성 컨디션 회복 체감.' },
      ],
      points: [
        { icon: '💉', color: '#1D4ED8', title: 'eNOS 62% 활성화 — 혈관을 열어 혈류를 회복하다', body: '혈관 내피 eNOS 효소를 62% 활성화해 산화질소(NO) 생성 증가(Nutrients 2022). NO는 혈관 평활근을 이완시켜 해면체 혈류를 증가시킵니다. 발기부전 치료제(PDE5 억제제)와 상호 보완하는 상위 기전.' },
        { icon: '⚡', color: '#B45309', title: '테스토스테론 보호 — 산화 손상으로부터 라이디히 세포를 지키다', body: '고환의 라이디히 세포는 테스토스테론을 생산하지만 산화 스트레스에 취약합니다. 플로로탄닌의 강력한 항산화력이 라이디히 세포를 보호해 테스토스테론 생산 능력을 유지합니다.' },
        { icon: '🛡️', color: '#059669', title: '전립선 염증 차단 — NF-κB·NLRP3로 전립선비대·전립선염 관리', body: '전립선 비대·만성 전립선염의 핵심 경로 NF-κB·NLRP3를 이중 차단. 전립선 부종·염증 완화로 배뇨 불편·성기능 저하를 동시에 개선합니다.' },
        { icon: '🔥', color: '#DC2626', title: '5α-환원효소 억제 — DHT로 인한 전립선 비대 억제', body: '테스토스테론을 전립선 비대의 원인 DHT로 변환하는 5α-환원효소를 억제. 전립선 비대 진행을 늦추고 야간뇨·잔뇨감을 완화. 탈모 억제와 동일한 기전.' },
        { icon: '🧠', color: '#7C3AED', title: '수면·스트레스 — 테스토스테론 분비의 숨겨진 열쇠', body: '테스토스테론의 70%는 깊은 수면 중 분비됩니다. GABA-A 수용체 활성으로 수면의 질 자연 회복. NF-κB 차단으로 코르티솔(스트레스 호르몬) 과잉을 억제 → 테스토스테론 분비 환경 복원.' },
      ],
      refs: ['Lee SH et al. Nutrients 2022', 'Ahn G et al. Marine Drugs 2020', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '혈관(NO) → 호르몬(테스토스테론) → 전립선 → 수면\n남성 활력은 이 4가지가 연결된 하나의 시스템입니다.',
      p2headline: '남성 활력제·영양제만으로는 근원이 해결되지 않습니다',
      compare: [
        { left: '아르기닌 → NO 전구체 보충, eNOS 직접 활성 없음', right: '플로로탄닌 → eNOS 62% 직접 활성화, 혈관 자체 회복' },
        { left: '아연 → 테스토스테론 보조, 혈관·전립선 기전 없음', right: '플로로탄닌 → 라이디히 세포 보호 + 혈관 + 전립선 동시' },
        { left: '쏘팔메토 → 전립선만, 혈관·호르몬 효과 없음', right: '플로로탄닌 → 5α-환원효소 + 전립선 염증 + 혈관 동시' },
        { left: 'PDE5 억제제 → 일시적 혈류, 근원 회복 없음', right: '플로로탄닌 → eNOS 상위 기전으로 혈관 자체를 회복' },
      ],
      targets: ['40대 이후 활력·자신감이 떨어진 남성', '전립선 비대·야간뇨·잔뇨감이 있는 분', '테스토스테론 감소가 걱정되는 분', '혈관 건강과 남성 기능을 동시에 챙기고 싶은 분', '수면 부족·스트레스로 활력이 떨어진 직장인', '남성 건강 전반을 근원부터 관리하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n남성 활력 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── SEXUAL_FEMALE : 여성 활력·갱년기 ────── */
    sexual_female: {
      urgency: '갱년기 증상은 호르몬만의 문제가 아닙니다 — 혈관·염증·뇌가 동시에 흔들리는 겁니다',
      headline: ['열감·불면·감정 기복·성욕 저하', '갱년기가 몸 전체를', '흔들고 있습니다'],
      accentLine: '에스트로겐 감소 → 혈관 경직 → 뇌 혈류 감소 → 열감·수면 장애·인지 저하 연쇄',
      intro: '에스트로겐이 감소하면 혈관이 경직되고, 뇌로 가는 혈류가 줄며, 골반 혈류도 감소합니다. 동시에 체내 염증이 증가하고 수면이 무너지면서 성욕 저하·건조감·감정 기복이 옵니다. 플로로탄닌은 eNOS로 혈관을 회복하고, GABA로 수면을 되살리며, 항염증으로 갱년기 증상의 연쇄를 차단합니다. 호르몬 치료 없이 몸 안에서부터 회복합니다.',
      timeline: [
        { week: '관리 1~2주', body: 'eNOS 활성 → 혈관 이완 → 열감·상열감 완화 시작. GABA 활성 → 수면의 질 향상. 피로감 감소.' },
        { week: '관리 3~4주', body: '골반 혈류 개선 체감. 건조감 완화 시작. 감정 기복 안정. 피부 광택 회복 느낌.' },
        { week: '관리 2~3개월', body: '열감·야간 발한 빈도 감소. 수면 깊이 향상. 성욕·활력 회복. 전반적 갱년기 증상 완화 체감.' },
      ],
      points: [
        { icon: '🌸', color: '#BE185D', title: 'eNOS 62% 활성화 — 에스트로겐 감소로 경직된 혈관을 회복', body: '에스트로겐은 혈관 eNOS를 보호합니다. 감소하면 혈관이 경직되고 열감·두통·혈압 상승이 옵니다. 플로로탄닌의 eNOS 62% 직접 활성화로 에스트로겐 없이도 혈관 이완·탄성을 회복(Nutrients 2022).' },
        { icon: '😴', color: '#7C3AED', title: 'GABA-A 수용체 활성 — 갱년기 불면의 뿌리를 끊다', body: '갱년기 불면은 에스트로겐 감소 → GABA 수용체 민감도 저하 때문입니다. 플로로탄닌이 GABA-A 수용체에 직접 결합해 자연스러운 수면 회복. 수면제 의존 없이 깊은 수면을 되찾습니다.' },
        { icon: '🔥', color: '#F97316', title: 'NF-κB·NLRP3 이중 차단 — 갱년기 염증 폭풍 진압', body: '에스트로겐 감소 → 체내 염증 증가 → 열감·관절통·피부 트러블·감정 기복 악화. NF-κB·NLRP3 이중 차단으로 갱년기 염증 환경 자체를 억제. 열감·통증·피부 동시 개선.' },
        { icon: '💎', color: '#EC4899', title: 'MMP-1 억제 + 티로시나제 억제 — 에스트로겐 감소로 급격해진 피부 노화 차단', body: '에스트로겐 감소 → MMP 활성화 → 콜라겐 급속 분해. MMP-1 68% 억제 + 티로시나제 억제(코직산 3배)로 주름·기미·피부 처짐을 동시에 차단. 갱년기 피부 노화를 늦춥니다.' },
        { icon: '🧠', color: '#0A9BAD', title: '뇌 혈류·인지력 보호 — 갱년기 brain fog 해소', body: '에스트로겐 감소로 뇌 혈류가 줄면 집중력 저하·건망증·우울감이 옵니다. eNOS 활성으로 뇌 혈류 회복 + AChE 억제로 인지 신경전달물질 보존. 갱년기 뇌 안개(brain fog)를 해소합니다.' },
      ],
      refs: ['Lee SH et al. Nutrients 2022', 'Park S et al. Marine Drugs 2021', 'Kim MM et al. Marine Drugs 2012'],
      systemMsg: '에스트로겐 감소 → 혈관·수면·염증·피부·뇌 동시 흔들림\n플로로탄닌은 이 5가지 연결 고리를 동시에 회복합니다.',
      p2headline: '호르몬 치료 없이 갱년기를 넘을 수 있습니다',
      compare: [
        { left: '호르몬 치료(HRT) → 효과적이나 유방암·혈전 위험', right: '플로로탄닌 → eNOS+GABA+항염+피부 기전, 부작용 없음' },
        { left: '블랙코호시 → 열감만, 혈관·뇌·피부 기전 없음', right: '플로로탄닌 → 열감+수면+혈관+피부+뇌 동시 작용' },
        { left: '이소플라본 → 에스트로겐 유사, 흡수·효과 불안정', right: '플로로탄닌 → 에스트로겐 없이 혈관·수면 직접 기전 작용' },
        { left: '수면제 → 의존성, 깊은 수면 방해', right: '플로로탄닌 → GABA 자연 이완, 수면 깊이 회복' },
      ],
      targets: ['폐경 전후 열감·발한·불면이 심한 분', '갱년기 감정 기복·우울감이 걱정되는 분', '성욕 저하·건조감이 생긴 40~60대 여성', '호르몬 치료 부작용이 걱정되는 분', '갱년기와 함께 피부 노화·탈모가 빨라진 분', '갱년기 증상을 자연스럽게 극복하고 싶은 분'],
      ctaMsg: '지금 전화하시면\n여성 갱년기 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── CANCER_ALL : 모든 암 통합 — 암은 하나의 몸에서 온다 ────── */
    cancer_all: {
      urgency: '암은 폐암·간암·유방암이 따로 오지 않습니다 — 모두 하나의 몸에서 같은 뿌리로 시작됩니다',
      headline: ['어떤 암이든 뿌리는 같습니다', '산화·염증·면역저하·혈관신생', '이 4가지가 모든 암의 공통 경로입니다'],
      accentLine: '암 종류는 달라도 발생 기전은 하나 — 뿌리를 차단하면 모든 암에 적용됩니다',
      intro: '폐암·간암·대장암·유방암·췌장암·전립선암. 이름은 다르지만 몸 안에서 일어나는 일은 같습니다. 활성산소가 DNA를 손상시키고, 만성 염증이 암 미세환경을 만들고, 면역이 지쳐 이상 세포를 놓치고, 종양이 혈관을 만들어 자라납니다. 플로로탄닌은 암 종류에 관계없이 이 4가지 공통 뿌리를 동시에 차단합니다.',
      timeline: [
        { week: '관리 1~2주', body: '강력한 항산화로 DNA 산화 손상 감소 시작. 만성 피로·염증 완화. 면역 에너지 회복 체감.' },
        { week: '관리 3~4주', body: 'Nrf2 세포 방어막 형성. NK세포 활성 향상. 혈관 염증 감소. 전신 컨디션 개선.' },
        { week: '관리 2~3개월', body: '4중 기전 누적. 면역 감시 강화. 종양 미세환경 개선. 항산화·항염 지표 안정화.' },
      ],
      points: [
        { icon: '⚡', color: '#7C2D12', title: '뿌리 ① 산화 — DNA 손상의 원인을 원천 제거', body: '활성산소가 DNA를 공격해 돌연변이를 만드는 것이 암화의 첫 단계. DPPH IC₅₀ 0.06 mg/mL, 비타민C 대비 10~15배 강한 항산화력으로 DNA 산화 손상 자체를 차단. 어떤 암이든 시작점을 막습니다.' },
        { icon: '🔥', color: '#B45309', title: '뿌리 ② 염증 — 모든 암이 자라는 미세환경 제거', body: '만성 저등급 염증은 암세포가 생존·증식하는 환경을 만듭니다. NF-κB·NLRP3 이중 차단으로 TNF-α 68%·IL-6 54%·IL-1β 74% 억제. 암의 온상 자체를 없앱니다. 폐·간·장·유방 어느 부위든 동일하게 작용.' },
        { icon: '⚔️', color: '#065F46', title: '뿌리 ③ 면역저하 — 이상 세포를 놓치지 않는 감시망 복원', body: 'NK세포 활성 향상으로 하루 수천 개 생기는 이상 세포를 빠짐없이 제거. Nrf2 활성화로 세포 자체 방어막 최대화. 면역 감시망이 촘촘해지면 암 종류에 무관하게 초기 이상 세포 제거 능력이 회복됩니다.' },
        { icon: '🔬', color: '#1E3A5F', title: '뿌리 ④ 혈관신생 — 종양 영양 공급 경로 차단', body: '종양은 VEGF를 분비해 자체 혈관을 만들고 영양을 공급받아 자랍니다. 플로로탄닌의 VEGF 억제로 이 혈관신생을 차단. 폐암·간암·유방암·대장암 모두 동일한 혈관신생 기전을 사용합니다.' },
        { icon: '💥', color: '#6B21A8', title: '결과 — 암세포만 선택적 아포토시스, 정상세포 완전 보호', body: '췌장암·유방암·대장암·간암 세포에서 Bax/Bcl-2 비율 조절로 미토콘드리아 경로 아포토시스 유도. 정상 세포에는 독성 전혀 없음(Antioxidants 2023). 암 종류가 달라도 아포토시스 경로는 공통입니다.' },
      ],
      refs: ['Park SY et al. Antioxidants 2023', 'Wijesinghe et al. Marine Drugs 2021', 'Sugiura Y et al. Antioxidants 2020'],
      systemMsg: '산화 → 염증 → 면역저하 → 혈관신생\n이 4가지가 모든 암의 공통 뿌리입니다. 뿌리를 차단하면 어떤 암에도 적용됩니다.',
      p2headline: '암 종류별로 다른 약이 필요하지 않습니다 — 뿌리는 하나입니다',
      compare: [
        { left: '암 종류별 표적치료 → 특정 암만, 뿌리 해결 없음', right: '플로로탄닌 → 산화·염증·면역·혈관 4가지 뿌리 동시 차단' },
        { left: '비타민C 고용량 → 산화만, 염증·면역·혈관신생 없음', right: '플로로탄닌 → 4대 암 공통 뿌리 전체 동시 작용' },
        { left: '면역 보조제 → 면역만, 산화·염증·혈관 기전 없음', right: '플로로탄닌 → NK세포+Nrf2+NF-κB+VEGF 동시' },
        { left: '항산화 복합제 → 수치 보충, 암 환경 차단 없음', right: '플로로탄닌 → DNA 보호+암 미세환경 제거+선택적 제거' },
      ],
      targets: ['암 가족력이 있어 어떤 암이든 예방하고 싶은 분', '암 진단 후 재발 예방·환경 개선이 목표인 분', '항암 치료와 병행해 뿌리부터 관리하고 싶은 분', '만성 염증·면역 저하로 암 위험이 높다고 느끼는 분', '특정 암이 아닌 전반적 세포 보호가 목표인 분', '가족 중 암 환자가 있어 예방을 시작하려는 분'],
      ctaMsg: '지금 전화하시면\n암 뿌리 차단 1:1 맞춤 상담을 드립니다',
    },

    /* ────── CANCER_COMBO_1 : 암 예방·세포 보호 통합 ────── */
    cancer_combo_1: {
      urgency: '암은 어느 날 갑자기 오지 않습니다 — 세포 변이는 지금 이 순간도 진행 중입니다',
      headline: ['활성산소가 DNA를 공격하고', '면역이 지쳐 이상 세포를', '놓치는 순간 암이 됩니다'],
      accentLine: '암 발생의 30~35%는 식이·생활습관으로 예방 가능 — WHO 공식 발표',
      intro: '하루에도 수천 개의 이상 세포가 생겨납니다. 건강한 면역 시스템은 이것을 즉시 제거합니다. 문제는 만성 염증·산화 스트레스·면역 저하가 동시에 누적될 때입니다. 플로로탄닌은 ①활성산소 원천 차단 ②Nrf2 세포 방어막 최대화 ③NK세포 감시 강화 ④암세포 선택적 아포토시스 4중 기전으로 암을 예방하고 정상 세포를 지킵니다.',
      timeline: [
        { week: '관리 1~2주', body: '강력한 항산화 작용 시작. DNA 산화 손상 감소. 만성 피로·염증 완화로 면역 에너지 회복.' },
        { week: '관리 3~4주', body: 'Nrf2 경로 활성화 → 세포 자체 방어막 형성. NK세포 활성 향상 체감. 전신 컨디션 개선.' },
        { week: '관리 2~3개월', body: '면역 감시 기능 강화. 항산화·항염 수치 누적 개선. 세포 수준 보호 지속 강화.' },
      ],
      points: [
        { icon: '⚡', color: '#10B981', title: 'DPPH IC₅₀ 0.06 mg/mL — 비타민C 대비 10~15배 항산화', body: '활성산소 → DNA 돌연변이 → 암화 연쇄를 강력한 항산화력으로 차단. DPPH·ABTS 복수 지표 모두 비타민C·E·레스베라트롤을 압도. DNA 손상 원인 자체를 제거합니다.' },
        { icon: '🛡️', color: '#0A9BAD', title: 'Nrf2 마스터 스위치 — 세포 방어막을 최대로 끌어올리다', body: '세포 내 마스터 항산화 전사인자 Nrf2를 직접 활성화. HO-1·NQO1·GST 해독 효소 군을 유도. 세포가 스스로 발암물질을 해독하고 DNA 손상을 수복하는 능력을 최대화합니다.' },
        { icon: '⚔️', color: '#7C3AED', title: 'NK세포 활성 강화 — 면역 감시망을 촘촘하게', body: '자연살해세포(NK Cell)의 활성을 높여 이상 세포 발견·제거 능력 강화. 하루 수천 개 생기는 이상 세포를 면역이 놓치지 않도록 감시망을 복원합니다.' },
        { icon: '💥', color: '#EC4899', title: '암세포 선택적 아포토시스 — 정상세포는 완전 보호', body: '췌장암·유방암·대장암·간암 세포에서만 미토콘드리아 경로 아포토시스 유도. Bax/Bcl-2 비율 조절로 이상 세포만 선택적 제거. 정상 세포에는 독성이 전혀 없습니다(Antioxidants 2023).' },
        { icon: '🔥', color: '#F97316', title: 'NF-κB·NLRP3 이중 차단 — 암을 키우는 만성 염증 제거', body: '만성 저등급 염증은 암의 미세환경을 만듭니다. NF-κB p65 핵 이전 완전 차단 + NLRP3 억제로 종양 촉진 염증 환경 자체를 해소합니다. TNF-α 68%, IL-6 54%, IL-1β 74% 억제.' },
      ],
      refs: ['Park SY et al. Antioxidants 2023', 'Sugiura Y et al. Antioxidants 2020', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '활성산소 → DNA 손상 → 면역 저하 → 암화\n이 연쇄를 4중 기전으로 동시에 차단합니다.',
      p2headline: '암 예방, 단일 항산화제 하나로는 불가능합니다',
      compare: [
        { left: '비타민C → 단독 항산화, Nrf2·NK세포 작용 없음', right: '플로로탄닌 → 10~15배 항산화 + Nrf2 + NK세포 동시' },
        { left: '셀레늄 → 항산화 보조, 선택적 아포토시스 없음', right: '플로로탄닌 → DNA 보호 + 암세포 선택적 제거까지' },
        { left: '후코이단 → 면역 지지, 암세포 선택성 약함', right: '플로로탄닌 → 정상세포 완전 보호 + 이상세포만 제거' },
        { left: '항산화 복합제 → 수치 보충, 기전 작용 미약', right: '플로로탄닌 → Nrf2 스위치 직접 ON, 세포 방어막 최대화' },
      ],
      targets: ['암 가족력이 있어 예방이 최우선인 분', '활성산소·산화 스트레스 관리가 목표인 분', 'Nrf2 경로 세포 보호에 관심 있는 분', '면역력 저하·잦은 잔병치레가 걱정되는 분', '만성 염증이 있어 암 위험이 높은 분', '항암 이후 재발 예방 관리가 필요한 분'],
      ctaMsg: '지금 전화하시면\n암 예방 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── CANCER_COMBO_2 : 항암 치료 중·후 통합 보조 ────── */
    cancer_combo_2: {
      urgency: '항암 치료 중 면역이 무너지면 치료도 멈춥니다 — 면역을 지키는 것이 치료의 전제조건',
      headline: ['항암제는 암세포와 함께', '면역세포도 죽입니다', '치료 중에도 면역을 지켜야 합니다'],
      accentLine: '항암 치료 부작용 1위 — 면역 저하로 인한 감염, 이것이 치료 중단의 주범',
      intro: '항암 화학요법과 방사선은 암세포와 함께 정상 세포, 특히 면역세포를 공격합니다. 면역이 무너지면 폐렴·패혈증 위험이 급증하고 치료를 중단해야 할 수 있습니다. 플로로탄닌은 항암 치료 중에도 ①정상세포 보호(Nrf2) ②NK세포 기능 유지 ③항암 효과 보조(아포토시스) ④강력한 항산화로 치료 독성 완화를 동시에 지원합니다.',
      timeline: [
        { week: '관리 1~2주', body: '항산화 작용으로 치료 독성 완화 시작. 오심·구역 감소 보고. 만성 피로 완화. 전신 컨디션 향상.' },
        { week: '관리 3~4주', body: 'Nrf2 활성 → 정상세포 방어막 강화. NK세포 회복 체감. 상처·구내염 회복 빨라짐.' },
        { week: '관리 2~3개월', body: 'NK세포·면역 지표 개선. 반복 감염 빈도 감소. 치료 지속력 향상. 재발 예방 관리 시작.' },
      ],
      points: [
        { icon: '🛡️', color: '#10B981', title: 'Nrf2 경로 — 항암제·방사선으로부터 정상세포를 지키다', body: 'Nrf2 활성화 → HO-1·NQO1·GST 해독 효소 유도 → 항암제 독성으로부터 정상 세포 보호. 간·신장·골수세포 손상을 줄여 치료를 끝까지 유지할 수 있도록 돕습니다.' },
        { icon: '💪', color: '#0A9BAD', title: 'NK세포 활성 유지 — 치료 중 면역 감시망 유지', body: '항암 치료로 저하된 NK세포 기능을 보완·유지. 자연살해세포가 이상 세포를 감시·제거하는 능력을 유지해 치료 효과와 면역 방어를 동시에 지킵니다.' },
        { icon: '⚔️', color: '#7C3AED', title: '암세포 선택적 아포토시스 — 항암 효과를 보조하다', body: 'Bax/Bcl-2 비율 조절로 암세포에서만 아포토시스 유도. 항암제의 종양 세포 사멸 효과를 천연 성분으로 보조. 정상세포는 완전히 보호(Antioxidants 2023).' },
        { icon: '🔬', color: '#EC4899', title: 'VEGF 억제 — 종양 혈관신생 차단 보조', body: '종양이 자체 혈관을 만들어 영양을 공급받는 혈관신생을 억제. 기존 항암 치료의 VEGF 억제 기전을 천연 성분으로 동시에 보완. 종양 성장 속도를 늦춥니다.' },
        { icon: '⚡', color: '#B8953A', title: '10~15배 항산화 — 치료 중 급증하는 활성산소 소거', body: '항암 치료 과정에서 급증하는 활성산소를 비타민C 대비 10~15배 강한 항산화력으로 소거. DNA 2차 손상·정상세포 산화 손상을 방지하고 치료 독성 부작용을 완화합니다.' },
      ],
      refs: ['Park SY et al. Antioxidants 2023', 'Sugiura Y et al. Antioxidants 2020', 'Wijesinghe et al. Marine Drugs 2021'],
      systemMsg: '항암 치료 효과 = 암세포 사멸 × 면역 유지\n플로로탄닌은 치료 효과를 높이고 정상세포를 보호합니다.',
      p2headline: '항암 치료 중에도 면역을 포기할 수 없습니다',
      compare: [
        { left: '비타민C 고용량 → 항산화만, NK세포·아포토시스 없음', right: '플로로탄닌 → Nrf2+NK세포+아포토시스 보조 3중' },
        { left: '버섯 추출물(베타글루칸) → 면역 보조', right: '플로로탄닌 → NK세포 직접 활성+VEGF 억제+Nrf2 동시' },
        { left: '후코이단 → 면역 지지, 암세포 선택성 약함', right: '플로로탄닌 → 정상세포 완전보호 + 암세포 선택제거' },
        { left: '항산화 복합제 → 일반 항산화, Nrf2 직접 활성 없음', right: '플로로탄닌 → Nrf2 마스터 스위치 직접 ON' },
      ],
      targets: ['항암 치료(화학·방사선) 중인 분', '항암 치료 후 재발 예방·면역 회복 중인 분', '항암 부작용(피로·구역·면역저하) 완화가 필요한 분', '암 수술 후 회복 중인 분', '항암 치료 지속력을 높이고 싶은 분', '가족의 항암 치료를 돕고 싶은 분'],
      ctaMsg: '지금 전화하시면\n항암 보조 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ════════════════════════════════════════════════
       회복 전용 2종 — "우리 몸은 하나다, 결국 회복이다"
    ════════════════════════════════════════════════ */

    /* ────── RECOVERY_1 : 전신 회복 — 몸은 하나의 시스템이다 ────── */
    recovery_1: {
      urgency: '몸이 회복되지 않는 이유는 하나를 고치면서 다른 하나를 놓치기 때문입니다',
      headline: ['혈당을 잡아도 혈관이 망가지고', '염증을 꺼도 장이 무너지고', '결국 몸은 하나의 시스템입니다'],
      accentLine: '부분을 치료해서는 전체가 회복되지 않는다 — 연결된 시스템을 동시에 회복해야 합니다',
      intro: '혈당·혈관·뇌·면역·장·피부는 분리된 기관이 아닙니다. 혈당이 올라가면 혈관이 손상되고, 혈관이 손상되면 뇌로 가는 혈류가 줄고, 장이 무너지면 염증이 전신으로 퍼집니다. 하나가 무너지면 전체가 흔들립니다. 플로로탄닌은 6개의 시스템 연결고리를 동시에 지지해 몸이 스스로 회복하는 능력을 되살립니다.',
      timeline: [
        { week: '관리 1~2주', body: '항산화·항염증 동시 시작. 만성 피로 완화. 수면의 질 향상. 소화 편안해짐. 몸이 가벼워지는 느낌.' },
        { week: '관리 3~4주', body: '혈당 안정·혈관 이완·염증 감소 연쇄 시작. 관절·피부 컨디션 개선. 두통·어깨 경직 감소.' },
        { week: '관리 2~3개월', body: '전신 지표 동반 개선. 혈압·혈당·콜레스테롤 수치 변화. 피부 탄력·기억력 회복. 몸 전체가 달라지는 체감.' },
      ],
      points: [
        { icon: '🔗', color: '#0A7E8C', title: '혈당 → 혈관 연결 회복 — 대사의 첫 고리를 잡다', body: 'α-글루코시다제 억제로 식후 혈당 스파이크 차단 → 혈관 내피 포도당 손상 방지 → eNOS 62% 활성화로 혈관 탄성 회복. 대사 시스템의 첫 번째 연결 고리를 복원합니다.' },
        { icon: '🔥', color: '#F97316', title: '염증 → 전신 연결 회복 — 불을 끄면 모든 것이 달라진다', body: 'NF-κB·NLRP3 이중 차단으로 전신 만성 염증 소화. 혈관 염증 → 뇌 염증 → 장 염증 → 피부 염증의 연쇄를 동시에 끕니다. 염증이 꺼지면 회복의 공간이 열립니다.' },
        { icon: '🧠', color: '#7C3AED', title: '뇌 → 수면 연결 회복 — 밤에 청소해야 낮에 작동한다', body: 'BACE1 억제로 뇌 독소 생성 차단 + GABA-A 활성으로 수면 질 회복 → 글림파틱 청소 시간 확보 → 아침에 개운한 뇌. 수면이 회복되면 인지력·면역·호르몬이 함께 회복됩니다.' },
        { icon: '🦠', color: '#06B6D4', title: '장 → 면역 연결 회복 — 70%의 면역은 장에서 만들어진다', body: 'Akkermansia 3.2배 증식 → 장벽 강화 → LPS 35% 감소 → 전신 염증 해소 → 면역 정상화 → NK세포 활성 → 피부·혈당·뇌 연쇄 회복. 장이 살아나면 모든 것이 따라옵니다.' },
        { icon: '✨', color: '#EC4899', title: '피부 → 노화 연결 회복 — 안에서부터 젊어지다', body: 'MMP-1 68% 억제로 콜라겐 분해 차단 + 10~15배 항산화로 세포 산화 노화 방지 + 티로시나제 억제로 미백. 피부는 전신 회복의 거울입니다. 몸이 회복되면 피부가 먼저 반응합니다.' },
      ],
      refs: ['Kim MJ et al. Marine Drugs 2022', 'Wijesinghe et al. Marine Drugs 2021', 'Jung HA et al. Nutrients 2024'],
      systemMsg: '혈당 → 혈관 → 뇌 → 면역 → 장 → 피부\n하나를 회복하면 전체가 따라옵니다.',
      p2headline: '왜 하나씩 고쳐도 몸이 회복되지 않을까요?',
      compare: [
        { left: '혈당약+혈압약+수면제 각각 → 연결 회복 없음', right: '플로로탄닌 → 6개 시스템 연결 동시 회복' },
        { left: '종합영양제 → 결핍 보충, 기전 연결 없음', right: '플로로탄닌 → 분자 기전으로 시스템 연결 복원' },
        { left: '유산균+콜라겐+오메가3 → 각각 단독 효과', right: '플로로탄닌 → 장-피부-혈관-뇌 동시 연결 회복' },
        { left: '단순 항산화제 → 산화만, 회복 기전 없음', right: '플로로탄닌 → 세포 스스로 회복하는 능력 복원' },
      ],
      targets: ['여러 성분을 따로 먹지만 몸이 나아지지 않는 분', '40대 이후 전신 회복력이 떨어진 분', '만성 피로·전신 무기력이 수년째 지속되는 분', '혈당·혈압·수면 등 여러 문제가 동시에 있는 분', '몸이 스스로 회복하는 능력을 되찾고 싶은 분', '근본부터 몸을 바꾸고 싶은 50~70대'],
      ctaMsg: '지금 전화하시면\n전신 회복 타입별 1:1 맞춤 상담을 드립니다',
    },

    /* ────── RECOVERY_2 : 노화 역행·세포 재생 — 세포부터 젊어진다 ────── */
    recovery_2: {
      urgency: '노화는 시간이 지나서 오는 것이 아닙니다 — 세포가 회복을 포기할 때 옵니다',
      headline: ['나이보다 빨리 늙는다면', '그것은 세포가 보내는', '회복 포기 선언입니다'],
      accentLine: '세포 노화의 3대 원인: 산화 누적 · 텔로미어 단축 · 미토콘드리아 기능 저하',
      intro: '우리 몸의 37조 개 세포는 매일 스스로를 수복합니다. 그런데 산화 스트레스가 누적되고, 미토콘드리아가 지치고, 세포 자체 방어막이 무너지면 수복이 실패합니다. 그 결과가 노화입니다. 플로로탄닌은 세포가 스스로 회복하는 능력을 분자 수준에서 되살립니다. 바깥에서 영양을 채우는 것이 아니라, 안에서 회복 능력을 켜는 것입니다.',
      timeline: [
        { week: '관리 1~2주', body: '세포 산화 손상 감소 시작. 미토콘드리아 에너지 회복 → 만성 피로 감소. 수면 깊이 향상.' },
        { week: '관리 3~4주', body: 'Nrf2 활성 → 세포 방어막 강화. 피부 광택 회복. 관절·근육 회복 속도 향상 체감.' },
        { week: '관리 2~3개월', body: '전신 세포 레벨 회복 누적. 피부 나이·혈관 나이·뇌 기능 동반 향상. 몸이 5년 젊어지는 체감.' },
      ],
      points: [
        { icon: '⚡', color: '#B8953A', title: '10~15배 항산화 — 37조 세포의 산화 누적을 되돌리다', body: 'DPPH IC₅₀ 0.06 mg/mL, 비타민C 대비 10~15배. 매일 쌓이는 세포 산화 손상을 강력하게 소거. 산화 누적이 줄어들면 세포 수명이 연장되고 노화 속도가 느려집니다.' },
        { icon: '🔋', color: '#10B981', title: 'Nrf2 → 미토콘드리아 복원 — 세포 에너지의 발전소를 고치다', body: 'Nrf2 활성화 → 미토콘드리아 생합성 촉진 → 세포 ATP 생산 효율 회복. 미토콘드리아가 살아나면 피로가 사라지고, 세포 수복 능력이 살아납니다. 노화의 핵심 기전 복원.' },
        { icon: '🧬', color: '#7C3AED', title: '세포 자가포식(Autophagy) 지원 — 세포가 스스로 청소한다', body: '손상된 세포 내 소기관을 분해·재활용하는 자가포식 과정을 지원. 세포 내 쓰레기 제거 → 새로운 세포 구성요소 합성 → 세포 젊음 회복. 노화 세포의 자기 청소 능력 복원.' },
        { icon: '🔥', color: '#E05050', title: '만성 염증 소거 — 노화를 가속하는 Inflammaging 차단', body: '"Inflammaging(염증 노화)" — 만성 저등급 염증이 노화를 10배 가속합니다. NF-κB·NLRP3 이중 차단으로 인플라메이징을 차단. 염증이 꺼지면 노화 시계가 늦춰집니다.' },
        { icon: '🌊', color: '#06B6D4', title: '장-전신 회복 축 — 장이 회복되면 전신이 젊어진다', body: 'Akkermansia 3.2배 증식 → 장벽 강화 → LPS 감소 → 전신 대사성 염증 해소 → 혈당·혈관·뇌·피부 연쇄 회복. 장 마이크로바이옴은 노화 역행의 핵심 축입니다.' },
      ],
      refs: ['Wijesinghe et al. Marine Drugs 2021', 'Park SY et al. Antioxidants 2023', 'Jung HA et al. Nutrients 2024'],
      systemMsg: '세포가 스스로 회복하면 몸 전체가 젊어집니다.\n플로로탄닌은 세포 회복의 스위치를 켭니다.',
      p2headline: '안티에이징, 바르고 먹는 것으로는 한계가 있습니다',
      compare: [
        { left: 'NMN·NAD+ → 미토콘드리아 보조, 다중 기전 없음', right: '플로로탄닌 → Nrf2로 미토콘드리아+세포방어 동시 복원' },
        { left: '레스베라트롤 → 단일 항산화, 흡수율 불안정', right: '플로로탄닌 → 10~15배 강력 + Nrf2 + 자가포식 지원' },
        { left: '콜라겐·히알루론산 → 외부 보충, 세포 회복 없음', right: '플로로탄닌 → 세포 스스로 콜라겐 분해 막고 합성 촉진' },
        { left: '항노화 종합제 → 성분 나열, 시너지 없음', right: '플로로탄닌 → 단일 분자로 노화 기전 전체 연동 차단' },
      ],
      targets: ['나이보다 빨리 늙는다는 느낌을 받는 분', '만성 피로가 수년째 해결되지 않는 분', 'NMN·NAD+·레스베라트롤에 관심 있는 분', '세포 수준 안티에이징을 원하는 40~70대', '전신 노화 속도를 늦추고 싶은 분', '몸이 스스로 회복하는 능력을 되찾고 싶은 분'],
      ctaMsg: '지금 전화하시면\n노화 역행 타입별 1:1 맞춤 상담을 드립니다',
    },

  }
  return DB[cat] || DB['basic']
}

/* ════════════════════════════════════════════════
   PDF 1페이지  (W=794 H=1123)
════════════════════════════════════════════════ */
function PdfPage1({ mat, id }) {
  const c = getContent(mat.category)
  return (
    <div id={`pdf-p1-${id}`} style={{
      width: 794, height: 1123, position: 'relative', overflow: 'hidden',
      background: '#ffffff',
      fontFamily: "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",
      boxSizing: 'border-box', padding: '32px 44px 32px', color: '#1a1a2e',
    }}>
      {/* 브랜드 바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 10, borderBottom: `3px solid ${mat.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>{mat.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: mat.color, letterSpacing: '2px' }}>PHLOROTANNIN PARTNERS</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, padding: '3px 12px', borderRadius: 99, background: mat.color, color: '#fff' }}>{mat.badge}</span>
      </div>

      {/* 긴급 메시지 */}
      <div style={{ background: `${mat.color}15`, border: `1.5px solid ${mat.color}50`, borderRadius: 8, padding: '7px 14px', marginBottom: 12 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: mat.color, margin: 0 }}>⚠️ {c.urgency}</p>
      </div>

      {/* 헤드라인 */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 15, color: '#888', margin: '0 0 3px', lineHeight: 1.4 }}>{c.headline[0]}</p>
        <h1 style={{ fontSize: 38, fontWeight: 900, color: NAVY, lineHeight: 1.15, margin: '0 0 2px' }}>{c.headline[1]}</h1>
        <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.15, margin: '0 0 10px', color: mat.color }}>{c.headline[2]}</h1>
        <div style={{ display: 'inline-block', background: mat.color, color: '#fff', fontSize: 13, fontWeight: 800, padding: '4px 14px', borderRadius: 6 }}>{c.accentLine}</div>
      </div>

      {/* 인트로 */}
      <div style={{ background: '#f8f9fc', borderLeft: `5px solid ${mat.color}`, borderRadius: '0 10px 10px 0', padding: '10px 16px', marginBottom: 12 }}>
        <p style={{ fontSize: 14, color: '#333', lineHeight: 1.75, margin: 0 }}>{c.intro}</p>
      </div>

      {/* 타임라인 */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
          <div style={{ width: 4, height: 18, background: mat.color, borderRadius: 2 }} />
          <p style={{ fontSize: 14, fontWeight: 900, color: NAVY, margin: 0 }}>⏱ 관리 후 실제 체감 변화 타임라인</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {c.timeline.map((t, i) => (
            <div key={i} style={{ flex: 1, background: i === 0 ? `${mat.color}12` : i === 1 ? `${mat.color}20` : `${mat.color}30`, borderRadius: 10, padding: '9px 11px', border: `1.5px solid ${mat.color}${i === 0 ? '30' : i === 1 ? '50' : '80'}` }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: mat.color, margin: '0 0 4px' }}>📅 {t.week}</p>
              <p style={{ fontSize: 12, color: '#444', lineHeight: 1.6, margin: 0 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 기전 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 4, height: 18, background: mat.color, borderRadius: 2 }} />
        <p style={{ fontSize: 14, fontWeight: 900, color: NAVY, margin: 0 }}>🔬 과학이 증명한 {c.points.length}가지 핵심 기전</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {c.points.map((pt, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#f8f9fc', borderLeft: `5px solid ${pt.color}`, borderRadius: '0 10px 10px 0', padding: '9px 14px' }}>
            <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>{pt.icon}</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 900, color: pt.color, margin: '0 0 3px' }}>{String(i + 1).padStart(2, '0')}. {pt.title}</p>
              <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, margin: 0 }}>{pt.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 참고문헌 */}
      <div style={{ position: 'absolute', bottom: 14, left: 44, right: 44, padding: '7px 12px', background: '#f0f2f5', borderRadius: 8, border: '1px solid #dde' }}>
        <p style={{ fontSize: 11, color: '#888', margin: 0 }}>📚 참고: {c.refs.join(' · ')} &nbsp;|&nbsp; 1 / 2</p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   PDF 2페이지  (W=794 H=1123)
════════════════════════════════════════════════ */
function PdfPage2({ mat, name, tel, url, id, qrDataUrl }) {
  const c = getContent(mat.category)
  return (
    <div id={`pdf-p2-${id}`} style={{
      width: 794, height: 1123, position: 'relative', overflow: 'hidden',
      background: '#ffffff',
      fontFamily: "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",
      boxSizing: 'border-box', padding: '32px 44px 32px', color: '#1a1a2e',
    }}>
      {/* 브랜드 바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 10, borderBottom: `3px solid ${mat.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>{mat.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: mat.color, letterSpacing: '2px' }}>PHLOROTANNIN PARTNERS</span>
        </div>
        <span style={{ fontSize: 12, color: '#999', fontWeight: 700 }}>2 / 2</span>
      </div>

      {/* 시스템 연결 메시지 */}
      <div style={{ background: `${mat.color}12`, border: `2px solid ${mat.color}60`, borderRadius: 10, padding: '10px 16px', marginBottom: 14, textAlign: 'center' }}>
        <p style={{ fontSize: 15, fontWeight: 900, color: NAVY, margin: '0 0 4px' }}>🔗 몸은 하나의 연결된 시스템입니다</p>
        {c.systemMsg.split('\n').map((line, i) => (
          <p key={i} style={{ fontSize: 14, color: i === 1 ? mat.color : '#444', fontWeight: i === 1 ? 800 : 400, margin: '2px 0 0', lineHeight: 1.6 }}>{line}</p>
        ))}
      </div>

      {/* p2 헤드라인 */}
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, lineHeight: 1.2, margin: '0 0 6px' }}>{c.p2headline}</h2>
        <div style={{ width: 50, height: 3, background: mat.color, borderRadius: 2 }} />
      </div>

      {/* 비교표 */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 14, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>💡 다른 성분들과 무엇이 다른가?</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ background: '#f0f2f5', padding: '9px 14px', fontSize: 13, fontWeight: 800, color: '#666', textAlign: 'left', border: '1px solid #dde', width: '46%' }}>기존 성분</th>
              <th style={{ background: `${mat.color}20`, padding: '9px 14px', fontSize: 13, fontWeight: 800, color: mat.color, textAlign: 'left', border: '1px solid #dde', width: '54%' }}>✅ 플로로탄닌</th>
            </tr>
          </thead>
          <tbody>
            {c.compare.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 14px', fontSize: 13, color: '#666', border: '1px solid #eee', background: i % 2 === 0 ? '#fafafa' : '#fff' }}>{row.left}</td>
                <td style={{ padding: '8px 14px', fontSize: 13, color: NAVY, fontWeight: 700, border: '1px solid #eee', background: i % 2 === 0 ? `${mat.color}08` : `${mat.color}04` }}>{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 추천 대상 */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 14, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>✅ 이런 분들께 강력히 추천합니다</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {c.targets.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px', background: `${mat.color}08`, borderRadius: 8, border: `1.5px solid ${mat.color}25` }}>
              <span style={{ color: mat.color, fontSize: 15, flexShrink: 0, fontWeight: 900, lineHeight: 1.4 }}>✓</span>
              <p style={{ fontSize: 13, color: '#333', lineHeight: 1.55, margin: 0, fontWeight: 600 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 면책 */}
      <div style={{ padding: '8px 14px', background: '#f8f8f8', borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#999', lineHeight: 1.6, margin: 0 }}>
          ⚠️ 본 자료는 플로로탄닌 관련 연구 정보를 정리한 교육용 자료입니다. 특정 제품의 효능·효과를 보증하거나 질병의 예방·치료를 목적으로 하지 않습니다. 질환이 있거나 약물 복용 중인 경우 전문가 상담 후 판단하시기 바랍니다.
        </p>
      </div>

      {/* 파트너 박스 — 테두리만 (배경 없음, 인쇄 절약) */}
      <div style={{ border: `3px solid ${mat.color}`, borderRadius: 16, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-block', background: mat.color, color: '#fff', fontSize: 11, fontWeight: 900, padding: '3px 12px', borderRadius: 4, letterSpacing: '2px', marginBottom: 10 }}>
            📞 무료 건강 상담
          </div>
          <p style={{ fontSize: 20, fontWeight: 900, color: NAVY, margin: '0 0 4px', lineHeight: 1.3 }}>{c.ctaMsg.split('\n')[0]}</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: mat.color, margin: '0 0 8px', lineHeight: 1.4 }}>{c.ctaMsg.split('\n')[1]}</p>
          <p style={{ fontSize: 13, color: '#555', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.6, background: `${mat.color}12`, borderRadius: 6, padding: '5px 10px' }}>
            📋 다양한 관리 시스템과 관리 사례 정보를 원하시면 파트너에게 문의하세요
          </p>
          <div>
            <p style={{ fontSize: 13, color: '#888', fontWeight: 700, margin: '0 0 2px', letterSpacing: '1px' }}>PARTNER CONTACT</p>
            <p style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 2px' }}>{name}</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: mat.color, margin: 0 }}>{tel}</p>
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <div style={{ border: `2px solid ${mat.color}`, borderRadius: 12, padding: 10, display: 'inline-block', background: '#fff' }}>
            {/* QR — dataURL <img> 방식 (html2canvas 안전 캡처) */}
            {qrDataUrl
              ? <img src={qrDataUrl} alt="QR" width={110} height={110} style={{ display: 'block' }} />
              : <QRCodeCanvas value={url} size={110} fgColor={NAVY} bgColor="#ffffff" level="M" />}
          </div>
          <p style={{ fontSize: 12, color: '#666', fontWeight: 700, margin: '6px 0 0', lineHeight: 1.4 }}>
            QR 스캔하면<br />바로 연결됩니다
          </p>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   제품 전단지 미리보기 컴포넌트 (화면 렌더용)
════════════════════════════════════════════════ */
const COL_PRODUCT = '#008299'
const NAVY_PRODUCT = '#0F2850'

function ProductPdfPage1() {
  const col = COL_PRODUCT
  const tools = [
    { label:'혈당 조절', mech:'α-글루코시다제 억제 · AMPK 활성화 → 식후 혈당 급등 완화·인슐린 감수성 개선', tc:'#008299' },
    { label:'항산화',    mech:'Nrf2 경로 활성화 · 활성산소(ROS) 소거 → 세포 스스로 방어 능력 강화',         tc:'#3C82BE' },
    { label:'항염증',    mech:'COX-2 · NF-kB · IL-6 · TNF-α 억제 → 만성 저등급 염증 근원 차단',            tc:'#1E8C5A' },
    { label:'뇌·수면',  mech:'BACE1 억제 · GABA 수용체 활성화 → 베타아밀로이드 감소·자연 수면 유도',        tc:'#8C3CB4' },
    { label:'혈관 건강', mech:'eNOS 활성화 · 산화질소(NO) 생성 → 혈관 이완·탄성 회복',                       tc:'#C8641E' },
  ]
  return (
    <div style={{ width:794, minHeight:1123, background:'#fff', padding:'28px 44px', boxSizing:'border-box', fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif", color:'#1e1e1e' }}>
      {/* 브랜드 바 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:10, borderBottom:`3px solid ${col}`, marginBottom:14 }}>
        <span style={{ fontSize:14, fontWeight:900, color:col, letterSpacing:'2px' }}>📦  PHLOROTANNIN PARTNERS</span>
        <span style={{ fontSize:12, fontWeight:800, padding:'3px 12px', borderRadius:99, background:col, color:'#fff' }}>강의 핵심 요약</span>
      </div>
      {/* 헤드라인 */}
      <div style={{ background:`${col}12`, border:`1.5px solid ${col}50`, borderRadius:8, padding:'7px 14px', marginBottom:12 }}>
        <p style={{ fontSize:14, fontWeight:800, color:col, margin:0 }}>먹기는 먹는데, 솔직히 잘 모르겠어요 — 그 이유가 있습니다</p>
      </div>
      <h1 style={{ fontSize:36, fontWeight:900, color:NAVY_PRODUCT, margin:'0 0 4px' }}>건강식품,</h1>
      <h1 style={{ fontSize:28, fontWeight:900, color:col, margin:'0 0 10px' }}>이름 말고 구조를 보셔야 합니다</h1>
      <div style={{ display:'inline-block', background:col, color:'#fff', fontSize:13, fontWeight:800, padding:'4px 14px', borderRadius:6, marginBottom:14 }}>플로로탄닌 특강 — 회복의 과학</div>
      {/* 인트로 */}
      <div style={{ background:'#f8f9fc', borderLeft:`5px solid ${col}`, borderRadius:'0 8px 8px 0', padding:'10px 16px', marginBottom:14 }}>
        <p style={{ fontSize:13, color:'#333', lineHeight:1.75, margin:0 }}>건강식품을 많이 드시는데도 아침이 무겁고, 잠을 자도 회복감이 없다면 — 이유가 있습니다. 건강식품 시장은 성분 이름은 화려한데, 그 성분이 몸에서 어떻게 작동하는지 설명이 부족합니다.</p>
      </div>
      {/* 섹션1 */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
        <div style={{ width:5, height:22, background:col, borderRadius:2 }} />
        <p style={{ fontSize:15, fontWeight:900, color:NAVY_PRODUCT, margin:0 }}>① 건강식품은 이름으로 먹는 게 아닙니다</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
        <div style={{ background:'#fff8f8', border:'2px solid #DC3C3C', borderRadius:10, padding:'12px 14px' }}>
          <p style={{ fontSize:13, fontWeight:800, color:'#C83232', margin:'0 0 6px' }}>✗  이름만 보는 방식</p>
          {['알부민 → 있어 보이니까','태란 → 병원에서 들어봤으니까','콜라겐 → 피부에 붙을 것 같으니까','비싸면 효과 있을 것 같은 느낌'].map((t,i)=>(
            <p key={i} style={{ fontSize:12, color:'#A02828', margin:'2px 0' }}>{t}</p>
          ))}
        </div>
        <div style={{ background:'#f2fcf6', border:'2px solid #1E8C5A', borderRadius:10, padding:'12px 14px' }}>
          <p style={{ fontSize:13, fontWeight:800, color:'#1E8C5A', margin:'0 0 6px' }}>✓  구조를 보는 방식</p>
          {['분자 구조가 다양한가?','몸에서 어떻게 흡수되나?','기전(메커니즘)이 연구됐나?','여러 방향으로 작동하는가?'].map((t,i)=>(
            <p key={i} style={{ fontSize:12, color:'#146E46', margin:'2px 0' }}>{t}</p>
          ))}
        </div>
      </div>
      {/* 섹션2 */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
        <div style={{ width:5, height:22, background:col, borderRadius:2 }} />
        <p style={{ fontSize:15, fontWeight:900, color:NAVY_PRODUCT, margin:0 }}>② 분자구조 — 산소 2개와 3개가 만드는 차이</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14 }}>
        {[['H₂O','물','수소2+산소1','우리가 마시는 물',col],['O₂','산소','산소 원자 2개','숨 쉬는 산소','#3C64B4'],['O₃','오존','산소 원자 3개','강한 산화력 오존','#8C3CB4']].map(([f,n,s,d,c],i)=>(
          <div key={i} style={{ background:`${c}18`, border:`1.5px solid ${c}60`, borderRadius:10, padding:'10px 12px' }}>
            <p style={{ fontSize:28, fontWeight:900, color:c, margin:'0 0 4px' }}>{f}</p>
            <p style={{ fontSize:14, fontWeight:800, color:NAVY_PRODUCT, margin:'0 0 2px' }}>{n}</p>
            <p style={{ fontSize:11, color:'#888', margin:0 }}>{s}</p>
            <p style={{ fontSize:11, color:'#888', margin:0 }}>{d}</p>
          </div>
        ))}
      </div>
      {/* 섹션3 */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
        <div style={{ width:5, height:22, background:col, borderRadius:2 }} />
        <p style={{ fontSize:15, fontWeight:900, color:NAVY_PRODUCT, margin:0 }}>③ 왜 플로로탄닌인가 — 바다의 공구함</p>
      </div>
      <div style={{ background:'#f8f9fc', borderLeft:`5px solid ${col}`, borderRadius:'0 8px 8px 0', padding:'8px 14px', marginBottom:10 }}>
        <p style={{ fontSize:12, color:'#333', lineHeight:1.7, margin:0 }}>감태(Ecklonia cava) 같은 갈조류에서 추출한 해양 폴리페놀입니다. 해조류는 도망을 못 갑니다. 햇빛·파도·염분·미생물을 그 자리에서 버텨야 합니다. 수천만 년 진화가 만든 방어 성분 — 그게 플로로탄닌입니다.</p>
      </div>
      {tools.map((t,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:10, background:'#f8f9fc', borderLeft:`5px solid ${t.tc}`, borderRadius:'0 8px 8px 0', padding:'8px 12px', marginBottom:6 }}>
          <span style={{ background:t.tc, color:'#fff', fontSize:11, fontWeight:800, padding:'2px 10px', borderRadius:99, whiteSpace:'nowrap' }}>{t.label}</span>
          <p style={{ fontSize:11, color:'#555', margin:0, lineHeight:1.5 }}>{t.mech}</p>
        </div>
      ))}
      {/* 회복 정의 */}
      <div style={{ background:`${col}12`, border:`2px solid ${col}50`, borderRadius:12, padding:'12px 18px', marginTop:12, textAlign:'center' }}>
        <p style={{ fontSize:14, fontWeight:900, color:NAVY_PRODUCT, margin:'0 0 6px' }}>회복(Recovery)이란 무엇인가</p>
        <p style={{ fontSize:12, color:'#444', lineHeight:1.8, margin:0 }}>아침이 조금 가볍다 · 잠이 조금 깊다<br />밥 먹고 난 뒤 덜 처진다 · 하루를 버티는 힘이 달라진다<br /><strong style={{ color:col }}>몸 전체의 리듬이 다시 살아나는 느낌 — 이게 회복입니다</strong></p>
      </div>
      <p style={{ fontSize:11, color:'#aaa', textAlign:'right', marginTop:8 }}>1 / 2</p>
    </div>
  )
}

function ProductPdfPage2({ name, tel, url }) {
  const col = COL_PRODUCT
  const products = [
    { num:1, name:'딜-리버-런스 K', en:'de-liver-ance-K  |  C.A.F.', price:'75,000원', size:'25ml x 7EA', slogan:'더 젊고 건강하게 — 고농축 해양 폴리페놀 액상 앰플', tags:['#감태추출물','#씨놀CAF','#액상앰플','#국산'], usage:'하루 1포(25ml) 직접 음용 또는 음료 희석. 개봉 후 냉장 보관.', pc:col },
    { num:2, name:'만나스웰 드롭', en:'MANNAS WELL DROP  |  vital drop', price:'17,000원', size:'20ml', slogan:'플로로탄닌 — 간편 휴대용 드롭 제형', tags:['#만나스웰드롭','#드롭제형','#휴대간편','#국산'], usage:'적정량을 입 안 점막에 떨어뜨려 흡수. 직사광선 피해 서늘한 곳 보관.', pc:'#3C82BE' },
    { num:3, name:'세조아 (CEJOA)', en:'SEANOL C.A.F.  |  아연+플로로탄닌 필름형', price:'78,000원', size:'175.25mg x 30매', slogan:'면역력 관리가 필수인 시대 — 구강 용해 필름형', tags:['#세조아CEJOA','#아연+플로로탄닌','#필름형','#GMP인증'], usage:'하루 1매를 혀 아래에 넣어 천천히 녹여 드세요. 물 없이 섭취 가능.', pc:NAVY_PRODUCT },
  ]
  return (
    <div style={{ width:794, minHeight:1123, background:'#fff', padding:'28px 44px', boxSizing:'border-box', fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif", color:'#1e1e1e' }}>
      {/* 브랜드 바 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:10, borderBottom:`3px solid ${col}`, marginBottom:14 }}>
        <span style={{ fontSize:14, fontWeight:900, color:col, letterSpacing:'2px' }}>📦  PHLOROTANNIN PARTNERS</span>
        <span style={{ fontSize:12, fontWeight:800, padding:'3px 12px', borderRadius:99, background:col, color:'#fff' }}>제품 안내</span>
      </div>
      <p style={{ fontSize:11, color:'#888', fontWeight:700, margin:'0 0 2px' }}>SEANOL C.A.F.</p>
      <h2 style={{ fontSize:28, fontWeight:900, color:NAVY_PRODUCT, margin:'0 0 6px' }}>플로로탄닌 감태추출물 3종 라인업</h2>
      <div style={{ width:60, height:3, background:col, borderRadius:2, marginBottom:8 }} />
      <p style={{ fontSize:12, color:'#888', marginBottom:14 }}>해양 폴리페놀 씨놀(C.A.F.) 기반  ·  다양한 제형으로 일상 속 관리</p>
      {products.map(p=>(
        <div key={p.num} style={{ background:'#f8f9fc', borderLeft:`5px solid ${p.pc}`, borderRadius:'0 10px 10px 0', marginBottom:12, padding:'12px 16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:p.pc, color:'#fff', fontSize:12, fontWeight:900, padding:'2px 10px', borderRadius:99 }}>{p.num}</span>
              <span style={{ fontSize:16, fontWeight:900, color:NAVY_PRODUCT }}>{p.name}</span>
            </div>
            <span style={{ fontSize:16, fontWeight:900, color:p.pc }}>{p.price}</span>
          </div>
          <p style={{ fontSize:11, color:'#888', margin:'0 0 4px' }}>{p.en}  ·  {p.size}</p>
          <p style={{ fontSize:12, fontWeight:800, color:p.pc, textAlign:'center', margin:'6px 0', padding:'4px', borderTop:'1px solid #e0e4ec', borderBottom:'1px solid #e0e4ec' }}>{p.slogan}</p>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', margin:'6px 0' }}>
            {p.tags.map(t=><span key={t} style={{ fontSize:11, fontWeight:700, color:p.pc, background:`${p.pc}18`, border:`1px solid ${p.pc}50`, borderRadius:99, padding:'2px 8px' }}>{t}</span>)}
          </div>
          <p style={{ fontSize:11, fontWeight:700, color:'#444', margin:'4px 0 2px' }}>섭취 방법</p>
          <p style={{ fontSize:11, color:'#666', margin:0 }}>{p.usage}</p>
        </div>
      ))}
      {/* 파트너 박스 */}
      <div style={{ border:`3px solid ${col}`, borderRadius:16, padding:'16px 22px', display:'flex', alignItems:'center', gap:20, marginTop:8 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'inline-block', background:col, color:'#fff', fontSize:11, fontWeight:900, padding:'3px 12px', borderRadius:4, marginBottom:8 }}>📞 무료 건강 상담</div>
          <p style={{ fontSize:13, fontWeight:700, color:'#888', margin:'0 0 2px', letterSpacing:'1px' }}>PARTNER CONTACT</p>
          <p style={{ fontSize:22, fontWeight:900, color:NAVY_PRODUCT, margin:'0 0 2px' }}>{name}</p>
          <p style={{ fontSize:16, fontWeight:800, color:col, margin:'0 0 6px' }}>{tel}</p>
          <p style={{ fontSize:11, color:'#666', margin:0 }}>문자로 '플로로탄닌 문의'라고만 보내주세요  ·  phlorotannin.com</p>
        </div>
        <div style={{ flexShrink:0, textAlign:'center' }}>
          <div style={{ border:`2px solid ${col}`, borderRadius:12, padding:8, display:'inline-block', background:'#fff' }}>
            <QRCodeCanvas value={url} size={100} fgColor={NAVY_PRODUCT} bgColor="#ffffff" level="M" />
          </div>
          <p style={{ fontSize:11, color:'#666', fontWeight:700, margin:'5px 0 0', textAlign:'center' }}>QR 스캔하면<br />바로 연결됩니다</p>
        </div>
      </div>
      <p style={{ fontSize:11, color:'#aaa', textAlign:'right', marginTop:8 }}>2 / 2</p>
    </div>
  )
}

/* ════════════════════════════════════════════════
   제품 전단지 Canvas 드로잉 함수
════════════════════════════════════════════════ */
async function drawProductPage1(scale = 2) {
  const W = 794, H = 1123
  const canvas = document.createElement('canvas')
  canvas.width = W * scale; canvas.height = H * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  const col = COL_PRODUCT
  const pad = 32, body = W - pad * 2
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H)
  let y = 44

  // ── 브랜드 바
  ctx.strokeStyle = col; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(pad, y + 28); ctx.lineTo(W - pad, y + 28); ctx.stroke()
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'middle'
  ctx.fillText('📦  PHLOROTANNIN PARTNERS', pad, y + 13)
  const bdg = '강의 핵심 요약'
  ctx.font = 'bold 15px sans-serif'
  const bw = ctx.measureText(bdg).width + 26
  roundRect(ctx, W - pad - bw, y, bw, 26, 13); ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(bdg, W - pad - bw / 2, y + 13)
  ctx.textAlign = 'left'
  y += 42

  // ── 긴급 메시지 박스
  const urgH = 42
  roundRect(ctx, pad, y, body, urgH, 8)
  ctx.fillStyle = hexAlpha(col, 0x20); ctx.fill()
  ctx.strokeStyle = hexAlpha(col, 0x70); ctx.lineWidth = 1.5; ctx.stroke()
  ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'middle'
  ctx.fillText('먹기는 먹는데, 솔직히 잘 모르겠어요 — 그 이유가 있습니다', pad + 16, y + urgH / 2)
  y += urgH + 14

  // ── 헤드라인
  ctx.font = 'bold 46px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
  ctx.fillText('건강식품,', pad, y); y += 54
  ctx.font = 'bold 34px sans-serif'; ctx.fillStyle = col
  ctx.fillText('이름 말고 구조를 보셔야 합니다', pad, y); y += 46
  ctx.font = 'bold 16px sans-serif'
  const accTxt = '플로로탄닌 특강 — 회복의 과학'
  const accW = ctx.measureText(accTxt).width + 28
  roundRect(ctx, pad, y, accW, 32, 7); ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'
  ctx.fillText(accTxt, pad + 14, y + 16)
  y += 42

  // ── 인트로 박스
  ctx.font = '16px sans-serif'
  const introTxt = '건강식품을 많이 드시는데도 아침이 무겁고, 잠을 자도 회복감이 없다면 — 이유가 있습니다. 건강식품 시장은 성분 이름은 화려한데, 그 성분이 몸에서 어떻게 작동하는지 설명이 부족합니다.'
  const introLines = wrapText(ctx, introTxt, body - 36)
  const introLH = 26
  const introH = introLines.length * introLH + 22
  roundRect(ctx, pad + 5, y, body - 5, introH, 8); ctx.fillStyle = '#f8f9fc'; ctx.fill()
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, introH)
  ctx.fillStyle = '#333'; ctx.textBaseline = 'top'
  introLines.forEach((l, i) => ctx.fillText(l, pad + 16, y + 11 + i * introLH))
  y += introH + 14

  // ── 섹션1: 이름 vs 구조
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, 26)
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'middle'
  ctx.fillText('① 건강식품은 이름으로 먹는 게 아닙니다', pad + 14, y + 13)
  y += 36

  const cW = Math.floor((body - 12) / 2)
  const badItems = ['알부민 → 있어 보이니까', '태란 → 병원에서 들어봤으니까', '콜라겐 → 피부에 붙을 것 같으니까', '비싸면 효과 있을 것 같은 느낌']
  const goodItems = ['분자 구조가 다양한가?', '몸에서 어떻게 흡수되나?', '기전(메커니즘)이 연구됐나?', '여러 방향으로 작동하는가?']
  const cBoxH = 16 + 26 + badItems.length * 22 + 10  // 헤더 + 간격 + 항목들 + 하단 여백

  // 왼쪽 박스 (fill 먼저, stroke 나중)
  roundRect(ctx, pad, y, cW, cBoxH, 8); ctx.fillStyle = '#fff8f8'; ctx.fill()
  ctx.strokeStyle = '#DC3C3C'; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.font = 'bold 15px sans-serif'; ctx.fillStyle = '#C83232'; ctx.textBaseline = 'top'
  ctx.fillText('✗  이름만 보는 방식', pad + 12, y + 11)
  ctx.font = '14px sans-serif'; ctx.fillStyle = '#A02828'
  badItems.forEach((t, i) => ctx.fillText(t, pad + 14, y + 38 + i * 22))

  // 오른쪽 박스
  roundRect(ctx, pad + cW + 12, y, cW, cBoxH, 8); ctx.fillStyle = '#f2fcf6'; ctx.fill()
  ctx.strokeStyle = '#1E8C5A'; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.font = 'bold 15px sans-serif'; ctx.fillStyle = '#1E8C5A'; ctx.textBaseline = 'top'
  ctx.fillText('✓  구조를 보는 방식', pad + cW + 24, y + 11)
  ctx.font = '14px sans-serif'; ctx.fillStyle = '#146E46'
  goodItems.forEach((t, i) => ctx.fillText(t, pad + cW + 24, y + 38 + i * 22))
  y += cBoxH + 14

  // ── 섹션2: 분자구조
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, 26)
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'middle'
  ctx.fillText('② 분자구조 — 산소 2개와 3개가 만드는 차이', pad + 14, y + 13)
  y += 36

  const mols = [
    ['H₂O', '물',  '수소2+산소1',   '우리가 마시는 물', col],
    ['O₂',  '산소', '산소 원자 2개', '숨 쉬는 산소',     '#3C64B4'],
    ['O₃',  '오존', '산소 원자 3개', '강한 산화력 오존',  '#8C3CB4'],
  ]
  const mW = Math.floor((body - 20) / 3), mH = 110
  mols.forEach(([f, n, s, d, c], i) => {
    const mx = pad + i * (mW + 10)
    roundRect(ctx, mx, y, mW, mH, 9); ctx.fillStyle = hexAlpha(c, 0x22); ctx.fill()
    ctx.strokeStyle = hexAlpha(c, 0x60); ctx.lineWidth = 1.5; ctx.stroke()
    ctx.font = 'bold 34px sans-serif'; ctx.fillStyle = c; ctx.textBaseline = 'top'
    ctx.fillText(f, mx + 12, y + 10)
    ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = NAVY; ctx.fillText(n, mx + 12, y + 54)
    ctx.font = '13px sans-serif'; ctx.fillStyle = '#888'
    ctx.fillText(s, mx + 12, y + 76); ctx.fillText(d, mx + 12, y + 93)
  })
  y += mH + 14

  // ── 섹션3: 왜 플로로탄닌인가
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, 26)
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'middle'
  ctx.fillText('③ 왜 플로로탄닌인가 — 바다의 공구함', pad + 14, y + 13)
  y += 36

  const seaTxt = '감태(Ecklonia cava) 같은 갈조류에서 추출한 해양 폴리페놀입니다. 해조류는 도망을 못 갑니다. 햇빛·파도·염분·미생물을 그 자리에서 버텨야 합니다. 수천만 년 진화가 만든 방어 성분 — 그게 플로로탄닌입니다.'
  ctx.font = '14px sans-serif'
  const seaLines = wrapText(ctx, seaTxt, body - 36)
  const seaLH = 22
  const seaH = seaLines.length * seaLH + 16
  roundRect(ctx, pad + 5, y, body - 5, seaH, 8); ctx.fillStyle = '#f8f9fc'; ctx.fill()
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, seaH)
  ctx.fillStyle = '#333'; ctx.textBaseline = 'top'
  seaLines.forEach((l, i) => ctx.fillText(l, pad + 16, y + 8 + i * seaLH))
  y += seaH + 10

  // ── 5가지 기전 행 (높이를 mechLines 수 기반으로 동적 계산)
  const tools = [
    { label: '혈당 조절', mech: 'α-글루코시다제 억제 · AMPK 활성화 → 식후 혈당 급등 완화·인슐린 감수성 개선', tc: col },
    { label: '항산화',    mech: 'Nrf2 경로 활성화 · 활성산소(ROS) 소거 → 세포 스스로 방어 능력 강화',           tc: '#3C82BE' },
    { label: '항염증',    mech: 'COX-2 · NF-kB · IL-6 · TNF-α 억제 → 만성 저등급 염증 근원 차단',             tc: '#1E8C5A' },
    { label: '뇌·수면',  mech: 'BACE1 억제 · GABA 수용체 활성화 → 베타아밀로이드 감소·자연 수면 유도',          tc: '#8C3CB4' },
    { label: '혈관 건강', mech: 'eNOS 활성화 · 산화질소(NO) 생성 → 혈관 이완·탄성 회복',                        tc: '#C8641E' },
  ]
  tools.forEach(t => {
    ctx.font = 'bold 14px sans-serif'
    const lw = ctx.measureText(t.label).width + 24
    const mechMaxW = body - lw - 50
    ctx.font = '13px sans-serif'
    const mechLines = wrapText(ctx, t.mech, mechMaxW)
    const tH = Math.max(44, mechLines.length * 18 + 22)
    roundRect(ctx, pad + 5, y, body - 5, tH, 8); ctx.fillStyle = '#f8f9fc'; ctx.fill()
    ctx.fillStyle = t.tc; ctx.fillRect(pad, y, 5, tH)
    ctx.font = 'bold 14px sans-serif'
    roundRect(ctx, pad + 14, y + Math.floor((tH - 26) / 2), lw, 26, 7); ctx.fillStyle = t.tc; ctx.fill()
    ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'
    ctx.fillText(t.label, pad + 26, y + tH / 2)
    ctx.font = '13px sans-serif'; ctx.fillStyle = '#555'; ctx.textBaseline = 'top'
    const topPad = Math.floor((tH - mechLines.length * 18) / 2)
    mechLines.forEach((l, i) => ctx.fillText(l, pad + lw + 24, y + topPad + i * 18))
    y += tH + 6
  })
  y += 12

  // ── 회복 정의 박스 — 글씨 키움
  y += 10
  const recH = 142
  roundRect(ctx, pad, y, body, recH, 12)
  ctx.fillStyle = hexAlpha(col, 0x12); ctx.fill()
  ctx.strokeStyle = hexAlpha(col, 0x50); ctx.lineWidth = 2; ctx.stroke()

  // 텍스트 — 상단 패딩 14px 기준
  let ry = y + 14
  ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = NAVY
  ctx.fillText('회복(Recovery)이란 무엇인가', W / 2, ry); ry += 30

  ctx.font = '15px sans-serif'; ctx.fillStyle = '#444'
  ctx.fillText('아침이 조금 가볍다  ·  잠이 조금 깊다', W / 2, ry); ry += 26
  ctx.fillText('밥 먹고 난 뒤 덜 처진다  ·  하루를 버티는 힘이 달라진다', W / 2, ry); ry += 28

  ctx.font = 'bold 15px sans-serif'; ctx.fillStyle = col
  ctx.fillText('몸 전체의 리듬이 다시 살아나는 느낌 — 이게 회복입니다', W / 2, ry)
  ctx.textAlign = 'left'

  y += recH + 8

  // 페이지 번호 — 페이지 하단 안전 영역에 고정 배치
  ctx.font = '13px sans-serif'; ctx.fillStyle = '#aaa'; ctx.textBaseline = 'bottom'
  ctx.textAlign = 'right'; ctx.fillText('1 / 2', W - pad, H - 16); ctx.textAlign = 'left'
  return canvas
}

async function drawProductPage2(partnerName, partnerTel, qrImg, scale = 2) {
  const W = 794, H = 1123
  const canvas = document.createElement('canvas')
  canvas.width = W * scale; canvas.height = H * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  const col = COL_PRODUCT
  const pad = 32, body = W - pad * 2
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H)
  let y = 44

  // ── 브랜드 바
  ctx.strokeStyle = col; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(pad, y + 28); ctx.lineTo(W - pad, y + 28); ctx.stroke()
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'middle'
  ctx.fillText('📦  PHLOROTANNIN PARTNERS', pad, y + 13)
  const bdg2 = '제품 안내'
  ctx.font = 'bold 15px sans-serif'
  const bw2 = ctx.measureText(bdg2).width + 26
  roundRect(ctx, W - pad - bw2, y, bw2, 26, 13); ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(bdg2, W - pad - bw2 / 2, y + 13)
  ctx.textAlign = 'left'
  y += 42

  // ── 헤드라인
  ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'top'
  ctx.fillText('SEANOL C.A.F.', pad, y); y += 20
  ctx.font = 'bold 32px sans-serif'; ctx.fillStyle = NAVY
  ctx.fillText('플로로탄닌 감태추출물 3종 라인업', pad, y); y += 40
  ctx.fillStyle = col; ctx.fillRect(pad, y, 64, 4); y += 12
  ctx.font = '14px sans-serif'; ctx.fillStyle = '#888'; ctx.textBaseline = 'top'
  ctx.fillText('해양 폴리페놀 씨놀(C.A.F.) 기반  ·  다양한 제형으로 일상 속 관리', pad, y)
  y += 24

  // ── 제품 카드 3개
  const products = [
    {
      num: '1', name: '딜-리버-런스 K', en: 'de-liver-ance-K  |  C.A.F.',
      price: '75,000원', size: '25ml x 7EA (175ml)',
      slogan: '더 젊고 건강하게 — 고농축 해양 폴리페놀 액상 앰플',
      desc: '감태추출물 플로로탄닌을 고농축 액상 앰플 형태로 담은 제품. 씨놀(C.A.F.) 특허 원료 사용. 혈당·항산화·항염·수면·혈관을 다각도로 관리합니다.',
      tags: ['#감태추출물', '#씨놀CAF', '#해양폴리페놀', '#액상앰플', '#국산'],
      usage: '하루 1포(25ml) 직접 음용 또는 음료 희석. 아침·저녁 식사 전후 꾸준히 섭취. 개봉 후 냉장 보관.',
      pc: col,
    },
    {
      num: '2', name: '만나스웰 드롭', en: 'MANNAS WELL DROP  |  vital drop',
      price: '17,000원', size: '20ml (0.68 fl.oz)',
      slogan: '플로로탄닌 감태추출물 — 간편 휴대용 드롭 제형',
      desc: '감태추출물 플로로탄닌을 드롭 형태로 설계. 점막 흡수 방식으로 빠르게 전달됩니다. 소형 휴대 제형.',
      tags: ['#만나스웰드롭', '#드롭제형', '#플로로탄닌', '#휴대간편', '#국산'],
      usage: '적정량을 입 안 점막에 떨어뜨려 흡수. 직사광선 피해 서늘한 곳 보관.',
      pc: '#3C82BE',
    },
    {
      num: '3', name: '세조아 (CEJOA)', en: 'SEANOL C.A.F.  |  아연+플로로탄닌 필름형',
      price: '78,000원', size: '175.25mg x 30매',
      slogan: '면역력 관리가 필수인 시대 — 구강 용해 필름형',
      desc: '씨놀(C.A.F.) 플로로탄닌에 아연을 결합한 필름형. 구강 점막으로 빠르게 흡수. 아연은 면역·세포 보호에 필요. GMP 인증.',
      tags: ['#세조아CEJOA', '#아연+플로로탄닌', '#필름형', '#GMP인증', '#면역관리'],
      usage: '하루 1매를 혀 아래 입 안에 넣어 천천히 녹여 드세요. 물 없이 섭취 가능.',
      pc: NAVY,
    },
  ]

  products.forEach(p => {
    // ── 카드 높이를 실제 콘텐츠 기반으로 미리 계산
    ctx.font = '14px sans-serif'
    const descLines  = wrapText(ctx, p.desc,  body - 38)
    ctx.font = '13px sans-serif'
    const usageLines = wrapText(ctx, p.usage, body - 38)

    //  헤더행(58) + 구분선(10) + 슬로건행(24) + 설명(descLines*20+8) + 태그행(26+8)
    //  + 구분선(10) + '섭취방법' label(20) + usage(usageLines*18+8) + 하단배지(26) + 하단여백(12)
    const cardH = 58 + 10 + 24 + descLines.length * 20 + 8
               + 26 + 8 + 10 + 20 + usageLines.length * 18 + 8 + 26 + 12

    // 카드 배경 (fill 먼저)
    roundRect(ctx, pad + 5, y, body - 5, cardH, 9)
    ctx.fillStyle = '#f8f9fc'; ctx.fill()
    // 왼쪽 컬러 바
    ctx.fillStyle = p.pc; ctx.fillRect(pad, y, 5, cardH)

    // ── 헤더: 번호 원 + 제품명 + 가격
    const numR = 17  // 원 반지름
    const numCX = pad + 18 + numR, numCY = y + 28
    ctx.beginPath(); ctx.arc(numCX, numCY, numR, 0, Math.PI * 2)
    ctx.fillStyle = p.pc; ctx.fill()
    ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = '#fff'
    ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
    ctx.fillText(p.num, numCX, numCY); ctx.textAlign = 'left'

    ctx.font = 'bold 19px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
    ctx.fillText(p.name, pad + 56, y + 10)
    ctx.font = '13px sans-serif'; ctx.fillStyle = '#888'
    ctx.fillText(p.en + '  ·  ' + p.size, pad + 56, y + 34)
    ctx.font = 'bold 19px sans-serif'; ctx.fillStyle = p.pc
    ctx.textAlign = 'right'; ctx.textBaseline = 'top'
    ctx.fillText(p.price, W - pad - 10, y + 18)
    ctx.textAlign = 'left'

    let cy = y + 58

    // ── 구분선 + 슬로건
    ctx.fillStyle = '#e0e4ec'; ctx.fillRect(pad + 5, cy, body - 5, 1); cy += 10
    ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = p.pc
    ctx.textBaseline = 'top'; ctx.textAlign = 'center'
    ctx.fillText(p.slogan, W / 2, cy); ctx.textAlign = 'left'; cy += 24

    // ── 설명
    ctx.font = '14px sans-serif'; ctx.fillStyle = '#333'; ctx.textBaseline = 'top'
    descLines.forEach(l => { ctx.fillText(l, pad + 16, cy); cy += 20 }); cy += 8

    // ── 태그
    let tx = pad + 16
    p.tags.forEach(tag => {
      ctx.font = 'bold 12px sans-serif'
      const tw = ctx.measureText(tag).width + 20
      roundRect(ctx, tx, cy, tw, 24, 7)
      ctx.fillStyle = hexAlpha(p.pc, 0x22); ctx.fill()
      ctx.strokeStyle = hexAlpha(p.pc, 0x70); ctx.lineWidth = 1; ctx.stroke()
      ctx.fillStyle = p.pc; ctx.textBaseline = 'middle'
      ctx.fillText(tag, tx + 10, cy + 12)
      tx += tw + 6
    }); cy += 34

    // ── 섭취방법
    ctx.fillStyle = '#e0e4ec'; ctx.fillRect(pad + 16, cy, body - 24, 1); cy += 10
    ctx.font = 'bold 13px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
    ctx.fillText('섭취 방법', pad + 16, cy); cy += 20
    ctx.font = '13px sans-serif'; ctx.fillStyle = '#666'
    usageLines.forEach(l => { ctx.fillText(l, pad + 16, cy); cy += 18 }); cy += 8

    // ── 하단 배지
    const badgeTxt = 'SEANOL C.A.F.  감태추출물 플로로탄닌 해양 폴리페놀  ·  국산'
    roundRect(ctx, pad + 5, cy, body - 5, 26, 6)
    ctx.fillStyle = hexAlpha(p.pc, 0x14); ctx.fill()
    ctx.font = '12px sans-serif'; ctx.fillStyle = p.pc
    ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
    ctx.fillText(badgeTxt, W / 2, cy + 13); ctx.textAlign = 'left'

    y += cardH + 12
  })

  // ── 파트너 박스 — 남은 공간 꽉 채우기 (하단 페이지번호+안전여백 40px 확보)
  const boxY = y
  const boxH = H - boxY - 40
  // QR: 프레임 + 라벨(약 22) 이 박스 안에 들어가도록 제한
  const qrSize = Math.min(132, boxH - 60)
  const qrFrameSize = qrSize + 26

  // fill 먼저, stroke 나중 (순서 중요!)
  roundRect(ctx, pad, boxY, body, boxH, 16)
  ctx.fillStyle = '#ffffff'; ctx.fill()
  ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke()

  // 좌측 텍스트 영역 너비 계산
  const qrAreaW  = qrFrameSize + 32
  const txtAreaW = body - qrAreaW - 28

  // 배지
  ctx.font = 'bold 14px sans-serif'
  const bl  = '📞  무료 건강 상담'
  const blw = ctx.measureText(bl).width + 26
  roundRect(ctx, pad + 20, boxY + 18, blw, 26, 6)
  ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  ctx.fillText(bl, pad + 20 + blw / 2, boxY + 31); ctx.textAlign = 'left'

  // 연락처 텍스트
  let ty2 = boxY + 54
  ctx.font = 'bold 13px sans-serif'; ctx.fillStyle = '#888'; ctx.textBaseline = 'top'
  ctx.fillText('PARTNER CONTACT', pad + 20, ty2); ty2 += 22
  ctx.font = 'bold 28px sans-serif'; ctx.fillStyle = NAVY
  ctx.fillText(partnerName, pad + 20, ty2); ty2 += 38
  ctx.font = 'bold 22px sans-serif'; ctx.fillStyle = col
  ctx.fillText(partnerTel, pad + 20, ty2); ty2 += 32
  ctx.font = '13px sans-serif'; ctx.fillStyle = '#888'
  ctx.fillText("문자로 '플로로탄닌 문의'라고만 보내주세요  ·  phlorotannin.com", pad + 20, ty2)

  // QR (오른쪽, 세로 중앙) — 프레임 + 라벨(22)이 박스 안에 들어가도록 위치 계산
  const qrX  = W - pad - 20 - qrFrameSize
  const qrLabelH = 22
  const qrTotalH = qrFrameSize + qrLabelH
  const qrFY = boxY + Math.max(18, Math.floor((boxH - qrTotalH) / 2))
  // QR 프레임 (fill 먼저, stroke 나중)
  roundRect(ctx, qrX, qrFY, qrFrameSize, qrFrameSize, 11)
  ctx.fillStyle = '#ffffff'; ctx.fill()
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke()
  ctx.drawImage(qrImg, qrX + 13, qrFY + 13, qrSize, qrSize)
  ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = '#666'
  ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  ctx.fillText('QR 스캔하면 바로 연결', qrX + qrFrameSize / 2, qrFY + qrFrameSize + 6)
  ctx.textAlign = 'left'

  // 페이지 번호 — 박스 바깥 하단 안전 영역 (박스 하단과 페이지 끝 사이 40px 안전여백 안에 위치)
  ctx.font = '13px sans-serif'; ctx.fillStyle = '#aaa'; ctx.textBaseline = 'bottom'
  ctx.textAlign = 'right'; ctx.fillText('2 / 2', W - pad, H - 16); ctx.textAlign = 'left'
  return canvas
}

/* ════════════════════════════════════════════════
   캡처 함수 — html2canvas 완전 제거
   ① qrcode 라이브러리로 QR dataURL 생성
   ② 순수 Canvas 2D API + jsPDF로 전단지 직접 드로잉
   ③ React DOM 렌더링 불필요 → QR 흰박스 문제 원천 해결
════════════════════════════════════════════════ */

// 헥스 컬러를 RGB로 파싱
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0,2), 16)
  const g = parseInt(h.slice(2,4), 16)
  const b = parseInt(h.slice(4,6), 16)
  return [r, g, b]
}

// 헥스 컬러 + 알파(0~255 hex 2자리)를 rgba 문자열로
function hexAlpha(hex, alphaByte) {
  const [r,g,b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${(alphaByte/255).toFixed(3)})`
}

// 이미지 dataURL → HTMLImageElement (로딩 완료 후 resolve)
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload  = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// 긴 텍스트를 maxWidth 기준으로 줄 배열로 분리
function wrapText(ctx, text, maxWidth) {
  const words = text.split('')
  const lines = []
  let cur = ''
  for (const ch of words) {
    const test = cur + ch
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur)
      cur = ch
    } else {
      cur = test
    }
  }
  if (cur) lines.push(cur)
  return lines
}

// 둥근 사각형 path 헬퍼
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

/* ─── 1페이지 Canvas 직접 드로잉 ─── */
async function drawPage1(mat, scale = 2) {
  const W = 794, H = 1123
  const canvas = document.createElement('canvas')
  canvas.width  = W * scale
  canvas.height = H * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  const c    = getContent(mat.category)
  const col  = mat.color
  const pad  = 32
  const body = W - pad * 2

  // ── 배경 흰색
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // 상단 안전여백 ↑ — 프린터 인쇄 시 헤더가 잘리지 않도록
  let y = 44

  // ── 브랜드 바
  ctx.strokeStyle = col; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(pad, y + 28); ctx.lineTo(W - pad, y + 28); ctx.stroke()
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'middle'
  ctx.fillText(`${mat.icon}  PHLOROTANNIN PARTNERS`, pad, y + 13)
  // 배지
  const badge = mat.badge
  ctx.font = 'bold 15px sans-serif'
  const bw = ctx.measureText(badge).width + 26
  roundRect(ctx, W - pad - bw, y, bw, 26, 13)
  ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'
  ctx.fillText(badge, W - pad - bw/2, y + 13)
  ctx.textAlign = 'left'
  y += 40

  // ── 긴급 메시지 박스 (긴 텍스트면 자동 줄바꿈)
  ctx.font = 'bold 17px sans-serif'
  const urgencyLines = wrapText(ctx, `⚠️  ${c.urgency}`, body - 32)
  const urgencyH = Math.max(42, urgencyLines.length * 24 + 18)
  roundRect(ctx, pad, y, body, urgencyH, 8)
  ctx.fillStyle = hexAlpha(col, 0x26); ctx.fill()
  ctx.strokeStyle = hexAlpha(col, 0x80); ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillStyle = col; ctx.textBaseline = 'top'
  urgencyLines.forEach((l, i) => ctx.fillText(l, pad + 16, y + 9 + i * 24))
  y += urgencyH + 14

  // ── 헤드라인 (긴 문장이면 자동 줄바꿈 — 잘림 방지)
  ctx.font = '17px sans-serif'; ctx.fillStyle = '#888'; ctx.textBaseline = 'top'
  const h0Lines = wrapText(ctx, c.headline[0], body)
  h0Lines.forEach(l => { ctx.fillText(l, pad, y); y += 24 })

  ctx.font = 'bold 42px sans-serif'; ctx.fillStyle = NAVY
  const h1Lines = wrapText(ctx, c.headline[1], body)
  h1Lines.forEach(l => { ctx.fillText(l, pad, y); y += 50 })

  ctx.font = 'bold 42px sans-serif'; ctx.fillStyle = col
  const h2Lines = wrapText(ctx, c.headline[2], body)
  h2Lines.forEach((l, i) => { ctx.fillText(l, pad, y); y += (i === h2Lines.length - 1 ? 56 : 50) })

  // 강조 배지
  ctx.font = 'bold 16px sans-serif'
  const accentW = Math.min(ctx.measureText(c.accentLine).width + 28, body)
  roundRect(ctx, pad, y, accentW, 32, 6)
  ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'
  ctx.fillText(c.accentLine, pad + 14, y + 16)
  y += 42

  // ── 인트로 박스
  ctx.font = '16px sans-serif'
  const introLines = wrapText(ctx, c.intro, body - 36)
  const introLH = 26
  const introH  = introLines.length * introLH + 20
  roundRect(ctx, pad + 5, y, body - 5, introH, 8)
  ctx.fillStyle = '#f8f9fc'; ctx.fill()
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, introH)
  ctx.fillStyle = '#333'; ctx.textBaseline = 'top'
  introLines.forEach((line, i) => ctx.fillText(line, pad + 18, y + 10 + i * introLH))
  y += introH + 14

  // ── 타임라인 헤더
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, 22)
  ctx.font = 'bold 17px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
  ctx.fillText(`⏱  관리 후 실제 체감 변화 타임라인`, pad + 14, y + 2)
  y += 32

  // 타임라인 카드 3개 — 본문 줄 수에 따라 카드 높이 자동 계산 (잘림 방지)
  const tlW = Math.floor((body - 18) / 3)
  // 모든 카드의 본문 줄 수 미리 측정 → 가장 긴 것 기준으로 카드 높이 결정
  ctx.font = '14px sans-serif'
  const tlBodyLines = c.timeline.map(t => wrapText(ctx, t.body, tlW - 22))
  const maxTlLines  = Math.max(...tlBodyLines.map(arr => arr.length))
  const tlH = Math.max(100, 32 + maxTlLines * 19 + 14)   // 상단 라벨 32 + 줄들 + 하단 여백 14
  c.timeline.forEach((t, i) => {
    const tx = pad + i * (tlW + 9)
    const alphas = [0x1F, 0x33, 0x4D]
    const borderAlphas = [0x4D, 0x80, 0xCC]
    roundRect(ctx, tx, y, tlW, tlH, 10)
    ctx.fillStyle = hexAlpha(col, alphas[i]); ctx.fill()
    ctx.strokeStyle = hexAlpha(col, borderAlphas[i]); ctx.lineWidth = 1.5
    roundRect(ctx, tx, y, tlW, tlH, 10); ctx.stroke()
    ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'top'
    ctx.fillText(`📅  ${t.week}`, tx + 11, y + 10)
    ctx.font = '14px sans-serif'; ctx.fillStyle = '#444'
    tlBodyLines[i].forEach((l, li) => ctx.fillText(l, tx + 11, y + 32 + li * 19))
  })
  y += tlH + 14

  // ── 핵심 기전 헤더
  ctx.fillStyle = col; ctx.fillRect(pad, y, 5, 22)
  ctx.font = 'bold 17px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
  ctx.fillText(`🔬  과학이 증명한 ${c.points.length}가지 핵심 기전`, pad + 14, y + 2)
  y += 32

  // 기전 카드들 — 남은 공간에 균등 분배
  const refH    = 34   // 하단 참고문헌 영역 높이
  const refY    = H - refH - 36   // 하단 안전여백 ↑ (프린터 잘림 방지)
  const ptCount = c.points.length
  const ptArea  = refY - y - 12 - (ptCount - 1) * 7  // 카드 간격 + 참조박스 여백 포함
  const ptCardH = Math.floor(ptArea / ptCount)    // 카드 하나의 높이

  c.points.forEach((pt, idx) => {
    const cardY = y + idx * (ptCardH + 7)
    roundRect(ctx, pad + 5, cardY, body - 5, ptCardH, 8)
    ctx.fillStyle = '#f8f9fc'; ctx.fill()
    ctx.fillStyle = pt.color; ctx.fillRect(pad, cardY, 5, ptCardH)

    // 제목
    ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = pt.color; ctx.textBaseline = 'top'
    const titleStr = `${pt.icon}  ${pt.title}`
    ctx.fillText(titleStr.length > 48 ? titleStr.slice(0, 46) + '…' : titleStr, pad + 18, cardY + 11)

    // 본문 — 남은 높이에 맞게 줄 수 제한
    ctx.font = '15px sans-serif'; ctx.fillStyle = '#444'
    const maxBodyLines = Math.max(1, Math.floor((ptCardH - 38) / 22))
    const bodyLines = wrapText(ctx, pt.body, body - 54)
    bodyLines.slice(0, maxBodyLines).forEach((l, li) =>
      ctx.fillText(l, pad + 18, cardY + 32 + li * 22)
    )
  })

  // ── 참고문헌 (하단 고정)
  roundRect(ctx, pad, refY, body, refH, 8)
  ctx.fillStyle = '#f0f2f5'; ctx.fill()
  ctx.strokeStyle = '#dde'; ctx.lineWidth = 1; ctx.stroke()
  ctx.font = '13px sans-serif'; ctx.fillStyle = '#888'; ctx.textBaseline = 'middle'
  ctx.fillText(`📚  참고: ${c.refs.join(' · ')}   |   1 / 2`, pad + 14, refY + refH / 2)

  return canvas
}

/* ─── 2페이지 Canvas 직접 드로잉 ─── */
async function drawPage2(mat, partnerName, partnerTel, qrImg, scale = 2) {
  const W = 794, H = 1123
  const canvas = document.createElement('canvas')
  canvas.width  = W * scale
  canvas.height = H * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  const c    = getContent(mat.category)
  const col  = mat.color
  const pad  = 32
  const body = W - pad * 2

  // 배경
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H)

  // 상단 안전여백 ↑
  let y = 44

  // ── 브랜드 바
  ctx.strokeStyle = col; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(pad, y + 28); ctx.lineTo(W - pad, y + 28); ctx.stroke()
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'middle'
  ctx.fillText(`${mat.icon}  PHLOROTANNIN PARTNERS`, pad, y + 13)
  ctx.font = 'bold 15px sans-serif'; ctx.fillStyle = '#999'; ctx.textAlign = 'right'
  ctx.fillText('2 / 2', W - pad, y + 13)
  ctx.textAlign = 'left'
  y += 40

  // ── 시스템 연결 박스
  ctx.font = '16px sans-serif'
  const sysMsgLines0 = wrapText(ctx, c.systemMsg.split('\n')[0] || '', body - 32)
  ctx.font = 'bold 16px sans-serif'
  const sysMsgLines1 = wrapText(ctx, c.systemMsg.split('\n')[1] || '', body - 32)
  const sysLH = 24
  const sysH  = 34 + (sysMsgLines0.length + sysMsgLines1.length) * sysLH + 10
  roundRect(ctx, pad, y, body, sysH, 10)
  ctx.fillStyle = hexAlpha(col, 0x1F); ctx.fill()
  ctx.strokeStyle = hexAlpha(col, 0x99); ctx.lineWidth = 2; ctx.stroke()
  ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = NAVY
  ctx.fillText('🔗  몸은 하나의 연결된 시스템입니다', W / 2, y + 10)
  let syY = y + 36
  ctx.font = '16px sans-serif'; ctx.fillStyle = '#444'
  sysMsgLines0.forEach(l => { ctx.fillText(l, W / 2, syY); syY += sysLH })
  ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = col
  sysMsgLines1.forEach(l => { ctx.fillText(l, W / 2, syY); syY += sysLH })
  ctx.textAlign = 'left'
  y += sysH + 16

  // ── p2 헤드라인 (긴 문장 자동 줄바꿈 — 잘림 방지)
  ctx.font = 'bold 32px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
  const p2hLines = wrapText(ctx, c.p2headline, body)
  p2hLines.forEach(l => { ctx.fillText(l, pad, y); y += 42 })
  y += 2
  ctx.fillStyle = col; ctx.fillRect(pad, y, 64, 4); y += 14

  // ── 비교표
  ctx.font = 'bold 17px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
  ctx.fillText('💡  다른 성분들과 무엇이 다른가?', pad, y); y += 26

  const colW1 = Math.floor(body * 0.46)
  const colW2 = body - colW1
  const rowH  = 40   // 행 높이 키움

  // 표 헤더
  ctx.fillStyle = '#f0f2f5'; ctx.fillRect(pad, y, colW1, rowH)
  ctx.fillStyle = hexAlpha(col, 0x33); ctx.fillRect(pad + colW1, y, colW2, rowH)
  ctx.strokeStyle = '#dde'; ctx.lineWidth = 1
  ctx.strokeRect(pad, y, body, rowH); ctx.strokeRect(pad, y, colW1, rowH)
  ctx.font = 'bold 16px sans-serif'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#666'; ctx.fillText('기존 성분', pad + 14, y + rowH / 2)
  ctx.fillStyle = col;   ctx.fillText('✅  플로로탄닌', pad + colW1 + 14, y + rowH / 2)
  y += rowH

  // 표 행 — 텍스트 길면 두 줄로 처리
  c.compare.forEach((row, i) => {
    // 줄 수 계산
    ctx.font = '15px sans-serif'
    const leftLines  = wrapText(ctx, row.left,  colW1 - 22)
    ctx.font = 'bold 15px sans-serif'
    const rightLines = wrapText(ctx, row.right, colW2 - 22)
    const rH = Math.max(leftLines.length, rightLines.length) * 22 + 14

    const bg0 = i % 2 === 0 ? '#fafafa' : '#fff'
    const bg1 = i % 2 === 0 ? hexAlpha(col, 0x14) : hexAlpha(col, 0x0A)
    ctx.fillStyle = bg0; ctx.fillRect(pad, y, colW1, rH)
    ctx.fillStyle = bg1; ctx.fillRect(pad + colW1, y, colW2, rH)
    ctx.strokeStyle = '#eee'
    ctx.strokeRect(pad, y, body, rH); ctx.strokeRect(pad, y, colW1, rH)

    ctx.font = '15px sans-serif'; ctx.fillStyle = '#555'; ctx.textBaseline = 'top'
    leftLines.forEach((l, li) => ctx.fillText(l, pad + 12, y + 7 + li * 22))
    ctx.font = 'bold 15px sans-serif'; ctx.fillStyle = NAVY
    rightLines.forEach((l, li) => ctx.fillText(l, pad + colW1 + 12, y + 7 + li * 22))
    y += rH
  })
  y += 16

  // ── 추천 대상 — 남은 공간(면책 + 파트너 박스)을 미리 확보 후 그리드 높이 동적 결정
  ctx.font = 'bold 17px sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'top'
  ctx.fillText('✅  이런 분들께 강력히 추천합니다', pad, y); y += 24

  const gridCols = 2
  const gridGap  = 9
  const gridW    = Math.floor((body - gridGap) / gridCols)
  const rows     = Math.ceil(c.targets.length / gridCols)

  // 면책 박스 + 파트너 박스가 차지할 최소 공간 계산
  const disclaimerReserveH = 56   // 면책 박스 대략적 높이 (실측치 반영)
  const partnerBoxMinH     = 270  // 파트너 박스 최소 높이 (전화번호까지 안전 표시)
  const bottomSafety       = 48   // 하단 안전여백 (프린터 잘림 방지)
  const remainingForGrid   = H - y - disclaimerReserveH - 14 - partnerBoxMinH - bottomSafety - 14

  // 그리드 셀 높이를 남은 공간 기준으로 결정 (최소 32, 최대 54)
  const gridGapV  = 7
  const gridMaxH  = 54
  const gridMinH  = 32
  let gridH = Math.floor((remainingForGrid - (rows - 1) * gridGapV) / rows)
  gridH = Math.max(gridMinH, Math.min(gridMaxH, gridH))

  c.targets.forEach((t, i) => {
    const gx = pad + (i % gridCols) * (gridW + gridGap)
    const gy = y + Math.floor(i / gridCols) * (gridH + gridGapV)
    roundRect(ctx, gx, gy, gridW, gridH, 8)
    ctx.fillStyle = hexAlpha(col, 0x14); ctx.fill()
    ctx.strokeStyle = hexAlpha(col, 0x40); ctx.lineWidth = 1.5; ctx.stroke()
    ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = col; ctx.textBaseline = 'middle'
    ctx.fillText('✓', gx + 14, gy + gridH / 2)
    ctx.font = '14px sans-serif'; ctx.fillStyle = '#333'
    const tl = wrapText(ctx, t, gridW - 44)
    if (tl.length === 1 || gridH < 44) {
      // 한 줄로 그리기 (셀 높이가 작으면 강제 한 줄)
      const single = tl.length === 1 ? tl[0] : (tl[0] + (tl[1] ? ' ' + tl[1] : ''))
      // 너무 길면 자르기
      ctx.fillText(single.length > 28 ? single.slice(0, 27) + '…' : single, gx + 34, gy + gridH / 2)
    } else {
      ctx.fillText(tl[0] || '', gx + 34, gy + gridH / 2 - 10)
      ctx.fillText(tl[1] || '', gx + 34, gy + gridH / 2 + 10)
    }
  })
  y += rows * gridH + (rows - 1) * gridGapV + 14

  // ── 면책 박스
  const disclaimerText = '⚠️ 본 자료는 플로로탄닌 관련 연구 정보를 정리한 교육용 자료입니다. 특정 제품의 효능·효과를 보증하거나 질병의 예방·치료를 목적으로 하지 않습니다. 질환이 있거나 약물 복용 중인 경우 전문가 상담 후 판단하시기 바랍니다.'
  ctx.font = '13px sans-serif'
  const dLines = wrapText(ctx, disclaimerText, body - 28)
  const discH  = dLines.length * 18 + 16
  roundRect(ctx, pad, y, body, discH, 8)
  ctx.fillStyle = '#f8f8f8'; ctx.fill()
  ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1; ctx.stroke()
  ctx.fillStyle = '#999'; ctx.textBaseline = 'top'
  dLines.forEach((l, li) => ctx.fillText(l, pad + 14, y + 8 + li * 18))
  y += discH + 14

  // ── 파트너 박스 — 남은 공간 꽉 채우기 (하단 안전여백 ↑)
  const boxY = y
  const boxH = H - boxY - 48   // 하단 안전여백 48px (프린터 잘림 방지)
  const qrSize = Math.min(160, boxH - 36)  // QR은 박스에 맞게

  roundRect(ctx, pad, boxY, body, boxH, 16)
  ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke()
  ctx.fillStyle = '#ffffff'; ctx.fill()

  // 내부 좌측 텍스트 영역 / 우측 QR 영역
  const qrAreaW = qrSize + 48
  const txtAreaW = body - qrAreaW - 24

  // 배지
  ctx.font = 'bold 15px sans-serif'
  const badgeLabel = '📞  무료 건강 상담'
  const bLw = ctx.measureText(badgeLabel).width + 28
  roundRect(ctx, pad + 22, boxY + 20, bLw, 28, 6)
  ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  ctx.fillText(badgeLabel, pad + 22 + bLw / 2, boxY + 34)
  ctx.textAlign = 'left'; ctx.textBaseline = 'top'

  // CTA 텍스트
  const ctaLines = c.ctaMsg.split('\n')
  const ctaTxtLines0 = wrapText(ctx, ctaLines[0] || '', txtAreaW)
  const ctaTxtLines1 = wrapText(ctx, ctaLines[1] || '', txtAreaW)

  ctx.font = 'bold 24px sans-serif'; ctx.fillStyle = NAVY
  let ty = boxY + 58
  ctaTxtLines0.forEach(l => { ctx.fillText(l, pad + 22, ty); ty += 32 })
  ctx.font = 'bold 19px sans-serif'; ctx.fillStyle = col
  ctaTxtLines1.forEach(l => { ctx.fillText(l, pad + 22, ty); ty += 26 })

  // 관리 시스템·사례 문의 문구
  ty += 6
  ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = col
  const mgmtMsg = '📋 다양한 관리 시스템과 관리 사례 정보를 원하시면 파트너에게 문의하세요'
  const mgmtLines = wrapText(ctx, mgmtMsg, txtAreaW - 24)
  const mgmtBoxH = mgmtLines.length * 20 + 16
  roundRect(ctx, pad + 18, ty, txtAreaW - 14, mgmtBoxH, 6)
  const [mr, mg, mb] = hexToRgb(col)
  ctx.fillStyle = `rgba(${mr},${mg},${mb},0.08)`; ctx.fill()
  ctx.font = 'bold 13px sans-serif'; ctx.fillStyle = col
  let mty = ty + 10
  mgmtLines.forEach(l => { ctx.fillText(l, pad + 28, mty); mty += 20 })
  ty += mgmtBoxH + 10

  // 파트너 연락처
  ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = '#888'
  ctx.fillText('PARTNER CONTACT', pad + 22, ty); ty += 22
  ctx.font = 'bold 30px sans-serif'; ctx.fillStyle = NAVY
  ctx.fillText(partnerName, pad + 22, ty); ty += 40
  ctx.font = 'bold 24px sans-serif'; ctx.fillStyle = col
  ctx.fillText(partnerTel, pad + 22, ty)

  // QR 이미지 (오른쪽 중앙 정렬)
  const qrX   = W - pad - 24 - qrSize
  const qrY   = boxY + Math.floor((boxH - qrSize - 30) / 2)
  roundRect(ctx, qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 12)
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke()
  ctx.fillStyle = '#ffffff'; ctx.fill()
  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

  ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = '#666'
  ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  ctx.fillText('QR 스캔하면 바로 연결', qrX + qrSize / 2, qrY + qrSize + 10)
  ctx.textAlign = 'left'

  return canvas
}

/* ─── 메인 캡처 함수 ─── */
async function capturePages(mat, partnerName, partnerTel, cardUrl) {
  // ① QR dataURL → HTMLImageElement 로드 (drawImage 에 바로 사용)
  const qrDataUrl = await QRCode.toDataURL(cardUrl, {
    width: 300,
    margin: 1,
    color: { dark: NAVY, light: '#ffffff' },
    errorCorrectionLevel: 'M',
  })
  const qrImg = await loadImg(qrDataUrl)

  // ② 두 페이지를 Canvas에 직접 드로잉 (html2canvas 없음)
  const [c1, c2] = await Promise.all([
    drawPage1(mat, 2),
    drawPage2(mat, partnerName, partnerTel, qrImg, 2),
  ])

  return [c1, c2]
}
