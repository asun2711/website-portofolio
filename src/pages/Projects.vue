<template>
  <div class="projects-page">
    <section class="hero-section">
      <h1 class="about-title">My Projects</h1>
      <div class="title-line"></div>
    </section>

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
  </div>
</template>

<script setup lang="ts">
import { useResumeData } from '@/store/resume';
import { computed, ref } from 'vue';

const { projects } = useResumeData();
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
</script>

<style scoped>
.projects-page {
  position: relative;
  padding: 2rem;
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

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
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
</style>