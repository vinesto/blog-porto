<template>
<div>
    <div class="card mb-4" v-for="(article, index) in articles" :key="index">
        <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title">{{article.title}}</h2>
            <p class="card-text">{{article.description}}</p>
            <router-link :to="`/article/${article._id}`">
                <a class="btn btn-primary text-white">Read More &rarr;</a>
            </router-link>
        </div>
        <div class="card-footer text-muted">
            Posted on {{convertDate(article.createdAt)}} by
            <a href="#">{{article.authorId.name}}</a>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "ListArticle",
  data: function() {
    return {
      articles: [],
      fetchData: false
    };
  },
  props: ["token", "propsarticle", "delprops", "resultsearch"],
  methods: {
    getAllArticles() {
      let self = this;
      axios({
        method: "GET",
        url: "http://localhost:3000/articles"
      })
        .then(function({ data }) {
          self.articles = data.data;
          self.$emit("data-allarticle", self.articles);
        })
        .catch(function(err) {
          console.log(err.message);
        });
    },
    convertDate(input) {
      return moment(input).format("MMMM Do YYYY");
    }
  },
  created() {
    this.getAllArticles();
  },
  watch: {
    propsarticle: function(newList, oldList) {
      if (newList) {
        this.getAllArticles();
      }
    },
    delprops: function() {
      this.getAllArticles();
    },
    resultsearch: function(newData, oldData) {
      if (newData) {
        this.articles = newData;
      } else {
        this.articles = oldData
      }
    },
  }
};
</script>

<style>
</style>
