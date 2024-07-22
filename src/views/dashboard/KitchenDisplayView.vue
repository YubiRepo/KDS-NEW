<template>
  <NavBar @refresh="refresh()" />

  <div class="container-fluid mt-4">
    <div class="row justify-content-end">
      <div class="col-md-4">
        <div class="mb-3">
          <label for="heightSelect" class="form-label">Select Container Height:</label>
          <select id="heightSelect" v-model="selectedHeight" class="form-select">
            <option value="500px">500px</option>
            <option value="600px">600px</option>
            <option value="700px">700px</option>
            <option value="800px">800px</option>
            <option value="900px">900px</option>
            <option value="1000px">1000px</option>
            <option value="1200px">1200px</option>
            <option value="1500px">1500px</option>
            <option value="2000px">2000px</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid" ref="scrollContainer" :style="{ height: selectedHeight, overflow: 'auto' }">
    <div class="row g-0 justify-content-center">
      <div class="col-md-6 col-lg-4 col-xl-3 col-xxl-3 col-sm-12 mb-2 g-0 pe-3" v-for="(item, index) in items"
        :key="index">
        <div class="card p-2 rounded item-card mb-3">
          <div class="d-flex flex-column justify-content-center py-3 rounded-1" style="background-color: #1c5192">
            <h5 class="text-center text-white fw-bold">{{ item?.name }}</h5>
          </div>
          <div class="d-flex justify-content-between mt-2 py-2">
            <h5>Order</h5>
            <h5>{{ item?.qty_order }}</h5>
          </div>
          <hr class="m-0">
          <div class="d-flex justify-content-between mt-2 py-2">
            <h5>Done</h5>
            <h5>{{ item?.qty_done }}</h5>
          </div>
          <hr class="m-0">
          <div class="d-flex justify-content-between mt-2 py-2">
            <h5>Not Done</h5>
            <h5>{{ item?.qty_process }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue";
import { ref, onMounted, nextTick } from "vue";
import { useDashboardStore } from "../../store/dashboard-store";
import { toast } from 'vue3-toastify';

const dashboardStore = useDashboardStore();
const items = ref([]);
const scrollContainer = ref(null);
const selectedHeight = ref("800px");

const refresh = () => {
  getOrders();
  toast.success('Refresh successfully!');
};

const getOrders = async () => {
  await dashboardStore.getOrders();
  items.value = dashboardStore?.orders?.items;
};

const startAutoScroll = () => {
  let scrollDirection = 0; // 1 for down, -1 for up
  const scrollStep = 1; // Pixels to scroll each step
  const scrollDelay = 20; // Delay between each scroll step

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
    setTimeout(() => startAutoScroll(), 1_000); // Start from the top
  });
});

setInterval(() => getOrders(), 5_000);
</script>

<style scoped>
/* Optional: Add some styles to make the scrolling more noticeable */
.container-fluid {
  border: 1px solid transparent;
}
</style>
