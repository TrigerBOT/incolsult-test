import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      cards: [],
    };
  },
  mutations: {
    addCard(state, text) {
      state.cards.push({ id: uuidv4(), text });
      channel.postMessage({
        type: "updateState",
        state: JSON.stringify(store.state),
      });
    },
    deleteCard(state, id) {
      state.cards = state.cards.filter((card) => card.id !== id);
      channel.postMessage({
        type: "updateState",
        state: JSON.stringify(store.state),
      });
    },
    updateCard(state, { id, text }) {
      state.cards = state.cards.map((card) => {
        if (card.id === id) {
          card.text = text;
        }
        return card;
      });
      channel.postMessage({
        type: "updateState",
        state: JSON.stringify(store.state),
      });
    },
  },
  plugins: [createPersistedState()],
});
const channel = new BroadcastChannel("my_channel");

// Listen for updates from other tabs
  channel.onmessage = (event) => {
    if (event.data.type === "updateState") {
      const newState = JSON.parse(event.data.state);
      store.replaceState(newState);
    }
  };
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
