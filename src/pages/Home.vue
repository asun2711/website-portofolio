<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Hai, Saya <span class="highlight">{{ resumeData.name }}</span></h1>
        <h2 class="hero-subtitle">{{ resumeData.title }}</h2>
        <p class="hero-description">
          {{ resumeData.bio }}
        </p>
        <div class="hero-buttons">
          <router-link to="/about" class="btn-onemary">
            View About Me
          </router-link>
          <router-link to="/projects" class="btn-primary">
            View My Work
          </router-link>
          <router-link to="/contact" class="btn-secondary">
            Contact Me
          </router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="avatar-container">
          <img 
            src="@/assets/foto.jpg" 
            :alt="`${resumeData.name} - ${resumeData.title}`"
            class="avatar-image"
          />
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <h2 class="section-title">Experience</h2>
      <div class="home-experience-grid">
        <div 
          v-for="(exp, index) in limitedExperiences" 
          :key="index"
          class="home-experience-card">
          <div class="experience-card-content">
            <div class="experience-card-header">
              <div class="experience-title-wrapper">
                <h3 class="experience-title">{{ exp.title }}</h3>
                <div class="experience-badge">
                  <span class="experience-date">{{ exp.date }}</span>
                </div>
              </div>
              <div class="experience-company">
                <span class="company-name">{{ exp.company }}</span>
                <span class="separator">•</span>
                <span class="location">{{ exp.location }}</span>
              </div>
            </div>
            
            <p class="experience-summary">{{ getSummaryDescription(exp.description) }}</p>
            
            <!-- Hanya tampilkan 2 tech tags pertama -->
            <div class="experience-tech-preview" v-if="exp.tech && exp.tech.length > 0">
              <span 
                class="tech-tag-preview" 
                v-for="tech in getLimitedTech(exp.tech)" 
                :key="tech">
                {{ tech }}
              </span>
              <span v-if="exp.tech.length > 2" class="tech-more">+{{ exp.tech.length - 2 }} more</span>
            </div>
            
            <!-- Tombol Learn More -->
            <router-link :to="'/experience'" class="learn-more-btn">
              Learn More
              <span class="arrow">→</span>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Tombol untuk melihat semua experience -->
      <div class="view-all-container">
        <router-link to="/experience" class="view-all-btn">
          View All Experience
          <span class="arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="featured-section">
      <h2 class="section-title">Featured Projects</h2>
      <div class="featured-projects">
        <div 
          v-for="project in limitedProjects" 
          :key="project.id" 
          class="featured-card">
          <div class="featured-content">
            <h3>{{ project.title }}</h3>
            <p>{{ getProjectSummary(project.description) }}</p>
            <router-link :to="`/projects`" class="project-link">
              View All Projects →
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Tombol untuk melihat semua projects -->
      <div class="view-all-container">
        <router-link to="/projects" class="view-all-btn">
          View All Projects
          <span class="arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
      <h2 class="section-title">My Skills</h2>
      <div 
        v-for="(skillCategory, index) in resumeData.skills" 
        :key="skillCategory.category"
        class="skill-category">
        <h3 class="category-title" :class="`category-${index % 3}`">
          {{ skillCategory.category }}
        </h3>
        <div class="skills-grid">
          <div 
            v-for="skillItem in skillCategory.items" 
            :key="skillItem"
            class="skill-card"
            :class="`skill-color-${(skillCategory.items.indexOf(skillItem) + index) % 6}`">
            <h3>{{ skillItem }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="education-preview-section">
      <h2 class="section-title">Education</h2>
      <div class="home-education-grid">
        <div 
          v-for="(edu, index) in limitedEducation" 
          :key="index"
          class="home-education-card"
          :style="{ '--delay': index }">
          
          <div class="education-card-content">
            <div class="education-date-badge">
              <span class="date-text">{{ edu.year }}</span>
            </div>
            
            <div class="education-card-body">
              <div class="education-card-header">
                <h3 class="education-degree-title">{{ edu.degree }}</h3>
                <div class="education-institution-info">
                  <span class="institution-name">{{ edu.institution }}</span>
                </div>
              </div>
              
              <p class="education-summary">{{ getEducationSummary(edu.description) }}</p>
              
              <!-- Tombol untuk melihat detail lengkap -->
              <router-link :to="'/education'" class="education-learn-more-btn">
                View Details
                <span class="arrow">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tombol untuk melihat semua education -->
      <div class="education-view-all-container">
        <router-link to="/education" class="education-view-all-btn">
          View All Education
          <span class="arrow">→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useResumeData } from '@/store/resume';
import { computed } from 'vue';

// Ambil data langsung dari resume store
const resumeData = useResumeData();

// Hanya ambil 2 pengalaman pertama untuk preview
const limitedExperiences = computed(() => {
  return resumeData.experiences.slice(0, 2);
});

// Hanya ambil 3 project pertama untuk preview
const limitedProjects = computed(() => {
  return resumeData.projects.slice(0, 3);
});

// Hanya ambil pendidikan terbaru untuk preview
const limitedEducation = computed(() => {
  return resumeData.education.slice(0, 2);
});

