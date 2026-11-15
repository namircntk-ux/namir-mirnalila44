<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="header-inner">
        <RouterLink class="brand" to="/" aria-label="MilaMart, ke katalog">
          <span class="brand-mark" aria-hidden="true">m</span>
          <span class="brand-name">mila<span>mart</span></span>
          <span class="brand-dot" aria-hidden="true">.</span>
        </RouterLink>

        <nav class="main-nav" aria-label="Navigasi utama">
          <RouterLink class="nav-link" to="/" exact-active-class="is-active">
            Katalog
          </RouterLink>
          <RouterLink class="nav-link cart-link" to="/cart">
            Keranjang
            <span class="cart-badge">{{ cartStore.totalItems }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer class="site-footer">
      <RouterLink class="footer-brand" to="/">mila<span>mart</span>.</RouterLink>
      <p>Belanja harian jadi lebih mudah dan menyenangkan.</p>
      <span class="copyright">© 2026 MilaMart</span>
    </footer>
  </div>
</template>

<style>
:root {
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #27392b;
  background: #fbfcf9;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-optical-sizing: auto;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: #fbfcf9;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button:focus-visible,
a:focus-visible {
  outline: 3px solid #e0a34f;
  outline-offset: 3px;
}

.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-header {
  position: sticky;
  z-index: 5;
  top: 0;
  border-bottom: 1px solid #e9eee6;
  background: rgb(251 252 249 / 92%);
  backdrop-filter: blur(14px);
}

.header-inner {
  display: flex;
  width: min(1120px, calc(100% - 48px));
  height: 72px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  color: #203d27;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 33px;
  height: 33px;
  place-items: center;
  margin-right: 9px;
  border-radius: 11px;
  background: #2f713d;
  color: #fff;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 22px;
  font-style: italic;
  font-weight: 700;
}

.brand-name,
.footer-brand {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.06em;
}

.brand-name span,
.footer-brand span {
  color: #6a9861;
}

.brand-dot {
  align-self: flex-start;
  color: #d78c43;
  font-size: 23px;
  font-weight: 900;
  line-height: 0.9;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #69766b;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: color 150ms ease;
}

.nav-link:hover,
.nav-link.is-active {
  color: #2f713d;
}

.cart-badge {
  display: grid;
  min-width: 21px;
  height: 21px;
  place-items: center;
  padding: 0 5px;
  border-radius: 999px;
  background: #e8f1e4;
  color: #2f713d;
  font-size: 11px;
  font-weight: 800;
}

.site-footer {
  display: flex;
  min-height: 74px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 15px max(24px, calc((100% - 1120px) / 2));
  border-top: 1px solid #e9eee6;
  background: #fff;
}

.footer-brand {
  color: #203d27;
  font-size: 16px;
  text-decoration: none;
}

.site-footer p,
.copyright {
  margin: 0;
  color: #8a948a;
  font-size: 11px;
}

@media (max-width: 580px) {
  .header-inner {
    width: calc(100% - 32px);
    height: 64px;
  }

  .main-nav {
    gap: 16px;
  }

  .nav-link {
    font-size: 12px;
  }

  .site-footer {
    flex-wrap: wrap;
    justify-content: center;
    padding: 18px 16px;
    text-align: center;
  }

  .site-footer p {
    order: 1;
    width: 100%;
  }
}
</style>
