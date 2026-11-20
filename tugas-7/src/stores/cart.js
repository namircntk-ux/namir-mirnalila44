import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.qty, 0),
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.qty, 0),
  },

  actions: {
    addToCart(product) {
      const item = this.items.find((entry) => entry.id === product.id)
      if (item) {
        item.qty += 1
      } else {
        this.items.push({ ...product, qty: 1 })
      }
    },

    decreaseQuantity(id) {
      const item = this.items.find((entry) => entry.id === id)
      if (!item) return

      if (item.qty > 1) {
        item.qty -= 1
      } else {
        this.removeFromCart(id)
      }
    },

    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
})
