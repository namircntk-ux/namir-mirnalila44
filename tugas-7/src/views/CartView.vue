<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <main class="cart-page">
    <div class="cart-heading">
      <span class="section-kicker">KERANJANGMU</span>
      <h1>Belanjaan pilihanmu.</h1>
      <p>Periksa lagi pesananmu sebelum lanjut belanja.</p>
    </div>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-emoji" aria-hidden="true">🛍️</div>
      <h2>Keranjangmu masih kosong</h2>
      <p>Yuk, temukan camilan dan kebutuhan favoritmu di MilaMart.</p>
      <RouterLink class="primary-link" to="/">Lihat katalog</RouterLink>
    </div>

    <div v-else class="cart-layout">
      <section class="cart-list" aria-label="Produk di keranjang">
        <article
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >
          <div class="item-emoji" :class="`item-emoji--${item.tone}`">
            {{ item.emoji }}
          </div>
          <div class="item-info">
            <span>{{ item.category }}</span>
            <h2>{{ item.name }}</h2>
            <strong>{{ formatRupiah(item.price) }}</strong>
          </div>
          <div class="item-controls">
            <div class="quantity-control" :aria-label="`Jumlah ${item.name}`">
              <button
                type="button"
                :aria-label="`Kurangi ${item.name}`"
                @click="cartStore.decreaseQuantity(item.id)"
              >
                −
              </button>
              <span>{{ item.qty }}</span>
              <button
                type="button"
                :aria-label="`Tambah ${item.name}`"
                @click="cartStore.addToCart(item)"
              >
                +
              </button>
            </div>
            <button
              class="remove-button"
              type="button"
              @click="cartStore.removeFromCart(item.id)"
            >
              Hapus
            </button>
          </div>
          <strong class="item-total">
            {{ formatRupiah(item.price * item.qty) }}
          </strong>
        </article>
      </section>

      <aside class="summary">
        <h2>Ringkasan belanja</h2>
        <div class="summary-line">
          <span>Total barang</span>
          <strong>{{ cartStore.totalItems }} item</strong>
        </div>
        <div class="summary-line summary-total">
          <span>Total harga</span>
          <strong>{{ formatRupiah(cartStore.totalPrice) }}</strong>
        </div>
        <p class="summary-note">
          <span aria-hidden="true">🌿</span>
          Terima kasih sudah belanja di MilaMart!
        </p>
        <RouterLink class="primary-link" to="/">Lanjut belanja</RouterLink>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.cart-page {
  width: min(100% - 48px, 1000px);
  min-height: calc(100vh - 190px);
  margin: 0 auto;
  padding: 50px 0 72px;
}

.section-kicker {
  color: #648367;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

.cart-heading h1 {
  margin: 8px 0;
  color: #203d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(32px, 5vw, 44px);
  letter-spacing: -0.04em;
}

.cart-heading p,
.empty-cart p {
  margin: 0;
  color: #788378;
  font-size: 14px;
  line-height: 1.6;
}

.empty-cart {
  display: grid;
  justify-items: center;
  margin-top: 30px;
  padding: 58px 24px;
  border: 1px dashed #d4dfd0;
  border-radius: 22px;
  background: #fff;
  text-align: center;
}

.empty-emoji {
  margin-bottom: 14px;
  font-size: 56px;
}

.empty-cart h2 {
  margin: 0 0 8px;
  color: #203d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 24px;
}

.primary-link {
  display: inline-flex;
  justify-content: center;
  margin-top: 22px;
  padding: 12px 17px;
  border-radius: 10px;
  background: #2f713d;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  transition: background 160ms ease;
}

.primary-link:hover {
  background: #245c31;
}

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(250px, 0.8fr);
  align-items: start;
  gap: 22px;
  margin-top: 30px;
}

.cart-list {
  display: grid;
  gap: 12px;
}

.cart-item {
  display: grid;
  grid-template-columns: 68px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 15px;
  padding: 16px;
  border: 1px solid #e8eee5;
  border-radius: 16px;
  background: #fff;
}

.item-emoji {
  display: grid;
  width: 68px;
  height: 68px;
  place-items: center;
  border-radius: 13px;
  font-size: 34px;
}

.item-emoji--mint {
  background: #e0f2df;
}

.item-emoji--peach {
  background: #ffeadb;
}

.item-emoji--blue {
  background: #dff0f4;
}

.item-emoji--pink {
  background: #f9e3eb;
}

.item-emoji--yellow {
  background: #fff2c9;
}

.item-info > span {
  color: #788378;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.item-info h2 {
  margin: 4px 0;
  color: #203d27;
  font-size: 16px;
}

.item-info > strong {
  color: #58765b;
  font-size: 12px;
}

.item-controls {
  display: grid;
  justify-items: center;
  gap: 7px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  border: 1px solid #e6ece2;
  border-radius: 9px;
}

.quantity-control button {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 6px;
  background: #eff5ec;
  color: #315d38;
  cursor: pointer;
  font-size: 17px;
}

.quantity-control span {
  min-width: 14px;
  color: #263d2b;
  font-size: 12px;
  text-align: center;
}

.remove-button {
  padding: 2px 6px;
  border: 0;
  background: transparent;
  color: #a46154;
  cursor: pointer;
  font-size: 11px;
}

.item-total {
  color: #244b2c;
  font-size: 13px;
  white-space: nowrap;
}

.summary {
  padding: 22px;
  border: 1px solid #e8eee5;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(34 55 35 / 4%);
}

.summary > h2 {
  margin: 0 0 20px;
  color: #203d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 20px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 13px 0;
  color: #788378;
  font-size: 13px;
}

.summary-line strong {
  color: #304934;
  white-space: nowrap;
}

.summary-total {
  margin-top: 18px;
  padding-top: 17px;
  border-top: 1px solid #e7ece4;
  color: #203d27;
  font-weight: 800;
}

.summary-total strong {
  color: #2f713d;
  font-size: 17px;
}

.summary-note {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 18px 0 0;
  color: #788378;
  font-size: 11px;
}

.summary .primary-link {
  width: 100%;
}

@media (max-width: 760px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .cart-page {
    width: min(100% - 32px, 440px);
    padding-top: 34px;
  }

  .cart-item {
    grid-template-columns: 54px minmax(0, 1fr) auto;
    gap: 10px;
    padding: 12px;
  }

  .item-emoji {
    width: 54px;
    height: 54px;
    font-size: 28px;
  }

  .item-total {
    grid-column: 2 / -1;
    justify-self: end;
    margin-top: -6px;
  }
}
</style>
