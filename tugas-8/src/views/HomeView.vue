<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useShopStore } from '../stores/shop'

const shop = useShopStore()
const { products, cartItems, cartCount, cartTotal } = storeToRefs(shop)
const categories = ['Semua', 'Roti', 'Pastry', 'Kue']
const activeCategory = ref('Semua')
const searchQuery = ref('')
const cartIsOpen = ref(false)
const notification = ref('')
let notificationTimeout

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('id')

  return products.value.filter((product) => {
    const matchesCategory =
      activeCategory.value === 'Semua' ||
      product.category === activeCategory.value
    const matchesSearch =
      !query ||
      `${product.name} ${product.description}`
        .toLocaleLowerCase('id')
        .includes(query)

    return matchesCategory && matchesSearch
  })
})

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

function showNotification(message) {
  notification.value = message
  window.clearTimeout(notificationTimeout)
  notificationTimeout = window.setTimeout(() => {
    notification.value = ''
  }, 2800)
}

function addToCart(productId) {
  const productName = shop.addToCart(productId)
  showNotification(
    productName
      ? `${productName} ditambahkan ke keranjang`
      : 'Stok produk habis atau produk tidak tersedia.',
  )
}

function updateQuantity(id, amount) {
  if (!shop.updateQuantity(id, amount)) {
    showNotification('Stok produk tidak mencukupi.')
  }
}

