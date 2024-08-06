<template>
  <div>
    <div
        @click="activeDays"
        :class="`${showDetails
        ? 'bg-gray-100 rounded-t-lg'
        : 'bg-white rounded-lg' } max-w-[400px] flex items-center justify-between gap-0.5 text-sm  hover:bg-gray-100 px-1 ` "
    >
      <div class="w-[80px]">
        {{ dayWeather(item.dt) }},
        {{ dateWeather(item.dt, {month: "short", day: "numeric"}) }}
      </div>
      <div class="flex items-center gap-2">
        <img
            class="text-sm w-12 h-12"
            :src="`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`"
            alt="no image"
        >
        <div v-if="activeTemp === 'metric'">
          {{ tempWeatherCel(item.main.temp_max) }} /
          {{ tempWeatherCel(item.main.temp_min) }} &#176;C
        </div>
        <div v-if="activeTemp === 'imperial'">
          {{ tempWeatherFar(item.main.temp_max) }} /
          {{ tempWeatherFar(item.main.temp_min) }} &#176;F
        </div>
      </div>
      <div class="text-xs w-[150px] pl-1">
        {{ $t(`${item.weather[0].main.toLowerCase()}`) }}.
        {{ $t(`${item.weather[0].description.toLowerCase()}`) }}.
      </div>
      <img
          class="w-4 h-4 cursor-pointer"
          :src="showDetails
          ? '/icons/up_arrow.svg'
          : '/icons/down_arrow.svg'"
          alt=""
      >
    </div>

    <div v-show="showDetails" :class="`${showDetails && 'border rounded-b-lg'} max-w-[400px]` ">
      <ShortCard :item="item" :activeTemp="activeTemp"/>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {dateWeather, dayWeather, tempWeatherCel, tempWeatherFar} from "@/helpers/formatWeather.js";
import ShortCard from "@/components/Cards/shortCard.vue";

export default defineComponent({
  name: "ListItem",
  components: {ShortCard},
  methods: {tempWeatherFar, tempWeatherCel, dateWeather, dayWeather},
  props: {
    activeTemp: String,
    item: {}
  },
  setup() {
    const showDetails = ref(false)

    const activeDays = () => {
      showDetails.value = showDetails.value !== true
    }

    return {
      showDetails, activeDays
    }
  }

})
</script>