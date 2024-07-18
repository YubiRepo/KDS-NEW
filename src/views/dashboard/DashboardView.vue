<template>
  <div class="container-fluid py-3 border-bottom">
    <div class="row">
      <div class="col d-flex align-items-center justify-content-center">
        <div class="btn-group gap-2">
          <v-btn prepend-icon="mdi-refresh" height="40" min-width="164" class="bg-primary" @click="getOrders()"
            :disabled="loadingRefresh">
            Refresh
          </v-btn>
          <v-btn-toggle v-model="viewMode" color="primary" rounded="0" group>
            <v-btn value="1" height="40"> View 1 </v-btn>
            <v-btn value="2" height="40"> View 2 </v-btn>
            <v-btn value="3" height="40"> View 3 </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h4 class="m-0 p-0">{{ date }}</h4>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <div class="px-2 align-self-end">
          <div class="d-flex align-items-center justify-content-center">
            <img src="https://randomuser.me/api/portraits/lego/7.jpg" class="img-thumbnail rounded-circle mr-2"
              style="width: 40px; height: 40px" alt="" />
            <div class="d-flex flex-column">
              <span class="">Jamal</span>
              <span class="">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div v-if="viewMode == 1">
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
      <div class="row">
        <template v-if="orders?.length > 0">
          <div class="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-12 mb-2" v-for="(item, index) in orders" :key="index">
            <GridItemCard :item="item" />
          </div>
        </template>
        <template v-else>
          <div class="col-md-12 col-lg-12 col-sm-12 mt-5 mb-2">
            <h4 class="text-center">There is no order yet!,
              <a href="#" @click="getOrders()">Refresh</a>.
            </h4>
          </div>
        </template>
      </div>
    </div>
    <div class="row" v-if="viewMode == 2">
      <div class="col-md-3 mb-2 col-lg-3 col-12" v-for="(item, index) in itemStore.getItems" :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import GridItemCard from "@/components/GridItemCard.vue"
import ItemCard from "@/components/ItemCard.vue"
import moment from "moment"
import { computed, onMounted, ref, watch } from "vue"
import { useDashboardStore } from "../../store/dashboard-store"

const dashboardStore = useDashboardStore()
const date = ref(moment().format("dddd, DD MMMM YYYY , hh:mm:ss"))
const viewMode = ref(1)
const selectedFilter = ref("all")
const loadingRefresh = ref(false)
const orders = ref(null)

const countingDate = () => {
  setInterval(() => {
    date.value = moment().format("dddd, DD MMMM YYYY , hh:mm:ss")
  }, 1000)
}

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
  }
}

watch(selectedFilter, () => {
  getOrders()
})

onMounted(() => {
  countingDate()
  loadingRefresh.value = true
  getOrders()
  loadingRefresh.value = false
})
</script>

<style scoped>
.item-card {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.col.item-card {
  padding: 2px;
  width: 100%;
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

.btn-group-lg .btn {
  border-color: #1c5192 !important;
  border-radius: 3px;
  color: #1c1c1c !important;
  font-weight: 450;
  margin-right: 10px;
}

.btn-check:checked+.btn, .btn.active, .btn.show, .btn:first-child:active, :not(.btn-check)+.btn:active {
  background-color: #1c5192 !important;
  color: #ffff !important;
}

/* material design */
/* .btn-group-lg .btn {
  position: relative;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02857em;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;

}

.btn-outline-primary:hover {
  background-color: #1c5192 !important;
  color: #ffff;
}

.btn-check:active, .btn-check:checked {
  background-color: #1c5192 !important;
  color: #ffff;
} */
</style>