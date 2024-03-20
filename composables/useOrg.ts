export type Form = {
  id: string
  name: string
  summary: string
  description: string
  deadline: string
  status: number
  is_open: boolean
}

export type OrgInfo = {
  org_id: string
  org_name: string
  event_id: string
  event_name: string
  forms: Form[] | null
}

export type AccessibleOrg = {
  id: string
  name: string
  event_id: string
  event_name: string
  is_open: boolean
}

export const useOrg = () => {
  const client = useApiClient()
  const orgInfo: Ref<OrgInfo | null> = useState('org', () => null)
  const accessibleOrgs: Ref<AccessibleOrg[] | null> = useState(
    'accessibleOrgs',
    () => null
  )

  const getAccessibleOrgs = async (): Promise<AccessibleOrg[] | null> => {
    if (accessibleOrgs.value) {
      return accessibleOrgs.value
    }
    const fetchedOrgs = await client
      .get('/api/v1/orgs')
      .then((resp) => {
        if (resp.error) {
          console.error('error fetching orgs\n', resp.error)
          return null
        }
        if (resp && resp.data && resp.data.orgs) {
          console.error('response is empty')
          return null
        }
        return resp.data as { orgs: AccessibleOrg[] }
      })
      .catch((e) => {
        console.error(e)
        return null
      })
    accessibleOrgs.value =
      fetchedOrgs && fetchedOrgs.orgs ? fetchedOrgs.orgs : null
    return accessibleOrgs.value
  }

  const getOrgInfo = async (orgId: string): Promise<OrgInfo | null> => {
    if (orgInfo.value) {
      return orgInfo.value
    }
    const fetchedOrgInfo = await client
      .get('/api/v1/orgs', { org_id: orgId })
      .then((resp) => {
        if (resp.error) {
          console.error('error fetching orgInfo\n', resp.error)
          return null
        }
        if (resp && resp.data && resp.data.orgs) {
          console.error('response is empty')
          return null
        }
        return resp.data as { orgs: OrgInfo }
      })
      .catch((e) => {
        console.error(e)
        return null
      })
    orgInfo.value =
      fetchedOrgInfo && fetchedOrgInfo.orgs ? fetchedOrgInfo.orgs : null
    return orgInfo.value
  }
  return { getAccessibleOrgs, getOrgInfo }
}
