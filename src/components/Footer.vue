<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-content">
          <!-- Left Column: Logo & Description -->
          <div class="footer-column">
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
            <p class="footer-tagline">
              Mengoptimalkan pemanfaatan digital untuk solusi yang efektif dan berkelanjutan.
            </p>
            <div class="social-buttons">
              <a 
                :href="social.url" 
                class="social-btn" 
                v-for="social in socialLinks" 
                :key="social.name"
                target="_blank"
                :title="social.name">
                <span class="social-icon" v-html="social.icon"></span>
                <span class="social-tooltip">{{ social.name }}</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Navigation & Contact Side by Side -->
          <div class="footer-column">
            <div class="right-sections">
              <div class="navigation-section">
                <h3 class="section-title">Navigation</h3>
                <div class="nav-links">
                  <router-link to="/" class="nav-link">
                    <span class="nav-icon">🏠</span>
                    Home
                  </router-link>
                  <router-link to="/about" class="nav-link">
                    <span class="nav-icon">👤</span>
                    About
                  </router-link>
                   <router-link to="/experience" class="nav-link">
                    <span class="nav-icon">📈</span>
                    Experience
                  </router-link>
                  <router-link to="/projects" class="nav-link">
                    <span class="nav-icon">💼</span>
                    Projects
                  </router-link>
                  <router-link to="/education" class="nav-link">
                    <span class="nav-icon">🎓</span>
                    Education
                  </router-link>
                </div>
              </div>

              <div class="contact-section">
                <h3 class="section-title">Contact Me</h3>
                <div class="contact-links">
                  <router-link to="/contact" class="nav-link">
                    <span class="nav-icon">📞</span>
                    call me or send a message
                  </router-link>
                  <a href="mailto:asunfadrianto2799@gmail.com" class="contact-link">
                    <span class="contact-icon">✉️</span>
                    <div class="contact-text">
                      <div class="contact-label">Email</div>
                      <div class="contact-detail">asunfadrianto2799@gmail.com</div>
                    </div>
                  </a>
                   <a href="tel:+6282377167605" class="contact-link">
                    <span class="contact-icon">📱</span>
                    <div class="contact-text">
                      <div class="contact-label">Phone</div>
                      <div class="contact-detail">+62 823 7716 7605</div>
                    </div>
                  </a>
                  <a href="https://wa.me/6282377167605" target="_blank" class="contact-link">
                    <span class="contact-icon">💚</span>
                    <div class="contact-text">
                      <div class="contact-label">WhatsApp</div>
                      <div class="contact-detail">+62 823 7716 7605</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container">
        <div class="copyright-container">
          <p class="copyright">
            © {{ year }} <span class="highlight">SunWeb Portfolio</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const year = ref(new Date().getFullYear());

const socialLinks = [
  { 
    name: 'Instagram', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>`, 
    url: 'https://www.instagram.com/asun_ranssee27/'
  },
  { 
    name: 'Facebook', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>`, 
    url: 'https://www.facebook.com/godak.lolo.5' 
  },
  { 
    name: 'TikTok', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>`, 
    url: 'https://www.tiktok.com/@asun_ranssee?_r=1&_t=ZS-93Aux4qhNdVhttps://www.tiktok.com/@asun_ranssee?_r=1&_t=ZS-93Aux4qhNdV' 
  },
  { 
    name: 'LinkedIn', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>`, 
    url: 'https://www.linkedin.com/in/asun-fadrianto27?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'GitHub', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>`, 
    url: '#' 
  },
];
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.1) 0%, 
    rgba(6, 182, 212, 0.1) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  position: relative;
  overflow: hidden;
  margin-top: auto;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.footer-top {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-bottom {
  padding: 1.5rem 0;
  background: rgba(99, 102, 241, 0.05);
}

/* Footer Content Layout */
.footer-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  width: 100%;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .footer .container {
    padding: 0 0.75rem;
  }
  
  .footer-top {
    padding: 3rem 0 2rem;
  }
}

/* Footer Column */
.footer-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Right Sections Layout */
.right-sections {
  display: flex;
  gap: 3rem;
  justify-content: space-between;
}

@media (max-width: 640px) {
  .right-sections {
    flex-direction: column;
    gap: 2rem;
  }
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
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 12px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
}

.logo-container:hover .logo-image {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-main {
  font-size: 1.8rem;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: -0.5px;
}

.logo-sub {
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.footer-tagline {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 300px;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.social-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.social-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-btn:nth-child(1)::before { background: linear-gradient(45deg, #E1306C, #FD1D1D, #F77737); }
.social-btn:nth-child(2)::before { background: #1877F2; }
.social-btn:nth-child(3)::before { background: #000000; }
.social-btn:nth-child(4)::before { background: #0A66C2; }
.social-btn:nth-child(5)::before { background: #333333; }

.social-btn:hover::before {
  opacity: 1;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: transparent;
}

.social-icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon svg {
  width: 18px;
  height: 18px;
}

.social-btn:hover .social-icon {
  color: white;
  transform: scale(1.1);
}

.social-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
}

.social-btn:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -40px;
}

/* Navigation Section */
.navigation-section,
.contact-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  position: relative;
  padding-bottom: 0.5rem;
  white-space: nowrap;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 3px;
  background: #3b82f6;
  border-radius: 2px;
}

.nav-links,
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-link,
.contact-link {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 0.4rem 0.5rem;
  border-radius: 8px;
}

.nav-link:hover,
.contact-link:hover {
  color: #3b82f6;
  transform: translateX(5px);
  background: rgba(59, 130, 246, 0.05);
}

.nav-icon,
.contact-icon {
  font-size: 1rem;
  width: 24px;
  text-align: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.nav-link:hover .nav-icon,
.contact-link:hover .contact-icon {
  opacity: 1;
}

/* Contact Text Layout */
.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.contact-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #4b5563;
}

.contact-detail {
  font-size: 0.85rem;
  color: #6b7280;
  word-break: break-word;
}

.contact-link:hover .contact-label {
  color: #3b82f6;
}

.contact-link:hover .contact-detail {
  color: #4b5563;
}

/* Copyright Section */
.copyright-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.copyright {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.copyright .highlight {
  color: #3b82f6;
  font-weight: 600;
}

/* Animations */
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

/* Dark Mode */
[data-theme="dark"] .footer {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.15) 0%, 
    rgba(6, 182, 212, 0.15) 100%);
  border-top-color: rgba(99, 102, 241, 0.3);
}

[data-theme="dark"] .footer-bottom {
  background: rgba(99, 102, 241, 0.1);
}

[data-theme="dark"] .social-btn {
  background: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}

[data-theme="dark"] .social-btn:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

[data-theme="dark"] .footer-tagline,
[data-theme="dark"] .copyright,
[data-theme="dark"] .nav-link,
[data-theme="dark"] .contact-link {
  color: #d1d5db;
}

[data-theme="dark"] .logo-sub {
  color: #9ca3af;
}

[data-theme="dark"] .section-title {
  color: #f3f4f6;
}

[data-theme="dark"] .nav-link:hover,
[data-theme="dark"] .contact-link:hover {
  background: rgba(59, 130, 246, 0.1);
}

[data-theme="dark"] .contact-label {
  color: #d1d5db;
}

[data-theme="dark"] .contact-detail {
  color: #9ca3af;
}

[data-theme="dark"] .contact-link:hover .contact-label {
  color: #60a5fa;
}

[data-theme="dark"] .contact-link:hover .contact-detail {
  color: #d1d5db;
}

[data-theme="dark"] .social-tooltip {
  background: #111827;
}
</style>