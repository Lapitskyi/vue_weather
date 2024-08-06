<template>
  <div class="flex flex-col bg-white p-2 max-w-[400px]">
    <div class="gap-3">
      <div>
        <div class="flex items-center gap-3">

          <img class="w-14 h-14 p-0.5 text-xs"
               :src="`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`"
               alt="no image">

          <div class="flex flex-col gap-1">
            <div class="flex gap-1 font-semibold">
              <div>{{ $t(`${item.weather[0].main.toLowerCase()}`) }}.</div>
              <div>{{ $t(`${item.weather[0].description.toLowerCase()}`) }}.</div>
            </div>
            <div class="text-sm font-light">
              The high will be {{
                activeTemp === 'metric' ?
                    tempWeatherCel(item.main.temp_max) + '&#176;C'
                    : tempWeatherFar(item.main.temp_max) + '&#176;F'
              }}, the low will be {{
                activeTemp === 'metric' ?
                    tempWeatherCel(item.main.temp_min) + '&#176;C'
                    : tempWeatherFar(item.main.temp_min) + '&#176;F'
              }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 grid-rows-2 border-l-2 border-red-400 pl-5 px-4 pr-4 mt-2.5 text-xs">

          <div>
            0.76mm (76%)
          </div>

          <div class="flex gap-2 items-center">
            <img class=" w-5 h-5 rotate-[250px]" src="/icons/arrow.svg" alt="arrow">
            <div>{{ item.wind.speed }} m/s W</div>
          </div>


          <div>
            {{ $t("humidity") }}: {{ item.wind.gust }}
          </div>

          <div>{{ $t("visibility") }}: {{ item.wind.gust }}</div>

          <div class="flex items-center gap-x-1">
            <img class=" w-4 h-4 rotate-[250px]" src="/icons/compas.svg" alt="arrow">
            <div>1011hPa</div>
          </div>

          <div>{{ $t("dew_point") }}: 11°C</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {
  currentTime,
  dateWeather,
  dayWeather,
  getTime,
  tempWeatherCel, tempWeatherFar
} from "@/helpers/formatWeather.js";

export default {
  name: "ShortCard",
  methods: {tempWeatherFar, currentTime, dayWeather, dateWeather, tempWeatherCel, getTime},
  props: {
    item: {},
    activeTemp: 'metric'
  },
}


</script>
