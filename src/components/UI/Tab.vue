<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Tab",
  props: {
    name: String,
    activeCity: String,
    item: Object,
  }
})
</script>

<template>
  <div class="relative min-w-[80px] ">
    <button
        @click="$emit('changeCity')"
        :class="`${activeCity === name
          ? 'bg-white'
          : 'bg-transparent border border-gray-200' } py-1 px-1.5 relative w-full text-sm rounded`">
      {{ name }}
    </button>
    <div v-if="activeCity !==name" class="absolute w-3.5 h-3.5 -top-1.5 -right-1.5">
      <img @click="$emit('deleteCity')"
           src="/icons/delete.svg" alt="">
    </div>


  </div>


</template>
