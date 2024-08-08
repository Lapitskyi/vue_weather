
<script setup>
import {GoogleMap, Marker} from 'vue3-google-map'

const key = import.meta.env.VITE_GOOGLE_API_KEY

const center = {lat: 40.689247, lng: -74.044502}
</script>

<template>
  <GoogleMap
      :api-key="key"
      style="width: 100%; height: 260px"
      :center=" center"
      :zoom="7"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>