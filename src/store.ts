import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        score: 0,
        difficulty: "easy"
    },
    getters: {
        getScore: (state, getters) => {
            return state.score;
        },
        getDifficulty: (state, getters) => {
            return state.difficulty;
        }
    },
    mutations: {
        addScore(state, amount: number): void {
            state.score += amount;
        },
        resetScore(state): void {
            state.score = 0;
        },
        setDifficulty(state, difficulty: string): void {
            state.difficulty = difficulty;
        }
    },
    actions: {
        addScore({commit}, amount: number): void {
            commit('addScore', amount);
        },
        resetScore({commit}): void {
            commit('resetScore');
        }
    }
})
