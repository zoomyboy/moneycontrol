<template>
    <div class="cp-wrap cp-js-App">
        <v-app v-if="loaded">
            <v-navigation-drawer app fixed v-model="navvisible">
                <v-toolbar flat>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title class="title">
                                {{ config.app.name }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list dense class="pt-0">
                    <v-list-tile @click="visitMenu(entry)" v-for="(entry, index) in navbarFiltered" :key="index">
                        <v-list-tile-action v-if="entry.icon">
                            <v-icon>{{ entry.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content v-if="entry.title">
                            <v-list-tile-title>{{ entry.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-bottom-nav :value="true" color="blue" :active="active.navbarfooter" absolute>
                    <v-btn flat color="white" :value="item.route" v-for="(item, index) in bottomNavFiltered" :key="index" @click="visitFooterMenu(item)">
                        <span v-if="showBottomLabels">{{ item.title }}</span>
                        <v-icon medium>{{ item.icon }}</v-icon>
                    </v-btn>
                </v-bottom-nav>
            </v-navigation-drawer>
            <v-toolbar color="primary" app flat dark>
                <v-toolbar-side-icon @click="navvisible = !navvisible"></v-toolbar-side-icon>
                <v-toolbar-title class="white--text">{{ config.apptitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-menu v-for="(item,key) in toolbar" offset-y left :key="key">
                        <v-btn slot="activator" flat>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile :key="subkey" @click="visitMenu(subitem)" v-for="(subitem,subkey) in item.children">
                                <v-list-tile-title><v-icon v-if="subitem.icon" class="mr-2">{{ subitem.icon }}</v-icon>{{ subitem.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-toolbar-items>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <v-alert :color="notification.color" v-if="notification" icon="check_circle" value="notification !== false">
                        <div v-for="message in notification.message">
                            {{ message }}
                        </div>
                    </v-alert>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </v-app>
        <v-footer app inset></v-footer>
        <form ref="logoutform" method="post" action="/logout"></form>
    </div>
</template>

<style lang="scss" scoped>
    .bottom-nav .icon {
        margin-bottom: 0;
    }
    .bottom-nav button[type="button"] {
        padding: 6px;
    }
</style>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        data: function() {
            return  {
                navvisible: null,
                showBottomLabels: false
            };
        },
        methods: {
            visitMenu: function(entry) {
                if (undefined != entry.href) {
                    window.location.href = entry.href;
                    return;
                }
                if (undefined != entry.route) {
                    this.$router.push({name: entry.route});
                    return;
                }
                if (undefined != entry.callback) {
                    if (entry.callback == 'logout') {
                        this.$refs.logoutform.submit();
                        return;
                    }
                    this.$store.commit(entry.callback, entry);
                }
            },
            visitFooterMenu: function(m) {
                this.visitMenu(m);
            }
        },
        computed: {
            active: function() {
                var navbarfooter = null;

                this.navbarfooter.forEach((n) => {
                    if (n.route !== undefined && n.route == this.$route.name) {
                        navbarfooter = this.$route.name;
                    }
                });

                return {navbarfooter};
            },
            navbarFiltered: function() {
                return this.navbar.filter((link) => {
                    return link.right == undefined || this.hasRight(link.right);
                });
            },
            bottomNavFiltered: function() {
                return this.navbarfooter.filter((link) => {
                    return link.right == undefined || this.hasRight(link.right);
                });
            },
            ...mapState(['toolbar', 'navbar', 'config', 'notification', 'navbarfooter', 'loaded'])
        },
        mounted: function() {
            var vm = this;

            Promise.all([
                vm.$store.dispatch('getuser'),
            ]).then((r) => {
                vm.$store.commit('setuser', r[0].data);
                vm.$store.commit('loaded', true);
            });
        }
    }
</script>
