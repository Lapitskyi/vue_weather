<script>
/* eslint-disable no-undef */
import { ref, onMounted, toRef, watchEffect} from 'vue'
import {Loader} from '@googlemaps/js-api-loader'
import {useGeolocation} from "@/helpers/useGeoLocation.js";


export default {
  name: 'MapsLoader',
  props: {
    positionCurrentCity: {
      lon: Number,
      lat: Number
    },
  },
  setup(props) {
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
    const triggerRefresh = toRef(props, 'positionCurrentCity')

    const mapDiv = ref(null)
    let map = ref(null)
    let mapker = ref(null)
    const {coords} = useGeolocation()

    const currPos = ref({
      lat: coords.value.latitude || 0,
      lng:  coords.value.longitude || 0
    })

    const loader = new Loader({apiKey: GOOGLE_MAPS_API_KEY})

    watchEffect(() => {
      if (triggerRefresh.value !== coords.value) {
        currPos.value = {
          lat: triggerRefresh.value.lat,
          lng: triggerRefresh.value.lon
        }
      }
    })

    const createMap = async ()=>{
      await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 9
      })

       mapker.value = new AdvancedMarkerElement({
        map: map,
        position: currPos,
        title: "Uluru",
      });
    }


    onMounted(async () => {
      await createMap()
    })


    return {currPos, mapDiv}
  }
}
</script>

<template>
  <div ref="mapDiv" style="width: 100%; height: 260px"/>
</template>