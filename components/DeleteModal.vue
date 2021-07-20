<template>
  <v-row
    v-if="dialog"
    justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="350">
      <v-card>
        <v-card-title class="text-h5">
          Delete
        </v-card-title>

        <v-card-text>
          Are you sure you want delete {{ selectedApartment.title }} apartment?
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="blue darken-1"
            text
            @click="confirm('cancel')">
            Disagree
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            @click="confirm('confirm')">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'ConfiramtionDialog',
  computed: {
    dialog () {
      return this.$store.getters.confirmationModalDisplay
    },
    selectedApartment () {
      return this.$store.getters.selectedApartment
    }
  },
  methods: {
    confirm (action) {
      if (action === 'cancel') {
        this.$store.dispatch('setSelectedApartment')
        this.$store.dispatch('toggleConfirmationModal')
        return
      }
      this.$store.dispatch('deleteApartment')
      this.$store.dispatch('toggleConfirmationModal')
    }
  }
}
</script>
