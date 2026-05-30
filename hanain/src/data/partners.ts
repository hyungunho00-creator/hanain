import {
  buildPartnerSlugCandidates,
  normalizeAliases,
  normalizePartnerSlug as normalizePartnerSlugCore,
  normalizePhoneDigits,
} from '../lib/partner/normalizePartnerSlug'

export type Partner = {
  slug: string
  aliases?: string[]
  displayName: string
  roleLabel?: string
  organization?: string
  region?: string
  phone?: string
  sms?: string
  kakaoUrl?: string
  naverCafeUrl?: string
  bandUrl?: string
  profileImage?: string
  greeting?: string
  shortBio?: string
  shareTitle?: string
  shareDescription?: string
  themeColor?: string
  verified?: boolean
  visible?: boolean
  active?: boolean
  approved?: boolean
  testOnly?: boolean
}

export const PARTNERS: Partner[] = [
  {
    slug: '01098498408',
    aliases: ['010-9849-8408', 'hyungeonwoo', '현건우'],
    displayName: '현건우',
    roleLabel: '플로로탄닌 건강정보 파트너',
    region: '서울',
    phone: '010-9849-8408',
    sms: '01098498408',
    greeting: '플로로탄닌 건강정보 아카이브를 함께 공유합니다.',
    organization: 'Phlorotannin Partners',
    shareTitle: '현건우 파트너가 공유한 플로로탄닌 건강정보',
    shareDescription: '플로로탄닌 파트너스 공식 아카이브 기반 건강정보 링크입니다.',
    themeColor: '#0a4d68',
    verified: true,
    visible: true,
    active: true,
    approved: true,
  },
  {
    slug: 'demo',
    aliases: ['demo-partner'],
    displayName: '데모 파트너',
    roleLabel: '플로로탄닌 건강정보 파트너',
    region: '서울',
    phone: '010-0000-0000',
    sms: '01000000000',
    greeting: '플로로탄닌 건강정보 아카이브를 함께 공유합니다.',
    organization: 'Phlorotannin Partners',
    shareTitle: '데모 파트너가 공유한 플로로탄닌 건강정보',
    shareDescription: '플로로탄닌 파트너스 공식 아카이브 기반 건강정보 링크입니다.',
    themeColor: '#0a4d68',
    verified: true,
    visible: true,
    active: true,
    approved: true,
  },
  {
    slug: 'demo-new',
    aliases: ['010-1111-2222', '01011112222', 'new-partner-demo'],
    displayName: '신규 테스트 파트너',
    roleLabel: '플로로탄닌 건강정보 파트너',
    region: '서울',
    phone: '010-1111-2222',
    sms: '01011112222',
    greeting: '신규 파트너 접근 테스트용 계정입니다.',
    organization: 'Phlorotannin Partners',
    shareTitle: '신규 테스트 파트너가 공유한 플로로탄닌 건강정보',
    shareDescription: '신규 파트너 접속 검증용 테스트 링크입니다.',
    themeColor: '#0a4d68',
    verified: true,
    visible: true,
    active: true,
    approved: true,
    testOnly: true,
  },
]

export function normalizePartnerSlug(input?: string | null): string | null {
  return normalizePartnerSlugCore(input)
}

function collectPartnerCandidates(partner: Partner): string[] {
  const set = new Set<string>()
  for (const candidate of buildPartnerSlugCandidates(partner.slug)) set.add(candidate)
  for (const candidate of normalizeAliases(partner.aliases)) set.add(candidate)
  for (const candidate of buildPartnerSlugCandidates(partner.phone || '')) set.add(candidate)
  for (const candidate of buildPartnerSlugCandidates(partner.sms || '')) set.add(candidate)
  return [...set]
}

export function findPartnerBySlug(slug?: string | null): Partner | null {
  const candidates = buildPartnerSlugCandidates(slug)
  if (!candidates.length) return null

  for (const partner of PARTNERS) {
    const keys = collectPartnerCandidates(partner)
    if (candidates.some((candidate) => keys.includes(candidate))) {
      const normalizedSlug = normalizePartnerSlug(partner.slug) || partner.slug
      const aliases = normalizeAliases([
        ...(partner.aliases || []),
        partner.phone || '',
        partner.sms || '',
        normalizePhoneDigits(partner.phone || '') || '',
      ])
      return {
        ...partner,
        slug: normalizedSlug,
        aliases,
      }
    }
  }

  return null
}
