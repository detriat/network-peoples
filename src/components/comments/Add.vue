<template>
    <div class="add-comment">
        <form :action="action" method="post" @submit="addComment">
            <div class="form-group">
                <input type="text"
                       name="author"
                       class="form-control"
                       placeholder="Who are You?"
                       v-model="author"
                >
            </div>
            <div class="form-group">
                <textarea name="comment"
                          class="form-control"
                          placeholder="Your comment"
                          v-model="comment"
                ></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success">Send</button>
            </div>

            <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
                <span v-for="(error, index) in errors" :key="index">{{ error }} <br></span>
            </div>
        </form>

        <overlay-loader :visibility="showLoader"></overlay-loader>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import axios from 'axios';
import OverlayLoader from '../OverlayLoader';

export default {
  name: 'Add',
  data() {
    return {
      errors: [],
      author: '',
      comment: '',
      showLoader: false,
    };
  },
  props: {
    action: {
      type: String,
      required: true,
    },
    relatedField: {
      type: String,
      required: true,
    },
    parentId: {
      type: Number,
      required: true,
    },
  },
  components: {
    OverlayLoader,
  },
  computed: {
    ...mapState({
      //parentId: state => state.PostsStore.commentParentId,
    }),
  },
  methods: {
    addComment(e) {
      e.preventDefault();

      const statusValidate = this.validate();

      if (statusValidate) {
        this.showLoader = true;

        axios.post(this.action, {
          author: this.author,
          comment: this.comment,
          [this.relatedField]: parseInt(this.$route.params.id, 10),
          parentId: this.parentId,
          created_at: new Date(),
        })
          .then(res => {
            this.$emit('hideForm');

            this.comment = '';
            this.author = '';
            this.showLoader = false;

            return res.data;
          })
          .then(comment => this.pushComment(comment))
          .catch(error => console.log(error));
      }
    },
    validate() {
      this.errors = [];

      if (!this.author) {
        this.errors.push('Field Author is required');
      }

      if (!this.comment) {
        this.errors.push('Field Comment is required');
      }

      return !(this.errors.length > 0);
    },

    ...mapActions({
      pushComment: 'pushComment',
    }),
  },
};
</script>

<style lang="scss" scoped>
    .add-comment {
        margin: 30px 0;
    }
</style>
