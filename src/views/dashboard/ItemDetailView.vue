<template>
  <div class="container-fluid py-2">
    <div class="row">
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
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-start">
      <button class="btn btn-secondary" @click="this.$router.back()" style="width: 100px">Back</button>
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
          <tr align="center" v-for="(item, index) in itemStore.getItems">
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
import useItemStore from "@/store/item-store";
import moment from "moment";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const date = ref(moment().format("dddd, DD MMMM YYYY , hh:mm:ss"));

function countingDate() {
  setInterval(() => {
    date.value = moment().format("dddd, DD MMMM YYYY , hh:mm:ss");
  }, 1000);
}

onMounted(() => {
  console.log("ItemDetailView mounted with id:", props.id);
  itemStore.fetchItems();
  countingDate();
});

const itemStore = useItemStore();
</script>

<style scoped></style>
