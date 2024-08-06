<template>
  <div class="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-40 flex z-50"
       v-if="showModal"
  >
    <div @click.stop class="m-auto bg-white rounded-lg min-h-14 min-w-[300px] p-5">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    showModal: Boolean
  },
}
</script>