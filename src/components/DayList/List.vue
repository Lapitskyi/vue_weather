<template>
  <div class="flex flex-col gap-3 p-2 w-full md:w-max max-h-[380px] overflow-auto customScrollbar">
    <ListItem
        :activeTemp="activeTemp"
        v-for="item in list"
        :key="item.dt"
        :item="item"
    >
    </ListItem>

  </div>
</template>

<script>
import ListItem from "@/components/DayList/ListItem.vue";

export default {
  name: 'List',
  components: {ListItem},
  props: {
    activeTemp: String,
    list: Array,
    styleComponent: "flex flex-col gap-3 p-2"
  }
}

</script>