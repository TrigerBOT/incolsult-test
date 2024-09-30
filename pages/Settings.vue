<script setup>
import { useStore } from "vuex";

const store = useStore();
const newCardText = ref("");
const editingCardId = ref("");
let cards = computed(() => {
  return store.state.cards;
});
function addCard() {
  store.commit("addCard", newCardText.value);
  newCardText.value = "";
}

function editCard(id) {
  editingCardId.value = id;
}

function saveEdit(id) {
  store.commit("updateCard", {
    id,
    text: cards.value.find((card) => card.id === id).text,
  });
  editingCardId.value = null;
}

function deleteCard(id) {
  store.commit("deleteCard", id);
}
</script>
<template>
  <div>
    <h1>Settings Page</h1>
    <form class="card-create" @submit.prevent="addCard">
      <input
        class="input"
        v-model="newCardText"
        type="text"
        placeholder="Enter new card text"
      />
      <button class="button" type="submit">Add Card</button>
    </form>
    <ul>
      <li v-for="card in cards" :key="card.id" class="card-options">
        <div class="card-options__value" v-if="card.id !== editingCardId">
          {{ card.text }}
        </div>
        <input
          class="input"
          v-if="card.id === editingCardId"
          v-model="card.text"
          type="text"
          @blur="saveEdit(card.id)"
          @keyup.enter="saveEdit(card.id)"
        />
        <div class="card-options__controls">
          <button class="button" @click="editCard(card.id)">Edit</button>
          <button class="button" @click="deleteCard(card.id)">Delete</button>
        </div>
      </li>
    </ul>
    <button class="button" @click="$router.push('/')">Back to Main Page</button>
  </div>
</template>

<style lang="scss">
.input {
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
}

.card-create {
  display: flex;
  gap: 20px;
}
.card-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid #ccc;
  border-radius: 10px;

  &__controls {
    display: flex;
    gap: 8px;
  }
}
.button {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: ease-in-out 0.3;

  &:hover {
    box-shadow: 4px 4px rgba(0, 0, 0, 0.6);
    transition: ease-in-out 0.3;
  }
}
</style>
