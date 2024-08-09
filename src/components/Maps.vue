
<template>
  <GoogleMap
      ref="mapRef"
      :api-key="key"
      style="width: 100%; height: 260px"
      :center=" center"
      :zoom="7"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import {GoogleMap, Marker} from 'vue3-google-map'
import {computed, ref, toRef, watch} from "vue";


export default {
  props:{
    lon: Number
  },
  components:{GoogleMap, Marker},
  setup(props){

    const key = import.meta.env.VITE_GOOGLE_API_KEY

    const center = {lat: 40.689247, lng: -74.044502}

    const mapRef = ref(null)

    const lng = computed(()=>{
      return props.lon
    })



    watch([() => mapRef.value?.ready, lng], ([ready, lng]) => {
      if (!ready)
        return
      console.log(lng)
      mapRef.value.map.panTo({ lat: 48.5132, lng })
    })


    return{
      key, center
    }
  }
}

</script>

