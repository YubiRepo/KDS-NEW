<template>
  <NavBar @refresh="refresh()" />

  <div class="container-fluid">
    <div class="row my-4">
      <div class="d-flex justify-content-center">
        <div class="btn-group btn-group-lg" role="group" aria-label="Order type toggle button group">
          <template v-for="(filter, index) in computedFilters" :key="index">
            <input type="radio" class="btn-check" :name="`btn_radio_${index + 1}`" :id="`btn_radio_${index + 1}`"
              autocomplete="off" :value="filter?.value" @change="handleSelectedFilter($event)"
              :checked="filter?.value === selectedFilter">
            <label class="btn btn-outline-primary" :for="`btn_radio_${index + 1}`">{{ filter?.label }}</label>
          </template>
        </div>
      </div>
    </div>
    <Transition>
      <div class="row g-0 justify-content-center">
        <template v-if="orders?.length > 0">
          <div class="col-md-6 col-lg-4 col-xl-4 col-xxl-2 col-sm-12 mb-2 g-0 pe-3" v-for="(item, index) in orders"
            :key="index">
            <GridItemCard :item="item" />
          </div>
        </template>
        <template v-else>
          <div class="col-md-12 col-lg-12 col-sm-12 mt-5 mb-2">
            <h4 class="text-center">There is no order yet!,
              <span v-if="loading">
                Loading...
              </span>
              <a href="#" @click="refresh()" :disabled="loading" class="cursor-pointer" v-else>
                Refresh.
              </a>
            </h4>
          </div>
        </template>
      </div>
    </Transition>
    <div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue"
import GridItemCard from "@/components/GridItemCard.vue"
import { computed, onMounted, ref, watch } from "vue"
import { useDashboardStore } from "../../store/dashboard-store"
import { toast } from 'vue3-toastify';

const dashboardStore = useDashboardStore()
const selectedFilter = ref("all")
const loading = ref(false)
const orders = ref(null)

const computedFilters = computed(() => {
  return [
    { label: `All: ${dashboardStore?.orders?.all_count ?? 0}`, value: "all" },
    { label: `Dine in: ${dashboardStore?.orders?.dine_in_count ?? 0}`, value: "dine_in" },
    { label: `Take Away: ${dashboardStore?.orders?.take_away_count ?? 0}`, value: "take_away" },
  ]
})

const handleSelectedFilter = (event) => {
  selectedFilter.value = event.target.value
  dashboardStore.selectedFilter = selectedFilter.value
}

const getOrders = async () => {
  await dashboardStore.getOrders()

  switch (selectedFilter.value) {
    case "dine_in":
      orders.value = dashboardStore?.orders?.dine_in
      break;
    case "take_away":
      orders.value = dashboardStore?.orders?.take_away
      break;
    default:
      orders.value = dashboardStore?.orders?.items
      break;
  }
}

const refresh = () => {
  loading.value = true

  setTimeout(() => {
    getOrders()

    loading.value = false

    toast.success('Refresh successfully!')
  }, 500)
}

watch(selectedFilter, () => getOrders())

onMounted(() => {
  loading.value = true

  setTimeout(() => {
    getOrders()

    loading.value = false

  }, 250)
})

setInterval(() => {
  getOrders()
}, 5_000)
</script>

<style scoped>
.item-card {
  width: 100% !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* .col.item-card {
  padding: 2px;
  width: 100% !important;
} */

.btn-group-lg .btn {
  border-color: #1c5192 !important;
  border-radius: 3px;
  color: #1c1c1c !important;
  font-weight: 450;
  margin-right: 10px;
}

.btn-check:checked+.btn,
.btn.active,
.btn.show,
.btn:first-child:active,
:not(.btn-check)+.btn:active {
  background-color: #1c5192 !important;
  color: #ffff !important;
}
</style>