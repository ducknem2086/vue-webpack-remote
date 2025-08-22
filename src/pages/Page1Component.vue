<template>

    <h1>page1test work </h1>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
onMounted(() => {
    console.log('Page 1 component mounted');
});
</script>
<style scoped lang="scss">
h1 {
    color: blue;
}
</style>