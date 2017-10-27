<template>
  <v-app light>
    <div>
      <v-progress-linear v-bind:indeterminate="true" v-show="loading"></v-progress-linear>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">ЭнергкоКабинет</h3>
            <h4>Вход</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form @submit="submit" name="form">
            <v-text-field
              v-model="login"
              label="Логин"
              name="email"
              id="email"
              :counter="20"
              :error-messages="errors.collect('login')"
              :disabled="loading"
              v-validate="'required|max:20'"
              data-vv-delay="3000"
              data-vv-name="login"
              data-vv-as="логин"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Пароль"
              name="password"
              id="password"
              type="password"
              :error-messages="errors.collect('password')"
              :disabled="loading"
              v-validate="'required|min:5'"
              data-vv-delay="3000"
              data-vv-name="password"
              data-vv-as="пароль"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green" @click="submit">Войти</v-btn>
          <v-btn flat color="orange" @click="clear">Очистить</v-btn>
        </v-card-actions>
        <v-snackbar
          :timeout="4000"
          :bottom="true"
          :right="true"
          :multi-line="true"
          v-model="snackbar"
        >
          {{ async_error || error }}
          <v-btn flat color="pink" @click.native="snackbar = false">Закрыть</v-btn>
        </v-snackbar>
      </v-card>
    </div>
  </v-app>
</template>

<script>
  import russian from 'vee-validate/dist/locale/ru';
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        login: '',
        password: '',
        loading: false,
        snackbar: false,
        error: '',
      };
    },
    computed: {
      ...mapState({
        async_error: 'error_message',
      }),
      ...mapState(['authorized']),
      ...mapGetters(['userID']),
    },
    watch: {
      authorized(value) {
        // eslint-disable-next-line
        console.log('auth', value);
        this.loading = false;
        this.$router.push('/');
      },
      async_error(value) {
        this.snackbar = value !== '';
        this.loading = false;
      },
    },
    methods: {
      ...mapActions({
        authorize: 'login',
        getProfile: 'user/get',
      }),
      submit() {
        this.error = '';
        this.$validator.validateAll({
          login: this.login,
          password: this.password,
        })
          .then((formValid) => {
            if (formValid) {
              // eslint-disable-next-line
              console.log('All is well');
              this.loading = true;
              this.authorize({ login: this.login, password: this.password });
              /* .then((res) => {
                // eslint-disable-next-line no-console
                console.log('res', res);
                this.loading = false;
                this.$router.push('/');
              })
              .catch((e) => {
                this.snackbar = true;
// eslint-disable-next-line no-console
                console.error(e);
              }); */
              return;
            }
            this.error = 'Заполните правильно форму авторизации';
            this.snackbar = true;
          });
      },
      clear() {
        this.login = '';
        this.password = '';
        this.error = '';
        this.$validator.reset();
      },
    },
    created() {
      this.$validator.localize('ru', {
        messages: russian.messages,
      });
    },
    beforeRouteLeave(to, from, next) {
      const authRequired = to.matched.some(r => r.meta.auth);
      const authed = this.authorized;
      if (authed && authRequired) {
        return this.getProfile(this.userID)
          .then(() => next());
      }
      return next();
    },
  };
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>
