<template>
  <div id="app">
    <div id="nav">
      <nav-bar v-on:check-token="token=$event" v-on:change="isLogin"/>
    </div>
    <router-view v-bind:token="token"/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/views/Footer.vue";
export default {
  name: "app",
  components: {
    NavBar,
    Footer
  },
  data: function() {
    return {
      token: false,
      
    };
  },
  methods: {
    isLogin() {
      this.token = true;
    }
  },
  created() {
    let checkToken = localStorage.getItem("token");
    if (checkToken) {
      this.token = true;
    } else {
      this.token = false;
    } 
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
