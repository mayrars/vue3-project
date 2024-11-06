<script setup>
import { onMounted, ref } from 'vue';
import PageHeader from './components/PageHeader.vue';
import CountryList from './components/CountryList.vue';
import axiosClient from './utils/axios';


const countries = ref([])

const fetchCountries = async ()=>{
  try{
    const {data} = await axiosClient.get("/all");
    countries.value = data
  }catch(error){
    console.log(error)
  }
}
onMounted(()=>{
  fetchCountries()
})
</script>

<template>
  <PageHeader />
  <div class="container max-w-screen-lg mx-auto px-6">
    <CountryList :countries="countries"/>
  </div>
</template>