<template>
  <NavBar @refresh="refresh()" />

  <div class="container-fluid mt-4">
    <div class="row justify-content-end">
      <div class="col-md-4">
        <div class="mb-3">
          <label for="heightSelect" class="form-label">Select Display Height:</label>
          <select id="heightSelect" v-model="selectedHeight" class="form-select">
            <option v-for="height in selectedHeights" :key="height" :value="height">{{ height }}px</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <Transition>
    <div class="container-fluid" ref="scrollContainer" :style="{ height: `${selectedHeight}px`, overflow: 'auto' }">
      <div class="row justify-content-center mt-2" v-if="items?.length > 0">
        <div class="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-12 mb-2" v-for="(item, index) in items" :key="index">
          <div class="card p-2 rounded item-card mb-3">

            <div v-if="item?.name?.length >= 25" data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="item?.name"
              data-bs-custom-class="custom-tooltip"
              class="d-flex flex-column justify-content-center py-3 rounded"
              style="background-color: #1c5192; overflow: hidden; white-space: nowrap;">
              <span class="text-center text-white fw-bold marquee">{{
                item?.name
                }}</span>
            </div>

            <div v-else
              class="d-flex flex-column justify-content-center py-3 rounded"
              style="background-color: #1c5192; ">
              <span class="text-center text-white fw-bold">{{
                item?.name
                }}</span>
            </div>

            <div class="d-flex justify-content-between mt-2 py-2">
              <h5 class="fw-bold">Order</h5>
              <h5 class="fw-bold">{{ item?.qty_order }}</h5>
            </div>
            <hr class="m-0">
            <div class="d-flex justify-content-between mt-2 py-2">
              <h5 class="fw-bold">Done</h5>
              <h5 class="fw-bold">{{ item?.qty_done }}</h5>
            </div>
            <hr class="m-0">
            <div class="d-flex justify-content-between mt-2 py-2">
              <h5 class="fw-bold">Not Done</h5>
              <h5 class="fw-bold">{{ item?.qty_not_done }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 justify-content-center" v-else>
        <div class="col-12">
          <h4 class="text-center">There is no order yet!,
            <span v-if="loading">
              Loading...
            </span>
            <a href="#" @click="refresh()" :disabled="loading" class="cursor-pointer" v-else>
              Refresh.
            </a>
          </h4>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useDashboardStore } from "../../store/dashboard-store";
import { toast } from 'vue3-toastify';
import { Tooltip } from "bootstrap";

const dashboardStore = useDashboardStore();
const items = ref([]);
const scrollContainer = ref(null);
const screenHeight = parseInt(screen.availHeight / 1.5) + 30;
const selectedHeight = ref(screenHeight);
const loading = ref(false)
const tooltipList = ref([]);

const selectedHeights = [
  screenHeight,
  500,
  600,
  700,
  800,
  900,
  1000,
  1200,
  1500,
  2000,
].sort((a, b) => a - b);

const refresh = () => {
  loading.value = true;
  getOrders();
  loading.value = false;
  toast.success('Refresh successfully!');
};

const getOrders = async () => {
  loading.value = true;
  await dashboardStore.getOrders();
  items.value = dashboardStore?.orders?.items;
  loading.value = false;
};

const startAutoScroll = () => {
  let scrollDirection = 0; // 1 for down, -1 for up
  const scrollStep = 1; // Pixels to scroll each step
  const scrollDelay = 25; // Delay between each scroll step

  setInterval(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop += scrollStep * scrollDirection;

      // Check if we reached the bottom or top of the container
      if (scrollContainer.value.scrollTop + scrollContainer.value.clientHeight >= (scrollContainer.value.scrollHeight - 1)) {
        // setTimeout(() => scrollContainer.value.scrollTop = 0, 2_000);
        scrollDirection--; // Switch to scrolling up
      }

      if (scrollContainer.value.scrollTop <= 0) {
        scrollDirection++; // Switch to scrolling down
      }

      // console.log(scrollContainer.value.scrollTop, scrollContainer.value.clientHeight, scrollContainer.value.scrollHeight, scrollDirection)
    }
  }, scrollDelay);
};

onMounted(async () => {
  await getOrders();
  // Ensure DOM is updated with new items before starting auto scroll
  nextTick(() => {
    scrollContainer.value.scrollTop = 0;
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipList.value = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
    setTimeout(() => startAutoScroll(), 1_000); // Start from the top
  })

  // selectedHeights.sort((a, b) => a - b);

});

onBeforeUnmount(() => tooltipList?.value?.forEach(tooltip => tooltip.dispose()))

setInterval(() => getOrders(), 5_000);
</script>

<style>
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
}</style>