<template>
  <div class="col d-flex justify-content-center">
    <div class="btn-group" role="group" :aria-label="filterGroupName">
      <input v-for="(filter, index) in filters" :key="index" type="radio" class="btn-check" :name="filterGroupName"
        :id="filter.value" :checked="filter.value === selectedFilter"
        @change="() => $emit('filter-change', filter.value)" autocomplete="off" />
        
      <label v-for="(filter, index) in filters" :key="index"
        class="btn btn-outline-primary" :for="filter.value">
        {{ filter.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: Array,
  filterGroupName: String,
  selectedFilter: String,
});
</script>

<style scoped>
.btn-check:checked+.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>