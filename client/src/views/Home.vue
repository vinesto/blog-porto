<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">List Articles</h1>

          <!-- Blog Post -->
          <router-view v-if="token" v-bind:token="token"></router-view>
              <list-article/>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Search Widget -->
          <search-article/>
          <!-- Categories Widget -->
          <list-category/>
          <!-- Side Widget -->
          <div class="card my-4" v-if="token" v-bind:token="token">
            <router-link to='/addArticle'>
            <h4 class="btn card-header title">Click here for Add Article</h4>
            </router-link>
          </div>

          <!-- Side Widget -->
          <my-article v-if="token"/>

        </div>

      </div>
      <!-- /.row -->

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ListCategory from '@/components/ListCategory.vue'
import ListArticle from '@/components/ListArticle.vue'
import SearchArticle from '@/components/SearchArticle.vue'
import MyArticle from '@/components/MyArticle.vue'
import AddArticle from '@/components/AddArticle.vue'

export default {
  props: ['token'],
  name: 'home',
  components: {
    HelloWorld,
    ListCategory,
    ListArticle,
    SearchArticle,
    MyArticle,
    AddArticle
  },
  data:function(){
    return{
      token:false
    }
  },
  // methods:{
  //   isLogin(){
  //     this.token = true
  //   },
  // },
  // watch:{
  //   token:function(){
  //   }
  // },
  // created() {
  //   let checkToken = localStorage.getItem("token")
  //   if(checkToken){
  //     this.token = true
  //   }else{
  //     this.token = false
  //   }
  // },
}
</script>
