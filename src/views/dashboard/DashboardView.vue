<template>
  <div class="container-fluid py-2">
    <div class="row">
      <div class="col d-flex align-items-center justify-content-center">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example">
          <button type="button" class="btn btn-danger">Left</button>
          <button type="button" class="btn btn-warning">Middle</button>
          <button type="button" class="btn btn-success">Right</button>
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
      <div
        class="item-container"
        v-for="(item, index) in filteredItems"
        :key="index">
        <div class="container p-2 border item-card ">
          <div
            class="d-flex justify-content-between py-3 rounded border px-2">
            <div class="d-flex flex-column justify-content-start">
              <span class="" style="font-weight: bold;">{{ item.itemName }}</span>
              <span>{{ item.itemName }}</span>
            </div>
            <button type="button" class="btn btn-primary">Submit</button>
          </div>
          <div class="p-2">
            <table class="table table-bordered">
              <thead style="background: red;">
                <tr align="center">
                  <th style="background-color:#1c5192;" class="text-white">table</th>
                  <th style="background-color:#1c5192;" class="text-white">order</th>
                  <th style="background-color:#1c5192;" class="text-white">out</th>
                  <th style="background-color:#1c5192;" class="text-white">on process</th>
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
    </div>
  </div>
</template>

<script setup>
import FilterTypeGroup from "@/components/FilterTypeGroup.vue";
import GridItemCard from "@/components/GridItemCard.vue";
import ItemCard from "@/components/ItemCard.vue";
import moment from "moment";
import { computed, onMounted, ref } from "vue";

const date = ref(moment().format("dddd, DD MMMM YYYY , hh:mm:ss"));

function countingDate() {
  setInterval(() => {
    date.value = moment().format("dddd, DD MMMM YYYY , hh:mm:ss");
  }, 1000);
}

onMounted(() => {
  countingDate();
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
}

@media (max-width: 768px) {
  .item-container {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
