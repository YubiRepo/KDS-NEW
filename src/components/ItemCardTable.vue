<template>
  <div class="item-container">
    <div class="container p-2 border item-card">
      <div class="d-flex justify-content-between py-3 rounded border px-2">
        <div class="d-flex flex-column justify-content-start">
          <h5 class="font-weight-bold m-0">{{ item.name }}</h5>
          <span>{{ item.type ?? "dine in" }}</span>
        </div>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          style="height: 40px">
          Submit
        </button>
      </div>
      <div class="table-content">
        <table class="table table-bordered">
          <thead>
            <tr align="center">
              <th class="text-white" style="background-color: #1c5192">
                table
              </th>
              <th class="text-white" style="background-color: #1c5192">
                order
              </th>
              <th class="text-white" style="background-color: #1c5192">out</th>
              <th class="text-white" style="background-color: #1c5192">
                on process
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              align="center"
              v-for="(item, index) in itemDetail"
              :key="index"
              :item="item">
              <td>{{ item.table }}</td>
              <td>{{ item.order }}</td>
              <td>{{ item.out }}</td>
              <td>{{ item.process }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const itemDetail = ref([
  {
    itemName: "Nasi Goreng",
    type: "dine in",
    table: 1,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Mie Goreng",
    type: "dine in",
    table: 2,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Ayam Goreng",
    type: "dine in",
    table: 3,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Ayam Goreng",
    type: "dine in",
    table: 3,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Ayam Goreng",
    type: "dine in",
    table: 3,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Ayam Goreng",
    type: "dine in",
    table: 3,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Ayam Goreng",
    type: "dine in",
    table: 3,
    order: 1,
    out: 1,
    process: 1,
  },
  {
    itemName: "Ayam Goreng",
    type: "dine in",
    table: 3,
    order: 1,
    out: 1,
    process: 1,
  },
]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.item-card {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.item-container {
  flex: 1 1 calc(33.333% - 1rem);
  max-width: calc(33.333% - 1rem);
    max-height: 300px;

}

@media (max-width: 768px) {
  .item-container {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
.table-content {
  overflow-x: auto;
  max-height: 200px;
}
/* make table header sticky */
.table-content table {
  width: 100%;
  border-collapse: collapse;
}
.table-content thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #1c5192;
  color: white;
}
/* CUSTOM SCROLL BAR */

::-webkit-scrollbar {
  width: 5px;
}
</style>
