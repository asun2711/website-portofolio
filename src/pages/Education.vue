<template>
  <section class="education-section">
    <div class="container">
      <div class="section-header">
        <h1 class="about-title">EDUCATION</h1>
        <div class="title-line"></div>
      </div>
      <div class="timeline">
        <div class="timeline-line"></div>
        <div class="education-card" v-for="(edu, index) in educations" :key="index" 
             :style="{ '--delay': index }">
          <div class="timeline-dot">
            <div class="dot-inner"></div>
          </div>
          <div class="card-content">
            <div class="date-badge">
              <span class="date-text">{{ edu.year }}</span>
            </div>
            <div class="card-body">
              <div class="card-header">
                <h3 class="degree-title">{{ edu.degree }}</h3>
                <div class="institution-info">
                  <span class="institution-name">{{ edu.institution }}</span>
                  <span v-if="edu.gpa" class="gpa-badge">
                    GPA: {{ edu.gpa }}
                  </span>
                </div>
              </div>
              
              <p class="education-description">{{ edu.description }}</p>
              
              <h4 class="details-title">Details</h4>
                <ul class="details-list">
                  <li v-for="(detail, i) in edu.details" :key="i">
                    <span class="bullet">▸</span>
                    <span class="detail-text">{{ detail }}</span>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeData } from '@/store/resume';

const { education } = useResumeData();
const educations = education;
</script>

<style scoped>
.education-section {
  padding: 4rem 2rem;
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.education-section::before {
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
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

.title-line {
  width: 80px;
  height: 2px;
  background: var(--primary);
  margin: 0 auto;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 60px;
}

.timeline-line {
  position: absolute;
  left: 30px;
  margin-left: -150px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    var(--primary) 10%, 
    var(--primary) 90%, 
    transparent 100%);
}

.education-card {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.2s);
  margin-left: -145px;
}

.education-card:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -60px;
  top: 20px;
  width: 40px;
  height: 40px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--bg-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2),
              0 10px 20px rgba(99, 102, 241, 0.15);
  z-index: 1;
  transition: all var(--transition-base);
}

.education-card:hover .timeline-dot {
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3),
              0 15px 30px rgba(99, 102, 241, 0.25);
}

.dot-inner {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

.card-content {
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  border: 1px solid var(--surface);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.card-content::before {
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

.education-card:hover .card-content {
  transform: translateX(10px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(99, 102, 241, 0.3);
}

.education-card:hover .card-content::before {
  opacity: 1;
}

.date-badge {
  position: absolute;
  top: 2rem;
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

.card-header {
  margin-bottom: 1.5rem;
  padding-right: 120px;
}

.degree-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.institution-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.institution-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
}

.gpa-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.education-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

/* Details Section */
.details {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(99, 102, 241, 0.03);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary);
}

.details-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
}

.details-list {
  list-style: none;
  padding-left: 0;
}

.details-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.bullet {
  color: var(--primary);
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.detail-text {
  flex: 1;
}

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

/* Dark mode styles */
[data-theme="dark"] .card-content {
  background: var(--dark-card);
  border-color: var(--dark-surface);
}

[data-theme="dark"] .details {
  background: rgba(99, 102, 241, 0.05);
}

[data-theme="dark"] .timeline-line {
  background: linear-gradient(to bottom, 
    transparent 0%, 
    var(--primary-light) 10%, 
    var(--primary-light) 90%, 
    transparent 100%);
}

/* Responsive styles */
@media (max-width: 1024px) {
  .timeline {
    padding-left: 50px;
  }
  
  .timeline-line {
    left: 25px;
  }
  
  .timeline-dot {
    left: -50px;
    width: 36px;
    height: 36px;
  }
  
  .education-card {
    margin-left: -140px;
  }
}

@media (max-width: 768px) {
  .education-section {
    padding: 3rem 1rem;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .timeline {
    padding-left: 0;
  }
  
  .timeline-line {
    display: none;
  }
  
  .timeline-dot {
    display: none;
  }
  
  .education-card {
    margin-left: 0;
  }
  
  .card-content {
    padding: 2rem;
  }
  
  .date-badge {
    position: relative;
    top: 0;
    right: 0;
    display: inline-block;
    margin-bottom: 1.5rem;
  }
  
  .card-header {
    padding-right: 0;
  }
  
  .education-description {
    padding-right: 0;
  }
  
  .details {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .education-section {
    padding: 2.5rem 1rem;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .about-title {
    font-size: 1.75rem;
    letter-spacing: 2px;
  }
  
  .degree-title {
    font-size: 1.3rem;
  }
  
  .institution-name {
    font-size: 1rem;
  }
  
  .education-description {
    font-size: 1rem;
  }
  
  .details-title {
    font-size: 1rem;
  }
}
</style>