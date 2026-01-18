<template>
  <section class="experience-section">
    <div class="container">
      <div class="section-header">
        <h1 class="about-title">EXPERIENCE</h1>
        <div class="title-line"></div>
      </div>
      <div class="timeline">
        <div class="timeline-line"></div>
        <div class="experience-card" v-for="(exp, index) in experiences" :key="index" 
             :style="{ '--delay': index }">
          <div class="timeline-dot">
            <div class="dot-inner"></div>
          </div>
          <div class="card-content">
            <div class="date-badge">
              <span class="date-text">{{ exp.date }}</span>
            </div>
            <div class="card-body">
              <div class="card-header">
                <h3 class="job-title">{{ exp.title }}</h3>
                <div class="company-info">
                  <span class="company-name">{{ exp.company }}</span>
                  <span class="separator">•</span>
                  <span class="location">{{ exp.location }}</span>
                </div>
              </div>
              <p class="job-description">{{ exp.description }}</p>
              <div class="achievements">
                <h4 class="achievements-title">Key Achievements</h4>
                <ul class="achievements-list">
                  <li v-for="(achievement, i) in exp.achievements" :key="i">
                    <span class="bullet">▸</span>
                    <span class="achievement-text">{{ achievement }}</span>
                  </li>
                </ul>
              </div>
              <div class="tech-tags" v-if="exp.tech">
                <span class="tech-tag" v-for="tech in exp.tech" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeData } from '@/store/resume';

const { experiences } = useResumeData();
</script>

<style scoped>
.experience-section {
  padding: 4rem 0;
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
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
}

.title-line {
  width: 80px;
  height: 2px;
  background: var(--primary);
  margin: 0 auto;
  top: 5px;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
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

.experience-card {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.2s);
  margin-left: -145px;
}

.experience-card:last-child {
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

.experience-card:hover .timeline-dot {
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

.experience-card:hover .card-content {
  transform: translateX(10px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(99, 102, 241, 0.3);
}

.experience-card:hover .card-content::before {
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
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.company-info {
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

.job-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  padding-right: 120px;
}

.achievements {
  margin-bottom: 2rem;
}

.achievements-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
}

.achievements-list {
  list-style: none;
  padding-left: 0;
}

.achievements-list li {
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

.achievement-text {
  flex: 1;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface);
}

.tech-tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all var(--transition-fast);
}

.tech-tag:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-1px);
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

[data-theme="dark"] .card-content {
  background: var(--dark-card);
  border-color: var(--dark-surface);
}

[data-theme="dark"] .tech-tag {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

[data-theme="dark"] .timeline-line {
  background: linear-gradient(to bottom, 
    transparent 0%, 
    var(--primary-light) 10%, 
    var(--primary-light) 90%, 
    transparent 100%);
}

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
}

@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 0;
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
  
  .job-description {
    padding-right: 0;
  }
  
  .company-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .separator {
    display: none;
  }
}

.about-title {
  animation: fadeInUp 0.8s ease-out;
}

@media (max-width: 480px) {
  .experience-section {
    padding: 3rem 0;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .about-title {
    font-size: 1.75rem;
    letter-spacing: 2px;
  }
  
  .job-title {
    font-size: 1.3rem;
  }
  
  .company-name {
    font-size: 1rem;
  }
  
  .location {
    font-size: 0.9rem;
  }
  
  .job-description {
    font-size: 1rem;
  }
  
  .achievements-title {
    font-size: 1rem;
  }
}
</style>