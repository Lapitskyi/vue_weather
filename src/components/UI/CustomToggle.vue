<script setup lang="ts">
const props = defineProps({
  imgLeft: String,
  imgRight: String,
  checked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change', 'update'])


const updateToggle = (checked:boolean) =>{
  emit('update', checked)
}


</script>

<template>
  <div class="relative">
    <img
        v-if="props.imgLeft"
        class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2"
        :src="props.imgLeft" alt=""
    >

    <input
        type="checkbox"
        :checked="props.checked"
        @change="(event) => updateToggle((event.target as HTMLInputElement).checked)"
    >
    <img
        v-if="props.imgRight"
        class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2"
        :src="props.imgRight" alt=""
    >

  </div>

</template>
