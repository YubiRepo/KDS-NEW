import { defineStore, acceptHMRUpdate } from "pinia";
import ApiService from "@/services/ApiService";
import { ref } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
  const GET_ORDER_URI = "/apporder/api/allorder";

  const orders = ref({
    dine_in: null,
    take_away: null,
    items: null,
    all_count: 0,
    dine_in_count: 0,
    take_away_count: 0,
  });

  const selectedFilter = ref("all");

  const orderTypeDTO = (items) => {
    return items?.data?.map((d) => {
      return {
        name: d.menuname,
        qty_order: parseInt(d.qty),
        qty_done: parseInt(d.qtyready),
        qty_process: parseInt(d.ready),
      };
    });
  };

  const calculateTotalLength = (items) => {
    let totalLength = 0;
    items?.forEach((order) => {
      totalLength += order.data.length;
    });
    return parseInt(totalLength);
  };

  const ordersDTO = (response) => {
    return {
      dine_in: response?.Dine_In?.map((item) => orderTypeDTO(item))?.flat(),
      take_away: response?.Take_Away?.map((item) => orderTypeDTO(item))?.flat(),
      items: [...response?.Dine_In?.map((item) => orderTypeDTO(item))?.flat(), ...response?.Take_Away?.map((item) => orderTypeDTO(item))?.flat()],
      all_count:
        calculateTotalLength(response?.Dine_In) +
        calculateTotalLength(response?.Take_Away),
      dine_in_count: calculateTotalLength(response?.Dine_In),
      take_away_count: calculateTotalLength(response?.Take_Away),
    };
  };

  const getOrders = async () => {
    await ApiService.get(GET_ORDER_URI, { params: { search: "" } })
      .then((response) => {
        // example response not found
        // {Dine_In: 'Not Found', Take_Away: 'Not Found', Item: 'Not Found'}

        if (response?.Item !== "Not Found") {
          orders.value = ordersDTO(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    orders,
    getOrders,
    selectedFilter,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
