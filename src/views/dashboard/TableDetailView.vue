<template>
    <NavBar @refresh="refresh()" />

    <div class="container-fluid mt-4" v-if="table?.name">
        <div class="row g-0 justify-content-center">
            <div class="col-md-3 col-sm-12">
                <button class="btn btn-secondary btn-lg rounded-1" @click="this.$router.back()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                    Back
                </button>
            </div>

            <div class="col-md-6 col-sm-12">
                <!-- <div class="card p-2 rounded-1 item-card mb-3 mx-5">
                    <div class="d-flex">
                        <p class="m-0 fs-5 fw-bold">#{{ table?.sales_sequence }}</p>
                        <p class="m-0 ps-1 fs-6 pt-1"> | {{ table?.time }}</p>
                    </div>
                </div> -->

                <div class="card p-2 rounded-1 item-card mb-3 mx-5">
                    <div class="d-flex flex-column justify-content-center py-3 rounded"
                        style="background-color: #1c5192">
                        <span class="text-center text-white fw-bold fs-5">
                            {{ table?.name }}
                        </span>
                    </div>
                    <hr class="mb-1 mt-2">
                    <div class="row g-1 py-1">
                        <div class="col item-card">
                            <div
                                class="bg-primary p-2 text-white d-flex flex-column justify-content-center rounded align-items-center h-100">
                                <span>Order</span>
                                <h2>{{ table?.order_count ?? 0 }}</h2>
                            </div>
                        </div>
                        <div class="col item-card">
                            <div
                                class="bg-success p-2 text-white d-flex flex-column justify-content-center rounded align-items-center h-100">
                                <span>Done</span>
                                <h2>{{ table?.done_count ?? 0 }}</h2>
                            </div>
                        </div>
                        <div class="col item-card">
                            <div
                                class="bg-warning p-2 text-white d-flex flex-column justify-content-center rounded align-items-center h-100">
                                <span class="text-center">Not Done</span>
                                <h2>{{ table?.not_done_count ?? 0 }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-12 justify-content-end">
                <div class="d-flex align-items-center justify-content-end">
                    <button class="btn btn-lg text-white rounded-1" style="background-color: #1c5192"
                        @click="submitQty()" :disabled="loadingSubmit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-floppy" viewBox="0 0 16 16">
                            <path d="M11 2H9v3h2z" />
                            <path
                                d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                        </svg>
                        {{ loadingSubmit ? 'Saving...' : 'Save' }}
                    </button>
                </div>
            </div>
        </div>

        <div class="my-4">
            <div class="d-flex justify-content-end mb-2">
                <button class="btn btn-success btn-lg rounded-1" :disabled="checkIsAllDone" @click="setAllDone()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-check2-square" viewBox="0 0 16 16">
                        <path
                            d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                        <path
                            d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
                    </svg>
                    {{ checkIsAllDone ? 'Already Done' : 'Set All Done' }}
                </button>
            </div>

            <table class="table table-hover table-striped table-responsive shadow-sm">
                <thead>
                    <tr>
                        <th class="text-white rounded-start" style="background-color: #1c5192">Item</th>
                        <th class="text-white" style="background-color: #1c5192">Order</th>
                        <th class="text-white" style="background-color: #1c5192">Done</th>
                        <th class="text-white rounded-end" style="background-color: #1c5192">Not Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="rounded-1" v-for="(item, index) in table?.items" :key="index">
                        <td width="800">{{ item?.name }}</td>
                        <td>{{ item?.qty_order }}</td>
                        <td width="200">
                            <div class="input-group">
                                <span class="input-group-text cursor-pointer rounded-1" @click="decrement(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                </span>
                                <input type="number" class="form-control" aria-label="Qty Done" min="0"
                                    :max="item?.qty_order" @change="watchQty(index)" v-model="item.qty_done">
                                <span class="input-group-text cursor-pointer rounded-1" @click="increment(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-plus" viewBox="0 0 16 16">
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </span>
                            </div>
                        </td>
                        <td>{{ item?.qty_order - item?.qty_done }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="container-fluid mt-4" v-else>
        <div class="row">
            <div class="col-12">
                <h4 class="text-center">Table not found!,
                    <span v-if="loading">
                        Loading...
                    </span>
                    <a href="#" @click="refresh()" :disabled="loading" class="cursor-pointer" v-else>
                        Refresh.
                    </a>
                </h4>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue"
import { useDashboardStore } from "../../store/dashboard-store"
import { useRouter } from "vue-router"
import { toast } from 'vue3-toastify';
import { computed, onMounted, ref } from "vue"

const dashboardStore = useDashboardStore()
const router = useRouter()
const loadingSubmit = ref(false)
const loading = ref(false)
const loadingAllDone = ref(false)

const table = ref({
    id: null,
    name: "",
    color: "",
    order_count: 0,
    done_count: 0,
    not_done_count: 0,
    items: []
})

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
})

const increment = (i) => {
    if (table.value.items[i].qty_done < table.value.items[i].qty_order) {
        table.value.items[i].qty_done++
        table.value.done_count++
        table.value.not_done_count--
    }
}

const decrement = (i) => {
    if (table.value.items[i].qty_done > 0) {
        table.value.items[i].qty_done--
        table.value.done_count--
        table.value.not_done_count++
    }
}

const refresh = () => {
    getOrders()
    toast.success('Refresh successfully!')
}

const submitQty = () => {
    loadingSubmit.value = true

    dashboardStore.updateByTable(table.value)

    toast.success("Successfully updated!")

    setTimeout(() => {
        loadingSubmit.value = false
        router.push({ name: "TableItem" })
    }, 1_000)
}

const countHeaderQty = () => {
    table.value.order_count = table.value.items.reduce((a, b) => a + b.qty_order, 0)
    table.value.done_count = table.value.items.reduce((a, b) => a + b.qty_done, 0)
    table.value.not_done_count = table.value.items.reduce((a, b) => a + (b.qty_order - b.qty_done), 0)
}

const getOrders = async () => {
    loading.value = true
    await dashboardStore.getOrders()

    table.value = dashboardStore.tables.find((t) => t.id == props.id)

    countHeaderQty()

    loading.value = false
}

const watchQty = (i) => {
    const item = table.value.items[i];
    if (item.qty_done > item.qty_order) {
        item.qty_done = item.qty_order;
    }

    if (item.qty_done < 0) {
        item.qty_done = 0
    }

    item.qty_not_done = item.qty_order - item.qty_done

    countHeaderQty()
}

const setAllDone = () => {
    loadingAllDone.value = true
    table.value.items.forEach((t) => {
        t.qty_done = t.qty_order
        t.qty_not_done = 0
    })

    countHeaderQty()

    loadingAllDone.value = false

    toast.info('Don\'t forget to save!')
}

const checkIsAllDone = computed(() => {
    return table.value.items.every((t) => t.qty_done == t.qty_order)
})

onMounted(() => getOrders())
</script>