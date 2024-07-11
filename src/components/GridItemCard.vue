<template>
    <div class="container p-2 border item-card w-100 h-100">
      <div
        class="d-flex flex-column justify-content-center py-3 rounded"
        style="background-color: #1c5192">
        <span class="text-center text-white" style="font-weight: bold">{{ item.itemName }}</span>
      </div>
      <div class="row py-1 px-3">
        <div class="col item-card">
          <div
            class="bg-primary p-2 text-white d-flex flex-column justify-content-center align-items-center h-100">
            <span>Order</span>
            <h2>{{ item.orderCount }}</h2>
          </div>
        </div>
        <div class="col item-card">
          <div
            class="bg-success p-2 text-white d-flex flex-column justify-content-center align-items-center h-100">
            <span>Done</span>
            <h2>{{ item.doneCount }}</h2>
          </div>
        </div>
        <div class="col item-card">
          <div
            class="bg-warning p-2 text-white d-flex flex-column justify-content-center align-items-center h-100">
            <span>Not Done</span>
            <h2>{{ item.notDoneCount }}</h2>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ItemCard',
    props: {
      item: {
        type: Object,
        required: true,
      },
      orderCount: {
        type: Number,
        required: true,
      },
      doneCount: {
        type: Number,
        required: true,
      },
      notDoneCount: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan CSS kustom Anda di sini */
  .item-card {
  width: 100%;
  max-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.col.item-card {
  padding: 2px;
  width: 100%;
}
  </style>
  