function placeOrder() {
  if (!cartCount.value) return

  const total = formatPrice(cartTotal.value)
  shop.clearCart()
  cartIsOpen.value = false
  showNotification(`Pesanan demo berhasil dibuat · Total ${total}`)
}
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="MilaBakery, kembali ke beranda">
        <span class="brand-mark" aria-hidden="true">m.</span>
        <span>Mila<span class="brand-accent">Bakery</span></span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navigasi utama">
        <a class="nav-link nav-link-active" href="#beranda">Beranda</a>
        <a class="nav-link" href="#menu">Menu</a>
        <a class="nav-link" href="#cerita">Cerita kami</a>
      </nav>

      <button
        class="cart-button"
        type="button"
        aria-label="Buka keranjang"
        @click="cartIsOpen = true"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.5 4.5h2l2.2 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4l1.5-6.3H6.3M10 20a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Zm9 0a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.7"
          />
        </svg>
        <span class="cart-label">Keranjang</span>
        <span v-if="cartCount" class="cart-count">{{ cartCount }}</span>
      </button>
    </header>

    <main>
      <section id="beranda" class="hero">
        <div class="hero-copy">
          <span class="eyebrow"><span class="eyebrow-dot"></span>Fresh from our oven</span>
          <h1>Hari yang baik<br />dimulai dari <em>roti.</em></h1>
          <p>
            Dibuat dengan cinta, dipanggang setiap pagi. Temukan teman terbaik
            untuk sarapan dan cerita hari ini.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="#menu">
              Lihat menu
              <span aria-hidden="true">↗</span>
            </a>
            <div class="rating">
              <span class="rating-stars" aria-label="5 dari 5 bintang">★★★★★</span>
              <span>4.9 <span class="muted">· 800+ review</span></span>
            </div>
          </div>
          <div class="hero-note">
            <span class="note-icon" aria-hidden="true">☀</span>
            <span>Dipanggang  setiap hari, mulai pukul 06.00</span>
          </div>
        </div>
        <div class="hero-visual">
          <img
            class="hero-image"
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=90"
            alt="Roti artisan yang baru keluar dari oven"
          />
          <div class="hero-sticker">
            <span class="sticker-star" aria-hidden="true">✳</span>
            <span>Handmade<br />with love</span>
          </div>
          <div class="hero-caption">
            <span class="caption-dot"></span>
            <span>Hangat, baru , dan selalu dibuat sepenuh hati.</span>
          </div>
        </div>
        <span class="hero-decoration decoration-one" aria-hidden="true">✳</span>
        <span class="hero-decoration decoration-two" aria-hidden="true">✦</span>
      </section>

      <section class="promise-strip" aria-label="Keunggulan MilaBakery">
        <div><span class="promise-icon">♨</span> Selalu fresh setiap hari</div>
        <span class="promise-divider" aria-hidden="true"></span>
        <div><span class="promise-icon">♡</span> Bahan pilihan berkualitas</div>
        <span class="promise-divider" aria-hidden="true"></span>
        <div><span class="promise-icon">⌁</span> Dibuat dengan sepenuh hati</div>
      </section>

      <section id="menu" class="menu-section">
        <div class="section-heading">
          <div>
            <span class="eyebrow section-eyebrow">Pilihan dari dapur kami</span>
            <h2>Yang baru keluar <em>dari oven</em></h2>
            <p>Racikan sederhana, rasa yang bikin ingin kembali.</p>
          </div>
          <label class="search-box">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.7" />
              <path d="m16 16 4.2 4.2" stroke="currentColor" stroke-linecap="round" stroke-width="1.7" />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Cari roti favoritmu..."
              aria-label="Cari menu"
            />
          </label>
        </div>

        <div class="menu-toolbar">
          <div class="category-list" aria-label="Filter kategori">
            <button
              v-for="category in categories"
              :key="category"
              class="category-button"
              :class="{ 'category-active': activeCategory === category }"
              type="button"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
          <div class="menu-actions">
            <span class="product-count">{{ filteredProducts.length }} menu tersedia</span>
            <RouterLink class="manage-link" to="/produk/tambah">
              <span aria-hidden="true">+</span> Tambah produk
            </RouterLink>
          </div>
        </div>

        <div v-if="filteredProducts.length" class="product-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
        <div v-else class="empty-search">
          <span aria-hidden="true">🥐</span>
          <h3>Belum ketemu rotinya</h3>
          <p>Coba kata kunci atau kategori yang berbeda, ya.</p>
        </div>
      </section>

      <section id="cerita" class="story-section">
        <div class="story-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1000&q=85"
            alt="Suasana hangat di dapur toko roti"
            loading="lazy"
          />
          <span class="story-image-label">Sejak 2018 · Dibuat setiap pagi</span>
        </div>
        <div class="story-copy">
          <span class="eyebrow section-eyebrow">Sedikit cerita</span>
          <h2>Roti enak selalu punya <em>cerita.</em></h2>
          <p>
            MilaBakery lahir dari dapur kecil dan resep keluarga. Kami percaya
            hal sederhana—tepung yang baik, waktu yang cukup, dan tangan yang
            telaten—bisa bikin hari siapa pun terasa lebih hangat.
          </p>
          <a class="story-link" href="#menu">Temukan favoritmu <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <RouterLink class="brand footer-brand" to="/#beranda">
        <span class="brand-mark" aria-hidden="true">m.</span>
        <span>Mila<span class="brand-accent">Bakery</span></span>
      </RouterLink>
      <p>Hangat dari oven, sampai ke hatimu. ♡</p>
      <span class="footer-copyright">© 2026 MilaBakery</span>
    </footer>

    <Transition name="toast">
      <div v-if="notification" class="toast-message" role="status">
        <span aria-hidden="true">✓</span>{{ notification }}
      </div>
    </Transition>

    <Transition name="drawer">
      <div v-if="cartIsOpen" class="cart-overlay" @click.self="cartIsOpen = false">
        <aside
          class="cart-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          <div class="drawer-header">
            <div>
              <span class="eyebrow section-eyebrow">Belanja yang menyenangkan</span>
              <h2 id="cart-title">Keranjangmu <span>({{ cartCount }})</span></h2>
            </div>
            <button
              class="close-button"
              type="button"
              aria-label="Tutup keranjang"
              @click="cartIsOpen = false"
            >×</button>
          </div>

          <div v-if="cartItems.length" class="drawer-items">
            <article v-for="item in cartItems" :key="item.id" class="drawer-item">
              <img :src="item.product.image" :alt="item.product.name" />
              <div class="drawer-item-info">
                <h3>{{ item.product.name }}</h3>
                <span>{{ formatPrice(item.product.price) }}</span>
                <div class="quantity-control">
                  <button
                    type="button"
                    :aria-label="`Kurangi ${item.product.name}`"
                    @click="updateQuantity(item.id, -1)"
                  >−</button>
                  <span>{{ item.quantity }}</span>
                  <button
                    type="button"
                    :aria-label="`Tambah ${item.product.name}`"
                    @click="updateQuantity(item.id, 1)"
                  >+</button>
                </div>
              </div>
              <strong class="item-subtotal">
                {{ formatPrice(item.product.price * item.quantity) }}
              </strong>
            </article>
          </div>
          <div v-else class="drawer-empty">
            <span aria-hidden="true">🧺</span>
            <h3>Keranjangmu masih kosong</h3>
            <p>Yuk, pilih roti hangat kesukaanmu.</p>
            <button class="button button-primary" type="button" @click="cartIsOpen = false">
              Lihat menu
            </button>
          </div>

          <div v-if="cartItems.length" class="drawer-footer">
            <div class="subtotal-row">
              <span>Subtotal</span>
              <strong>{{ formatPrice(cartTotal) }}</strong>
            </div>
            <p>Ongkir dihitung saat pesanan dikonfirmasi.</p>
            <button class="button button-primary checkout-button" type="button" @click="placeOrder">
              Buat pesanan <span>{{ formatPrice(cartTotal) }}</span>
            </button>
            <span class="demo-note">Checkout demo · tidak ada pembayaran sungguhan</span>
          </div>
        </aside>
      </div>
    </Transition>
  </div>
</template>
