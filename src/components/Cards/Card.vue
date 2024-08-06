<template>
  <div class="flex flex-col border bg-white rounded-lg p-2">
    <div>
      <div>
        <div class="flex items-center justify-between gap-x-2.5">
          <div class="text-orange-400">{{ dateWeather(item.dt, {month: "short", day: "numeric"})}}, {{ currentTime() }}</div>
          <img
              v-if="showFavoriteIcon"
              @click="$emit('cardAction')"
              class="w-5 h-5 cursor-pointer"  :src="cardActionIcon" alt="">
        </div>
      
        <h2 v-if="item.name || (item.name && item.sys?.country) " class="text-xl font-semibold">{{ item.name }}, {{ item.sys?.country }}</h2>
        <div class="flex items-center gap-3 mt-2.5">
          <div class="w-14 h-14 p-0.5">
            <img class="text-sm w-full h-full"
                 :src="`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`"
                 alt="no image">
          </div>
          <div class="text-4xl">{{ activeTemp === 'metric'?
              tempWeatherCel(item.main.temp)+ '&#176;C'
              :tempWeatherFar(item.main.temp) + '&#176;F'
            }}
          </div>
        </div>
        <div class="flex gap-3">
          <p>{{ $t("feels_like") }} {{
              activeTemp === 'metric'
                  ? tempWeatherCel(item.main.feels_like) + '&#176;C'
                  : tempWeatherFar(item.main.feels_like) + '&#176;F'
            }}
            </p>
          <p>{{$t(`${item.weather[0].main.toLowerCase()}`)}}.</p>
          <p>{{$t(`${item.weather[0].description.toLowerCase()}`)}}.</p>
        </div>
        <div class="grid grid-cols-2 border-l-2 border-red-400 pl-5 px-4 pr-4 mt-2.5">
          <div>
            <div class="flex gap-2 items-center">
              <img class=" w-5 h-5 rotate-[250px]" src="/icons/arrow.svg" alt="arrow">
              <p>{{item.wind.speed}}</p>
            </div>
            <p>
              {{ $t("humidity") }}: {{item.wind.gust}}
            </p>
            <p>{{$t("visibility")}}: {{item.wind.gust}}</p>
          </div>
          <div>
            <div class="flex items-center gap-x-1">
              <img class=" w-4 h-4 rotate-[250px]" src="/icons/compas.svg" alt="arrow">
             <div>1011hPa</div>
            </div>
            <div>{{$t("dew_point")}}: 11°C</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-x-1 mt-5">
      <span>{{ $t("sunrise") }} {{ getTime(item.sys.sunrise) }}</span>
      <span>{{ $t("sunset") }} {{ getTime(item.sys.sunset) }}</span>
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
  name: "Card",
  methods: {tempWeatherFar, currentTime, dayWeather, dateWeather, tempWeatherCel, getTime},
  props: {
    item: {},
    activeTemp: 'metric',
    showFavoriteIcon: false,
    cardActionIcon: String
  },
}


</script>
