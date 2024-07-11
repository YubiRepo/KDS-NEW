<template>
  <div class="container-fluid py-2">
    <div class="row">
      <div class="col d-flex align-items-center justify-content-center">
        <div class="btn-group gap-2">
          <v-btn
            prepend-icon="mdi-refresh"
            height="40"
            min-width="164"
            class="bg-primary">
            Refresh
          </v-btn>
          <v-btn-toggle
          v-model="viewMode"
          color="primary"
        
          rounded="0"
          group
        >
          <v-btn value="1"  height="40">
            View 1
          </v-btn>

          <v-btn value="2" height="40">
            View 2
          </v-btn>

          <v-btn value="3" height="40">
            View 3
          </v-btn>

      
        </v-btn-toggle>
        </div>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h4 class="m-0 p-0">{{ date }}</h4>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <div class="px-2 align-self-end">
          <div class="d-flex align-items-center justify-content-center">
            <img
              src="https://randomuser.me/api/portraits/lego/7.jpg"
              class="img-thumbnail rounded-circle mr-2"
              style="width: 40px; height: 40px"
              alt="" />
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
   <div v-if="viewMode ==1">
    <div class="row my-3">
      <div class="row">
        <FilterTypeGroup
          :filters="computedFilters"
          :selectedFilter="selectedFilter"
          @filter-change="handleFilterChange" />
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-3 mb-2 col-lg-3 col-12"
        v-for="(item, index) in itemStore.getItems"
        :key="index">
        <GridItemCard :item="item" />
      </div>
    </div>
   </div>
    <div class="row" v-if="viewMode ==2">
      <div
        class="col-md-3 mb-2 col-lg-3 col-12"
        v-for="(item, index) in itemStore.getItems"
        :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between gap-3 my-4" v-if="viewMode ==3">
      <ItemCarTable
        v-for="(item, index) in itemStore.getItems"
        :key="index"
        :item="item" />
    </div>
  </div>
 
</template>

<script setup>
import FilterTypeGroup from "@/components/FilterTypeGroup.vue";
import GridItemCard from "@/components/GridItemCard.vue";
import ItemCard from "@/components/ItemCard.vue";
import ItemCarTable from "@/components/ItemCardTable.vue";
import useItemStore from "@/store/item-store";
import moment from "moment";
import { computed, onMounted, ref } from "vue";
const itemStore = useItemStore();
const date = ref(moment().format("dddd, DD MMMM YYYY , hh:mm:ss")); 
let viewMode = ref(1);
function countingDate() {
  setInterval(() => {
    date.value = moment().format("dddd, DD MMMM YYYY , hh:mm:ss");
  }, 1000);
}

onMounted(() => {
  countingDate();
  fetchItems();
});

let items = ref([]);

const selectedFilter = ref("all");

const filteredItems = computed(() => {
  if (selectedFilter.value === "all") {
    return items.value;
  } else {
    return items.value.filter((item) => item.type === selectedFilter.value);
  }
});

const computedFilters = computed(() => {
  const allCount = items.value.length;
  const dineInCount = items.value.filter(
    (item) => item.type === "dinein",
  ).length;
  const takeAwayCount = items.value.filter(
    (item) => item.type === "takeaway",
  ).length;
  return [
    {label: `All ${allCount}`, value: "all"},
    {label: `Dine in ${dineInCount}`, value: "dinein"},
    {label: `Take Away ${takeAwayCount}`, value: "takeaway"},
  ];
});

function handleFilterChange(selectedValue) {
  selectedFilter.value = selectedValue;
}
function fetchItems() {
  itemStore.fetchItems();
}
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
</style>
