<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <div class="logo-container">
            <img 
              src="@/assets/SunWeb.png" 
              alt="SunWeb Logo"
              class="logo-image"/>
            <div class="logo-text">
              <span class="logo-main">SunWeb</span>
              <span class="logo-sub">Portfolio</span>
            </div>
          </div>
        </router-link>
      </div>
      
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen">
        <span class="hamburger-icon">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>
      
      <nav class="nav" :class="{ 'nav-open': isMobileMenuOpen }">
        <div class="nav-content">
          <router-link to="/" class="nav-link" exact @click="closeMobileMenu">Home</router-link>
          <router-link to="/about" class="nav-link" @click="closeMobileMenu">About</router-link>
          <router-link to="/experience" class="nav-link" @click="closeMobileMenu">Experience</router-link>
          <router-link to="/projects" class="nav-link" @click="closeMobileMenu">Projects</router-link>
          <router-link to="/education" class="nav-link" @click="closeMobileMenu">Education</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMobileMenu">Contact</router-link>
        </div>
      </nav>
      
      <div class="nav-overlay" :class="{ 'overlay-visible': isMobileMenuOpen }" @click="closeMobileMenu"></div>
      
      <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        {{ themeIcon }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  
  data() {
    return {
      isDark: false,
      themeIcon: '🌙',
      isMobileMenuOpen: false
    };
  },
  
  mounted() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDark = true;
      this.themeIcon = '☀️';
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDark = true;
      this.themeIcon = '☀️';
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  },
  
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.themeIcon = this.isDark ? '☀️' : '🌙';
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }
};
</script>

<style scoped>
:root {
  --header-bg: #ffffff;
  --header-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --nav-link-color: #333;
  --nav-link-hover: #3b82f6;
  --nav-link-active: #3b82f6;
  --logo-main-color: #3b82f6;
  --logo-sub-color: #666;
  --theme-toggle-bg-hover: #f0f0f0;
  --mobile-menu-bg: #ffffff;
  --mobile-menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --border-color: #eee;
  --overlay-bg: rgba(0, 0, 0, 0.5);
  --transition-base: 0.3s ease;
}

[data-theme="dark"] {
  --header-bg: #1a1a1a;
  --header-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  --nav-link-color: #ffffff;
  --nav-link-hover: #60a5fa;
  --nav-link-active: #60a5fa;
  --logo-main-color: #60a5fa;
  --logo-sub-color: #d1d5db;
  --theme-toggle-bg-hover: #333;
  --mobile-menu-bg: #1a1a1a;
  --mobile-menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  --border-color: #333;
  --overlay-bg: rgba(0, 0, 0, 0.7);
}

.header {
  background: var(--header-bg);
  box-shadow: var(--header-shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
}

.logo-link {
  text-decoration: none;
  display: inline-block;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform var(--transition-base);
}

.logo-container:hover {
  transform: translateY(-2px);
}

.logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  transition: all var(--transition-base);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-container:hover .logo-image {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--logo-main-color);
  letter-spacing: -0.5px;
}

.logo-sub {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--logo-sub-color);
  letter-spacing: 0.5px;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--nav-link-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color var(--transition-base);
  background: none;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--nav-link-hover);
}

.nav-link.router-link-exact-active {
  color: var(--nav-link-active);
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--nav-link-active);
  border-radius: 1px;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  color: var(--nav-link-color);
  margin-left: 1rem;
  z-index: 1002;
}

.theme-toggle:hover {
  background: var(--theme-toggle-bg-hover);
  transform: rotate(15deg);
}

.theme-toggle:focus {
  outline: 2px solid var(--nav-link-active);
  outline-offset: 2px;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  color: var(--nav-link-color);
  transition: all var(--transition-base);
  z-index: 1002;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.mobile-menu-toggle:hover {
  background: var(--theme-toggle-bg-hover);
}

.mobile-menu-toggle:focus {
  outline: 2px solid var(--nav-link-active);
  outline-offset: 2px;
}

.nav-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay-bg);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.overlay-visible {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 1023px) {
  .container {
    padding: 0.75rem 1rem;
  }
  
  .nav-content {
    gap: 1.5rem;
  }
  
  .logo-image {
    width: 45px;
    height: 45px;
  }
  
  .logo-main {
    font-size: 1.35rem;
  }
}

@media (max-width: 767px) {
  .container {
    padding: 0.75rem;
  }
  
  .mobile-menu-toggle {
    display: flex;
    order: 2;
    margin-left: auto;
  }
  
  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: #ffffff; 
    box-shadow: var(--mobile-menu-shadow);
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 5rem 0rem;
    transition: right 0.3s ease;
    z-index: 1001;
    overflow-y: auto;
    margin: 0;
  }
  
  [data-theme="dark"] .nav {
    background: #1a1a1a; 
  }
  
  .nav {
    background: rgba(255, 255, 255, 1) !important; 
  }
  
  [data-theme="dark"] .nav {
    background: rgba(26, 26, 26, 1) !important; 
  }
  
  .nav-open {
    right: 0;
  }
  
  .nav-content {
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0;
  }
  
  .nav-link {
    width: 100%;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 1.1rem;
    text-align: left;
    display: block;
    box-sizing: border-box;
    background: transparent; 
  }
  
  .nav-link.router-link-exact-active {
    font-weight: 600;
    background: rgba(59, 130, 246, 0.1);
    color: var(--nav-link-active);
  }
  
  [data-theme="dark"] .nav-link.router-link-exact-active {
    background: rgba(96, 165, 250, 0.1);
  }
  
  .nav-link:last-child {
    border-bottom: none;
  }
  
  .nav-link.router-link-exact-active::after {
    display: none;
  }
  
  .theme-toggle {
    position: static;
    order: 3;
    margin-left: 0.5rem;
  }
  
  .logo-image {
    width: 40px;
    height: 40px;
  }
  
  .logo-main {
    font-size: 1.25rem;
  }
  
  .logo-sub {
    font-size: 0.75rem;
  }
  
  .logo-container {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
  }
  
  .nav {
    width: 100%;
    max-width: 300px;
  }
  
  .logo-main {
    font-size: 1.1rem;
  }
  
  .logo-sub {
    display: none;
  }
  
  .logo-image {
    width: 36px;
    height: 36px;
  }
  
  .theme-toggle,
  .mobile-menu-toggle {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
}

@media (max-width: 360px) {
  .logo-main {
    font-size: 1rem;
  }
  
  .logo-image {
    width: 32px;
    height: 32px;
  }
  
  .nav {
    max-width: 280px;
  }
  
  .nav-link {
    font-size: 1rem;
    padding: 0.875rem 1.25rem;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .nav {
    padding-top: 4rem;
  }
  
  .nav-link {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.logo-container:hover .logo-image {
  animation: logoFloat 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .logo-container:hover .logo-image {
    animation: none;
  }
  
  .nav,
  .logo-container,
  .theme-toggle,
  .mobile-menu-toggle {
    transition: none;
  }
}

.nav-link:focus-visible,
.theme-toggle:focus-visible,
.mobile-menu-toggle:focus-visible {
  outline: 2px solid var(--nav-link-active);
  outline-offset: 2px;
  border-radius: 4px;
}

@media print {
  .header {
    position: static;
    box-shadow: none;
  }
  
  .theme-toggle,
  .mobile-menu-toggle {
    display: none;
  }
  
  .nav {
    position: static;
    display: flex;
    width: auto;
    height: auto;
    padding: 0;
  }
  
  .nav-content {
    flex-direction: row;
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.25rem 0;
    border: none;
  }
}
</style>