// Potong deskripsi menjadi lebih pendek (summary)
const getSummaryDescription = (description: string) => {
  if (description.length > 150) {
    return description.substring(0, 150) + '...';
  }
  return description;
};

// Potong deskripsi project menjadi lebih pendek
const getProjectSummary = (description: string) => {
  if (description.length > 120) {
    return description.substring(0, 120) + '...';
  }
  return description;
};

// Potong deskripsi pendidikan menjadi lebih pendek
const getEducationSummary = (description: string) => {
  if (description.length > 120) {
    return description.substring(0, 120) + '...';
  }
  return description;
};

// Hanya ambil 2 tech tags pertama
const getLimitedTech = (tech: string[]) => {
  return tech.slice(0, 2);
};
</script>

<style scoped>
/* CSS Variables untuk dark/light mode */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --text-tertiary: #6b7280;
  --border-color: #e5e7eb;
  --card-bg: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --hover-shadow: rgba(0, 0, 0, 0.15);
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --surface: #e5e7eb;
  --gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --transition-base: 0.3s ease;
  --transition-fast: 0.2s ease;
  --radius-lg: 12px;
  --radius-md: 8px;
  --radius-full: 9999px;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-tertiary: #9ca3af;
    --border-color: #374151;
    --card-bg: #1f2937;
    --surface: #374151;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --hover-shadow: rgba(0, 0, 0, 0.4);
    --primary: #60a5fa;
    --primary-light: #93c5fd;
    --gradient-primary: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  }
}

.home-page {
  position: relative; 
  padding: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.home-page::before {
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

/* Grid untuk experience cards di home page */
.home-experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Card Experience untuk Home Page */
.home-experience-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  overflow: hidden;
  position: relative;
}

.home-experience-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(59, 130, 246, 0.3);
}

.home-experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.home-experience-card:hover::before {
  opacity: 1;
}

.experience-card-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.experience-card-header {
  margin-bottom: 1.5rem;
}

.experience-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.experience-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin: 0;
  flex: 1;
}

.experience-badge {
  background: var(--gradient-primary);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 1rem;
  white-space: nowrap;
}

.experience-company {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
}

.separator {
  color: var(--text-secondary);
  font-weight: bold;
}

.location {
  font-size: 1rem;
  color: var(--text-secondary);
}

.experience-summary {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  flex-grow: 1;
}

/* Tech Tags Preview */
.experience-tech-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--surface);
}

.tech-tag-preview {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.tech-more {
  background: rgba(156, 163, 175, 0.1);
  color: var(--text-secondary);
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--surface);
}

/* Tombol Learn More di setiap card */
.learn-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  align-self: flex-start;
  background: transparent;
}

.learn-more-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateX(5px);
  border-color: rgba(59, 130, 246, 0.5);
}

.learn-more-btn .arrow {
  transition: transform var(--transition-base);
}

.learn-more-btn:hover .arrow {
  transform: translateX(3px);
}

/* Tombol View All */
.view-all-container {
  text-align: center;
  margin-top: 2rem;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--gradient-primary);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all var(--transition-base);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  gap: 1rem;
}

.view-all-btn .arrow {
  transition: transform var(--transition-base);
}

.view-all-btn:hover .arrow {
  transform: translateX(4px);
}

/* Hero Section Styles */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 6rem;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlight {
  color: #3b82f6;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-weight: 400;
  
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-tertiary);
  margin-bottom: 2rem;
  text-align: justify;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-onemary {
  background: #8245fc;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-onemary:hover {
  background: #793bf6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-primary {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-secondary {
  border: 2px solid #3b82f6;
  color: #3b82f6;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid var(--card-bg); 
  box-shadow: 
    var(--shadow-xl),
    0 0 0 12px rgba(137, 89, 251, 0.87); 
  transition: all var(--transition-base);
}

.avatar-container:hover {
  transform: scale(1.05);
  box-shadow: 
    var(--shadow-xl),
    0 0 0 12px rgba(103, 44, 240, 0.87); 
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.avatar-container:hover .avatar-image {
  transform: scale(1.1);
}

.avatar-container::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.avatar-container:hover::before {
  opacity: 0.3;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Skills Section */
.skills-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
  padding:2rem 0;
  position: relative;
}

.skills-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--primary-light), 
    transparent);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-primary);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  border-radius: 3px;
}

/* Style untuk kategori skill */
.skill-category {
  margin-bottom: 4rem;
}

/* Warna untuk judul kategori */
.category-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;
  font-weight: 600;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  border-radius: 2px;
}

