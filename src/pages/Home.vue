<template>
  <div
      class="w-full h-full flex flex-col m-auto">
    <section class="bg-summer_banner bg-cover bg-center">
      <div
          class="grid grid-cols-2 items-center justify-between gap-3 lg:container mx-auto px-2.5 w-full h-[300px]">
        <div>
          <h1 class="text-orange-400 text-7xl font-bold">Weather</h1>
          <p class="text-md text-white max-w-[360px]">{{$t('info')}}</p>
        </div>
        <div class="relative h-max">
          <div>
            <CustomInput
                v-model="citySearch"
                img="/icons/search.svg"
                :placeholder="$t('placeholder')"
                @sendSearch="findCountry"
                @keydown.enter="findCountry"
            />
          </div>

          <div class="bg-white absolute w-full p-2"
               v-if="state.listCountry.length"
          >
            <div v-for="item in state.listCountry"
                 @click="selectedCity(item)"
                 :key="item.id"
                 class="flex items-center justify-between gap-x-2 text-sm cursor-pointer hover:bg-gray-100 px-2 hover:rounded-lg"
            >
              <div class="flex items-center gap-1 w-[200px]">
                <div>{{ item.name }},</div>
                <div>{{ item.sys.country }},</div>
                <img class="w-4 h-3"
                     :src="`https://openweathermap.org/images/flags/${item.sys.country.toString().toLowerCase()}.png`"
                     alt=""
                />
              </div>
              <div>{{
                  activeTemp === 'metric'
                      ? tempWeatherCel(item.main.temp) + '&#176;C'
                      : tempWeatherFar(item.main.temp) + '&#176;F'
                }}
              </div>
              <img class="w-8 h-8"
                   :src="`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}.png`"
                   alt=""
              />
              <div class="flex gap-2  w-max">
                <div>{{ item.coord.lat }}</div>
                <div>{{ item.coord.lon }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 w-full py-5">
      <div
          class="flex items-center justify-between gap-5 lg:container mx-auto px-2.5">

        <div class="flex items-center gap-2">
          <Tab
              @deleteCity="openModalDelete(item)"
              @changeCity="changeCity(item)"
              v-for="item in state.citieCollection"
              :key="item.id"
              :name="item.name"
              :activeCity="activeCity"
          >
          </Tab>
        </div>
        <div class="flex gap-x-3 items-center">
          <div class="flex gap-5 bg-gray-200 w-max rounded p-1">
            <button
                @click="changeTemp(btn.id)"
                v-for="btn in sysTemps"
                :key="btn.id"
                :class="`${activeTemp === btn.id
          ? 'bg-white'
          : 'bg-transparent' } py-1 px-2  rounded w-max`">
              {{ $t(`${btn.id}`) }}: {{ '&#176;' }}{{ btn.code }}, {{ btn.sys }}
            </button>
          </div>
          <img
              @click="router.push('/favorites')"
              class="w-9 h-9 cursor-pointer" src="/icons/favorite.svg" alt="">
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="grid grid-cols-2 lg:container mx-auto px-2.5">
        <div v-if="state.currentCity">
          <Card
              @cardAction="addFavoritesCity"
              cardActionIcon="/icons/favorite.svg"
              showFavoriteIcon="true"
              :item="state.currentCity"
              :activeTemp="activeTemp"
          />
        </div>
      </div>

    </section>


    <section class="my-5">
      <div class="mt-5 grid grid-cols-2 gap-x-10 items-start  lg:container mx-auto px-2.5">
        <div>
          <div>{{$t("hourly_forecast")}}</div>
          <div>
            <Chart/>
          </div>
        </div>

        <div >
          <div class="text-center">{{$t("days_forecast")}}</div>
          <div  class="flex justify-end">
            <List
                :activeTemp="activeTemp"
                :list="sortDays"
            />
          </div>
        </div>
      </div>
    </section>

    <Modal
        :showModal="showModal"
    >
      <div>{{ info.text }}</div>

      <div
          class="flex gap-2 items-center mt-2.5">
        <button
            @click="closeModal"
            class="py-2.5 px-5 bg-green-600 rounded-lg w-full"
        >Cancel
        </button>
        <button
            v-if="info.typeInfo==='delete'"
            @click="deleteCity"
            class="py-2.5 px-5 bg-red-600 rounded-lg w-full"
        >Delete
        </button>
      </div>

    </Modal>
  </div>
</template>

<script>
import CustomInput from "@/components/UI/CustomInput.vue";
import CustomToggle from "@/components/UI/CustomToggle.vue";
import {
  getForecastDays,
  getListCity,
  getWeatherCurrentCity,
} from "@/service/weather.js";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {getPosition} from "@/service/position.js";
import Card from "@/components/Cards/Card.vue";
import {
  dateWeather,
  dayWeather, getTime,
  tempWeatherCel,
  tempWeatherFar
} from "@/helpers/formatWeather.js";
import Chart from "@/components/Chart/Chart.vue";
import List from "@/components/DayList/List.vue";
import Tab from "@/components/UI/Tab.vue";
import Modal from "@/components/Modal/Modal.vue";
import {useRouter} from "vue-router";
import useLocalStorage from "@/helpers/useLocalStorage.js";

export default {
  name: "Home",
  methods: {dateWeather, dayWeather, tempWeatherFar, tempWeatherCel},
  components: {Modal, Tab, List, Chart, Card, CustomInput, CustomToggle},
  setup() {
    const router = useRouter()

    let favoriteCities = useLocalStorage('favoriteCities', []);
    let citySearch = ref('');
    let activeTemp = ref('metric');
    let activeCity = ref('');
    let errorSearch = ref('')
    let showModal = ref(false);
    let info = ref({
      text: '',
      item: undefined,
      typeInfo: 'text'
    });


    const sysTemps = [
      {id: 'metric', code: 'C', sys: 'm/c'},
      {id: 'imperial', code: 'F', sys: 'mph'},
    ]
    const state = reactive({
      currentCity: undefined,
      listCountry: [],
      citieCollection: [],
      fiveDaysWeather: []
    });

    const forestFiveDays = async (lat, lon) => {
      const fiveDays = await getForecastDays(lat, lon);
      if (fiveDays && Object.keys(fiveDays).length) {
        state.fiveDaysWeather.push(fiveDays)
      }
    }

    const weatherCity = async (name) => {
      if (name) {
        const weather = await getWeatherCurrentCity(name)

        if (weather && Object.keys(weather).length) {
          if (state.citieCollection.length < 5) {
            const findCity = state.citieCollection.find((item) => item.id === weather.id)
            !findCity && state.citieCollection.push(weather)
            activeCity.value = weather.name
            state.currentCity = weather
            state.listCountry = [];
            citySearch.value = '';
          }
        }
      }
    }


    const findCountry = async () => {

      if (citySearch.value) {
        if (state.citieCollection?.length) {
          const c = state.citieCollection.find(
              (item) => item.name.toLowerCase() === citySearch.value.toString().toLowerCase())
          if (c) {
            activeCity.value = c.name
            state.currentCity = c
            citySearch.value = ''
            return
          }

        }
        if (state.citieCollection.length > 4) {
          errorSearch.value = 'The maximum number of selected cities has exceeded 5.\n' +
              'To continue searching, remove unnecessary cities from the list'
          return
        }

        const cityList = await getListCity(citySearch.value)

        if (cityList && cityList.count !== 1) {
          state.listCountry = cityList.list
        } else {
          await weatherCity(citySearch.value);
          await forestFiveDays(cityList?.list[0]?.coord?.lat, cityList?.list[0]?.coord?.lon);
        }
      }
    }

    const selectedCity = async (city) => {
      if (city && Object.keys(city)?.length) {
        await weatherCity(city.name.toLowerCase());
        await forestFiveDays(city?.coord?.lat, city?.coord?.lon);
      }
    }

    const changeCity = (city) => {
      if (city && Object.keys(city).length) {
        state.currentCity = city
        activeCity.value = city.name
      }
    }

    const openModalDelete = (city) => {
      showModal.value = true;
      info.value.typeInfo = 'delete'
      info.value.text = `Are you sure you want to delete this ${city.name}?`
      info.value.item = city
    }

    watch(errorSearch, (prev, curr) => {
      if (prev !== curr) {
        openModalError()
      }

    }, {deep: true})

    const openModalError = () => {
      if (errorSearch.value) {
        showModal.value = true;
        info.value.text = errorSearch.value
      }

    }

    const closeModal = () => {
      showModal.value = false;
      errorSearch.value = '';
      info.value = {
        text: '',
        item: undefined,
        typeInfo: 'text'
      }
    }

    const deleteCity = () => {
      if (info.value.item &&
          Object.keys(info.value.item)?.length && state.citieCollection.length !== 1)
      {
        state.citieCollection = state.citieCollection.filter(
            (item) => item.id !== info.value.item.id)
        state.fiveDaysWeather = state.fiveDaysWeather.filter(
            (item) => item.name !== info.value.item.name)
        closeModal()
      }
    }


    const changeTemp = (btn) => {
      if (btn !== activeTemp.value) {
        activeTemp.value = btn
      }
    }
    const sortDays = computed(() => {
      const res = [];
      const days = [];
      const findCity = state.fiveDaysWeather?.find(
          (item) => item.city.name.toLowerCase() === `${activeCity.value}`.toLowerCase())
      if (findCity !== undefined) {
        for (let i = 0; i < findCity.list.length; i++) {
          if (!days.includes(dayWeather(findCity.list[i].dt))) {
            days.push(dayWeather(findCity.list[i].dt))
            res.push(findCity.list[i])
          }
        }
      }

      return res
    })

    const addFavoritesCity = () => {
      const result = favoriteCities.value?.find(item => item.id === state.currentCity.id)

      if (!result && favoriteCities.value?.length <5) {
        favoriteCities.value.push({
          id:state.currentCity.id,
          name: state.currentCity.name,
          ...state.currentCity.coord
        })
      }
    }

    const hourlyForecast = computed( ()=>{
      const result =  state.fiveDaysWeather?.map((item)=> getTime(item.dt_txt))
      return result

    })
    console.log('state', state.fiveDaysWeather)
    // console.log('state', getTime(state.fiveDaysWeather[0].dt))
    console.log('state', hourlyForecast.value)

    onMounted(async () => {
      const findPositionUser = await getPosition();
      if (findPositionUser && Object.keys(findPositionUser).length) {
        await weatherCity(findPositionUser.location.city);
        await forestFiveDays(findPositionUser.location.latitude,
            findPositionUser.location.longitude)
      }
    });

    return {
      router,
      sortDays,
      sysTemps,
      citySearch,
      state,
      activeCity,
      activeTemp,
      changeTemp,
      findCountry,
      selectedCity,
      changeCity,
      deleteCity,
      showModal,
      info,
      closeModal,
      openModalDelete,
      addFavoritesCity
    }
  },

}


</script>

