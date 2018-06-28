<template>
    <div class="cp-wrap cp-js-App">
        <v-app v-if="loaded">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <router-view></router-view>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<style lang="less">
    .cp-wrap.cp-js-App {

    }
</style>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['loaded'])
        },
        mounted: function() {
            var vm = this;
        }
    }
</script>
