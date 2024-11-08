<script setup>
import { onMounted, ref } from 'vue';
import PageHeader from './components/PageHeader.vue';
import CountryList from './components/CountryList.vue';
import axiosClient from './utils/axios';

const countries = ref([])
const search = ref('')
const filteredCountries = ref([])

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
onMounted(()=>{
  fetchCountries()
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
    <CountryList :countries="filteredCountries.length >0 ? filteredCountries : countries"/>
  </div>
</template>