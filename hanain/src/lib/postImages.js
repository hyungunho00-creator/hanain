const CATEGORY_FALLBACK_IMAGE = {
  metabolism: '/illustrations/sci/lab-beaker.webp',
  diabetes: '/illustrations/sci/lab-beaker.webp',
  cancer: '/illustrations/sci/seaweed-underwater.webp',
  cancer_immune: '/illustrations/sci/seaweed-underwater.webp',
  'cancer-treatment-care': '/illustrations/sci/seaweed-underwater.webp',
  digestive: '/illustrations/sci/kelp-specimen.webp',
  inflammation: '/illustrations/sci/kelp-specimen.webp',
  infection_inflammation: '/illustrations/sci/kelp-specimen.webp',
  cardiovascular: '/illustrations/sci/ocean-waves.webp',
  brain: '/illustrations/sci/molecule-3d.webp',
  neuro_cognitive: '/illustrations/sci/molecule-3d.webp',
  mental_health: '/illustrations/sci/molecule-3d.webp',
  skin: '/illustrations/sci/flatlay-extract.webp',
  hair: '/illustrations/sci/flatlay-extract.webp',
  skin_hair: '/illustrations/sci/flatlay-extract.webp',
  musculoskeletal: '/illustrations/sci/lab-interior.webp',
  'exercise-recovery': '/illustrations/sci/lab-interior.webp',
  'hospital-info': '/illustrations/sci/jeju-coast.webp',
  respiratory: '/illustrations/sci/jeju-coast.webp',
  womens_health: '/illustrations/sci/jeju-coast.webp',
  mens_health: '/illustrations/sci/jeju-coast.webp',
  'ingredient-comparison': '/illustrations/sci/seaweed-underwater.webp',
  'disease-health-info': '/illustrations/sci/lab-interior.webp',
  'buying-guide': '/illustrations/sci/flatlay-extract.webp',
  'safety-precautions': '/illustrations/sci/lab-beaker.webp',
  general: '/illustrations/sci/seaweed-underwater.webp',
  research: '/illustrations/sci/molecule-3d.webp',
  'partner-info': '/illustrations/sci/jeju-coast.webp',
}

const DEFAULT_FALLBACK_IMAGE = '/illustrations/sci/seaweed-underwater.webp'

const DEFAULT_OG_IMAGES = new Set([
  '/og-image.png',
  'https://phlorotannin.com/og-image.png',
  'http://phlorotannin.com/og-image.png',
  'https://www.phlorotannin.com/og-image.png',
  'http://www.phlorotannin.com/og-image.png',
  '/logo-512.png',
  '/logo-1024.png',
  '/icon-512.png',
  '/icon-192.png',
  'https://phlorotannin.com/logo-512.png',
  'https://phlorotannin.com/logo-1024.png',
  'https://phlorotannin.com/icon-512.png',
  'https://phlorotannin.com/icon-192.png',
])

function normalizeImageUrl(url) {
  const raw = String(url || '').trim()
  if (!raw) return ''
  return raw.split('?')[0].replace(/\/+$/, '')
}

export function getCategoryFallbackImage(category) {
  return CATEGORY_FALLBACK_IMAGE[category] || DEFAULT_FALLBACK_IMAGE
}

export function isDefaultOgImage(url) {
  const normalized = normalizeImageUrl(url)
  if (DEFAULT_OG_IMAGES.has(normalized)) return true
  if (/\/(?:logo|icon)-\d+\.(png|webp|jpg|jpeg)$/i.test(normalized)) return true
  return false
}

export function resolvePostImage(imageUrl, category) {
  if (!imageUrl || isDefaultOgImage(imageUrl)) return getCategoryFallbackImage(category)
  return imageUrl
}
