<template>
  <aside class="sidebar">
    <ul>
      <li><RouterLink to="/">🏠 Home</RouterLink></li>
      <li><RouterLink to="/dashboard">📊 Dashboard</RouterLink></li>
      <li><RouterLink to="/about">ℹ️ About</RouterLink></li>
    </ul>
  </aside>
</template>

<script lang="ts">
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #333;
  color: white;
  height: 100vh;
  padding: 1rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar a {
  display: block;
  color: white;
  text-decoration: none;
  margin: 0.5rem 0;
}
.sidebar a:hover {
  color: #42b983;
}
</style>
