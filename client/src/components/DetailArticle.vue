<template>
    <div class="card mb-4">
        <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
        <div class="card-body">
          
            <h2 class="card-title">{{article.title}}</h2>
            <p class="card-text">{{article.description}}</p>
            <p class="card-text">{{article.content}}</p>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Close</button>
            </router-link>
        </div>
        <div class="card-footer ">
            <div class="card">
                <div class="card-header">
                    Article Comment
                </div>
                <div class="card-body">
                  <ul>
                    <li v-for="(comment, index) in article.comment" :key="index"> {{comment.userName}} : {{comment.comment}}
                      <button v-if="user._id == comment.userId" type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" v-on:click="deleteComment(comment._id)">&times;</span>
                      </button>
                    </li>
                  </ul>
                </div>
            </div>  
            <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea class="form-control" rows="5" id="comment" v-model="inputComment"></textarea>
                <button class="btn btn-primary" type="submit" v-on:click="addComment">Add Comment</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailArticle",
  props: ["commprops","token"],
  data: function() {
    return {
      article: {},
      inputComment: "",
      isComment: ""
    };
  },
  methods: {
    getOneArticle() {
      let self = this;
      axios({
        method: "GET",
        url: `http://localhost:3000/articles/${this.$route.params.id}`
      })
        .then(function({ data }) {
          self.article = data.data;
        })
        .catch(function(err) {
          console.error(err.message);
        });
    },
    addComment() {
      let self = this;
      axios({
        method: "POST",
        url: `http://localhost:3000/comments/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          comment: this.inputComment
        }
      })
        .then(function(result) {
          self.isComment = result;
          self.inputComment = "";
          // self.$emit('add-comment', result)
        })
        .catch(function(err) {
          console.error(err.message);
        });
    },
    deleteComment(id){
      let self = this
      axios({
        method:"DELETE",
        url:`http://localhost:3000/comments/${this.$route.params.id}/${id}`,
        headers:{
          token:localStorage.getItem("token")
        }
      })
      .then(function(result){
        self.isComment = result
      })
      .catch(function(err){
        console.error(err.message);
      })
    },
    getUser(){
      console.log('masssuk get user');
      
      let self = this
      axios({
        method:"GET",
        url:`http://localhost:3000/users`,
        headers:{
          token:localStorage.getItem("token")
        }
      })
      .then(function({data}){
        // console.log(result,'resulttt');
        
        self.user = data.data

        console.log(self.user,'self userrrrrrrrrrr');
        

      })
      .catch(function(err){
        console.error(err.message);
      })
    }
  },
  created() {
    this.getOneArticle();
    this.getUser()
  },
  watch: {
    // commprops:function(newComm,oldComm){
    //   if(newComm){
    //     this.getOneArticle()
    //   }
    // },
    isComment: function() {
      this.getOneArticle();
    }
  }
};
</script>

<style>
</style>
