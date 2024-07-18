<template>

  <div>
    <!-- placeholder loading -->
    <!-- <div class="card p-2 rounded item-card w-100 h- mb-3" aria-hidden="true">
      <h5 class="card-title placeholder-glow">
          <span class="placeholder col-12 placeholder-lg py-4"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-12 py-5"></span>
        </p>
    </div> -->

    <div class="card p-2 rounded item-card mb-3" @click="goToDetail(item?.id)">
      <div class="d-flex flex-column justify-content-center py-3 rounded cursor-pointer" style="background-color: #1c5192">
        <span class="text-center text-white fw-bold">{{ item?.name }}</span>
      </div>
      <hr class="mb-1 mt-2 mx-2">
      <div class="row py-1 px-3">
        <div class="col item-card">
          <div
            class="bg-primary p-2 text-white d-flex flex-column justify-content-center rounded align-items-center h-100">
            <span>Order</span>
            <h2>{{ item?.qty_order ?? 0 }}</h2>
          </div>
        </div>
        <div class="col item-card">
          <div
            class="bg-success p-2 text-white d-flex flex-column justify-content-center rounded align-items-center h-100">
            <span>Done</span>
            <h2>{{ item?.qty_done ?? 0 }}</h2>
          </div>
        </div>
        <div class="col item-card">
          <div
            class="bg-warning p-2 text-white d-flex flex-column justify-content-center rounded align-items-center h-100">
            <span class="text-center">Not Done</span>
            <h2>{{ item?.qty_process ?? 0 }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const goToDetail = (id) => {
  router.push({ name: "ItemDetail", params: { id: id } });
}
</script>


<style>
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