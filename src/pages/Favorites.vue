<template>

  <section class="lg:container mx-auto px-2.5 flex flex-col">
    <div class="flex gap-x-2.5  w-full pt-10">
      <Card
          v-for="item in cities" :id="item.id"
          :item="item"
          :activeTemp="activeTemp"
          @cardAction="deleteFavoriteCity(item.id)"
          cardActionIcon="/icons/delete.svg"
          showFavoriteIcon="true"
      />
    </div>
  </section>

</template>
<script>
import {onMounted, ref} from "vue";
import useLocalStorage from "@/helpers/useLocalStorage.js";
import {getWeatherCurrentCity} from "@/service/weather.js";
import Card from "@/components/Cards/Card.vue";

export default {
  name: "Favorites",
  components: { Card},
  setup() {

    let favoriteCities = useLocalStorage('favoriteCities', []);
    const cities = ref([]);
    let activeTemp = ref('metric');

    const deleteFavoriteCity = (id) => {
      if (id) {
        favoriteCities.value = favoriteCities.value.filter((item) => item.id !== id)
        cities.value = cities.value.filter((item) => item.id !== id)
      }
    }


    onMounted(() => {
      if (favoriteCities.value?.length) {
        favoriteCities.value.forEach(async (item) => {
          const result = await getWeatherCurrentCity(item.name)
          cities.value.push(result)
        })
      }
    })


    return {
      cities,
      activeTemp,
      deleteFavoriteCity
    }
  }
}

</script>

