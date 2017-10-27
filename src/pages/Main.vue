<template>
  <v-app toolbar>
    <v-navigation-drawer absolute persistent light enable-resize-watcher
                         :mini-variant.sync="miniVariant"
                         :clipped="clipped"
                         v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar v-if="profile">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{profile.last_name}} {{profile.first_name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="miniVariant = !miniVariant" class="wsl-hide-xs">
                <v-icon>icon-chevron-left</v-icon>
                <!--<span class="icon-chevron-left"></span>-->
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.route">
          <v-list-tile-action>
            <!--<span class="icon-chevron-right"></span>-->
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <a class="wsl-st4 wsl-white wsl-hover" @click="logout" data-wenk="Выход" data-wenk-pos="left">
              <span class="icon-exit"></span>
            </a>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed class="light-blue darken-1" dark :clipped-left="clipped">
      <span @click.stop="drawer = !drawer" class="icon-menu wsl-st4"></span>
      <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>


    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
              <img src="/static/v.png" alt="Vuetify.js" class="mb-5">
              <blockquote>
                &#8220;First, solve the problem. Then, write the code.&#8221;
                <footer>
                  <small>
                    <em>&mdash;John Johnson</em>
                  </small>
                </footer>
              </blockquote>

              <router-view></router-view>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
         // { title: 'Inspire', route: '/', icon: 'bubble_chart' },
          { title: 'Home', route: 'home', icon: 'icon-home' },
          { title: 'About', route: 'test', icon: 'icon-question' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
      };
    },
    computed: {
      ...mapState(['authorized']),
      ...mapState({ profile: state => state.user.profile }),
      ...mapGetters(['userID']),
    },
    watch: {
      authorized(value) {
        // eslint-disable-next-line
        console.log('auth', value);
        if (!value) {
          this.$router.push('/login');
        }
      },
    },
    methods: {
      ...mapActions({
        getProfile: 'user/get',
        logout: 'logout',
      }),
    },
    beforeRouteEnter(to, from, next) {
      if (from.matched.some(r => r.meta.guest)) {
        next();
      } else {
        next((vm) => {
          vm.getProfile(vm.userID);
        });
      }
    },
  };
</script>

<style lang="stylus">
  @import '../stylus/main';
</style>
