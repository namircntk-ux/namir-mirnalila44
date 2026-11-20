import { defineStore } from 'pinia'

const imageByCategory = {
  Roti: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=720&q=85',
  Pastry: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=720&q=85',
  Kue: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=720&q=85',
}

function createProducts() {
  return [
    {
      id: 1,
      name: 'Sourdough Klasik',
      category: 'Roti',
      description: 'Renyah di luar, lembut dan sedikit asam di dalam.',
      price: 38000,
      stock: 12,
      badge: 'Favorit',
      image: imageByCategory.Roti,
    },
    {
      id: 2,
      name: 'Croissant Butter',
      category: 'Pastry',
      description: 'Pastry berlapis dengan butter premium yang harum.',
      price: 22000,
      stock: 3,
      badge: 'Best seller',
      image: imageByCategory.Pastry,
    },
    {
      id: 3,
      name: 'Roti Cokelat',
      category: 'Roti',
      description: 'Roti empuk berisi cokelat lumer di setiap gigitan.',
      price: 16000,
      stock: 8,
      badge: '',
      image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=720&q=85',
    },
    {
      id: 4,
      name: 'Cinnamon Roll',
      category: 'Pastry',
      description: 'Gulungan kayu manis dengan glaze cream cheese.',
      price: 25000,
      stock: 6,
      badge: 'Baru',
      image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=720&q=85',
    },
    {
      id: 5,
      name: 'Banana Bread',
      category: 'Kue',
      description: 'Kue pisang lembut, manisnya pas untuk teman kopi.',
      price: 28000,
      stock: 0,
      badge: '',
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=720&q=85',
    },
    {
      id: 6,
      name: 'Donat Gula',
      category: 'Kue',
      description: 'Donat klasik yang ringan dengan taburan gula halus.',
      price: 12000,
      stock: 10,
      badge: '',
      image: imageByCategory.Kue,
    },
  ]
}

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: createProducts(),
    cart: [],
  }),
  getters: {
    cartItems: (state) =>
      state.cart
        .map((item) => ({
          ...item,
          product: state.products.find((product) => product.id === item.id),
        }))
        .filter((item) => item.product),
    cartCount: (state) =>
      state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) =>
      state.cart.reduce((total, item) => {
        const product = state.products.find((entry) => entry.id === item.id)
        return product ? total + product.price * item.quantity : total
      }, 0),
  },
  actions: {
    addToCart(productId) {
      const product = this.products.find((item) => item.id === productId)
      if (!product || product.stock < 1) return null

      const cartItem = this.cart.find((item) => item.id === productId)
      if (cartItem) {
        cartItem.quantity += 1
      } else {
        this.cart.push({ id: productId, quantity: 1 })
      }

      product.stock -= 1
      return product.name
    },
    updateQuantity(productId, amount) {
      if (amount !== 1 && amount !== -1) return false

      const product = this.products.find((item) => item.id === productId)
      const cartItem = this.cart.find((item) => item.id === productId)
      if (!product || !cartItem || (amount > 0 && product.stock < 1)) return false

      cartItem.quantity += amount
      product.stock -= amount

      if (cartItem.quantity < 1) {
        this.cart = this.cart.filter((item) => item.id !== productId)
      }

      return true
    },
    addProduct({ name, category, description, price, stock }) {
      const normalizedName = typeof name === 'string' ? name.trim() : ''
      const normalizedPrice = Number(price)
      const normalizedStock = Number(stock)
      const validCategory = Object.hasOwn(imageByCategory, category)

      if (
        normalizedName.length < 2 ||
        !Number.isFinite(normalizedPrice) ||
        normalizedPrice <= 0 ||
        !Number.isSafeInteger(normalizedStock) ||
        normalizedStock < 0 ||
        !validCategory
      ) {
        return null
      }

      const product = {
        id: Math.max(0, ...this.products.map((item) => item.id)) + 1,
        name: normalizedName,
        category,
        description:
          typeof description === 'string' ? description.trim() : '',
        price: normalizedPrice,
        stock: normalizedStock,
        badge: 'Baru',
        image: imageByCategory[category],
      }

      this.products.push(product)
      return product
    },
    clearCart() {
      this.cart = []
    },
  },
})
