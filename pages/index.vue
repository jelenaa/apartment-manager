<template>
  <v-row
    no-gutters
    justify="center"
    align="center">
    <v-col cols="12">
      <v-menu
        left
        bottom
        :close-on-content-click="closeOnContentClick">
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            large
            dark
            fixed
            right
            class="blue darken-1"
            v-bind="attrs"
            v-on="on">
            <v-icon color="darken-2">
              mdi-cog
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-subheader>Reorder table</v-subheader>
          <draggable v-model="headers">
            <v-list-item
              v-for="(item, index) in headers"
              :key="index"
              class="pointer">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </draggable>
        </v-list>
      </v-menu>
    </v-col>
    <v-col cols="12">
      <table>
        <thead>
          <tr class="grey--text text--darken-1">
            <th
              v-for="item in headers"
              :key="item.value"
              class="text-left">
              {{ item.name }}
            </th>
            <th colspan="3" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(apartment, i) in apartments"
            :key="i"
            class="text--primary">
            <td
              v-for="item in headers"
              :key="item.value">
              <span v-if="item.value === 'adress'">
                {{ apartment.building[item.value] }}
              </span>
              <span v-else-if="item.value === 'lift'">
                <v-icon
                  :class="[apartment[item.value] ? 'green--text' : 'red--text']"
                  color="darken-2">
                  {{ apartment[item.value] ? 'mdi-check' : 'mdi-close' }}
                </v-icon>
              </span>
              <span v-else>
                {{ apartment[item.value] }}
              </span>
            </td>
            <td
              class="icon"
              @click="deleteApartment(apartment)">
              <v-icon color="darken-2">
                mdi-delete
              </v-icon>
            </td>
            <td class="icon" @click="openDialog(apartment)">
              <v-icon color="darken-2">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </tbody>
      </table>
      <v-btn
        fab
        large
        dark
        fixed
        bottom
        right
        class="blue darken-1"
        @click="openDialog">
        <v-icon color="darken-2">
          mdi-plus
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <delete-modal v-if="confirmationModalDisplay" />
      <apartment-modal v-if="apartmentModalDisplay" />
    </v-col>
  </v-row>
</template>
<script>
import draggable from 'vuedraggable'
import DeleteModal from '../components/DeleteModal.vue'
import ApartmentModal from '../components/ApartmentModal.vue'

export default {
  components: { DeleteModal, ApartmentModal, draggable },
  async asyncData (context) {
    const apartments = await context.$axios.$get('https://demo.api.melon.rent/api/objects/')
    context.store.dispatch('setApartments', apartments)
  },
  data () {
    return {
      headers: [
        {
          name: 'Title',
          value: 'title'
        },
        {
          name: 'State',
          value: 'state'
        },
        {
          name: 'Area',
          value: 'area'
        },
        {
          name: 'Rooms',
          value: 'rooms'
        },
        {
          name: 'Lift',
          value: 'lift'
        },
        {
          name: 'Address',
          value: 'adress'
        },
        {
          name: 'Rental gross',
          value: 'rentalgross'
        }
      ],
      closeOnContentClick: false
    }
  },
  computed: {
    apartments () {
      return this.$store.getters.apartments
    },
    apartmentModalDisplay () {
      return this.$store.getters.apartmentModalDisplay
    },
    confirmationModalDisplay () {
      return this.$store.getters.confirmationModalDisplay
    }
  },
  methods: {
    openDialog (apartment) {
      if (apartment) {
        this.$store.dispatch('setSelectedApartment', apartment)
      }
      this.$store.dispatch('toggleApartmentDialog')
    },
    deleteApartment (apartment) {
      this.$store.dispatch('setSelectedApartment', apartment)
      this.$store.dispatch('toggleConfirmationModal')
    }
  }
}
</script>
<style lang="scss">
  .v-card {
    width: 100%;
  }

  table {
    background-color: #1E1E1E;
    padding: 8px;
    width: 100%;

    .icon {
      padding: 8px;
      cursor: pointer;
    }

    tr {
      td:nth-of-type(1), td:nth-of-type(2), th:nth-of-type(1), th:nth-of-type(2) {
        width: 15%;
      }
      td:nth-of-type(6), th:nth-of-type(6) {
        width: 20%;
      }
      td:nth-of-type(3), td:nth-of-type(4), td:nth-of-type(5), td:nth-of-type(7),
      th:nth-of-type(3), th:nth-of-type(4), th:nth-of-type(5), th:nth-of-type(7) {
        width: 10%;
      }
    }
  }
</style>
