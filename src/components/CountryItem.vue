<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Country } from '../models/country.model';

const router = useRouter();

interface Props{
    country: Country
}
defineProps<Props>()
</script>
<template>
    <div class="h-56 sm:h-36">
        <img class="h-56 sm:h-32 w-full" :src="country.flags.png" :alt="country.name.common" >
    </div>
    <div class="p-5">
        <h4 class="text-xl font-bold text-gray-700">{{ country.name.common }}</h4>
        <p class="text-sm text-gray-400">
            Capital: 
            <span class="font-bold" v-for="capital in country.capital">
                {{  capital  }}
                <template> </template>
            </span>
        </p>
        <p class="text-sm text-gray-400">Population: <span class="font-bold">{{  country.population?.toLocaleString()  }}</span></p>
        <p class="text-sm text-gray-400">Region: <span class="font-bold">{{  country.region  }}</span></p>
        <button class="mt-8 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="router.push(`/country/${country.name.common}`)">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
</template>