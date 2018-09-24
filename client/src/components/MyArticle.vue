<template>
    <div class="card my-4">
        <h5 class="card-header">My Article</h5>
        <div class="card-body-fluid table-responsive">
            <table class="table table-bordered" style="width:"> 
            <thead class="thead-dark">
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(article, index) in myArticles" :key="index">
                <td>{{article.title}}</td>
                <td>
                    <router-link :to="`/edit/article/${article._id}`">
                        <a>Edit </a>
                    </router-link>
                    <!-- <router-link :to="`/myarticle/delete/article/${article._id}`"> -->
                        <div class="btn" v-on:click="deleteArticle(article._id)">Delete</div>
                    <!-- </router-link> -->
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import EditArticle from "@/components/EditArticle.vue";

export default {
  props: ["token","propsarticle","delprops"],
  name: "MyArticle",
  data: function() {
    return {
      myArticles: "",
      message: "",
      article:{},
      isDelete:''
    };
  },
  methods: {
    getMyArticle() {
      let self = this;
      axios({
        method: "GET",
        url: "http://localhost:3000/articles/user",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function({ data }) {
          self.myArticles = data.data;
        //   self.$emit('my-article', self.myArticles)
        })
        .catch(function(err) {
          console.log(err.message);
        });
    },
    deleteArticle(id) {
      let self = this;
      axios({
        method: "DELETE",
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function(result) {
          self.message = "delete success";
          console.log("delete success");
          self.isDelete = result
          self.$emit('delete-article', result)
        })
        .catch(function(err) {
          console.log(err.message);
          self.message = "delete failed";
        });
    },
    convertDate(input) {
      return moment(input).format("MMMM Do YYYY");
    }
  },
  watch: {
      propsarticle:function(newList,oldList){
          if(newList){
              this.getMyArticle()
          }
      },
      isDelete:function(){
        this.getMyArticle()
      }
  },
  created() {
    this.getMyArticle();
  }
};
</script>

<style>
</style>
