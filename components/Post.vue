<template>
  <v-card
    class="mx-auto"
    max-width="400">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px" />
    <v-card-title>
      {{ post.title }}
    </v-card-title>

    <v-card-subtitle
      v-if="user"
      class="font-italic pointer">
      <NuxtLink :to="{ name: 'userProfile', params: { user }}">
        {{ user.name }}
      </NuxtLink>
    </v-card-subtitle>
    <v-card-text>
      {{ post.body }}
    </v-card-text>

    <v-card-actions v-if="comments.length">
      <v-btn
        icon
        @click="expandedPost = !expandedPost">
        <v-icon>{{ expandedPost ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition v-if="comments.length">
      <div v-show="expandedPost">
        <v-divider />

        <v-list two-line>
          <v-list-item
            v-for="(comment, c) in comments"
            :key="c">
            <v-list-item-content class="d-sm-flex flex-row">
              <v-list-item-subtitle class="text-wrap">
                <span class="text--primary">{{ comment.name }} - </span>
                {{ comment.body }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      expandedPost: false,
      comments: [],
      user: {}
    }
  },
  async fetch () {
    const commentsRespone = await this.$axios.$get(`https://gorest.co.in/public-api/comments?post_id=${this.post.id}`)
    const userResponse = await this.$axios.$get(`https://gorest.co.in/public-api/users?id=${this.post.user_id}`)
    this.comments = commentsRespone.data
    this.user = userResponse.data[0]
  }
}
</script>
