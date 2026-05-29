export type Partner = {
  slug: string;
  displayName: string;
  roleLabel?: string;
  organization?: string;
  region?: string;
  phone?: string;
  sms?: string;
  kakaoUrl?: string;
  naverCafeUrl?: string;
  bandUrl?: string;
  profileImage?: string;
  greeting?: string;
  shortBio?: string;
  shareTitle?: string;
  shareDescription?: string;
  themeColor?: string;
  verified?: boolean;
  visible?: boolean;
};

export const PARTNERS: Partner[] = [
  {
    slug: '01098498408',
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
  },
  {
    slug: 'demo',
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
  },
]

export function normalizePartnerSlug(input?: string | null): string | null {
  if (!input) return null
  const value = String(input).trim().toLowerCase()
  return value || null
}

export function findPartnerBySlug(slug?: string | null): Partner | null {
  const normalized = normalizePartnerSlug(slug)
  if (!normalized) return null
  return PARTNERS.find((p) => normalizePartnerSlug(p.slug) === normalized) || null
}
