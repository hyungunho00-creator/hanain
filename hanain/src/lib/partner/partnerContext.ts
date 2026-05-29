import { getSlugFromPath, getSlugFromSearch } from './resolvePartner'
import { readPersistedPartnerSlug } from './partnerStorage'

export function readPartnerSignals({ pathname = '', search = '' }) {
  const pathSlug = getSlugFromPath(pathname)
  const querySlug = getSlugFromSearch(search)
  const persistedSlug = readPersistedPartnerSlug()

  return {
    pathSlug,
    querySlug,
    persistedSlug,
    activeSlug: pathSlug || querySlug || persistedSlug || null,
  }
}
