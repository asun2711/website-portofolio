<template>
  <div class="contact-page">
    <div class="contact-container">
      <div class="contact-info">
        <h1>Hubungi Kami</h1>
        <p>Untuk kolaborasi atau pertanyaan</p>
        
        <div class="contact-details">
          <!-- Email Card -->
          <div 
            class="contact-item card email-card"
            @click="openGmailCompose">
            <div class="card-icon">
              <span>📧</span>
            </div>
            <div class="card-content">
              <h3>Email</h3>
              <p class="clickable">{{ contact.email }}</p>
              <div class="action-text">Klik untuk langsung buka Gmail</div>
            </div>
          </div>
          
          <!-- WhatsApp Card -->
          <a 
            :href="whatsappUrl"
            target="_blank"
            class="contact-item card whatsapp-card">
            <div class="card-icon">
              <span>💚</span>
            </div>
            <div class="card-content">
              <h3>WhatsApp</h3>
              <p class="clickable">{{ formatPhoneNumber(contact.whatsapp) }}</p>
              <div class="action-text">Klik untuk chat WhatsApp</div>
            </div>
          </a>
          
          <!-- Phone Card -->
          <div 
            class="contact-item card phone-card"
            @click="callPhoneNumber">
            <div class="card-icon">
              <span>📞</span>
            </div>
            <div class="card-content">
              <h3>Telepon</h3>
              <p class="clickable">{{ formatPhoneNumber(contact.phone) }}</p>
              <div class="action-text">Klik untuk menghubungi via telepon</div>
            </div>
          </div>
          
          <!-- Location Card -->
          <a 
            :href="mapsUrl"
            target="_blank"
            class="contact-item card location-card">
            <div class="card-icon">
              <span>📍</span>
            </div>
            <div class="card-content">
              <h3>Location</h3>
              <p class="clickable">{{ contact.location }}</p>
              <div class="action-text">Klik untuk lihat di Google Maps</div>
            </div>
          </a>
        </div>
      </div>
      
      <form @submit.prevent="openGmailWithForm" class="contact-form">
        <div v-if="showGmailInstruction" class="gmail-instruction">
          <div class="instruction-header">
            <span>📧</span>
            <h4>Gmail Akan Dibuka di Tab Baru</h4>
          </div>
          <p>Jika popup diblokir, klik link dibawah:</p>
          <a :href="gmailUrl" target="_blank" class="manual-link">
            Buka Gmail Manual
          </a>
        </div>
        
        <div class="form-group">
          <label for="name">Nama Lengkap</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name"
            placeholder="Masukkan nama lengkap"
            required>
        </div>
        
        <div class="form-group">
          <label for="email">Email Anda</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email"
            placeholder="email@anda.com"
            required>
        </div>
        
        <div class="form-group">
          <label for="subject">Subjek</label>
          <input 
            type="text" 
            id="subject" 
            v-model="form.subject"
            placeholder="Contoh: Kolaborasi Project"
            required>
        </div>
        
        <div class="form-group">
          <label for="message">Pesan</label>
          <textarea 
            id="message" 
            v-model="form.message"
            rows="5"
            placeholder="Tulis pesan Anda di sini..."
            required>
          </textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="submit-btn gmail-btn">
            <span class="gmail-icon">G</span>
            Buka Gmail
          </button>
          <button type="button" class="secondary-btn" @click="openMailto">
            Gunakan Email Client
          </button>
        </div>
        
        <div class="contact-options">
          <h4>Atau hubungi via:</h4>
          <div class="contact-buttons">
            <button type="button" class="whatsapp-btn" @click="openWhatsApp">
              <span class="whatsapp-icon">💚</span>
              WhatsApp
            </button>
            <button type="button" class="phone-btn" @click="callPhoneNumber">
              <span class="phone-icon">📞</span>
              Telepon
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeData } from '../store/resume'; // Sesuaikan path dengan struktur folder Anda
import { ref, reactive, computed } from 'vue';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const { contact } = useResumeData();
const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const showGmailInstruction = ref(false);

