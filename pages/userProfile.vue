<template>
  <v-row
    justify="center"
    align="center">
    <v-col
      v-if="user"
      cols="12">
      <v-card
        class="mx-auto"
        max-width="400">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px" />
        <v-card-title>
          {{ user.name }}
        </v-card-title>
        <v-card-subtitle>
          <span class="font-weight-medium">Gender:</span>
          <v-icon small>
            {{ user.gender === 'male' ? 'mdi-gender-male' : 'mdi-gender-female' }}
          </v-icon>
        </v-card-subtitle>
        <v-card-text>
          <span class="font-weight-medium">Email:</span>
          {{ user.email }}
        </v-card-text>
        <v-card-text class="d-sm-flex flex-row">
          <div class="font-weight-medium">
            Status:
          </div>
          <v-switch
            class="display-1"
            color="primary"
            readonly
            flat
            value
            :input-value="user.status === 'active'" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else>
      <div class="text--accent-1">
        User not found
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'userProfile',
  asyncData ({ params }) {
    const user = params.user || null
    return { user }
  }
}
</script>

<style scoped>
  .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
  }
</style>
