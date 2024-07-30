<template>
  <!-- <div class="card pb-1 ps-2 pl-0 m-0" style="max-width: 13rem; border-bottom: none; border-bottom-left-radius: 0; border-bottom-right-radius: 0;" >
    <h5 class="text-left p-0 m-0 fs-5">
      <span class="fw-bold">#{{ item?.sales_sequence }}</span>: 
      <span class="fs-6">{{ item?.time }}</span>
    </h5>
  </div> -->

  <div class="card p-2 rounded item-card mb-3" @click="goToDetail(item?.id)" style="border-top-left-radius: 0 !important;">
    <div v-if="item?.name?.length >= 35" class="d-flex flex-column justify-content-center py-3 rounded cursor-pointer"
      style="background-color: #1c5192; overflow: hidden; white-space: nowrap;" data-bs-toggle="tooltip"
      data-bs-placement="top" :data-bs-title="item?.name" data-bs-custom-class="custom-tooltip">
      <span class="text-center text-white fw-bold marquee">{{ item?.name
        }}</span>
    </div>

    <div v-else class="d-flex flex-column justify-content-center py-3 rounded cursor-pointer"
      style="background-color: #1c5192;">
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
          <h2>{{ item?.qty_not_done ?? 0 }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Tooltip } from 'bootstrap';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const router = useRouter();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const tooltipList = ref([]);

const goToDetail = (id) => {
  router.push({ name: "ItemDetail", params: { id: id } });
}

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltipList.value = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
})

onBeforeUnmount(() => tooltipList?.value?.forEach(tooltip => tooltip.dispose()))
</script>

<style>
/* Tambahkan CSS kustom Anda di sini */
.item-card {
  /* width: 100%; */
  /* max-width: 300px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.col.item-card {
  padding: 2px;
  /* width: 100%; */
}

.marquee {
  display: inline-block;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}

.custom-tooltip {
  --bs-tooltip-bg: #1c5192;
  --bs-tooltip-color: white;
  --bs-tooltip-max-width: 300px;
  --bs-tooltip-padding-x: 1rem;
  --bs-tooltip-padding-y: 0.5rem;
  --bs-tooltip-border-radius: 0.2rem;
  --bs-tooltip-arrow-width: 0.8rem;
  --bs-tooltip-arrow-height: 0.4rem;
  --bs-tooltip-arrow-border-width: 0.5rem;
  --bs-tooltip-arrow-color: var(--bs-tooltip-bg);
}
</style>z