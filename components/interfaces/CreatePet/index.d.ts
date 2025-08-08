export type createPet={
  name: string,
  typeId: string,
  birthDate: string,
  housingId: string,
  breedId: string
}
export type typePet={
    createdAt:string,
    id: string,
    name: string
}
export type breedPet={
      createdAt: string,
      id: string,
      name: string,
      type: {
        createdAt: string
        id: string
        name: string
      }
}
