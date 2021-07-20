<template>
  <v-row>
    <v-col
      class="text-center"
      cols="12">
      <v-textarea
        v-model="textarea"
        placeholder="Enter string"
        rows="3"
        @input="calculateOccurrence"/>
    </v-col>
    <v-col
      class="text-center"
      cols="12">
      <div v-if="characters.length">
        {{ characters.length > 1 ? 'The most occured characters are:' : 'The most occured character is:' }}
        <div
          v-for="(char, c) in characters"
          :key="c">
          <span
            v-for="(value, v) in char"
            :key="v">
            {{ ` ${v} for ${value} times` }}
          </span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
let i
let obj = {}

export default {
  name: 'codingChallege',
  data () {
    return {
      textarea: '',
      characters: []
    }
  },
  methods: {
    calculateOccurrence (value) {
      const string = value.replace(/\s+/g, '')
      if (string === '') {
        return
      }
      obj = {}
      for (i in string) {
        if (!Object.keys(obj).length || !Object.keys(obj).includes(string[i])) {
          obj[string[i]] = 1
        } else {
          obj[string[i]] = obj[string[i]] + 1
        }
      }
      this.findMax(obj)
    },
    findMax (obj) {
      let max = 0
      let items = []
      for (const o in obj) {
        if (obj[o] === max) {
          items.push({ [`${o}`]: obj[o] })
        }
        if (obj[o] > max) {
          items = []
          max = obj[o]
          items.push({ [`${o}`]: obj[o] })
        }
      }
      this.characters = items
    }
  }
}
</script>
