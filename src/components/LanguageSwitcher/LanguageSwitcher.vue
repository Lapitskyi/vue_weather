<template>
  <select  v-model="selectedOption" >
      <option
          v-for="item in options"
          :key="item.label"
      >
        {{item.label}}
      </option>
  </select>


  <div>

  </div>
</template>


<script lang="ts">
export interface SelectOption {
  label: string,
  value: string
}

import {useI18n} from 'vue-i18n'
import {ref, watchEffect} from "vue";

export default {
  name: "LanguageSwitcher",
  setup() {
    const {t, locale} = useI18n()
    const options: SelectOption[] = [
      {
        label: 'English',
        value: 'en'
      },
      {
        label: 'Ukrainian',
        value: 'ua'
      }
    ];

    const currentLanguage = options.find((x) => x.value === locale.value)?.label ?? "English";
    const selectedOption = ref(currentLanguage);

    watchEffect(() => {
      locale.value = options.find((x) => x.label === selectedOption.value)!.value;
    })

    return {t, locale, currentLanguage, selectedOption,options}
  }
}
</script>

