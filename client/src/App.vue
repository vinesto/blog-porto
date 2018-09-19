<template>
  <div id="app">
    <div id="nav">
      <nav-bar v-on:check-token="isLogin"/>
    </div>
    <router-view v-bind:tokenfromapp="tokenApp"/>
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
      tokenApp: false,
    };
  },
  methods: {
    isLogin(value) {
      console.log(value,'masuuk app islogin');
      
      this.tokenApp = value;
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
