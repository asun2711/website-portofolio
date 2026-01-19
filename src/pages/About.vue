<template>
  <section class="about-page">
    <div class="container">
      <div class="about-content">

        <div class="about-header">
          <h1 class="about-title">TENTANG SAYA</h1>
          <div class="title-line"></div>
        </div>

        <div class="profile-section">
          <div class="profile-info">
            <h2 class="name">{{ name }}</h2>
            <p class="bio">
              {{ bio }}
            </p>

            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span class="contact-text">{{ contact.location }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span class="contact-text">{{ contact.email }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <span class="contact-text">{{ contact.phone }}</span>
              </div>
            </div>

            <!-- Button untuk generate resume -->
            <button 
              class="btn btn-primary"
              @click="printResume">
              <span class="btn-text">DOWNLOAD RESUME (CV)</span>
              <span class="btn-icon">📄</span>
            </button>
            
            <!-- Fallback link jika masih ingin file statis -->
            <a 
              v-if="staticResumeExists"
              :href="resumeUrl" 
              download="Asun_Fadrianto_Resume.pdf"
              class="btn btn-secondary"
              @click="trackDownload"
              style="margin-top: 10px;">
              <span class="btn-text">DOWNLOAD PDF STATIS</span>
              <span class="btn-icon">⬇️</span>
            </a>
            
            <p class="resume-note">
              <small>Resume akan di-generate dari data portfolio Anda</small>
            </p>
          </div>

          <div class="profile-image">
            <div class="image-wrapper">
              <div class="image-container">
                <!-- Foto dari assets -->
                <img 
                  src="@/assets/Foto.jpg" 
                  :alt="name + ' - Web Developer'"
                  class="profile-photo"/>
                <!-- Glow effect background -->
                <div class="profile-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useResumeData } from '../store/resume'; 

const { name, bio, contact, experiences, education, skills } = useResumeData();

const resumeUrl = ref('/resume.pdf'); 
const staticResumeExists = ref(false); 
const isLoading = ref(false);

const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  const existingNotif = document.querySelector('.custom-notification');
  if (existingNotif) {
    existingNotif.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `custom-notification notification-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  else if (type === 'warning') icon = '⚠️';
  else if (type === 'error') icon = '❌';
  
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icon}</span>
      <span class="notification-message">${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">×</button>
  `;
  
  // Tambahkan style untuk notifikasi
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .custom-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fff;
        color: #333;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid #3498db;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .notification-info {
        border-left-color: #3498db;
      }
      
      .notification-success {
        border-left-color: #2ecc71;
      }
      
      .notification-warning {
        border-left-color: #f39c12;
      }
      
      .notification-error {
        border-left-color: #e74c3c;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
      }
      
      .notification-icon {
        font-size: 18px;
      }
      
      .notification-message {
        font-size: 14px;
        line-height: 1.4;
        flex: 1;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: #95a5a6;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
      }
      
      .notification-close:hover {
        background: #f8f9fa;
        color: #e74c3c;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
};

const printResume = () => {
  isLoading.value = true;
  showNotification('Mempersiapkan resume...', 'info');
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showNotification('Pop-up diblokir! Izinkan pop-up untuk generate resume.', 'error');
    isLoading.value = false;
    return;
  }
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  showNotification('Resume sedang dibuat, tunggu sebentar...', 'info');
  
  setTimeout(() => {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${name}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.2;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
          }
          
          .resume-container {
            border: 1px solid #ddd;
            padding: 30px;
            background: white;
            position: relative;
          }
          
          /* Foto bulat di pojok kiri atas - PERBESAR */
          .profile-photo-corner {
            position: absolute;
            top: 50px;
            left: 30px;
            width: 140px; /* DIPERBESAR dari 100px */
            height: 140px; /* DIPERBESAR dari 100px */
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid #3498db; /* DIPERBESAR border */
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
          }
          
          .profile-photo-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
          }
          
          /* Header dengan margin kiri untuk memberi ruang foto - DIPERBESAR */
          .resume-header {
            margin-left: 250px; /* DIPERBESAR dari 120px */
            text-align: left;
            margin-bottom: 25px;
            padding-bottom: 15px;
            margin-top: 5px; /* Diubah dari -10px */
          }
          
          .resume-header h1 {
            color: #2c3e50;
            font-size: 20px; /* DIPERBESAR */
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: bold;
          }
          
          .resume-header .title {
            color: #2980b9;
            font-size: 20px; /* DIPERBESAR */
            font-weight: 600;
            margin-bottom: 15px;
          }
          
          /* Contact Info - PERUBAHAN UTAMA: Lebih kompak */
          .contact-info-compact {
            display: flex;
            flex-direction: column;
            gap: 8px; /* DIPERBESAR */
            font-size: 14px; /* DIPERBESAR */
            color: #555;
            margin-top: 10px;
            line-height: 1.2;
          }
          
          .contact-item-compact {
            display: flex;
            align-items: center;
            gap: 8px; /* DIPERBESAR */
          }
          
          /* Section */
          .section {
            margin-bottom: 10px;
            page-break-inside: avoid;
          }
          
          .section-title {
            color: #2c3e50;
            font-size: 16px; /* DIPERBESAR */
            border-bottom: 2px solid #3498db; /* DIPERBESAR */
            padding-bottom: 8px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
          }

          .title {
            margin-top: -10px;
          }
          
          /* Profile */
          .profile p {
            text-align: justify;
            color: #444;
            font-size: 14px; /* DIPERBESAR */
            line-height: 1.2;
          }
          
          /* Experience */
          .experience-item {
            margin-bottom: 25px; /* DIPERBESAR */
            page-break-inside: avoid;
          }
          
          .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
          }
          
          .experience-header h3 {
            color: #2c3e50;
            font-size: 14px; /* DIPERBESAR */
            flex: 1;
            font-weight: 600;
          }
          
          .company-info {
            color: #2980b9;
            font-weight: 600;
            margin-bottom: 6px;
            font-size: 14px; /* DIPERBESAR */
          }
          
          .date {
            color: #7f8c8d;
            font-style: italic;
            font-size: 14px; /* DIPERBESAR */
            white-space: nowrap;
            background: #f8f9fa;
            padding: 3px 10px;
            border-radius: 4px;
          }
          
          .location {
            color: #7f8c8d;
            font-size: 14px;
          }
          
          .description {
            color: #444;
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 1.2;
          }
          
          /* Achievements */
          .achievements ul {
            list-style: none;
            padding-left: 18px;
            margin-top: 10px;
          }
          
          .achievements li {
            margin-bottom: 6px;
            position: relative;
            padding-left: 15px;
            font-size: 14px;
            line-height: 1.2;
          }
          
          .achievements li:before {
            content: "•";
            color: #3498db;
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 14px;
          }
          
          /* Education */
          .education-item {
            margin-bottom: 18px;
          }
          
          .education-item h3 {
            color: #2c3e50;
            font-size: 14px;
            margin-bottom: 4px;
            font-weight: 600;
          }
          
          .education-details {
            display: flex;
            justify-content: space-between;
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 6px;
          }
          
          /* Skills */
          .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
          
          .skill-category h4 {
            color: #2c3e50;
            font-size: 14px;
            margin-bottom: 10px;
            border-left: 3px solid #3498db;
            padding-left: 12px;
            font-weight: 600;
          }
          
          .skill-items {
            color: #444;
            font-size: 14px;
            line-height: 1.2;
          }
          
          /* Footer */
          .resume-footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            color: #7f8c8d;
            font-size: 12px;
          }
          
          /* Print Styles */
          @media print {
            body {
              padding: 0;
              margin: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .resume-container {
              border: none;
              padding: 2mm; /* DIPERBESAR */
            }
            
            .profile-photo-corner {
              top: 1mm;
              left: 1mm;
              width: 150px; /* Tetap besar saat print */
              height: 150px;
              border-width: 3px;
            }
            
            .resume-header {
              margin-left: 210px; /* Disesuaikan */
            }
            
            .no-print {
              display: none;
            }
            
            a {
              color: inherit;
              text-decoration: none;
            }
            
            .page-break {
              page-break-before: always;
            }
          }
          
          @page {
            size: A4;
            margin: 15mm;
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          <!-- Foto bulat di pojok kiri atas - DIPERBESAR -->
           <div class="profile-photo-corner">
            <img src="/Foto.jpg"
                 class="profile-photo-img"
                 alt="${name}"
                 onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:linear-gradient(135deg,#3498db,#2c3e50);display:flex;align-items:center;justify-content:center;color:white;font-size:24px;font-weight:bold;\\'>${name.split(' ').map(n => n.charAt(0)).join('')}</div>';">
              </div>
          
          <!-- Header - VERSI BARU: Lebih kompak -->
          <div class="resume-header">
            <h1>${name}</h1>
            <div class="title">Staff IT & Web Developer</div>
            
            <!-- Contact Info dalam satu baris kompak -->
            <div class="contact-info-compact">
              <div class="contact-item-compact">
                <span>📧</span>
                <span>${contact.email}</span>
              </div>
              <div class="contact-item-compact">
                <span>📱</span>
                <span>${contact.phone}</span>
              </div>
              <div class="contact-item-compact">
                <span>📍</span>
                <span>${contact.location}</span>
              </div>
            </div>
          </div>
          
          <!-- Profile -->
          <div class="section profile">
            <h3 class="section-title">About</h3>
            <p>${bio}</p>
          </div>
          
          <!-- Experience -->
          <div class="section">
            <h3 class="section-title">Experience</h3>
            ${experiences.map(exp => `
              <div class="experience-item">
                <div class="experience-header">
                  <div>
                    <h3>${exp.title}</h3>
                    <div class="company-info">${exp.company} • <span class="location">${exp.location}</span></div>
                  </div>
                  <div class="date">${exp.date}</div>
                </div>
                ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
                ${exp.achievements && exp.achievements.length > 0 ? `
                  <div class="achievements">
                    <ul>
                      ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          
          <!-- Education -->
          <div class="section">
            <h3 class="section-title">Education</h3>
            ${education.map(edu => `
              <div class="education-item">
                <div class="education-details">
                  <h3>${edu.degree}</h3>
                  <span class="date">${edu.year}</span>
                </div>
                <div class="company-info">${edu.institution}</div>
                ${edu.description ? `<p>${edu.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
          
          <!-- Skills -->
          <div class="section">
            <h3 class="section-title">Skills</h3>
            <div class="skills-container">
              ${skills.map(skill => `
                <div class="skill-category">
                  <h4>${skill.category}</h4>
                  <div class="skill-items">
                    ${skill.items.map(item => `• ${item}<br>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <!-- Footer -->
          <div class="resume-footer">
            <p>Generated from Portfolio • ${formattedDate}</p>
            <p>${contact.email} • ${contact.phone}</p>
          </div>
        </div>
        
        <div class="no-print" style="text-align: center; margin-top: 20px; padding: 20px;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            🖨️ Print Resume
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-left: 10px;">
            ✕ Tutup
          </button>
        </div>
        
        <script>
          // Tampilkan notifikasi saat window siap
          window.onload = function() {
            // Kirim pesan ke parent window bahwa resume siap
            try {
              if (window.opener) {
                window.opener.postMessage({ type: 'resume_ready', message: 'Resume siap untuk dicetak!' }, '*');
              }
            } catch (e) {
              console.log('Tidak dapat mengirim notifikasi:', e);
            }
            
            // Auto print setelah window terbuka
            setTimeout(() => {
              window.print();
            }, 500);
          };
          
          // Tangani pesan dari parent (jika diperlukan)
          window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'check_status') {
              event.source.postMessage({ type: 'status', ready: true }, '*');
            }
          });
        <\/script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Tampilkan notifikasi sukses setelah window terbuka
    showNotification('Resume berhasil dibuat! Buka jendela baru untuk print.', 'success');
    
    isLoading.value = false;
    
    // Tambahkan event listener untuk menerima pesan dari window print
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'resume_ready') {
        showNotification('Resume siap! Silakan gunakan tombol print di jendela baru.', 'info');
      }
      if (event.data && event.data.type === 'print_complete') {
        showNotification('Resume berhasil dicetak!', 'success');
      }
    });
    
    // Cek apakah window sudah terbuka setelah 2 detik
    setTimeout(() => {
      try {
        if (printWindow && !printWindow.closed) {
          showNotification('Download Success');
        }
      } catch (e) {
      }
    }, 2000);
    
  }, 500); 
};

const trackDownload = () => {
  showNotification('Mengunduh resume PDF...', 'info');
  
  setTimeout(() => {
    showNotification('Resume berhasil diunduh!', 'success');
  }, 1500);
  
  console.log('Static resume downloaded:', new Date().toISOString());
};
</script>

<style scoped>
.about-page {
  position: relative; 
  padding: 2rem 1rem; 
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  background: var(--bg-color);
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; 
}

.about-page::before {
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

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.about-content {
  width: 100%;
  margin: 0 auto; 
  box-sizing: border-box;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem; 
  padding: 0 0.5rem;
}

.about-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: 0.15em; 
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 0.75rem;
  position: relative;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-word;
}

.title-line {
  width: 60px; 
  height: 2px;
  background: var(--primary);
  margin: 0 auto;
}

.profile-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem; 
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.name {
  font-size: clamp(1.75rem, 3vw, 2.5rem); 
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
  line-height: 1.2;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow-wrap: break-word;
  word-break: break-word;
}

.bio {
  font-size: 1rem; 
  line-height: 1.6; 
  color: var(--text-secondary);
  margin-bottom: 2rem;
  text-align: justify;
  overflow-wrap: break-word;
  word-break: break-word;
}

.contact-info {
  margin-bottom: 2rem;
  width: 100%;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  transition: transform var(--transition-fast);
}

.contact-item:hover {
  transform: translateX(4px);
}

.contact-icon {
  font-size: 1.1rem;
  color: var(--primary);
  min-width: 20px; 
  flex-shrink: 0;
}

.contact-text {
  font-size: 1rem; 
  color: var(--text);
  font-weight: 400;
  overflow-wrap: break-word;
  word-break: break-word;
  flex: 1;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; 
  padding: 0.75rem 1.5rem; 
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  text-transform: uppercase;
  letter-spacing: 0.03em; 
  text-decoration: none;
  text-align: center;
  border: 2px solid transparent;
  width: 100%; 
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}

.btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn:active {
  transform: translateY(0);
}

.btn-text {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-icon {
  font-size: 1rem; 
  transition: transform var(--transition-base);
  flex-shrink: 0;
}

.btn:hover .btn-icon {
  transform: translateY(2px);
}

.btn-secondary {
  background: var(--secondary);
}

.btn-secondary:hover {
  background: var(--secondary-dark);
}

.resume-note {
  margin-top: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem; 
  opacity: 0.8;
  text-align: center;
  width: 100%;
}

.profile-image {
  display: flex;
  justify-content: center; 
  align-items: center;
  position: relative;
  padding: 0; 
  margin-top: 0; 
  order: -1; 
}

.image-wrapper {
  position: relative;
  margin: 0 auto; 
  width: 100%;
  max-width: 300px; 
  box-sizing: border-box;
}

.image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; 
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--card); 
  
  box-shadow: 
    var(--shadow-lg), 
    0 0 0 8px rgba(137, 89, 251, 0.87); 
  
  transition: all var(--transition-base);
  box-sizing: border-box;
}

