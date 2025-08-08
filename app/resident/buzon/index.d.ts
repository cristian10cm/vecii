export type servicesType = {
  id: string
  description: string
  status: string
  pickedUpAt: string | null
  lockerItemType: {
    createdAt: string
    id: string
    name: string
    slug: string
  }
  locker: {
    createdAt: string
    id: string
    name: string
  }

}
type packageItem = {
  id: string
  description: string
  status: string
  pickedUpAt: string | null
  lockerItemType: {
    createdAt: string
    id: string
    name: string
    slug: string
  }
  locker: {
    createdAt: string
    id: string
    name: string
  }
}