// Format phone number untuk display
const formatPhoneNumber = (phone: string) => {
  // Hilangkan semua karakter non-digit
  const cleaned = phone.replace(/\D/g, '');
  
  // Format: +62 823 7716 7605
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  }
  
  // Format: +62 (823) 7716-7605
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
  }
  
  return phone;
};

// WhatsApp URL
const whatsappUrl = computed(() => {
  const phone = contact.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=Halo%20Asun,%20saya%20ingin%20berkomunikasi%20dengan%20Anda`;
});

// Google Maps URL
const mapsUrl = computed(() => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location)}`;
});

// Generate Gmail URL dengan semua data form
const gmailUrl = computed(() => {
  const to = contact.email;
  const subject = encodeURIComponent(form.subject || 'Contact from Portfolio');
  const body = encodeURIComponent(`
Nama: ${form.name}
Email: ${form.email}

Pesan:
${form.message}

---
Pesan ini dikirim dari portfolio website.
  `.trim());
  
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
});

// Fungsi untuk membuka Gmail Compose (untuk card email)
const openGmailCompose = () => {
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Contact%20from%20Portfolio`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Fungsi untuk membuka Gmail dengan data form
const openGmailWithForm = () => {
  if (!form.name || !form.email || !form.message) {
    alert('Harap isi nama, email, dan pesan terlebih dahulu');
    return;
  }
  
  showGmailInstruction.value = true;
  
  // Coba buka popup
  const gmailWindow = window.open(
    gmailUrl.value, 
    '_blank',
    'width=800,height=600,scrollbars=yes,resizable=yes'
  );
  
  // Jika popup diblokir, beri instruksi manual
  if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === 'undefined') {
    console.log('Popup mungkin diblokir, tampilkan instruksi manual');
  }
  
  // Simpan form ke localStorage
  localStorage.setItem('contactFormData', JSON.stringify(form));
  
  // Reset form setelah 2 detik
  setTimeout(() => {
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
    showGmailInstruction.value = false;
  }, 2000);
};

// Fungsi untuk membuka WhatsApp
const openWhatsApp = () => {
  const phoneNumber = contact.whatsapp.replace(/\D/g, '');
  const message = form.message 
    ? `Halo Asun, saya ${form.name}. ${form.message}`
    : 'Halo Asun, saya ingin berkomunikasi dengan Anda.';
  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Fungsi untuk telepon
const callPhoneNumber = () => {
  const phoneNumber = contact.phone.replace(/\D/g, '');
  
  // Konfirmasi sebelum menelpon
  if (confirm(`Apakah Anda ingin menghubungi ${formatPhoneNumber(contact.phone)}?`)) {
    // Untuk mobile akan langsung dial, untuk desktop akan minta konfirmasi
    window.location.href = `tel:${phoneNumber}`;
    
    // Fallback untuk desktop
    setTimeout(() => {
      alert(`Nomor telepon: ${formatPhoneNumber(contact.phone)}\n\nAnda dapat menyalin nomor ini untuk menghubungi via telepon.`);
    }, 1000);
  }
};

// Fungsi fallback menggunakan mailto (untuk email client)
const openMailto = () => {
  if (!form.name || !form.email || !form.message) {
    alert('Harap isi nama, email, dan pesan terlebih dahulu');
    return;
  }
  
  const subject = encodeURIComponent(form.subject || 'Contact from Portfolio');
  const body = encodeURIComponent(`
Nama: ${form.name}
Email: ${form.email}

Pesan:
${form.message}
  `.trim());
  
  const mailtoUrl = `mailto:${contact.email}?subject=${subject}&body=${body}&cc=${encodeURIComponent(form.email)}`;
  
  window.location.href = mailtoUrl;
};

// Load data dari localStorage jika ada
const loadSavedForm = () => {
  const saved = localStorage.getItem('contactFormData');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(form, parsed);
      
      // Hapus setelah dimuat (opsional)
      localStorage.removeItem('contactFormData');
    } catch (e) {
      console.error('Error loading saved form:', e);
    }
  }
};

// Panggil saat component mounted
loadSavedForm();
</script>

<style scoped>
.contact-page {
  position: relative; /* WAJIB */
  padding: 2rem;
  margin-left: -170px;
}

.contact-page::before {
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

.contact-page {
  animation: fadeInUp 0.8s ease-out;
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info h1 {
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

.contact-info p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Card Styling */
.contact-item.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.contact-item.card:hover {
  transform: translateY(-4px);
}

/* Email Card */
.email-card:hover {
  border-color: #ea4335;
  box-shadow: 0 8px 25px rgba(234, 67, 53, 0.15);
}

/* WhatsApp Card */
.whatsapp-card:hover {
  border-color: #25d366;
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.15);
}

/* Phone Card */
.phone-card:hover {
  border-color: #4285f4;
  box-shadow: 0 8px 25px rgba(66, 133, 244, 0.15);
}

/* Location Card */
.location-card:hover {
  border-color: #34a853;
  box-shadow: 0 8px 25px rgba(52, 168, 83, 0.15);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.email-card .card-icon {
  background: linear-gradient(135deg, rgba(234, 67, 53, 0.1) 0%, rgba(66, 133, 244, 0.1) 100%);
  color: #ea4335;
}

.whatsapp-card .card-icon {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
}

.phone-card .card-icon {
  background: rgba(66, 133, 244, 0.1);
  color: #4285f4;
}

.location-card .card-icon {
  background: rgba(52, 168, 83, 0.1);
  color: #34a853;
}

.card-content {
  flex: 1;
}

.contact-item.card h3 {
  margin-bottom: 0.25rem;
  color: #333;
  font-size: 1.1rem;
}

.contact-item.card p {
  margin: 0 0 0.25rem 0;
  color: #666;
  word-break: break-word;
}

.contact-item.card p.clickable {
  font-weight: 600;
  transition: color 0.3s ease;
}

.email-card p.clickable {
  color: #ea4335;
}

.whatsapp-card p.clickable {
  color: #25d366;
}

.phone-card p.clickable {
  color: #4285f4;
}

.location-card p.clickable {
  color: #34a853;
}

.action-text {
  font-size: 0.8rem;
  color: #888;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.3s ease;
}

.contact-item.card:hover .action-text {
  opacity: 1;
  transform: translateY(0);
}

/* Form Styling */
.contact-form {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.gmail-instruction {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.instruction-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.instruction-header h4 {
  color: #333;
  margin: 0;
}

.instruction-header span {
  font-size: 1.2rem;
}

.gmail-instruction p {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.manual-link {
  display: inline-block;
  background: #4285f4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.manual-link:hover {
  background: #3367d6;
  text-decoration: none;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ea4335;
  box-shadow: 0 0 0 3px rgba(234, 67, 53, 0.1);
  background: white;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.submit-btn.gmail-btn {
  flex: 1;
  background: linear-gradient(135deg, #ea4335 0%, #4285f4 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.gmail-icon {
  background: white;
  color: #ea4335;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.submit-btn.gmail-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 67, 53, 0.3);
}

.secondary-btn {
  flex: 1;
  background: #f8f9fa;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

/* Contact Options */
.contact-options {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.contact-options h4 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
}

.whatsapp-btn, .phone-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.whatsapp-btn {
  background: #25d366;
  color: white;
}

.whatsapp-btn:hover {
  background: #1da851;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.phone-btn {
  background: #4285f4;
  color: white;
}

.phone-btn:hover {
  background: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.whatsapp-icon, .phone-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-page {
    margin-left: 0;
    padding: 1rem;
  }
  
  .contact-item.card {
    padding: 1.2rem;
  }
  
  .contact-info h1 {
    font-size: 2rem;
  }
  
  .form-actions,
  .contact-buttons {
    flex-direction: column;
  }
  
  .contact-details {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .contact-details {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .contact-details {
    grid-template-columns: 1fr;
  }
}
</style>