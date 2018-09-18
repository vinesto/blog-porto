<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">Add Article</h2>
            <form>
            <div class="form-group">
                <label for="validationDefault01">Title:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Article title" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Description:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Article description" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Content:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Article content" required>
            </div>
            <!-- <div class="form-group custom-file">
            <input type="file" class="custom-file-input" id="customFile">
            <label class="custom-file-label" for="customFile">Choose file</label>
            </div>                   -->
            <button class="btn btn-primary" type="submit">Submit</button>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Cancel</button>
            </router-link>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  props: ["token"],
  name: "AddArticle",
  data: function() {
    return {};
  },
  watch: {},
  created() {}
};
</script>

<style>
</style>
