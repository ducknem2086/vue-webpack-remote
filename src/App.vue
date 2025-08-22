<script setup lang="ts">
// No-op, just TS SFC demo
</script>

<template>
  <main class="p-3">
    <p><b>remote  application! </b></p>
    <nav style="display: flex; gap: 12px; margin-bottom: 12px">
      <router-link to="/">Home</router-link>
      <router-link to="/page2">page 2</router-link>
      <router-link to="/page3">page 3</router-link>

    </nav>
    <router-view />
  </main>
</template>


<style lang="css">
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
</style>
