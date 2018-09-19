<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link to="/">
        <a class="navbar-brand text-white" href="#"><i class="fas fa-newspaper"></i></a>
        </router-link>
        <a class="navbar-brand text-white" href="#">Blog</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">
                <router-link class="text-white" to="/">Home</router-link>
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link ">
                <router-link class="text-white" to="/about">About</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="!token">
              <div class="dropdown">
                <button class="btn bg-transparent dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Login
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <!-- loginform -->
                  <form class="px-4 py-3" onSubmit="return false">
                    <div class="form-group">
                      <label for="exampleDropdownFormEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="loginEmail" required>
                    </div>
                    <div class="form-group">
                      <label for="exampleDropdownFormPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="loginPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="login">Sign in</button>
                  </form>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">New around here? Sign up</a>
            <!-- loginform -->
                </div>
              </div>
            </li>

            <li class="nav-item" v-if="!token">
              <div class="dropdown">
                <button class="btn bg-transparent dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Register
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <!-- loginform -->
                  <form class="px-4 py-3">
                    <div class="form-group">
                      <label for="exampleDropdownFormEmail1">Name</label>
                      <input type="email" class="form-control" placeholder="name">
                    </div>
                    <div class="form-group">
                      <label for="exampleDropdownFormEmail1">Email address</label>
                      <input type="email" class="form-control" placeholder="email@example.com">
                    </div>
                    <div class="form-group">
                      <label for="exampleDropdownFormPassword1">Password</label>
                      <input type="password" class="form-control" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary">Sign up</button>
                  </form>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">New around here? Sign up</a>
                  <a class="dropdown-item" href="#">Forgot password?</a>
            <!-- loginform -->
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="token">
              <a  class="btn nav-link text-white" v-on:click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
  data:function() {
    return{
      token:false,
      loginEmail:'',
      loginPassword:'',
      registerName:'',
      registerEmail:'',
      registerPassword:'',
      message:'',
      arrMessages:[],
      isLogin:false,
      isLogout:false,
    }
  },
  methods:{
    login(){
      let self = this
      axios({
        method:"POST",
        url:"http://localhost:3000/users/login",
        data:{
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
      .then(function({data}){
        console.log(data);
        self.message = 'Login success'
        localStorage.setItem("token", data.token)
        self.isLogin = true
        self.loginEmail = ''
        self.loginPassword = ''
      })
      .catch(function(err){
        console.log(err,'.......');
        self.message = 'Login failed'
      })
    },
    register(){
      let self = this
      axios({
        method:"POST",
        url:"http://localhost:3000/users/register",
        data:{
          name:this.registerName,
          email:this.registerEmail,
          password:this.registerPassword
        }
      })
      .then(function(result){
        console.log(result);
        self.message = "Register Success"
        self.registerName = ''
        self.registerEmail = ''
        self.registerPassword = ''
      })
      .catch(function(err){
        self.message = "Register Failed"
        console.log(err);
      })
    },
    logout(){
      console.log('masuuk logout')
      // this.isLogout = true
      this.isLogin = false
      localStorage.clear()
    }
  },
  created(){
    let checkToken = localStorage.getItem("token")
    if(checkToken){
      this.token = true
    }
  },
  watch:{
    isLogin:function(newLogin,oldLogin){
      if(newLogin){
        this.token = true
        this.$emit('check-token',this.token)
        // console.log('sssss',newLogin);
      }else if(oldLogin){
        this.token = false
        this.$emit('check-token',this.token)
      }
    },
    // isLogout:function(newLogout,oldLogout){
    //   if(newLogout){
    //     this.token = false
    //     this.$emit('check-token',this.token)
    //   }
    // }
  }
};
</script>

<style>
</style>
