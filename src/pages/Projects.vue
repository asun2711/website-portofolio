<template>
  <div class="projects-page">
    <div class="about-header">
      <h1 class="about-title">My Projects</h1>
      <div class="title-line"></div>
    </div>

    <!-- Filter kategori -->
    <div class="filters">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="setFilter(category)"
        :class="{ active: filter === category }"
        class="filter-btn">
        {{ category }}
      </button>
      <button 
        @click="setFilter('All')"
        :class="{ active: filter === 'All' }"
        class="filter-btn">
        All
      </button>
    </div>

    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card">
        <img :src="project.image" :alt="project.title" class="project-image" />
        <div class="project-content">
          <div class="project-header">
            <h3>{{ project.title }}</h3>
            <span class="project-year">{{ project.year }}</span>
          </div>
          <p>{{ project.description }}</p>
          
          <div v-if="project.category" class="project-category">
            {{ project.category }}
          </div>
          
          <div class="tech-stack">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="tech-tag">
              {{ tech }}
            </span>
          </div>
          <a :href="project.link" target="_blank" class="project-link">
            View Project →
          </a>
        </div>
      </div>
    </div>

    <!-- Paket Harga Website - Menggunakan data dari store -->
    <div class="packages-section">
      <h2 class="packages-title">Website Packages</h2>
      <div class="title-line"></div>
      
      <div class="packages-grid">
        <div 
          v-for="pkg in websitePackages" 
          :key="pkg.id" 
          class="package-card"
          :class="{ featured: pkg.isFeatured }">
          
          <div v-if="pkg.isPopular" class="package-badge popular">TERPOPULER</div>
          
          <div class="package-header">
            <h3>{{ pkg.name }}</h3>
            <p>{{ pkg.subtitle }}</p>
          </div>
          
          <div class="price-display">
            <div class="discount-tag">{{ pkg.discount }}</div>
            <div class="old-price">{{ pkg.originalPrice }}</div>
            <div class="current-price">
              <span class="amount">{{ pkg.monthlyPrice }}</span>
              <span class="period"></span>
            </div>
            <div class="bonus">{{ pkg.bonusMonths }}</div>
            <div class="promo-tag">{{ pkg.promoTag }}</div>
          </div>
          
          <!-- TOMBOL WHATSAPP -->
          <button 
            class="package-btn" 
            :class="{ primary: pkg.isFeatured }"
            @click="contactViaWhatsApp(pkg)">
            {{ pkg.selectButtonText }}
          </button>
          
          <div class="package-note">
            {{ pkg.priceNote }}
          </div>
          
          <div class="package-features">
            <h4>Fitur Utama:</h4>
            <ul>
              <li v-for="feature in pkg.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
          
          <div class="package-bonus">
            <h4>Bonus:</h4>
            <ul>
              <li v-for="bonus in pkg.bonuses" :key="bonus">{{ bonus }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeData } from '@/store/resume';
import { computed, ref } from 'vue';

// PERBAIKAN DI SINI: Tambahkan 'contact' di destructuring
const { projects, websitePackages, contact } = useResumeData();
const filter = ref('All');

// Ambil semua kategori unik dari projects
const categories = computed(() => {
  const cats = projects
    .map(p => p.category)
    .filter((cat): cat is string => !!cat);
  return [...new Set(cats)];
});

// Filter projects berdasarkan kategori
const filteredProjects = computed(() => {
  if (filter.value === 'All') return projects;
  return projects.filter(project => project.category === filter.value);
});

const setFilter = (category: string) => {
  filter.value = category;
};

// FUNCTION WHATSAPP - Ambil nomor dari data resume
const contactViaWhatsApp = (pkg: any) => {
  const whatsappNumber = contact.whatsapp || contact.phone;
  const cleanNumber = whatsappNumber.replace(/[\s\-\(\)\+]/g, '');
  const message = `Halo, saya tertarik dengan paket ${pkg.name} (${pkg.monthlyPrice}) di website portfolio Anda. Bisa dijelaskan lebih detail?`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
</script>

<style scoped>
.projects-page {
  position: relative;
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.projects-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary-light),
    transparent
  );
}

.about-header {
  text-align: center;
  margin-bottom: 3rem; 
  padding: 0 0.5rem;
}

.about-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  animation: fadeInUp 0.8s ease-out;
}

.projects-count {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.title-line {
  width: 80px;
  height: 2px;
  background: var(--primary);
  margin: 0 auto 1.5rem;
}

/* Filters */
.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border);
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  background: var(--primary-light);
  border-color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid var(--border);
}

.project-content {
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  color: black;
}

.project-header h3 {
  margin: 0;
  color: var(--text);
  font-size: 1.25rem;
  flex: 1;
  color: black;
}

.project-year {
  background: var(--primary-light);
  color: var(--primary-dark); 
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 800; 
  margin-left: 1rem;
  border: 1px solid var(--primary);
  white-space: nowrap; 
}

.project-content p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.95rem;
  color: black;
  text-align: justify;
}

.project-category {
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tech-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: gap 0.2s ease;
}

.project-link:hover {
  gap: 0.75rem;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-page {
    padding: 1.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === TAMBAHAN: STYLE UNTUK PAKET HARGA === */
.packages-section {
  margin-top: 6rem;
  padding: 2rem 0;
}

.packages-title {
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 1rem;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.package-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
}

.package-card.featured {
  border: 2px solid var(--primary);
  transform: translateY(-10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.package-card.featured:hover {
  transform: translateY(-15px);
}

.package-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
}

.package-badge.popular {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.package-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
}

.package-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.5rem;
}

.package-header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
}

.price-display {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  border: 1px solid #e2e8f0;
}

.discount-tag {
  position: absolute;
  top: 1rem;
  right: 0.3rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.old-price {
  font-size: 1rem;
  color: #94a3b8;
  text-decoration: line-through;
  margin-bottom: 0.5rem;
}

.current-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.current-price .amount {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}

.current-price .period {
  color: var(--text-secondary);
  font-size: 1rem;
}

.bonus {
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.promo-tag {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.package-btn {
  width: 100%;
  padding: 1rem;
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.package-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.package-btn.primary {
  background: var(--primary);
  color: white;
}

.package-btn.primary:hover {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
}

.package-note {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.package-features, .package-bonus {
  margin-bottom: 1.5rem;
}

.package-features h4, .package-bonus h4 {
  font-size: 1rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
}

.package-features ul, .package-bonus ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.package-features li, .package-bonus li {
  padding: 0.4rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.package-features li::before, .package-bonus li::before {
  content: '✓';
  color: #10b981;
  font-weight: bold;
  flex-shrink: 0;
}

/* Responsive untuk Packages */
@media (max-width: 1024px) {
  .packages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .packages-section {
    margin-top: 4rem;
    padding: 1.5rem 0;
  }
  
  .packages-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .package-card.featured {
    transform: none;
  }
  
  .package-card.featured:hover {
    transform: translateY(-5px);
  }
  
  .current-price .amount {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .package-card {
    padding: 1.5rem;
  }
  
  .price-display {
    padding: 1.25rem;
  }
  
  .package-header h3 {
    font-size: 1.5rem;
  }
}
</style>