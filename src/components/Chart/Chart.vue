<template>

  <div>
    <div class="flex items-center justify-between">
      <h2>{{ $t("hourly_forecast") }}</h2>

      <div class="flex items-center gap-3 mt-2.5">
        <button
            @click="changeActiveBtn(btn.id)"
            :class="`${activeBtn ===btn.id
            ?  'bg-green-500 text-white'
            : 'bg-transparent' } flex items-center justify-center text-xs px-1 py-0.5 text-center min-w-[100px] border rounded`"
            v-for="btn in toggleChart"
            :key="btn.id">
          {{ btn.name }}
        </button>
      </div>
    </div>


    <div class="mt-2.5">
      <canvas id="line-chart"></canvas>
    </div>


  </div>


</template>

<script>

import Chart from 'chart.js/auto';
import {onMounted, ref, toRef, watch} from "vue";

export default {
  name: "Chart",
  props: {
    chartData: {
      days: Array,
      data: Object
    },
    labels: []
  },

  setup(props) {
    const chartData = ref({
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Max temp',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            parsing: {
              yAxisKey: 'temp_max'
            }
          },
          {
            label: 'Min Temp',
            data: [],
            borderColor: 'rgb(375, 192, 192)',
            parsing: {
              yAxisKey: 'temp_min'
            }
          },

        ]
      },
      options: {}
    })
    const triggerRefresh = toRef(props, 'chartData')
    let lineChart = ref(null)
    const toggleChart = [{id: 'tempDay', name: 'Day'}, {id: 'tempWeek', name: 'Week'}];
    const activeBtn = ref('tempDay');
    const loading = ref(false)


    const changeActiveBtn = (btn) => {
      if (btn && btn !== activeBtn.value) {
        activeBtn.value = btn
        loading.value =true
      }
    }

    const createChart = () => {
      const ctx = document.getElementById("line-chart");
      lineChart = new Chart(ctx, chartData.value);
    }

    const updateChart = (temp) => {
      const color = {
        'temp_max': 'rgb(217, 30, 24)',
        'temp_min': 'rgb(15, 10, 222)',
      }

      if (triggerRefresh.value) {
        const labels = triggerRefresh.value?.chartData?.[temp]
            ?.map((el) => el['x'])

        const labelData = Object.keys(triggerRefresh.value?.chartData?.[temp][0])
            .filter((k) => k !== 'x')

        const result = labelData?.map((item) => {
          return {
            label: item,
            data: [...triggerRefresh.value?.chartData?.[temp]],
            borderColor: color[item] || 'rgb(375, 192, 192)',
            parsing: {
              yAxisKey: item
            }
          }
        })
        if (labels?.length  && result?.length ) {
          chartData.value.data.labels = labels;
          chartData.value.data.datasets = result;
          lineChart.update();
          loading.value =false
        }
      }
    }


    watch(
        triggerRefresh,
        (prev, curr) => {
          triggerRefresh.value && activeBtn.value && updateChart(activeBtn.value)
        },
        {deep: true}
    )

    watch(loading,(prev,curr)=>{
      updateChart(activeBtn.value)
    })

    onMounted(() => {
      createChart()
    })

    return {
      toggleChart,
      activeBtn,
      changeActiveBtn,
      updateChart

    }

  }


}
</script>
