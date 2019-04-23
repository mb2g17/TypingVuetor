<template>
    <div class="home">

        <img alt="Vue logo" src="../assets/logo.png">

        <br/>

        <div id="cardContainer">

            <b-card
                    title="Easy"
                    :img-src="require('@/assets/easy.png')"
                    img-alt="Image"
                    img-top
                    style="max-width: 20rem;"
                    class="mb-2 difficulty-card"
                    bg-variant="success"
                    text-variant="white"
                    @click="playGame('easy')"
            >
                <b-card-text>
                    All phrases are one word, all in lower-case. If over 12 words fill your buffer, you're out.
                </b-card-text>

            </b-card>

            <b-card
                    title="Medium"
                    :img-src="require('@/assets/medium.png')"
                    img-alt="Image"
                    img-top
                    style="max-width: 20rem;"
                    class="mb-2 difficulty-card"
                    bg-variant="warning"
                    text-variant="white"
                    @click="playGame('medium')"
            >
                <b-card-text>
                    The phrases are in lower-case but have spaces. If over 10 words fill your buffer, you're out.
                </b-card-text>

            </b-card>

            <b-card
                    title="Hard"
                    :img-src="require('@/assets/hard.png')"
                    img-alt="Image"
                    img-top
                    style="max-width: 20rem;"
                    class="mb-2 difficulty-card"
                    bg-variant="danger"
                    text-variant="white"
                    @click="playGame('hard')"
            >
                <b-card-text>
                    The phrases can have capital letters and punctuation marks! If over 8 words fill your buffer, you're out.
                </b-card-text>

            </b-card>

        </div>

    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue';
    import router from "@/router";

    @Component({
        components: {
            HelloWorld,
        },
    })
    export default class Home extends Vue {
        playGame(difficulty: string) {
            // Set difficulty
            this.$store.commit('setDifficulty', difficulty);

            // Go to game view
            router.push('/game');
        }
    }
</script>

<style lang="scss">
    .difficulty-card {
        opacity: 0.6;
        margin-left: 10px;
        transition: opacity 0.2s, transform 0.2s;
        &:hover {
            opacity: 1;
            transform: translateY(-10px);
            cursor:pointer;
        }
    }

    img {
        max-height: 200px;
    }

    #cardContainer {
        margin-top: 60px;
        width:100vw;
        display:flex;
        justify-content: center;
    }
</style>