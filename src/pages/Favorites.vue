<template>
<div  class="bg-summer_banner bg-cover bg-center w-full mi-h-screen md:h-full">

  <Loader v-if="isLoaderCurrentCity"/>
  <section v-if="!isLoaderCurrentCity" class=" grid gap-2.5 md:grid-cols-3 lg:grid-cols-5 w-full pt-40 pb-10 lg:container mx-auto px-2.5">

      <Card
          v-for="item in cities" :id="item.id"
          :item="item"
          :activeTemp="activeTemp"
          @cardAction="deleteFavoriteCity(item.id)"
          cardActionIcon="/icons/delete.svg"
          showFavoriteIcon="true"
      />

  </section>
</div>


</template>
<script>
import {onMounted, ref} from "vue";
import useLocalStorage from "@/helpers/useLocalStorage.js";
import {getWeatherCurrentCity} from "@/service/weather.js";
import Card from "@/components/Cards/Card.vue";
import Loader from "@/components/Loader/Loader.vue";

export default {
  name: "Favorites",
  components: {Loader, Card},
  setup() {

    const isLoaderCurrentCity=ref(true)

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
        isLoaderCurrentCity.value=true
        favoriteCities.value.forEach(async (item) => {
          const result = await getWeatherCurrentCity(item.name)
          cities.value.push(result)
        })
        isLoaderCurrentCity.value=false
      }
    })


    return {
      isLoaderCurrentCity,
      cities,
      activeTemp,
      deleteFavoriteCity
    }
  }
}

</script>

