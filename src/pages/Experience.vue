<template>
  <!-- Template TETAP SAMA PERSIS -->
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
  padding: 4rem 1rem; /* Tambahkan padding horizontal */
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box; /* Penting untuk mobile */
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  width: 100%;
  padding: 0 1rem; /* Tambahkan padding */
  box-sizing: border-box;
}

.about-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  overflow-wrap: break-word; /* Handle long text */
  word-break: break-word;
}

.title-line {
  width: 80px;
  height: 2px;
  background: var(--primary);
  margin: 0 auto;
  top: 5px;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 60px;
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;
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
  white-space: nowrap; /* Mencegah text wrapping */
}

.card-header {
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
  overflow-wrap: break-word;
  word-break: break-word;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  width: 100%;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
  overflow-wrap: break-word;
  word-break: break-word;
}

.separator {
  color: var(--text-secondary);
  font-weight: bold;
  flex-shrink: 0;
}

.location {
  font-size: 1rem;
  color: var(--text-secondary);
  overflow-wrap: break-word;
  word-break: break-word;
}

.job-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  padding-right: 120px;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-word;
}

.achievements {
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.achievements-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

.achievements-list {
  list-style: none;
  padding-left: 0;
  width: 100%;
  margin: 0;
}

.achievements-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
  width: 100%;
  box-sizing: border-box;
}

.bullet {
  color: var(--primary);
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
  min-width: 1.2rem; /* Pastikan bullet tidak menyusut */
}

.achievement-text {
  flex: 1;
  overflow-wrap: break-word;
  word-break: break-word;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface);
  width: 100%;
  box-sizing: border-box;
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
  white-space: nowrap; /* Mencegah tag terpecah */
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
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

.about-title {
  animation: fadeInUp 0.8s ease-out;
}

/* Dark mode styles */
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

/* ==================== */
/* RESPONSIVE FIXES */
/* ==================== */

@media (max-width: 1200px) {
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 1024px) {
  .timeline {
    padding-left: 40px; /* Kurangi padding */
  }
  
  .timeline-line {
    left: 20px; /* Sesuaikan posisi */
    margin-left: -130px;
  }
  
  .timeline-dot {
    left: -45px;
    width: 34px;
    height: 34px;
  }
  
  .experience-card {
    margin-left: -125px; /* Sesuaikan margin */
  }
  
  .job-description {
    padding-right: 100px; /* Kurangi padding */
  }
}

@media (max-width: 900px) {
  .timeline {
    padding-left: 30px;
  }
  
  .timeline-line {
    left: 15px;
    margin-left: -110px;
  }
  
  .experience-card {
    margin-left: -105px;
  }
  
  .card-content {
    padding: 2rem;
  }
  
  .date-badge {
    right: 1.5rem;
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }
  
  .job-description {
    padding-right: 80px;
  }
}

/* TABLET (768px dan bawah) - FIX UTAMA */
@media (max-width: 768px) {
  .experience-section {
    padding: 3rem 1rem; /* Kurangi padding vertikal */
  }
  
  .section-header {
    margin-bottom: 2.5rem;
    padding: 0 0.5rem;
  }
  
  .about-title {
    font-size: 2rem;
    letter-spacing: 0.15em;
  }
  
  .timeline {
    padding-left: 0; /* HAPUS padding kiri */
    margin: 0;
  }
  
  .timeline-line {
    display: none; /* Sembunyikan timeline di mobile */
  }
  
  .timeline-dot {
    display: none; /* Sembunyikan dot di mobile */
  }
  
  .experience-card {
    margin-left: 0 !important; /* HAPUS margin negatif */
    margin-bottom: 2rem;
    width: 100%;
    animation-delay: calc(var(--delay) * 0.1s); /* Percepat animasi di mobile */
  }
  
  .card-content {
    padding: 1.75rem;
    margin: 0;
    width: 100%;
    border-radius: var(--radius-md, 10px);
  }
  
  .card-content::before {
    display: none; /* Sembunyikan garis kiri di mobile */
  }
  
  .date-badge {
    position: relative !important;
    top: 0 !important;
    right: 0 !important;
    display: inline-block;
    margin-bottom: 1.25rem;
    width: auto;
    font-size: 0.8rem;
    padding: 0.4rem 0.9rem;
  }
  
  .job-title {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }
  
  .company-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  
  .separator {
    display: none; /* Sembunyikan separator di mobile */
  }
  
  .company-name {
    font-size: 1.05rem;
  }
  
  .location {
    font-size: 0.95rem;
    color: var(--text-secondary);
  }
  
  .job-description {
    padding-right: 0 !important; /* HAPUS padding kanan */
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .achievements {
    margin-bottom: 1.5rem;
  }
  
  .achievements-title {
    font-size: 1.05rem;
    margin-bottom: 0.75rem;
  }
  
  .achievements-list li {
    margin-bottom: 0.5rem;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .bullet {
    font-size: 1rem;
    margin-top: 0.15rem;
  }
  
  .achievement-text {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .tech-tags {
    gap: 0.4rem;
    padding-top: 1.25rem;
  }
  
  .tech-tag {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
  
  /* Hapus hover effects di mobile untuk performa */
  .experience-card:hover .card-content {
    transform: none;
  }
  
  .experience-card:hover .timeline-dot {
    transform: none;
  }
}

/* MOBILE KECIL (480px dan bawah) */
@media (max-width: 480px) {
  .experience-section {
    padding: 2.5rem 0.75rem;
  }
  
  .about-title {
    font-size: 1.75rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }
  
  .title-line {
    width: 60px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .job-title {
    font-size: 1.3rem;
    line-height: 1.4;
  }
  
  .company-name {
    font-size: 1rem;
  }
  
  .location {
    font-size: 0.9rem;
  }
  
  .job-description {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
  }
  
  .achievements-title {
    font-size: 1rem;
  }
  
  .achievements-list li {
    margin-bottom: 0.4rem;
  }
  
  .achievement-text {
    font-size: 0.9rem;
  }
  
  .tech-tags {
    gap: 0.35rem;
  }
  
  .tech-tag {
    padding: 0.25rem 0.7rem;
    font-size: 0.75rem;
  }
  
  .date-badge {
    font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
    margin-bottom: 1rem;
  }
}

/* MOBILE SANGAT KECIL (360px dan bawah) */
@media (max-width: 360px) {
  .experience-section {
    padding: 2rem 0.5rem;
  }
  
  .about-title {
    font-size: 1.5rem;
    letter-spacing: 0.08em;
  }
  
  .card-content {
    padding: 1.25rem;
  }
  
  .job-title {
    font-size: 1.2rem;
  }
  
  .job-description {
    font-size: 0.9rem;
  }
  
  .achievements-list li {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .bullet {
    margin-top: 0;
  }
  
  .tech-tags {
    justify-content: center;
  }
  
  .tech-tag {
    flex: 1;
    min-width: 0;
    text-align: center;
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
  }
}

/* Landscape mode untuk mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .experience-section {
    padding: 2rem 1rem;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .about-title {
    font-size: 1.8rem;
  }
  
  .experience-card {
    margin-bottom: 1.5rem;
  }
  
  .card-content {
    padding: 1.25rem;
  }
}
</style>