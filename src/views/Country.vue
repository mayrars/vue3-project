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
        <div class="grid grid-cols-2 gap-8">
            <div>
                <img :src="country?.flags.svg" :alt="country?.flags.alt" class="w-full h-96">
            </div>
            <div class="bg-gray-200 p-8 rounded-lg">
                <h1 class="text-4xl font-bold text-left mb-5">{{country?.name.common}}</h1>
                <p class="text-lg"><span class="font-bold">Population:</span> {{country?.population}}</p>
                <p class="text-lg"><span class="font-bold">Region:</span> {{country?.region}}</p>
                <p class="text-lg"><span class="font-bold">Capital:</span> {{country?.capital ? country?.capital[0] : 'N/A'}}</p>
                <p class="text-lg"><span class="font-bold">Languages:</span> {{country?.languages ? Object.values(country?.languages).join(', ') : 'N/A'}}</p>
                <p class="text-lg">
                    <span class="font-bold">Currencies:</span>
                    {{ country?.currencies ? Object.values(country?.currencies).map(currency => currency.name).join(', ') : 'N/A'}}
                </p>
            </div>
        </div>
    </div>
</template>
