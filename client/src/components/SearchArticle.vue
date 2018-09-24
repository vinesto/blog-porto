<template>
    <div class="card my-4">
        <h5 class="card-header">Search</h5>
        <div class="card-body">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for title..." v-model="search">
                <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["datasearch", "datastatus"],
  data() {
    return {
      search: "",
      temp: ""
    };
  },
  watch: {
    search: function(newData, oldData) {

      if (newData) {
        let articles = [];
        this.datasearch.forEach(element => {
          if (element.title.toLowerCase().indexOf(newData.toLowerCase()) > -1) {
            articles.push(element);
          }
        });
        this.temp = articles;
        this.$emit("data-after-search", this.temp);
      } else if (oldData) {
        let articles = [];
        this.datasearch.forEach(element => {
            articles.push(element)
        });
        this.temp = articles;
        this.$emit("data-after-search", this.temp);
      }
    }
  }
};
</script>

<style>
</style>
