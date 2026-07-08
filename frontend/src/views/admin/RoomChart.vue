<script setup>
import { Pie } from "vue-chartjs";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const props = defineProps({
    occupied: Number,
    available: Number,
});

const data = {
    labels: ["Đã thuê", "Còn trống"],

    datasets: [
        {
            data: [
                props.occupied,
                props.available,
            ],

            backgroundColor: [
                "#2563eb",
                "#dbeafe",
            ],

            borderWidth: 0,
        },
    ],
};

const options = {

    responsive: true,

    plugins: {

        legend: {
            position: "bottom",
        },

    },

};
</script>

<template>

<div class="chart">

    <Pie
        :data="data"
        :options="options"
    />

</div>

</template>

<style scoped>

.chart{

    width:100%;
    max-width:380px;

}

</style>