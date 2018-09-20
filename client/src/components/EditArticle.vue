<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">Edit Article</h2>
            <form onSubmit ="return false">
            <div class="form-group">
                <label for="validationDefault01">Title:</label>
                <input type="text" class="form-control" id="validationDefault01"  v-model="article.title" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Description:</label>
                <input type="text" class="form-control" id="validationDefault01" v-model="article.description" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Content:</label>
                <input type="text" class="form-control" id="validationDefault01" v-model="article.content" required>
            </div>
            <div class="form-group custom-file">
            <input type="file" class="custom-file-input" id="customFile">
            <label class="custom-file-label" for="customFile">Choose file</label>
            </div>                  
            <button class="btn btn-primary" type="submit" v-on:click="updateArticle">Submit</button>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Cancel</button>
            </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditArticle",
  data: function() {
    return {
      article: {}
    };
  },
  methods: {
    getOneArticle() {
        console.log('masuuk');
        
      let self = this;
      axios({
        method: "GET",
        url: `http://localhost:3000/articles/${this.$route.params.id}`,
      })
        .then(function({ data }) {
            console.log(data,'0000');
          self.article = data.data;
        })
        .catch(function(err) {
          console.log(err.message);
        });
    },
    updateArticle() {
      let self = this;
      axios({
        method: "PUT",
        url: `http://localhost:3000/articles/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title: this.article.title,
          description: this.article.description,
          content: this.article.content
        }
      })
        .then(function(result) {
            self.$router.push('/')
        })
        .catch(function(err) {
            console.log(err.message);
        });
    },
  },
  created() {
      this.getOneArticle()
  },
};
</script>

<style>
</style>
