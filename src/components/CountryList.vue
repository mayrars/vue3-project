<script setup lang="ts">
import { defineProps } from 'vue';
import { Country } from '../models/country.model';
import CountryItem from './CountryItem.vue';

interface Props{
    countries: Country[];
}

defineProps<Props>()
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="country in countries" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-50 dark:border-gray-200">
            <CountryItem :country="country"/>
        </div>
    </div>
</template>