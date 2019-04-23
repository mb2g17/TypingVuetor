<template>
    <!-- Game -->
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <!-- Level -->
                <b-col>
                    <h3>Level {{ this.level }}</h3>
                    <b-progress :value="this.xp" :max="this.maxXP" show-value animated></b-progress>
                </b-col>

                <!-- Words -->
                <b-col>

                    <h3>Difficulty: {{ this.$store.state.difficulty.toUpperCase() }}</h3>

                    <h2>Score: {{ this.$store.getters.getScore }}</h2>

                    <div ref="container">
                    </div>

                </b-col>

                <!-- "Health" -->
                <b-col>
                    <b-progress :value="this.noOfWords" :max="this.maxWords" show-value animated variant="danger"></b-progress>
                </b-col>

            </b-row>
        </b-container>

        <!-- Modal -->
        <b-modal id="modal" title="You lose!" @hidden="quit()">
            <p>You got to:</p>
            <h3>Level {{ this.level }}</h3>
            <p>and your score was:</p>
            <h1>{{ this.numberWithCommas(this.$store.getters.getScore) }}</h1>
            <p>on difficulty</p>
            <h3>{{ this.$store.state.difficulty.toUpperCase() }}</h3>

            <div slot="modal-footer" >
                <b-button variant="primary" @click="quit()">OK</b-button>
            </div>

        </b-modal>

        <b-button ref="modalBtn" v-show="false" v-b-modal.modal>Launch demo modal</b-button>

    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Word from "@/components/Word.vue";
    import WordBank from '@/words.ts';
    import router from "@/router";

    /**
     * The view you actually play the game in
     */
    @Component({
        components: {
            Word
        }
    })
    export default class Game extends Vue
    {
        /** The maximum number of words */
        private maxWords: number = 10;

        /** The number of words */
        private noOfWords: number = 0;

        /** The level we're on */
        private level: number = 1;

        /** The experience points */
        private xp: number = 0;

        /** Xp to level up */
        private maxXP: number = 5;

        /** The interval ID */
        private intervalID: number = 0;

        /** On start */
        created(): void
        {
            // Reset score
            this.$store.dispatch('resetScore');

            // Pick max words based on difficulty
            switch (this.$store.state.difficulty)
            {
                case "easy":
                    this.maxWords = 12;
                    break;
                case "medium":
                    this.maxWords = 10;
                    break;
                case "hard":
                    this.maxWords = 8;
                    break;
            }

            // Start the interval
            this.startInterval();
        }

        quit(): void {
            // Reset score
            this.$store.dispatch('resetScore');

            // Go to main menu
            router.push('/');
        }

        numberWithCommas(x: number): string {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        /** Get interval delay */
        getIntervalDelay(): number {
            return 1050 - 50 * this.level;
        }

        /**
         * Starts the word generating interval
         */
        startInterval(): void {
            // Every so often, make a new word
            this.intervalID = setInterval(() => {

                // If we haven't reached the limit
                if (this.noOfWords < this.maxWords)
                {
                    // Add word
                    let ComponentClass = Vue.extend(Word);
                    let instance = new ComponentClass({
                        propsData: { inputWord: WordBank.getWordByDifficulty(this.$store.getters.getDifficulty) }
                    });
                    instance.$on('complete', (score: number) => {
                        // Increments score
                        this.$store.dispatch('addScore', score);

                        // Deduct words
                        this.noOfWords--;

                        // Make XP go up
                        this.xp++;

                        // If XP is max
                        if (this.xp >= this.maxXP)
                        {
                            // Take away XP and level up
                            this.xp = 0;
                            this.level++;

                            // Restart interval
                            this.stopInterval();
                            this.startInterval();
                        }
                    });
                    instance.$mount(); // pass nothing

                    // Add word to DOM
                    let container: any = this.$refs.container;
                    if (container == null)
                        this.stopInterval();
                    else
                        container.appendChild(instance.$el);

                    // Add number of words
                    this.noOfWords++;
                }
                else
                {
                    // Stop interval
                    this.stopInterval();

                    // We lose!
                    let modalBtn: any = this.$refs.modalBtn;
                    modalBtn.click();
                }

            }, this.getIntervalDelay());
        }

        /**
         * Stops the word generating interval
         */
        stopInterval(): void {
            clearInterval(this.intervalID);
        }
    }
</script>

<style scoped>
    .inline {
        display:inline;
    }
    .red {
        color:red;
    }
    .bold {
        font-weight: bold;
    }
    .inline {
        display: inline;
    }
</style>