<template>
  <div>
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "PublicLayout",
  components: { Header, Footer },
};
</script>

<style scoped>
.main-content {
  padding: 1rem;
}
</style>
