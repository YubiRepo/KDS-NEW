<template>
    <div class="row">
      <div class="col-8">
        <p>{{ label }}</p>
      </div>
      <div class="col-4">
        <p class="text-end">{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    label: String,
    value: String, // Menggunakan prop value untuk menampilkan nilai dinamis
  });
  </script>
  
  <style scoped>
  /* Tambahkan gaya berperingkat jika diperlukan */
  </style>
  