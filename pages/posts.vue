<template>
  <v-row>
    <v-col
      v-for="post in posts"
      :key="post.id"
      cols="4">
      <post :post="post" />
    </v-col>
    <v-col cols="12">
      <infinite-loading
        spinner="spiral"
        @infinite="loadPosts" />
    </v-col>
  </v-row>
</template>

<script>
import { concat } from 'lodash'
import InfiniteLoading from 'vue-infinite-loading'
import Post from '../components/Post.vue'

export default {
  name: 'posts',
  components: {
    InfiniteLoading,
    Post
  },
  async asyncData (context) {
    const posts = await context.$axios.$get('https://gorest.co.in/public-api/posts')
    return { posts: posts.data, pagination: posts.meta.pagination }
  },
  methods: {
    loadPosts ($state) {
      if (this.page >= this.pagination.pages) {
        return
      }
      this.$axios.$get('https://gorest.co.in/public-api/posts', {
        params: {
          page: this.pagination.page + 1
        }
      }).then((response) => {
        if (response.data.length) {
          this.posts = concat(this.posts, response.data)
          this.pagination = response.meta.pagination
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .v-row {
   color: #fff;
 }
</style>
