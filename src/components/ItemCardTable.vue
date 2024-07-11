<template>
    <div class="item-container">
      <div class="container p-2 border item-card">
        <div class="d-flex justify-content-between py-3 rounded border px-2">
          <div class="d-flex flex-column justify-content-start">
            <span class="font-weight-bold">{{ item.itemName }}</span>
            <span>{{ item.itemName }}</span>
          </div>
          <button type="button" class="btn btn-primary">Submit</button>
        </div>
        <div class="p-2">
          <table class="table table-bordered">
            <thead>
              <tr align="center">
                <th class="text-white" style="background-color:#1c5192;">table</th>
                <th class="text-white" style="background-color:#1c5192;">order</th>
                <th class="text-white" style="background-color:#1c5192;">out</th>
                <th class="text-white" style="background-color:#1c5192;">on process</th>
              </tr>
            </thead>
            <tbody>
              <tr align="center">
                <td>{{ item.orderCount }}</td>
                <td>{{ item.orderCount }}</td>
                <td>{{ item.doneCount }}</td>
                <td>{{ item.notDoneCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
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
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .item-container {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
  </style>
  