<template>
  <div class="container p-2 border item-card w-100 h-100">
    <div
        class="d-flex flex-column justify-content-center py-3 rounded"
        style="background-color: #1c5192">
        <span class="text-center text-white" style="font-weight: bold">{{ item.name }}</span>
      </div>
    <div class="p-2">
      <FormRow label="Order" :value="item.order ??0" />
      <FormRow label="Out" :value="item.out ??0" />
      <FormRow label="Not Done" :value="item.process ??0  " />
    </div>
  </div>
</template>

<script setup>
import FormRow from "./FormRow.vue";

const props = defineProps({
  item: Object,
  itemName: String,
  orderValue: String,
  outValue: String,
  processValue: String,
});
</script>

<style scoped>
.item-card {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.item-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
/* Tambahkan gaya berperingkat jika diperlukan */
</style>
