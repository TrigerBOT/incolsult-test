<template>
  <div>
    <h1>Sticker Board</h1>
    <div class="sticker-board">
      <Card
        v-for="card in cards"
        :key="card.id"
        :text="card.text"
        :id="card.id"
        @click="handleClick"
      />
    </div>
    <button class="button" @click="$router.push('/settings')">Settings</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore();
import Card from "~/components/Card.vue";

let cards = computed(() => {
    return store.state.cards;
});
function handleClick(id) {
  // Implement card click functionality
}
</script>

<style lang="scss">
.button {
    text-align: center;
    padding: 10px;
    font-size: 18px;
    background: rgba(255, 255, 255, .6);
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    transition: ease-in-out .3;
    
    &:hover {
        box-shadow:  4px 4px rgba(0,0,0,.6);
        transition: ease-in-out .3;
    }
}

.sticker-board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 22px;
}
</style>
