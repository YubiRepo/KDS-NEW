<template>
  <div class="container-fluid border-bottom mt-3">
    <div class="row mb-3">
      <div class="col-md-4">
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

      <div class="col-md-4">
        <h4 class="text-center">{{ date }}</h4>
      </div>

      <div class="col-md-4">
        <div class="d-flex align-items-center justify-content-end">
            <img
              src="https://media.licdn.com/dms/image/C560BAQFif4pDDrPQnQ/company-logo_200_200/0/1660185227747?e=2147483647&v=beta&t=oRKHsVVWvKyIOAGOY9Kku-PU0AutJdbWWQsuGRw1prU"
              class="img-thumbnail rounded-circle mr-2" style="width: 40px; height: 40px" alt="Avatar" />
            <div class="d-flex flex-column">
              <span>Powered By</span>
              <a href="http://www.yubiteck.com/" class="text-decoration-none" style="color: #1c5192;">
                <span>Yubi POS</span>
              </a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import moment from "moment"
import { defineEmits } from "vue";

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