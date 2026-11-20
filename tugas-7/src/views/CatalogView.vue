<script setup>
import ProductCard from '../components/ProductCard.vue'

const products = [
  {
    id: 1,
    name: 'Le Minerale',
    category: 'Minuman',
    price: 6000,
    formattedPrice: 'Rp6.000',
    emoji: '💧',
    tone: 'blue',
    tag: 'Pilihan segar',
    description: 'Air mineral untuk menemani aktivitasmu.',
  },
  {
    id: 2,
    name: 'Chitato',
    category: 'Camilan',
    price: 10000,
    formattedPrice: 'Rp10.000',
    emoji: '🍟',
    tone: 'peach',
    tag: 'Favorit',
    description: 'Camilan renyah untuk waktu santai.',
  },
  {
    id: 3,
    name: 'Oreo',
    category: 'Biskuit',
    price: 5000,
    formattedPrice: 'Rp5.000',
    emoji: '🍪',
    tone: 'pink',
    tag: 'Manisnya pas',
    description: 'Biskuit cokelat yang enak dinikmati kapan saja.',
  },
  {
    id: 4,
    name: 'Coca-Cola',
    category: 'Minuman',
    price: 8000,
    formattedPrice: 'Rp8.000',
    emoji: '🥤',
    tone: 'peach',
    tag: 'Dingin lebih nikmat',
    description: 'Minuman soda dingin yang menyegarkan.',
  },
  {
    id: 5,
    name: 'Indomie Goreng',
    category: 'Makanan',
    price: 3000,
    formattedPrice: 'Rp3.000',
    emoji: '🍜',
    tone: 'yellow',
    tag: 'Andalan semua',
    description: 'Mie praktis dengan rasa yang selalu dirindukan.',
  },
  {
    id: 6,
    name: 'Teh Botol Sosro',
    category: 'Minuman',
    price: 5000,
    formattedPrice: 'Rp5.000',
    emoji: '🍵',
    tone: 'mint',
    tag: 'Teh asli',
    description: 'Teh siap minum untuk teman makanmu.',
  },
]
</script>

<template>
  <main class="page-container">
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow"><span class="sparkle">✦</span> TOKO HARIAN FAVORITMU</span>
        <h1>Belanja kecil,<br /><span>bahagianya besar.</span></h1>
        <p>
          Semua kebutuhan favoritmu ada di sini. Pilih yang kamu suka, lalu
          masukkan ke keranjang!
        </p>
        <a class="hero-link" href="#katalog">
          Mulai belanja <span aria-hidden="true">↓</span>
        </a>
        <div class="hero-note">
          <span class="note-icon">✓</span>
          Praktis, dekat, dan bersahabat
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="sun-shape"></div>
        <div class="basket">🧺</div>
        <span class="floating-item floating-item--one">🍊</span>
        <span class="floating-item floating-item--two">🥛</span>
        <span class="floating-item floating-item--three">🍞</span>
        <span class="hero-sticker">fresh<br />& happy!</span>
      </div>
    </section>

    <section id="katalog" class="catalog-section">
      <div class="section-heading">
        <div>
          <span class="section-kicker">DIPILIH UNTUKMU</span>
          <h2>Belanja kebutuhanmu</h2>
          <p>Produk pilihan dengan harga yang ramah di kantong.</p>
        </div>
        <span class="product-count">{{ products.length }} produk</span>
      </div>

      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-container {
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
}

.hero {
  position: relative;
  display: grid;
  min-height: 370px;
  grid-template-columns: 1.1fr 0.9fr;
  overflow: hidden;
  margin-top: 30px;
  border-radius: 28px;
  background: #e6f0df;
}

.hero-copy {
  z-index: 1;
  align-self: center;
  padding: 46px 0 44px 54px;
}

.eyebrow,
.section-kicker {
  color: #537853;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

.sparkle {
  margin-right: 5px;
  color: #dc8d45;
}

h1 {
  margin: 18px 0 14px;
  color: #203d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 5vw, 58px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1.04;
}

h1 span {
  color: #4a8051;
  font-style: italic;
}

.hero-copy > p {
  max-width: 430px;
  margin: 0;
  color: #667568;
  font-size: 15px;
  line-height: 1.7;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  padding: 12px 17px;
  border-radius: 11px;
  background: #2f713d;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  transition: background 160ms ease;
}

.hero-link:hover {
  background: #245c31;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 21px;
  color: #617262;
  font-size: 12px;
}

.note-icon {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  background: #cfe2c9;
  color: #2f713d;
  font-size: 12px;
  font-weight: 900;
}

.hero-art {
  position: relative;
  display: grid;
  min-height: 330px;
  place-items: center;
}

.sun-shape {
  position: absolute;
  top: 35px;
  right: 40px;
  width: 285px;
  height: 285px;
  border-radius: 50%;
  background: #d3e6c9;
}

.basket {
  z-index: 1;
  font-size: clamp(130px, 17vw, 190px);
  filter: drop-shadow(0 20px 14px rgb(55 82 48 / 14%));
  transform: rotate(-7deg);
}

.floating-item {
  position: absolute;
  z-index: 2;
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 4px solid #e6f0df;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 8px 18px rgb(39 71 42 / 12%);
  font-size: 27px;
}

.floating-item--one {
  top: 54px;
  left: 55px;
}

.floating-item--two {
  top: 91px;
  right: 47px;
}

.floating-item--three {
  right: 71px;
  bottom: 35px;
}

.hero-sticker {
  position: absolute;
  bottom: 40px;
  left: 35px;
  display: grid;
  width: 70px;
  height: 70px;
  place-content: center;
  border-radius: 50%;
  background: #f0c77c;
  color: #68491b;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 13px;
  font-style: italic;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  transform: rotate(-12deg);
}

.catalog-section {
  padding: 55px 0 72px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.section-kicker {
  font-size: 10px;
}

h2 {
  margin: 7px 0;
  color: #203d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(25px, 3vw, 32px);
  letter-spacing: -0.03em;
}

.section-heading p {
  margin: 0;
  color: #788378;
  font-size: 14px;
}

.product-count {
  flex: none;
  padding: 8px 12px;
  border: 1px solid #e1e9dd;
  border-radius: 999px;
  background: #fff;
  color: #58765b;
  font-size: 12px;
  font-weight: 700;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 800px) {
  .hero {
    grid-template-columns: 1fr 0.8fr;
  }

  .hero-copy {
    padding-left: 32px;
  }

  .hero-art {
    transform: scale(0.85);
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .page-container {
    width: min(100% - 32px, 440px);
  }

  .hero {
    display: block;
    min-height: auto;
    margin-top: 18px;
    border-radius: 22px;
  }

  .hero-copy {
    padding: 30px 24px 0;
  }

  .hero-art {
    min-height: 220px;
    transform: scale(0.75);
    transform-origin: center top;
    margin-bottom: -48px;
  }

  .catalog-section {
    padding: 42px 0 54px;
  }

  .section-heading {
    align-items: start;
  }

  .section-heading p {
    max-width: 250px;
    line-height: 1.5;
  }

  .product-count {
    margin-top: 8px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>