.image-container:hover {
  transform: scale(1.05);
  box-shadow: 
    var(--shadow-xl),
    0 0 0 8px rgba(103, 44, 240, 0.87);
}

.profile-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.image-container:hover .profile-photo {
  transform: scale(1.1);
}

.profile-glow {
  position: absolute;
  top: -15px; 
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  background: linear-gradient(
    45deg, 
    var(--primary) 0%, 
    #8b5cf6 50%, 
    #ec4899 100%
  );
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(15px); 
}

.image-container:hover .profile-glow {
  opacity: 0.3; 
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

.profile-info {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.profile-image {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .about-page {
    padding: 3rem 1.5rem;
  }
  
  .profile-section {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
  
  .profile-image {
    justify-content: flex-end;
    padding-right: 1rem;
    order: 2; /* Kembalikan order untuk tablet */
  }
  
  .image-wrapper {
    max-width: 280px;
  }
  
  .image-container {
    border-width: 5px;
  }
  
  .btn {
    width: auto;
    min-width: 200px;
  }
  
  .about-content {
    margin-left: 0;
  }
}

/* Desktop (1024px dan atas) */
@media (min-width: 1024px) {
  .about-page {
    padding: 4rem 2rem;
  }
  
  .profile-section {
    gap: 3rem;
  }
  
  .profile-image {
    justify-content: flex-end;
    padding-right: 2rem;
    order: 2;
  }
  
  .image-wrapper {
    max-width: 350px;
    margin-right: -1rem;
  }
  
  .image-container {
    width: 350px;
    height: 350px;
    padding-bottom: 0;
    border-width: 6px;
  }
  
  .btn {
    width: auto;
    min-width: 250px;
  }
  
  .about-content {
    margin-left: -30px;
  }
}

/* Mobile (767px dan bawah) - PERBAIKAN UTAMA */
@media (max-width: 767px) {
  .about-page {
    padding: 2rem 0.75rem; 
    min-height: auto;
    align-items: flex-start; 
  }
  
  .about-header {
    margin-bottom: 2rem;
  }
  
  .about-title {
    font-size: 1.75rem; 
    letter-spacing: 0.1em;
  }
  
  .profile-section {
    grid-template-columns: 1fr; 
    gap: 2rem; 
    text-align: center;
  }
  
  .profile-info {
    order: 2; 
  }
  
  .profile-image {
    order: 1; 
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .image-wrapper {
    max-width: 250px; 
    margin: 0 auto;
  }
  
  .image-container {
    width: 250px;
    height: 250px;
    padding-bottom: 0;
    margin: 0 auto;
    border-width: 4px;
    box-shadow: 
      var(--shadow-md),
      0 0 0 6px rgba(137, 89, 251, 0.87); 
  }
  
  .name {
    font-size: 1.75rem;
    text-align: center;
  }
  
  .bio {
    font-size: 0.95rem;
    text-align: justify;
    line-height: 1.6;
    padding: 0 0.5rem;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: justify;
  }
  
  .contact-item {
    justify-content: justify;
  }
  
  .contact-item:hover {
    transform: none; /* Hapus hover effect di mobile */
  }
  
  .btn {
    padding: 0.7rem 1.25rem;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
  
  .btn:hover {
    transform: none; /* Hapus transform hover di mobile */
  }
  
  .resume-note {
    font-size: 0.8rem;
    padding: 0 1rem;
  }
}

/* Mobile kecil (480px dan bawah) */
@media (max-width: 480px) {
  .about-page {
    padding: 1.5rem 0.5rem;
  }
  
  .about-title {
    font-size: 1.5rem;
    letter-spacing: 0.08em;
  }
  
  .image-wrapper {
    max-width: 220px;
  }
  
  .image-container {
    width: 220px;
    height: 220px;
  }
  
  .name {
    font-size: 1.5rem;
  }
  
  .bio {
    font-size: 0.9rem;
    padding: 0;
  }
  
  .contact-text {
    font-size: 0.9rem;
  }
  
  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .btn-text {
    white-space: normal;
    line-height: 1.3;
  }
}

/* Mobile sangat kecil (360px dan bawah) */
@media (max-width: 360px) {
  .image-wrapper {
    max-width: 200px;
  }
  
  .image-container {
    width: 200px;
    height: 200px;
  }
  
  .about-title {
    font-size: 1.3rem;
  }
  
  .name {
    font-size: 1.3rem;
  }
  
  .btn-text {
    font-size: 0.75rem;
  }
}

/* Landscape mode untuk mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .about-page {
    padding: 1.5rem;
    min-height: auto;
  }
  
  .profile-section {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .profile-image {
    order: 2;
  }
  
  .image-wrapper {
    max-width: 200px;
  }
  
  .bio {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .contact-info {
    margin-bottom: 1rem;
  }
}

/* Untuk layar yang sangat lebar */
@media (min-width: 1400px) {
  .profile-image {
    padding-right: 3rem;
  }
  
  .image-wrapper {
    max-width: 400px;
  }
  
  .image-container {
    width: 400px;
    height: 400px;
  }
}
</style>