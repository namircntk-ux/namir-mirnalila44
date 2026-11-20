<script setup>
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['add-to-cart'])
</script>

<template>
  <article class="product-card">
    <div class="product-image-wrap">
      <img
        class="product-image"
        :src="product.image"
        :alt="product.name"
        loading="lazy"
      />
      <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
      <button
        class="quick-add"
        type="button"
        :aria-label="`Tambah ${product.name} ke keranjang`"
        :disabled="product.stock === 0"
        @click="$emit('add-to-cart', product.id)"
      >
        +
      </button>
    </div>
    <div class="product-info">
      <div class="product-meta">
        <span class="product-category">{{ product.category }}</span>
        <span class="product-rating">★ 4.9</span>
      </div>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div
        class="stock-indicator"
        :class="{
          'stock-low': product.stock > 0 && product.stock <= 3,
          'stock-empty': product.stock === 0,
        }"
        :aria-label="product.stock ? `Stok tersisa ${product.stock}` : 'Stok habis'"
      >
        <span class="stock-dot"></span>
        <template v-if="product.stock === 0">Stok habis</template>
        <template v-else-if="product.stock <= 3">
          Stok menipis · {{ product.stock }} tersisa
        </template>
        <template v-else>Stok tersedia · {{ product.stock }}</template>
      </div>
      <div class="product-bottom">
        <strong>{{ formatPrice(product.price) }}</strong>
        <button
          class="add-button"
          type="button"
          :disabled="product.stock === 0"
          @click="$emit('add-to-cart', product.id)"
        >
          {{ product.stock === 0 ? 'Habis' : 'Tambah' }}
          <span v-if="product.stock > 0" aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  </article>
</template>
