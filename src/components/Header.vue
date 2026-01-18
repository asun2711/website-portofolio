<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <div class="logo-container">
            <!-- Logo dari file SunWeb.png -->
            <img 
              src="@/assets/SunWeb.png" 
              alt="SunWeb Logo"
              class="logo-image"/>
            <!-- Text -->
            <div class="logo-text">
              <span class="logo-main">SunWeb</span>
              <span class="logo-sub">Portfolio</span>
            </div>
          </div>
        </router-link>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link" exact>Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/experience" class="nav-link">Experience</router-link>
        <router-link to="/projects" class="nav-link">Projects</router-link>
        <router-link to="/education" class="nav-link">Education</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>
      <button class="theme-toggle" @click="toggleTheme">
        {{ themeIcon }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDark = ref(false);
const themeIcon = ref('🌙');

const toggleTheme = () => {
  isDark.value = !isDark.value;
  themeIcon.value = isDark.value ? '☀️' : '🌙';
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};
</script>

<style scoped>
.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0; 
}

.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Logo Styling */
.logo-link {
  text-decoration: none;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: translateY(-2px);
}

.logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

/* Efek hover pada logo */
.logo-container:hover .logo-image {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: -0.5px;
}

.logo-sub {
  font-size: 0.85rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 0.5px;
}

/* Nav Styling */
.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
}

.nav-link.router-link-exact-active {
  color: #3b82f6;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #3b82f6;
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
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: #f0f0f0;
  transform: rotate(15deg);
}

/* Dark Theme */
[data-theme="dark"] .header {
  background: #1a1a1a;
}

[data-theme="dark"] .nav-link {
  color: #fff;
}

[data-theme="dark"] .logo-main {
  color: #60a5fa;
}

[data-theme="dark"] .logo-sub {
  color: #d1d5db;
}

[data-theme="dark"] .theme-toggle:hover {
  background: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .header .container {
    padding: 0.75rem 0;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  [data-theme="dark"] .nav {
    border-top-color: #333;
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
  
  .theme-toggle {
    position: absolute;
    right: 1rem;
    top: 0.75rem;
  }
}

/* Untuk layar sangat kecil */
@media (max-width: 480px) {
  .logo-main {
    font-size: 1.1rem;
  }
  
  .logo-sub {
    display: none;
  }
  
  .nav {
    gap: 0.75rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}

/* Animasi untuk logo */
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
</style>