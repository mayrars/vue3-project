<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axiosClient from '../utils/axios';
    import { useRoute } from 'vue-router';
    import { Country } from '../models/country.model';
    const route = useRoute();
    const country = ref<Country>();
    const fetchCountries = async ()=>{
        try {
            const {data} = await axiosClient.get(`/name/${route.params.name}`);
            country.value = data[0]
        } catch (error) {
            console.log(error)
        }
    }
    onMounted(()=>{
        fetchCountries()
    })
</script>
<template>
    <div>
        <h1 class="text-2xl font-bold text-center">{{country?.name.common}}</h1>
        <div class="flex flex-col md:flex-row justify-center items-center gap-10">
            <img :src="country?.flags.png" :alt="country?.name.common" class="w-1/2 md:w-1/4">
            <div class="flex flex-col gap-5">
                <p class="text-lg font-bold">Population: {{country?.population}}</p>
                <p class="text-lg font-bold">Region: {{country?.region}}</p>
                <p class="text-lg font-bold">Capital: {{country?.capital ? country?.capital[0] : 'N/A'}}</p>
                <p class="text-lg font-bold">Languages: {{country?.languages ? Object.values(country?.languages).join(', ') : 'N/A'}}</p>
            </div>
        </div>
    </div>
</template>
