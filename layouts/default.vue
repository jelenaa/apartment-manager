<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary>
      <v-list
        nav
        dense>
        <v-list-item-group
          active-class="blue darken-1">
          <v-list-item>
            <NuxtLink to="/">
              <v-list-item-icon>
                <v-icon>mdi-home-city-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Simple Apartment Manager</v-list-item-title>
            </NuxtLink>
          </v-list-item>

          <v-list-item>
            <NuxtLink to="/codingChallenge">
              <v-list-item-icon>
                <v-icon>mdi-code-tags</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Coding Challenge</v-list-item-title>
            </NuxtLink>
          </v-list-item>

          <v-list-item>
            <NuxtLink to="/posts">
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Post review App</v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue darken-1"
      dark>
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title>Port 8</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="scss">
  .v-application {
    a {
      color: inherit !important;
      text-decoration: none;
      display: flex;
    }

    .pointer {
      cursor: pointer;
    }
  }
</style>
