<script setup>
import { onMounted, ref, watch } from 'vue';
import PageHeader from './components/PageHeader.vue';
import CountryList from './components/CountryList.vue';
import axiosClient from './utils/axios';

const countries = ref([])
const search = ref('')
const filteredCountries = ref([])
const page = ref(1)
const itemsPerPage = ref(12)
const paginatedCountries = ref([])
const totalItems = ref(0)


const fetchCountries = async ()=>{
  try{
    const {data} = await axiosClient.get("/all");
    countries.value = data
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

onMounted(()=>{
  fetchCountries()
  sliceCountries(countries.value)
})

watch([countries],()=>{
  sliceCountries(countries.value)
})
</script>

<template>
  <PageHeader />
  <div class="container max-w-screen-lg mx-auto px-6">
    <div class="mb-8">
      <input 
        type="text" 
        class="border border-gray-300 rounded-md px-4 py-2 w-full" 
        placeholder="Search by country name..."
        v-model="search"
        @input="filterCountries"
      />
    </div>
    <div class="mb-8 flex justify-center space-x-6">
      <button class="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200">Previous</button>
      <button class="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200">Next</button>
    </div>
    <CountryList :countries="paginatedCountries"/>
  </div>
</template>