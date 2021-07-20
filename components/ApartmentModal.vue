<template>
  <v-row
    justify="center"
    align="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Apartment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="formValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="apartment.title"
                    label="Title"
                    :rules="[v => !!v || 'Title is required']"
                    clearable />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="apartment.state"
                    :items="stateItems"
                    item-text="title"
                    item-value="value"
                    :rules="[v => !!v || 'State is required']"
                    label="State" />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="apartment.area"
                    label="Area"
                    :rules="integerRules('Area')" />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="apartment.rooms"
                    :rules="floatRules"
                    label="Rooms" />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="apartment.lift"
                    label="Lift" />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="apartment.adress"
                    :rules="[v => !!v || 'Address is required']"
                    label="Address" />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="apartment.rentalgross"
                    label="Rental gross"
                    :rules="integerRules('Rental gross')" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="close">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="confirm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { includes, indexOf, assign } from 'lodash'

export default {
  name: 'ApartmentModal',
  data () {
    return {
      apartment: {
        title: '',
        state: '',
        area: null,
        rooms: null,
        lift: false,
        building: {
          adress: ''
        },
        rentalgross: null
      },
      stateItems: [
        {
          title: 'Active',
          value: 'active'
        },
        {
          title: 'Assigned',
          value: 'assigned'
        },
        {
          title: 'Inactive',
          value: 'inactive'
        },
        {
          title: 'Reserved',
          value: 'reserved'
        },
        {
          title: 'Vacant',
          value: 'vacant'
        }],
      formValid: true,
      integerRules: (fieldName = '') => {
        return [
          v => (v !== '' || v !== null) || `${fieldName} is required`,
          v => /^[0-9]+$/.test(v) || `${fieldName} must be integer`
        ]
      },
      floatRules: [
        v => (v !== '' || v !== null) || 'Rooms is required',
        v => /^[+-]?\d+(\.\d+)?$/.test(v) || 'Rooms must be number'
      ],
      title: ''
    }
  },
  computed: {
    dialog () {
      return this.$store.getters.apartmentModalDisplay
    },
    selectedApartment () {
      return this.$store.getters.selectedApartment
    },
    apartments () {
      return this.$store.getters.apartments
    }
  },
  mounted () {
    if (includes(this.apartments, this.selectedApartment)) {
      this.apartment = assign({}, this.selectedApartment, { adress: this.selectedApartment.building.adress })
    }
  },
  beforeDestroy () {
    this.clear()
  },
  methods: {
    close () {
      this.$refs.form.reset()
      this.$store.dispatch('toggleApartmentDialog')
    },
    confirm () {
      this.$refs.form.validate()
      if (!this.formValid) {
        return
      }
      if (!includes(this.apartments, this.selectedApartment)) {
        this.$store.dispatch('toggleApartmentDialog')
        this.$store.dispatch('addApartment', assign({}, this.apartment, { building: { adress: this.apartment.adress } }))
        return
      }
      this.$store.dispatch('toggleApartmentDialog')
      const index = indexOf(this.apartments, this.selectedApartment)
      this.$store.dispatch('editApartment', { index, apartment: this.apartment })
    },
    clear () {
      this.apartment = {
        title: '',
        state: '',
        area: null,
        rooms: null,
        lift: false,
        adress: '',
        rentalgross: null
      }
      this.$store.dispatch('setSelectedApartment')
    }
  }
}
</script>
