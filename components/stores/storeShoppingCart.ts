import { create } from 'zustand'

export interface Product {
  nameProduct: string
  priceProduct: number
  unid: number
 
}

type ProductAttach = {
  buyProduct: Product[]
  cont: number
 totalPrice: number
  addProduct: (newProduct: Product) => void
  removeProduct: (nameProduct: string) => void
  resetCart: () => void
}

export const useCartStore = create<ProductAttach>((set, get) => ({
  buyProduct: [],
  totalPrice : 0,
  cont : 0,
  addProduct: (newProduct) => {
    set((state) => {
      const existing = state.buyProduct.find(p => p.nameProduct === newProduct.nameProduct)
      const resultAdd = state.buyProduct.map(p =>
        p.nameProduct === newProduct.nameProduct
          ? { ...p, unid: p.unid + newProduct.unid }
          : p
      )
      const currentCount = resultAdd.reduce((x,c)=>  x+c.unid, 0)
      const update = [...state.buyProduct, { ...newProduct }]
      
      if (existing) {
        const prices:number[] = []
        resultAdd.forEach((x)=>(prices.push(x.priceProduct*x.unid)))
        const priceFin = prices.reduce((x,c)=>x+c,0) 
        return {
          buyProduct: resultAdd,
          cont: currentCount,
          totalPrice:priceFin
        }
      } else {
        const prices:number[] = []
        update.forEach((x)=>(prices.push(x.priceProduct*x.unid)))
        const priceFin = prices.reduce((x,c)=>x+c,0) 
        return {
          buyProduct: update,
          cont: update.reduce((x,c)=>x+c.unid,0),
          totalPrice:priceFin
        }
      }
    })
  },
  removeProduct: (nameProduct) => {
    set((state) => {
      const result = state.buyProduct
        .map(p =>
          p.nameProduct === nameProduct
            ? { ...p, unid: p.unid - 1 }
            : p
        )
        .filter(p => p.unid > 0) 

      const currentCount = result.reduce((x,c)=> x+c.unid,0) 
        const prices:number[] = []
        result.forEach((x)=>(prices.push(x.priceProduct*x.unid)))
        const priceFin = prices.reduce((x,c)=>x+c,0)
      return {
        buyProduct: result,
        cont: currentCount,
        totalPrice:priceFin
      }
    })
  },
  resetCart: () => set({ buyProduct: [], cont: 0 ,totalPrice:0})
}))
