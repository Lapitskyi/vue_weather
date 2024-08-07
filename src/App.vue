<template>
  <div class="relative w-full h-screen flex flex-col m-auto">
    <div class="relative lg:container  px-2.5 ">
      <div class="absolute top-2 right-0 ">
        <LanguageSwitcher/>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
import Home from "@/pages/Home.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher.vue";

export default {
  components: {LanguageSwitcher, Home}
}
</script>
