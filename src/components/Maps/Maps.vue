<template>
  <GoogleMap
      ref="mapRef"
      :api-key="key"
      style="width: 100%; height: 260px"
      :center="center"
      :zoom="7"
  >
    <Marker :options="{ position: center }"/>
  </GoogleMap>
</template>

<script>
import {GoogleMap, Marker} from 'vue3-google-map'
import {computed, ref, toRef, watch} from "vue";


export default {
  props: {
    positionCurrentCity: {
      lon: Number,
      lat: Number
    },
    lon: Number
  },
  components: {GoogleMap, Marker},
  setup(props) {

    const key = import.meta.env.VITE_GOOGLE_API_KEY
    const center = {lat: 40.689247, lng: -74.044502}
    const mapRef = ref(null)
    const triggerRefresh = toRef(props, 'positionCurrentCity')
    console.log('triggerRefresh', triggerRefresh.value)

    watch([() => mapRef.value?.ready, triggerRefresh], ([ready, triggerRefresh]) => {
      if (!ready)
        return
      console.log('triggerRefresh.value', triggerRefresh.value)
      mapRef.value.map.panTo({lat: 48.5132, lng: triggerRefresh.value.lon})
    })

    watch(triggerRefresh,
        (prev, curr) => {
          console.log('prev, curr', prev, curr)
        }, {deep: true})

    return {
      key, center
    }
  }
}

</script>

