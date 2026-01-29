import { reactive } from 'vue';
// @ts-ignore 
import rsudImage from '@/assets/Rsud Talang Ubi.png';
// @ts-ignore
import portfolioImage from '@/assets/Web Portfolio.png';

export interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  whatsapp: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
  details?: string[];
  gpa?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  category?: string;
  year?: string;
}

// Tambah interface untuk Paket Harga Website
export interface WebsitePackage {
  id: number;
  name: string;
  subtitle: string;
  isPopular: boolean;
  discount: string;
  originalPrice: string;
  monthlyPrice: string;
  bonusMonths: string;
  promoTag: string;
  selectButtonText: string;
  priceNote: string;
  features: string[];
  bonuses: string[];
  isFeatured?: boolean;
  discountPercentage?: number;
}

export interface ResumeData {
  name: string;
  title: string;
  bio: string;
  contact: ContactInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  websitePackages: WebsitePackage[];
}

// Data utama yang akan digunakan di semua komponen
export const resumeData: ResumeData = reactive({
  name: "Asun Fadrianto",
  title: "Staff IT & Web Developer",
  bio: "Saya adalah Staff IT dan pengembang perangkat lunak dengan pengalaman lebih dari 2 tahun dalam pemeliharaan dan pengembangan aplikasi web. Saya senang membangun solusi yang skalabel menggunakan teknologi modern, dengan perhatian besar pada kualitas kode, pemeliharaan sistem, dan pengalaman pengguna. Mampu beradaptasi dan bekerjasama baik secara induvidu ataupun secara tim dengan baik serta dapat mengatur dan mengorganisir waktu semaksimal mungkin, memiliki ketekunan, sangat menjunjung tinggi nilai-nilai norma.",
  
  contact: {
    email: "asunfadrianto2799@gmail.com",
    phone: "+62 (823) 7716-7605",
    whatsapp: "+62 (823) 7716-7605",
    location: "Penukal Abab Lematang Ilir, Sumatra Selatan, Indonesia"
  },
  
  experiences: [
    {
      date: '2024 - 2025',
      title: 'Staff IT & Web Developer',
      company: 'Rsud Talang Ubi-Penukal abab lematang ilir',
      location: 'Penukal Abab Lematang Ilir, Sumatra Selatan, Indonesia',
      description: 'Bertanggung jawab dalam pengembangan dan pemeliharaan aplikasi web internal perusahaan.',
      achievements: [
        'Memastikan jalannya Sistem serta melakukan penyesuaian Sistem Manajemen Rumah Sakit (SIMRS)',
        'Memonitoring Sistem dan Pemeliharaan Database Sistem Manajemen Rumah Sakit (SIMRS)',
        'Instalasi & Konfigurasi Jaringan LAN',
        'Hardware & Software Maintanace',
      ],
      tech: ['PHP', 'Node.js', 'HTML & CSS', 'PostgreSQL', 'REST API']
    },
    {
      date: '2022 - 2024',
      title: 'IT Operator Site',
      company: 'PT. Transindo Data Perkasa',
      location: 'Jl. Cikutra Baru Raya No.28, Neglasari, Kec. Cibeunying Kaler, Bandung, Indonesia',
      description: 'Bertanggung jawab dalam pengembangan dan penyesuaian Sistem Manajemen Rumah Sakit (SIMRS).',
      achievements: [
        'Melakukan penyesuaian Sistem Manajemen Rumah Sakit (SIMRS)',
        'Menganalisis dan pengujian Sistem Manajemen Rumah Sakit (SIMRS) yang dibuat berorientasi pada hasil Pemahaman yang mendalam tentang sistem digital.',
        'Melakukan pengolahan data entry sistem kedalam server.',
        'Melakukan implementasi kepada pengguna/user tentang bagaimana tatacara dan alur penggunaan Sistem Manajemen Rumah Sakit (SIMRS) sesuai dengan modul masing-masing.'
      ],
      tech: ['PHP', 'Node.js', 'HTML & CSS', 'PostgreSQL', 'REST API']
    },
    {
      date: '2020 - 2021',
      title: 'IT Intern',
      company: 'PT.PUPUK SRIWIDJAJA',
      location: 'Jalan Mayor Zen, Sei Selayur, Kalidoni, Kota Palembang, Sumatra Selatan, Indonesia',
      description: 'Bertanggung jawab dalam pengembangan dan penyesuaian Sistem Manajemen Rumah Sakit (SIMRS).',
      achievements: [
        'Assistant IT Support',
        'Instalasi & Konfigurasi Jaringan LAN',
        'Hardware & Software Maintanace',
        'Pengembangan Web.',
      ],
      tech: ['Vue.js', 'PHP', 'Nest.js', 'Node.js', 'HTML & CSS', 'PostgreSQL', 'REST API']
    },
  ],
  
  education: [
    {
      degree: "Sarjana Teknik Teknologi Informasi",
      institution: "Universitas Muhammadiyah Palembang",
      year: "2018 - 2022",
      description: "Fokus pada pengembangan web, database, dan jaringan komputer",
      gpa: "3.55",
      details: [
        "IPK: 3.55",
        "Fokus pada pengembangan web dan mobile applications",
        "Mata kuliah utama: Struktur Data, Algoritma, Basis Data, Jaringan Komputer",
        "Proyek akhir: Perancangan UI/UX Sistem berbasis web"
      ]
    },
    {
      degree: "Sekolah Menengah Atas (SMA)",
      institution: "YPLP PGRI Talang Ubi",
      year: "2015 - 2018",
      description: "Fokus pada Mata Pelajaran utama: IPA",
      gpa: "70",
      details: [
        "IPK: 70",
        "Mata Pelajaran utama: IPA"
      ]
    }
  ],
  
  skills: [
    {
      category: "Frontend Development",
      items: ["Vue.js", "PHP", "HTML & CSS","TypeScript"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Next.js", "Javascript"]
    },
    {
      category: "Tools & Others",
      items: ["Git", "Figma", "VS Code"]
    },
    {
      category: "Network",
      items: ["Winbox","Network"]
    },
    {
      category: "Database administrator",
      items: [ "MySQL", "PostgreSQL","Navicat"]
    },
    {
      category: "Hardware & Software ",
      items: ["Rakit Hardware ","Instalation OS ","Instalation Software","Problem Solving","Pemeliharaan & Dukungan"]
    },
  ],
  
  // Data projects dengan gambar yang diimport
  projects: [
    {
      id: 1,
      title: "Website RSUD Talang Ubi",
      description: "Website Profile Pelayanan dan dashboard admin. Frontend menggunakan Vue.js dan Backend menggunakan Next.js",
      image: rsudImage,
      technologies: ["Vue.js", "TypeScript", "Next.js", "PostgreSQL", "Vite"],
      link: "#",
      category: "Web Development",
      year: "2025"
    },
    {
      id: 2,
      title: "Website Portfolio",
      description: "Website portofolio ini dirancang dengan fokus pada pengalaman pengguna (user experience) dan aksesibilitas, sehingga mudah digunakan dan dapat diakses oleh semua pengguna.",
      image: portfolioImage,
      technologies: ["Vue.js", "TypeScript", "Next.js", "PostgreSQL", "Vite"],
      link: "#",
      category: "Web Development",
      year: "2024"
    },
  ],

  // Data Website Packages
  websitePackages: [
    {
      id: 1,
      name: "Basic",
      subtitle: "Solusi paling pas untuk kamu yang butuh layanan standar dengan harga terjangkau.",
      isPopular: true,
      discount: "DISKON 25%",
      originalPrice: "Rp 1.200.000",
      monthlyPrice: "Rp 900.000",
      bonusMonths: "Domain gratis 1 tahun",
      promoTag: "Promo terbatas",
      selectButtonText: "Pilih paket",
      priceNote: "Yuk gercep mumpung promo 25% dengan harga 900rb (harga normal Rp 1.200.000).",
      features: [
        "Web Dinamis",
        "Max 4 Halaman",
        "Desain responsif (Mobile Friendly)",
        "Setting domain dan web hosting",
        "Integrasi Sosial Media (link tombol)",
      ],
      bonuses: [
        "Revisi 2x",
        "Bantuan prioritas 24/1",
        "VPS gratis selama 1 bulan (Pada tahun berikutnya dikenakan 500rb",
        "Domain gratis selama 1 tahun (Pada tahun berikutnya dikenakan 500rb",
      ],
      discountPercentage: 80
    },
    {
      id: 2,
      name: "Premium",
      subtitle: "Fitur paling lengkap, hasil maksimal, dan dukungan prioritas untuk performa terbaik.",
      isPopular: false,
      isFeatured: true,
      discount: "DISKON 25%",
      originalPrice: "Rp 2.000.000",
      monthlyPrice: "Rp 1.500.000",
      bonusMonths: "Domain gratis 1 tahun",
      promoTag: "Promo terbatas",
      selectButtonText: "Pilih paket",
      priceNote: "Yuk gercep mumpung promo 25% dengan harga 1,5Jt (harga normal Rp 2.000.000).",
      features: [
          "Web Dinamis",
          "Max 6 Halaman",
          "Desain responsif (Mobile Friendly)",
          "Setting domain dan web hosting",
          "Integrasi Sosial Media (link tombol)",
        ],
        bonuses: [
          "Revisi 4x",
          "Bantuan prioritas 24/3",
          "VPS gratis selama 1 bulan (Pada tahun berikutnya dikenakan 500rb",
          "Domain gratis selama 1 tahun (Pada tahun berikutnya dikenakan 1jt",
        ],
      discountPercentage: 70
    },
    {
      id: 3,
      name: "Business",
      subtitle: "Dirancang khusus untuk operasional bisnis dengan fitur lengkap dan dukungan.",
      isPopular: false,
      discount: "Mulai Dari",
      originalPrice: "-",
      monthlyPrice: "Rp 5.000.000",
      bonusMonths: "Domain gratis 1 tahun",
      promoTag: "Promo terbatas",
      selectButtonText: "Pilih paket",
      priceNote: " Yuk gercep, Mulai dengan 5jt pilihan tepat untuk usaha yang butuh layanan serius dan stabil.",
      features: [
        "Web Dinamis",
        "Max 10 Halaman (Note: Harga final menyesuaikan jumlah Halaman dan kompleksitas fitur)",
        "Desain responsif (Mobile Friendly)",
        "Setting domain dan web hosting",
        "Integrasi Sosial Media (link tombol)",
      ],
      bonuses: [
        "Revisi 6x",
        "Bantuan prioritas 24/7",
        "VPS gratis selama 1 bulan (Pada tahun berikutnya dikenakan 500rb",
        "Domain gratis selama 1 tahun (Pada tahun berikutnya dikenakan 1.5jt - 3jt",
      ],
      discountPercentage: 67
    }
  ]
});

export const useResumeData = () => {
  return resumeData;
};