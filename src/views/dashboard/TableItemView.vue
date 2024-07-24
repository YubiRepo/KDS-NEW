<template>
    <NavBar @refresh="refresh()" />

    <div class="container-fluid mt-4">
        <Transition>
            <div class="row justify-content-center" v-if="tables?.length > 0">
                <div class="col-md-6 col-lg-4 col-xl-4 col-xxl-3 col-sm-12 mb-2" v-for="(table, index) in tables"
                    :key="index">
                    <div class="card rounded item-card mb-3 shadow-sm">
                        <div class="row g-0" style="height: 400px; overflow: auto;">
                            <div class="col-2 mr-0 rounded-1" style="background-color: #1c5192">
                                <h5 class="fw-bold text-white text-center p-2 mt-4 sticky-top">
                                    {{ table?.name }}
                                </h5>
                            </div>
                            <div class="col-10">
                                <div class="table-responsive" style="height: 400px; overflow-y: auto;">
                                    <table class="table table-sm table-striped table-hover mb-0" style="height: 400px; overflow-y: auto;">
                                        <thead>
                                            <tr class="sticky-header">
                                                <th>Items</th>
                                                <th>Order</th>
                                                <th>Done</th>
                                                <th class="text-right">Not Done</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in table?.items" :key="index">
                                                <td>
                                                    <p class="mb-2">{{ item?.name }}</p>
                                                </td>
                                                <td class="bg-primary">
                                                    <p class="mb-2 fw-bold text-right">
                                                        {{ item?.qty_order }}
                                                    </p>
                                                </td>
                                                <td class="bg-success">
                                                    <p class="mb-2 fw-bold text-right">
                                                        {{ item?.qty_done }}
                                                    </p>
                                                </td>
                                                <td class="bg-warning">
                                                    <p class="mb-2 fw-bold text-right">
                                                        {{ item?.qty_process }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-0 justify-content-center" v-else>
                <div class="col-12">
                    <h4 class="text-center">
                        There is no order yet!,
                        <span v-if="loading"> Loading... </span>
                        <a href="#" @click="refresh()" :disabled="loading" class="cursor-pointer" v-else>
                            Refresh.
                        </a>
                    </h4>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue";
import { ref, onMounted, nextTick } from "vue";
import { useDashboardStore } from "../../store/dashboard-store";
import { toast } from "vue3-toastify";

const dashboardStore = useDashboardStore();
const tables = ref(null);
const loading = ref(false);

const getOrders = async () => {
    loading.value = true;
    await dashboardStore.getOrders();
    tables.value = dashboardStore.tables;
    loading.value = false;
};

const refresh = () => {
    getOrders();
    toast.success("Refresh successfully!");
};

onMounted(async () => {
    await getOrders();
});

setInterval(() => getOrders(), 3_000);
</script>

<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
}
</style>