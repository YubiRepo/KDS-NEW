<template>
  <div class="container-fluid py-3 border-bottom">
    <div class="row">
      <div class="col d-flex align-items-center justify-content-center">
        <button class="btn btn-primary btn-lg rounded-1 me-2" @click="$emit('getOrders')"
          style="background-color: #1c5192">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
          Refresh
        </button>
        <button class="btn btn-success btn-lg rounded-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
          Grid View
        </button>
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
</template>
<script setup>
import { onMounted, ref } from "vue";
import moment from "moment"

const date = ref(moment().format("dddd, DD MMMM YYYY, HH:mm:ss"))

const countingDate = () => {
  setInterval(() => date.value = moment().format("dddd, DD MMMM YYYY, HH:mm:ss"), 1000)
}

onMounted(() => countingDate())
</script>