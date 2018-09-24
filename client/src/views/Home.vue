<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">List Articles</h1>

          <!-- Blog Post -->
          <router-view v-if="tokenHome" v-bind:token="tokenHome" ></router-view>
              <list-article v-bind:propsarticle="listArticle" v-bind:delprops="checkDelete" @data-allarticle="dataallarticles=$event" :resultsearch="getarticles"/>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Search Widget -->
          <search-article :datasearch="dataallarticles" :datastatus="status" v-on:data-after-search="getarticles=$event"/>
          <!-- Side Widget -->
          <div class="card my-4" v-if="tokenHome" v-bind:token="tokenHome">
            <router-link to='/addArticle' >
              <h4 class="btn card-header title">Click here for Add Article</h4>
            </router-link>
          </div>

          <!-- Side Widget -->
          <my-article v-if="tokenHome" v-bind:token="tokenHome" v-bind:propsarticle="listArticle" v-on:delete-article="getDelete" v-bind:edit-article="getEditArticle"/>

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
      // articles:'',
      editArticle:"",
      newArticle: "",
      fetchData: false,
      listArticle: false,
      deleteArticle: '',
      checkDelete:false,
      commentArticle:'',
      checkComment:false,
      status:false,
      dataallarticles:'',
      getarticles:''
    };
  },
  methods: {
    getNewArticle(value) {
      this.newArticle = value;
      // this.fetchData = true
    },
    getDelete(value){
      this.deleteArticle = value
    },
    getEditArticle(value){
      this.editArticle = value
      console.log(this.editArticles,'aaaaa');
    },
    getCommentArticle(value){
      this.commentArticle = value
    }
  },
  watch: {
    "$route"(to, from){
      this.listArticle = to
    },
    tokenfromapp:function(newtoken,oldtoken){
      if(newtoken){
        this.tokenHome = true
      }else if(oldtoken){
        this.tokenHome = false
      }
    },
    deleteArticle:function(){
      if(this.checkDelete){
        this.checkDelete = false
      }else{
        this.checkDelete = true
      }
    },
    commentArticle:function(){
      if(this.checkComment){
        this.checkComment = false
      }else{
        this.checkComment = true
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
  }
};
</script>
