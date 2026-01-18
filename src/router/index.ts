import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "@/layouts/PublicLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Experience from "@/pages/Experience.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Projects from "@/pages/Projects.vue";
import Contact from "@/pages/Contact.vue";
import Education from "@/pages/Education.vue";

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "about", name: "About", component: About },
      { path: "projects", name: "Projects", component: Projects },
      { path: "experience", name: "Experience", component: Experience },
      { path: "contact", name: "Contact", component: Contact },
      { path: "education", name: "Education", component: Education },
    ],
  },
  {
    path: "/admin", 
    component: AdminLayout,
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  async scrollBehavior(to, _from, savedPosition) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (savedPosition) {
      return savedPosition;
    }
    
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      };
    }
    
    return { 
      top: 0,
      left: 0,
      behavior: 'smooth'
    };
  }
});

export default router;