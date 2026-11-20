<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useShopStore } from '../stores/shop'

const shop = useShopStore()
const values = reactive({
  name: '',
  category: 'Roti',
  description: '',
  price: '',
  stock: '12',
})
const errors = ref({})
const successMessage = ref('')
const formError = ref('')

function validateField(field) {
  if (field === 'name') {
    const name = values.name.trim()
    errors.value.name = !name
      ? 'Nama produk wajib diisi.'
      : name.length < 2
        ? 'Nama produk minimal 2 karakter.'
        : ''
  }

  if (field === 'price') {
    const price = Number(values.price)
    errors.value.price =
      values.price === '' || !Number.isFinite(price) || price <= 0
        ? 'Harga harus berupa angka lebih dari 0.'
        : ''
  }

  if (field === 'stock') {
    const stock = Number(values.stock)
    errors.value.stock =
      values.stock === '' || !Number.isSafeInteger(stock) || stock < 0
        ? 'Stok harus berupa bilangan bulat 0 atau lebih.'
        : ''
  }
}

function clearFieldError(field) {
  errors.value[field] = ''
  formError.value = ''
  successMessage.value = ''
}

function submitProduct() {
  for (const field of ['name', 'price', 'stock']) {
    validateField(field)
  }
  if (Object.values(errors.value).some(Boolean)) return

  const product = shop.addProduct({
    ...values,
    name: values.name.trim(),
    price: Number(values.price),
    stock: Number(values.stock),
  })

  if (!product) {
    formError.value = 'Produk belum dapat ditambahkan. Periksa kembali datanya.'
    return
  }

  successMessage.value = `${product.name} berhasil ditambahkan ke menu.`
  Object.assign(values, {
    name: '',
    category: 'Roti',
    description: '',
    price: '',
    stock: '12',
  })
  errors.value = {}
}
</script>

<template>
  <div class="page-shell product-form-page">
    <header class="site-header form-page-header">
      <RouterLink class="brand" to="/" aria-label="MilaBakery, kembali ke beranda">
        <span class="brand-mark" aria-hidden="true">m.</span>
        <span>Mila<span class="brand-accent">Bakery</span></span>
      </RouterLink>
      <RouterLink class="back-link" to="/#menu">← Kembali ke menu</RouterLink>
    </header>

    <main class="product-form-main">
      <div class="form-intro">
        <span class="eyebrow section-eyebrow">Kelola etalase MilaBakery</span>
        <h1>Tambah <em>produk baru</em></h1>
        <p>Lengkapi detail produk agar pelanggan bisa menemukannya di menu.</p>
      </div>

      <form class="product-form" novalidate @submit.prevent="submitProduct">
        <div v-if="successMessage" class="form-success" role="status">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>Produk berhasil ditambahkan</strong>
            <p>{{ successMessage }}</p>
            <RouterLink to="/#menu">Lihat di menu</RouterLink>
          </div>
        </div>
        <p v-if="formError" class="form-error form-error-summary" role="alert">
          {{ formError }}
        </p>

        <label class="form-field">
          <span>Nama produk <span class="required-mark">*</span></span>
          <input
            v-model="values.name"
            type="text"
            name="name"
            minlength="2"
            maxlength="60"
            placeholder="Contoh: Roti Susu"
            autocomplete="off"
            :aria-invalid="Boolean(errors.name)"
            aria-describedby="name-error"
            @blur="validateField('name')"
            @input="clearFieldError('name')"
          />
          <small v-if="errors.name" id="name-error" class="field-error" role="alert">
            {{ errors.name }}
          </small>
        </label>

        <label class="form-field">
          <span>Kategori <span class="required-mark">*</span></span>
          <select v-model="values.category" name="category">
            <option>Roti</option>
            <option>Pastry</option>
            <option>Kue</option>
          </select>
        </label>

        <label class="form-field form-field-wide">
          <span>Deskripsi <span class="optional-note">Opsional</span></span>
          <textarea
            v-model="values.description"
            name="description"
            maxlength="120"
            rows="3"
            placeholder="Ceritakan rasa atau bahan unggulannya"
          ></textarea>
        </label>

        <label class="form-field">
          <span>Harga (Rp) <span class="required-mark">*</span></span>
          <input
            v-model="values.price"
            type="number"
            name="price"
            min="1"
            step="1"
            placeholder="Contoh: 18000"
            inputmode="numeric"
            :aria-invalid="Boolean(errors.price)"
            aria-describedby="price-error"
            @blur="validateField('price')"
            @input="clearFieldError('price')"
          />
          <small v-if="errors.price" id="price-error" class="field-error" role="alert">
            {{ errors.price }}
          </small>
        </label>

        <label class="form-field">
          <span>Stok awal <span class="required-mark">*</span></span>
          <input
            v-model="values.stock"
            type="number"
            name="stock"
            min="0"
            step="1"
            placeholder="Contoh: 12"
            inputmode="numeric"
            :aria-invalid="Boolean(errors.stock)"
            aria-describedby="stock-error"
            @blur="validateField('stock')"
            @input="clearFieldError('stock')"
          />
          <small v-if="errors.stock" id="stock-error" class="field-error" role="alert">
            {{ errors.stock }}
          </small>
        </label>

        <div class="form-actions form-field-wide">
          <RouterLink class="button button-secondary" to="/">Batal</RouterLink>
          <button class="button button-primary" type="submit">
            Simpan produk <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </main>
  </div>
</template>
