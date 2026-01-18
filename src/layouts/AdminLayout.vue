<template>
  <div class="admin-layout">
    <Sidebar />
    <div class="admin-content">
      <Header />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

export default {
  name: "AdminLayout",
  components: { Sidebar, Header },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
}
.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
main {
  padding: 1rem;
  background: #fafafa;
  flex: 1;
}
</style>