.category-0 {
  color: #3b82f6;
}
.category-0::after {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.category-1 {
  color: #10b981;
}
.category-1::after {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.category-2 {
  color: #8b5cf6;
}
.category-2::after {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
}

/* Grid untuk skill cards */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Skill cards dengan berbagai warna */
.skill-card {
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  border: none;
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: currentColor;
  opacity: 0.1;
  z-index: 1;
}

.skill-card h3 {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0;
  z-index: 2;
  position: relative;
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px var(--hover-shadow);
}

/* Warna-warna untuk skill cards */
.skill-color-0 {
  color: #3b82f6;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-left: 4px solid #3b82f6;
}

.skill-color-1 {
  color: #10b981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
  border-left: 4px solid #10b981;
}

.skill-color-2 {
  color: #8b5cf6;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05));
  border-left: 4px solid #8b5cf6;
}

.skill-color-3 {
  color: #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
  border-left: 4px solid #ef4444;
}

.skill-color-4 {
  color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
  border-left: 4px solid #f59e0b;
}

.skill-color-5 {
  color: #ec4899;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05));
  border-left: 4px solid #ec4899;
}

/* Dark mode adjustments untuk skill cards */
@media (prefers-color-scheme: dark) {
  .skill-card {
    background-color: var(--card-bg);
  }
  
  .skill-color-0 {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.08));
  }
  
  .skill-color-1 {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08));
  }
  
  .skill-color-2 {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.08));
  }
  
  .skill-color-3 {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08));
  }
  
  .skill-color-4 {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08));
  }
  
  .skill-color-5 {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.08));
  }
}

/* Featured Projects Section */
.featured-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
  padding:2rem 0;
  position: relative;
}

.featured-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--primary-light), 
    transparent);
}

.featured-projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.featured-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-5px);
}

.featured-card:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.featured-card:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.featured-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.featured-content p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.5;
  color: white;
}

.project-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid white;
  padding-bottom: 2px;
  display: inline-block;
  transition: all 0.3s ease;
}

.project-link:hover {
  opacity: 0.8;
  transform: translateX(5px);
}

/* Experience Section */
.experience-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
  padding:2rem 0;
  position: relative;
}

.experience-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--primary-light), 
    transparent);
}

/* Education Preview Section */
.education-preview-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
  padding:2rem 0;
  position: relative;
}

.education-preview-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--primary-light), 
    transparent);
}

.home-education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
}

.home-education-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  overflow: hidden;
  position: relative;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.2s);
  opacity: 0;
  transform: translateY(30px);
}

.home-education-card:hover {
  transform: translateY(-5px) translateX(5px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(99, 102, 241, 0.3);
}

.education-card-content {
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
}

.education-card-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.home-education-card:hover .education-card-content::before {
  opacity: 1;
}

.education-date-badge {
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  background: var(--gradient-primary);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.education-card-header {
  margin-bottom: 1.5rem;
  padding-right: 120px;
}

.education-degree-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.education-institution-info {
  display: flex;
  align-items: center;
}

.institution-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
}

.education-summary {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

/* Tombol Learn More untuk Education */
.education-learn-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  background: transparent;
  margin-top: 1rem;
}

.education-learn-more-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  transform: translateX(5px);
  border-color: rgba(99, 102, 241, 0.5);
}

.education-learn-more-btn .arrow {
  transition: transform var(--transition-base);
}

.education-learn-more-btn:hover .arrow {
  transform: translateX(3px);
}

/* Tombol View All untuk Education */
.education-view-all-container {
  text-align: center;
  margin-top: 2rem;
}

.education-view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--gradient-primary);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all var(--transition-base);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
}

.education-view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  gap: 1rem;
}

.education-view-all-btn .arrow {
  transition: transform var(--transition-base);
}

.education-view-all-btn:hover .arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .home-experience-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .experience-card-content {
    padding: 1.5rem;
  }
  
  .experience-title-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .experience-badge {
    margin-left: 0;
  }
  
  .experience-company {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .separator {
    display: none;
  }
  
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-direction: column;
  }
  
  .avatar-container {
    width: 200px;
    height: 200px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .skill-category {
    margin-bottom: 3rem;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .skill-card {
    padding: 1.2rem;
    min-height: 70px;
  }
  
  .skill-card h3 {
    font-size: 1rem;
  }
  
  .featured-projects {
    grid-template-columns: 1fr;
  }
  
  .featured-card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 1024px) {
  .home-education-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .education-preview-section {
    padding: 3rem 0;
  }
  
  .home-education-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .education-card-content {
    padding: 2rem;
  }
  
  .education-card-header {
    padding-right: 0;
  }
  
  .education-date-badge {
    position: relative;
    top: 0;
    right: 0;
    display: inline-block;
    margin-bottom: 1.5rem;
  }
  
  .education-degree-title {
    font-size: 1.3rem;
  }
  
  .institution-name {
    font-size: 1rem;
  }
  
  .education-summary {
    font-size: 1rem;
  }
  
  .education-view-all-btn,
  .education-learn-more-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .featured-projects {
    grid-template-columns: 1fr;
  }
  
  .view-all-btn {
    width: 100%;
    justify-content: center;
  }
  
  .learn-more-btn {
    width: 100%;
    justify-content: center;
  }
  
  .education-card-content {
    padding: 1.5rem;
  }
  
  .education-preview-section {
    margin: 0 auto 4rem;
  }
  
  .home-experience-grid {
    grid-template-columns: 1fr;
  }
  
  .experience-card-content {
    padding: 1.25rem;
  }
}

/* Animasi */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .home-education-card {
    background: var(--card-bg);
  }
}
</style>