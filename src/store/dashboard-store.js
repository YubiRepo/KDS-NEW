import { defineStore, acceptHMRUpdate } from "pinia";
import ApiService from "@/services/ApiService";
import { ref } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
  const GET_ORDER_URI = "/apporder/api/allorder";
  const GET_ORDER_DETAIL_URI = "/apporder/api/getitemdetail";

  const orders = ref({
    dine_in: null,
    take_away: null,
    items: null,
    all_count: 0,
    dine_in_count: 0,
    take_away_count: 0,
  });

  const tables = ref([]);

  const selectedFilter = ref("all");

  const detail_items = ref(null);

  const orderTypeDTO = (items, type) => {
    return items?.data?.map((d) => {
      return {
        id: d?.MenuKey,
        name: d?.menuname,
        qty_order: parseInt(d?.qty),
        qty_done: parseInt(d?.qtyready),
        qty_process: parseInt(d?.qty) - parseInt(d?.qtyready),
        date: items?.salesdate,
        sales_sequence: items?.salesseq,
        menu_sequence: d?.menuseq,
        type: type,
      };
    });
  };

  const calculateTotalLength = (items) => {
    if (Array.isArray(items)) {
      let totalLength = 0;

      items?.forEach((order) => (totalLength += order?.data?.length));

      return parseInt(totalLength);
    }

    return 0;
  };

  const setOrderTypeItem = (id, takeAway, dineIn) => {
    const isDineIn = dineIn?.find((item) => item?.id == id) ?? null;
    const isTakeAway = takeAway?.find((item) => item?.id == id) ?? null;

    if (isDineIn && isTakeAway) {
      return {
        type: "dine_in_take_away",
        dine_in_count: isDineIn?.length ?? 0,
        take_away_count: isTakeAway?.length ?? 0,
      };
    }

    if (isDineIn) {
      return {
        type: "dine_in",
        dine_in_count: isDineIn?.length ?? 0,
        take_away_count: isTakeAway?.length ?? 0,
      };
    }

    if (isTakeAway) {
      return {
        type: "take_away",
        dine_in_count: isDineIn?.length ?? 0,
        take_away_count: isTakeAway?.length ?? 0,
      };
    }
  };

  const increaseQtyIfIdMatch = (data) => {
    if (!data) return;

    return Object.values(
      data?.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { ...item };
        } else {
          acc[item.id].qty_order += item.qty_order;
          acc[item.id].qty_done += item.qty_done;
          acc[item.id].qty_process += item.qty_process;
        }
        return acc;
      }, {})
    );
  };

  const ordersDTO = (response) => {
    let takeAway = Array.isArray(response?.Take_Away)
      ? response?.Take_Away?.map((item) =>
          orderTypeDTO(item, "take_away")
        )?.flat()
      : null;

    let dineIn = Array.isArray(response?.Dine_In)
      ? response?.Dine_In?.map((item) => orderTypeDTO(item, "dine_in"))?.flat()
      : null;

    // let items = response?.Item?.map((item) => {
    //   return {
    //     id: item?.MenuKey,
    //     name: item?.menuname,
    //     qty_order: parseInt(item?.jumlah),
    //     qty_done: parseInt(item?.jumlahready),
    //     qty_process: parseInt(item?.jumlah) - parseInt(item?.jumlahready),
    //     ...setOrderTypeItem(item?.MenuKey, takeAway, dineIn),
    //   };
    // });

    const dineInFiltered = increaseQtyIfIdMatch(
      dineIn?.filter((item) => item?.qty_process !== 0)
    );
    const takeAwayFiltered = increaseQtyIfIdMatch(
      takeAway?.filter((item) => item?.qty_process !== 0)
    );

    let items = []
    
    if(Array.isArray(dineInFiltered)) {
      items.push(...dineInFiltered);
    }

    if(Array.isArray(takeAwayFiltered)) {
      items.push(...takeAwayFiltered);
    }

    return {
      dine_in: dineInFiltered,
      take_away: takeAwayFiltered,
      // items: items,
      items: items,
      // all_count:
      //   calculateTotalLength(response?.Dine_In) +
      //   calculateTotalLength(response?.Take_Away),
      all_count: (dineInFiltered?.length ?? 0) + (takeAwayFiltered?.length ?? 0),
      dine_in_count: dineInFiltered?.length ?? 0,
      take_away_count: takeAwayFiltered?.length ?? 0,
    };
  };

  const getRandomPastelColorHex = () => {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 128) + 127; // Range: 127 to 255
    const green = Math.floor(Math.random() * 128) + 127; // Range: 127 to 255
    const blue = Math.floor(Math.random() * 128) + 127; // Range: 127 to 255

    // Convert the RGB values to a hexadecimal color code
    const color = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
      .toString(16)
      .slice(1)}`;
    return color;
  };

  const tablesDTO = (data) => {
    return data?.map((item) => {
      return {
        id: item?.tblkey,
        name: item?.tblname,
        color: getRandomPastelColorHex(),
        items: item?.data?.map((d) => {
          return {
            id: d?.MenuKey,
            name: d?.menuname,
            qty_order: parseInt(d?.qty),
            qty_done: parseInt(d?.qtyready),
            qty_process: parseInt(d?.qty) - parseInt(d?.qtyready),
          };
        }),
      };
    });
  };

  const getOrders = async () => {
    await ApiService.get(GET_ORDER_URI, { params: { search: "" } })
      .then((response) => {
        // example response not found
        // {Dine_In: 'Not Found', Take_Away: 'Not Found', Item: 'Not Found'}

        orders.value = ordersDTO(response);

        tables.value = [];

        if (Array.isArray(response?.Dine_In)) {
          tables.value.push(...tablesDTO(response?.Dine_In));
        }

        if (Array.isArray(response?.Take_Away)) {
          tables.value.push(...tablesDTO(response?.Take_Away));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const detailItemDTO = (items) => {
    const result = [];
    const groupedByMenukey = {};

    items.forEach((item) => {
      const {
        menukey,
        menuname,
        tblkey,
        tblname,
        qty,
        readyqty,
        balance,
        salesdate,
        salesseq,
        menuseq,
      } = item;

      if (!groupedByMenukey[menukey]) {
        groupedByMenukey[menukey] = {
          id: menukey,
          name: menuname,
          tables: [],
        };
      }

      groupedByMenukey[menukey].tables.push({
        id: tblkey,
        name: tblname,
        qty_order: parseInt(qty),
        qty_done: parseInt(readyqty),
        qty_process: parseInt(balance),
        date: salesdate,
        sales_sequence: salesseq,
        menu_sequence: menuseq,
      });
    });

    for (let key in groupedByMenukey) {
      result.push(groupedByMenukey[key]);
    }

    return result;
  };

  const getItemDetail = async () => {
    await getOrders();

    await ApiService.get(GET_ORDER_DETAIL_URI, { params: { search: "" } }).then(
      (response) => {
        detail_items.value = detailItemDTO(response?.items);
      }
    );
  };

  const updateOrderQty = async (id, payload) => {
    const requestBody = {
      detailorder: payload?.map((p) => ({
        salesdate: p?.date,
        salesseq: p?.sales_sequence,
        menuseq: p?.menu_sequence,
        qtyready: p?.qty_done,
      })),
    };

    try {
      const response = await fetch(
        "http://192.168.1.55:8081/apporder/api/updatecheckerall",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      );

      await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    orders,
    getOrders,
    selectedFilter,
    tables,
    getItemDetail,
    updateOrderQty,
    detail_items,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
