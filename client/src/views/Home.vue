<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">List Articles</h1>

          <!-- Blog Post -->
          <router-view v-if="tokenHome" v-bind:token="tokenHome" v-on:new-article="getNewArticle"></router-view>
              <list-article :test="newArticle"/>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Search Widget -->
          <search-article/>
          <!-- Categories Widget -->
          <list-category/>
          <!-- Side Widget -->
          <div class="card my-4" v-if="tokenHome" v-bind:token="tokenHome">
            <router-link to='/addArticle' >
              <h4 class="btn card-header title">Click here for Add Article</h4>
            </router-link>
          </div>

          <!-- Side Widget -->
          <my-article v-if="tokenHome" v-bind:articles="articles" v-bind:newArticle="newArticle" v-bind:token="tokenHome"/>

        </div>

      </div>
      <!-- /.row -->

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ListCategory from "@/components/ListCategory.vue";
import ListArticle from "@/components/ListArticle.vue";
import SearchArticle from "@/components/SearchArticle.vue";
import MyArticle from "@/components/MyArticle.vue";
import AddArticle from "@/components/AddArticle.vue";

export default {
  props: ["tokenfromapp", "test"],
  name: "home",
  components: {
    HelloWorld,
    ListCategory,
    ListArticle,
    SearchArticle,
    MyArticle,
    AddArticle
  },
  data: function() {
    return {
      tokenHome: false,
      articles:'',
      // myArticles:'',
      newArticle: "",
      fetchData: false
    };
  },
  methods: {
    getNewArticle(value) {
      this.newArticle = value;
      // this.fetchData = true
    }
  },
  watch: {
    test: function(newtest, oldtest) {
      if (newtest) {
        console.log("masuuuk watch test", this.test);
      } else {
        console.log("masuuk old test", this.test);
      }
    },
    tokenfromapp:function(newtoken,oldtoken){
      console.log(this.tokenfromapp,'masuk ke home watch tokenfromapp');
      
      if(newtoken){
        this.tokenHome = true
      }else if(oldtoken){
        this.tokenHome = false
      }
    }
  },
  created() {
    let checkToken = localStorage.getItem("token")
    if(checkToken){
      this.tokenHome = true
    }else{
      this.tokenHome = false
    }
    // this.getNewArticle()
  }
};
</script>
