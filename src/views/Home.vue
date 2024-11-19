<script setup>
import { onMounted, ref, watch } from 'vue';
import CountryList from '../components/CountryList.vue';
import axiosClient from '../utils/axios';

const countries = ref([])
const search = ref('')
const region = ref('')
const filteredCountries = ref([])
const page = ref(1)
const itemsPerPage = ref(12)
const paginatedCountries = ref([])
const totalItems = ref(0)


const fetchCountries = async ()=>{
  try{
    const {data} = await axiosClient.get("/all");
    countries.value = data
    totalItems.value = countries.value.length
  }catch(error){
    console.log(error)
  }
}

const filterCountries = ()=>{
  filteredCountries.value = countries.value.filter(country => country.name.common.toLowerCase().includes(search.value.toLowerCase()))
}

const sliceCountries = (currentCountries) => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = page.value * itemsPerPage.value;
  paginatedCountries.value = currentCountries.slice(start, end);
};

const changeCountries = (e) =>{
  const region = e.target.value
  reinitPage()
  filteredCountries.value = countries.value.filter(country => country.region === region)
}

onMounted(()=>{
  fetchCountries()
})

const changePage = (newPage) =>{
  page.value = newPage
}

const reinitPage =() => {
  page.value = 1
}

watch([countries,page, filteredCountries, region],()=>{
  sliceCountries(
    filteredCountries.value.length <= 0 && (search.value==="" || region==="") ? countries.value : filteredCountries.value
  )
})
</script>
<template>
    <div class="mb-24">
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="w-full">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="text" 
                class="border p-4 ps-10 border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by country name..." v-model="search"
                @input="filterCountries"/>
            </div>
          </div>
          <div class="col-start-3">
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-40 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="changeCountries" v-model="region">
              <option selected>Choose a country</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Antarctic">Antarctic</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value=Oceania>Oceania</option>
            </select>
          </div>
        </div>
        <div class="mb-8 flex justify-center space-x-6">
            <button @click="$event=>changePage(page - 1)" :disabled="page <= 1" :class="{'opacity-50 cursor-not-allowed': page <= 1}" class="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200">Previous</button>
            <button @click="$event=>changePage(page + 1)" :disabled="page >= totalItems / itemsPerPage" :class="{'opacity-50 cursor-not-allowed': page >= totalItems / itemsPerPage}"  class="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200">Next</button>
        </div>
        <CountryList :countries="paginatedCountries"/>    
    </div>
</template>