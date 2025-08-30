import { create, StoreApi, UseBoundStore } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

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

const stores: Record<string, UseBoundStore<StoreApi<ProductAttach>>> = {}

export const useCartStore = (nameStore: string) => {
  if (!stores[nameStore]) {
    stores[nameStore] = create<ProductAttach>()(
      persist<ProductAttach>(
        (set) => ({
          buyProduct: [],
          cont: 0,
          totalPrice: 0,

          addProduct: (newProduct) => {
            set((state) => {
              const existing = state.buyProduct.find(
                (p) => p.nameProduct === newProduct.nameProduct
              )

              const updated = existing
                ? state.buyProduct.map((p) =>
                    p.nameProduct === newProduct.nameProduct
                      ? { ...p, unid: p.unid + newProduct.unid }
                      : p
                  )
                : [...state.buyProduct, { ...newProduct }]

              const prices = updated
                .map((p) => p.priceProduct * p.unid)
                .reduce((a, b) => a + b, 0)

              return {
                buyProduct: updated,
                cont: updated.reduce((a, b) => a + b.unid, 0),
                totalPrice: prices,
              }
            })
          },

          removeProduct: (nameProduct) => {
            set((state) => {
              const updated = state.buyProduct
                .map((p) =>
                  p.nameProduct === nameProduct
                    ? { ...p, unid: p.unid - 1 }
                    : p
                )
                .filter((p) => p.unid > 0)

              const prices = updated
                .map((p) => p.priceProduct * p.unid)
                .reduce((a, b) => a + b, 0)

              return {
                buyProduct: updated,
                cont: updated.reduce((a, b) => a + b.unid, 0),
                totalPrice: prices,
              }
            })
          },

          resetCart: () => set({ buyProduct: [], cont: 0, totalPrice: 0 }),
        }),
        {
          name: nameStore,
          storage: createJSONStorage(() => sessionStorage),
        }
      )
    )
  }
  return stores[nameStore]
}
