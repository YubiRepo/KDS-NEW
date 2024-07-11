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
          <!-- btn with text grid view and icon grid -->
          <v-btn height="40" prepend-icon="mdi-grid"> Grid View </v-btn>
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
        v-for="(item, index) in filteredItems"
        :key="index">
        <GridItemCard :item="item" />
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-3 mb-2 col-lg-3 col-12"
        v-for="(item, index) in filteredItems"
        :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between gap-3">
      <ItemCarTable
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item" />
    </div>
  </div>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-start">
      <button class="btn btn-secondary" style="width: 100px">Back</button>
      <div
        class="border p-2 d-flex flex-column justify-content-center align-items-center">
        <h4 class="mb-2">Item Name</h4>
        <div class="d-flex gap-2">
          <div
            class="bg-primary p-2 text-white d-flex flex-column justify-content-center align-items-center"
            style="width: 100px">
            <span>Order</span>
            <h2>{{ 1 }}</h2>
          </div>
          <div
            class="bg-success p-2 text-white d-flex flex-column justify-content-center align-items-center"
            style="width: 100px">
            <span>Order</span>
            <h2>{{ 1 }}</h2>
          </div>
          <div
            class="bg-warning p-2 text-white d-flex flex-column justify-content-center align-items-center"
            style="width: 100px">
            <span>Order</span>
            <h2>{{ 1 }}</h2>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" style="width: 100px">submit</button>
    </div>
    <div class="my-4">
      <!-- table with heading table, order, out, on process -->
      <table class="table table-bordered">
        <thead>
          <tr align="center">
            <th class="text-white" style="background-color: #1c5192">table</th>
            <th class="text-white" style="background-color: #1c5192">order</th>
            <th class="text-white" style="background-color: #1c5192">out</th>
            <th class="text-white" style="background-color: #1c5192">
              on process
            </th>
          </tr>
        </thead>
        <tbody>
          <tr align="center">
            <td>{{ 1 }}</td>
            <td>{{ 1 }}</td>
            <td>{{ 1 }}</td>
            <td>{{ 1 }}</td>
          </tr>
        </tbody>
      </table>
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

function countingDate() {
  setInterval(() => {
    date.value = moment().format("dddd, DD MMMM YYYY , hh:mm:ss");
  }, 1000);
}

onMounted(() => {
  countingDate();
  fetchItems();
});

const items = ref([
  {
    itemName: "Bibimbap",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "all",
  },
  {
    itemName: "Kimchi",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "dinein",
  },
  {
    itemName: "Bulgogi",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "takeaway",
  },
  {
    itemName: "Japchae",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "dinein",
  },
  {
    itemName: "Tteokbokki",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "takeaway",
  },
  {
    itemName: "Samgyeopsal",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "all",
  },
  {
    itemName: "Galbi",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "dinein",
  },
  {
    itemName: "Dolsot Bibimbap",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "takeaway",
  },
  {
    itemName: "Kimchi Jjigae",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "all",
  },
  {
    itemName: "Haemul Pajeon",
    orderCount: 1,
    doneCount: 2,
    notDoneCount: 3,
    type: "dinein",
  },
]);

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
  console.log(selectedFilter.value);
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
