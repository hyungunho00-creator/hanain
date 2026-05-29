import { usePartner } from '../../context/PartnerContext'
import PartnerSharePanel from './PartnerSharePanel'

export default function PartnerShareBar() {
  const partner = usePartner()
  const isPartner = Boolean(partner?.isPartnerContext && (partner?.partnerSlug || partner?.slug || partner?.id))
  if (!isPartner) return null
  return <PartnerSharePanel />
}
