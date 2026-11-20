<script setup>
import { useCartStore } from '../stores/cart'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
</script>

<template>
  <article class="product-card">
    <div class="product-art" :class="`product-art--${product.tone}`">
      <span class="product-tag">{{ product.tag }}</span>
      <span class="product-emoji" role="img" :aria-label="product.name">
        {{ product.emoji }}
      </span>
      <span class="product-art-shape" aria-hidden="true"></span>
    </div>

    <div class="product-content">
      <span class="product-category">{{ product.category }}</span>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-bottom">
        <strong>{{ product.formattedPrice }}</strong>
        <button
          class="add-button"
          type="button"
          :aria-label="`Tambah ${product.name} ke keranjang`"
          @click="cartStore.addToCart(product)"
        >
          <span aria-hidden="true">+</span>
          Tambah
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  border: 1px solid #e8eee5;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(34 55 35 / 5%);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgb(34 55 35 / 10%);
}

.product-art {
  position: relative;
  display: grid;
  min-height: 176px;
  overflow: hidden;
  place-items: center;
}

.product-art--mint {
  background: linear-gradient(140deg, #e0f2df, #f3f8df);
}

.product-art--peach {
  background: linear-gradient(140deg, #ffeadb, #fff4d8);
}

.product-art--blue {
  background: linear-gradient(140deg, #dff0f4, #e6ecff);
}

.product-art--pink {
  background: linear-gradient(140deg, #f9e3eb, #fff0dc);
}

.product-art--yellow {
  background: linear-gradient(140deg, #fff2c9, #e8f2d8);
}

.product-tag {
  position: absolute;
  z-index: 1;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  border: 1px solid rgb(255 255 255 / 70%);
  border-radius: 999px;
  background: rgb(255 255 255 / 78%);
  color: #355a39;
  font-size: 11px;
  font-weight: 800;
}

.product-emoji {
  z-index: 1;
  font-size: 76px;
  filter: drop-shadow(0 10px 8px rgb(48 62 37 / 13%));
  transition: transform 180ms ease;
}

.product-card:hover .product-emoji {
  transform: scale(1.08) rotate(-4deg);
}

.product-art-shape {
  position: absolute;
  right: -18px;
  bottom: -52px;
  width: 140px;
  height: 140px;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 50%;
}

.product-content {
  padding: 18px;
}

.product-category {
  color: #718071;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 7px 0 5px;
  color: #203d27;
  font-size: 18px;
}

.product-content p {
  min-height: 38px;
  margin: 0;
  color: #788378;
  font-size: 13px;
  line-height: 1.5;
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 17px;
}

.product-bottom strong {
  color: #244b2c;
  font-size: 17px;
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border: 0;
  border-radius: 10px;
  background: #2f713d;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 800;
  transition: background 160ms ease;
}

.add-button:hover {
  background: #245c31;
}

.add-button span {
  font-size: 17px;
  line-height: 0.8;
}

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-emoji {
    transition: none;
  }
}
</style>
