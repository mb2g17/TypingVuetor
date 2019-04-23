<template>
    <div v-bind:class="{ finish: this.word.complete() }">

        <p v-bind:class="{ red: !this.word.complete(), blue: this.word.complete() }">{{ this.word.getTypedStr() }}</p>
        <p v-bind:class="{ blue: this.word.complete() }">{{ this.word.getRemainingStr() }}</p>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import WordClass from "@/classes/WordClass";

    /**
     * Test component, to test out typing
     */
    @Component
    export default class Word extends Vue
    {
        /** The string to type */
        @Prop(String)
        readonly inputWord!: string;

        /** The word to type out */
        private word: WordClass = new WordClass(this.inputWord);

        /** The binded string inside the 'input' tag */
        private boxString: string = "";

        created(): void {
            let self = this;
            window.addEventListener('keydown', function(ev) {

                // If we're not complete yet
                if (!self.word.complete())
                {
                    // Type the word
                    self.word.type(ev.key);

                    // Clear the input
                    self.boxString = "";

                    // If we're complete...
                    if (self.word.complete()) {

                        // Emit event
                        self.$emit('complete', self.word.getTypedStr().length * 50);

                        // Delete this
                        setTimeout(() => {
                            self.$destroy();
                            if (self.$el.parentNode != null)
                                self.$el.parentNode.removeChild(self.$el);
                        }, 500);
                    }
                }

            });
        }
    }
</script>

<style scoped lang="scss">
    .finish {
        animation-name: fadeout;
        animation-duration:0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes fadeout {
        from {opacity:1;}
        to {opacity:0;}
    }

    .red {
        color:red;
    }
    .blue {
        color:blue;
    }
    p {
        display: inline;
        font-weight: bold;
    }
</style>