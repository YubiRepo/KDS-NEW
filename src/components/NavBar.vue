<template>
  <div class="container-fluid border-bottom sticky-top bg-white shadow-sm" style="z-index: 13;">
    <div class="row mb-3">
      <div class="col-md-3 mt-3">
        <button class="btn btn-primary btn-lg rounded-1 me-2" @click="refresh()" style="background-color: #1c5192"
          :disabled="loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>

      <div class="col-md-6 mt-3">
        <h4 class="fs-4 pt-3 text-center">{{ date }}</h4>
      </div>

      <div class="col-md-3 mt-3">
        <div class="d-flex align-items-center justify-content-end">
          <div class="btn-group">
            <button type="button" class="btn btn-transparent dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img
                src="https://media.licdn.com/dms/image/C560BAQFif4pDDrPQnQ/company-logo_200_200/0/1660185227747?e=2147483647&v=beta&t=oRKHsVVWvKyIOAGOY9Kku-PU0AutJdbWWQsuGRw1prU"
                class="rounded-circle mr-2" style="width: 40px; height: 40px" alt="Avatar" />
              Yubi POS
            </button>
            <ul class="dropdown-menu" style="z-index: 100;">
              <li>
                <router-link class="dropdown-item" :class="{ 'active': $route.path === '/' }"  to="/">Items</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/table" :class="{ 'active': $route.path === '/table' }" >Table</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :class="{ 'active': $route.path === '/kitchen' }" to="/kitchen">Kitchen Display</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <a class="dropdown-item" href="http://www.yubiteck.com/" target="_blank">About Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <slot/>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import moment from "moment"

const emit = defineEmits(['refresh'])
const date = ref(moment().format("dddd, DD MMMM YYYY, HH:mm:ss"))
const loading = ref(false)

const countingDate = () => {
  setInterval(() => date.value = moment().format("dddd, DD MMMM YYYY, HH:mm:ss"), 1000)
}

const refresh = () => {
  loading.value = true

  setTimeout(() => {
    emit('refresh')
    loading.value = false
  }, 500)
}

onMounted(() => countingDate())
</script>

<style scoped>
.active {
  background-color: #1c5192;
}
</style>