<template>
    <div class="card" @click="handleClick">
      {{ text }}
    </div>
  </template>
  
  <script setup>
  defineProps({
    text: String,
    id: Number,
  });
  
  </script>
  
  <style lang="scss">
  .card {
    width: 200px;
    height: 200px;
    text-align: center;
    padding: 10px;
    background: rgba(255, 255, 255, .6);
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
    box-shadow:  2px 3px rgba(0,0,0,.6);
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>