<template>
  <div class="w-full h-max relative z-10 bg-white rounded-lg">
    <label
        v-if="label"
        :for='label'
        class="absolute -top-4 left-3 text-sm text-black bg-secondary-dark p-1">
      {{ label }}
    </label>

    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        :id='label'
        :placeholder="$attrs.placeholder"
        autocomplete
        class="w-full text-sm bg-transparent border pl-2 py-1 pr-9 rounded-lg text-black "
    >

    <button
        class="w-9 h-full absolute z-20 top-0 right-0 border-l bg-gray-200 rounded-r-lg"
        @click="$emit('sendSearch')"
    >
      <img
          v-if="img"
          class="w-4 h-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          :src="img" alt=""
      >
    </button>
  </div>

</template>


<script>


export default {
  name: "CustomInput",
  props: {
    modelValue: [String, Number],
    label: [String],
    img: [String],
  }

}
</script>
