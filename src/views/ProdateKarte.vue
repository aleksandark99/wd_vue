<template>
  <div>



          <b-table :fields="fields" :items="items">
      <template v-slot:cell(movie)="data">
        <router-link :to="`/user/${data.item.username}`">{{ data.value}}</router-link>
      </template>
    </b-table>
  </div>      
  </template>