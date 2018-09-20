<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">Add Article</h2>
            <form onSubmit ="return false">
            <div class="form-group">
                <label for="validationDefault01">Title:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Article title" v-model="addTitle" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Description:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Article description" v-model="addDescription" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Content:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Article content" v-model="addContent" required>
            </div>
            <div class="form-group custom-file">
            <input type="file" class="custom-file-input" id="customFile">
            <label class="custom-file-label" for="customFile">Choose file</label>
            </div>                  
            <button class="btn btn-primary" type="submit" v-on:click="addArticle">Submit</button>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Cancel</button>
            </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ["articles","token"],
  name: "AddArticle",
  data: function() {
    return {
        newArticle:'',
        addTitle:'',
        addDescription:'',
        addContent:''
    };
  },
  methods:{
      addArticle(){
          let self = this
          axios({
              method:"POST",
              url:"http://localhost:3000/articles",
              headers:{
                  token:localStorage.getItem("token")
              },
              data:{
                  title:this.addTitle,
                  description:this.addDescription,
                  content:this.addContent
              }
          })
          .then(({data})=>{
              this.newArticle = data.data
              this.$router.push('/')
            //   this.$emit('new-article', this.newArticle)
          })
          .catch(function(err) {
              console.log(err);
          })
      }
  },
  created() {
    //   this.addArticle()
  }
};
</script>

<style>
</style>
