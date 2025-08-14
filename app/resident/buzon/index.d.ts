export type servicesType = {
  createdAt:string
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
    createdAt:string

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
