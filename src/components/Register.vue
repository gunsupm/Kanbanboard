<template>
  <div class="Page">
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" required />
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required />
        </div>


        <div class="input-group password-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
        
            <input 
              id="password" :type="showPassword ? 'text' : 'password'" v-model="password" 
              placeholder="Enter your password" required/>
              <button 
              type="button" @click.prevent="togglePassword" class="toggle-password">
              <img 
                class="eye-icon" 
                src="../assets/pic/eyeicon.png" 
                alt="Eye Icon"
              />
            </button>
          </div>
        </div>

        <p class="login-text">
          have an account?
          <router-link to="/" class="login-link">
            Login
          </router-link>
        </p>

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {

    
    const username = ref('')
    const email = ref('')
    const password = ref('')

    const showPassword = ref(false)

    const router = useRouter()

    //Show Or Hide Password
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    //register button
    const handleRegister = () => {
      const userData = {
        username: username.value,
        email: email.value,
        password: password.value
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      router.push('/')
    }

    return {
      username,
      email,
      password,
      showPassword,    
      togglePassword,  
      handleRegister
    }
  }
}
</script>

<style >
.Page {

  background-color: #E4E4E4; 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;  
  align-items: center;     
  font-family: sans-serif;
}

.register {
  width: 400px;
  height: 400px;
  text-align: center;
  align-items: center;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ff0000;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.register h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.4rem;
  color: #333;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ff0000;
  border-radius: 3px;
  outline: none;
  font-size: 1rem;
}

.input-group input:focus {
  border-color: #ff4444;
}


.password-group {
  position: relative;
}


.password-wrapper {
  display: flex;
  align-items: center;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
}

.eye-icon {
  width: 20px;
  height: 20px;
}

.login-text {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
}

.login-link {
  color: #ef4444;
  font-weight: bold;
  text-decoration: none;
}

.register button[type="submit"] {
  width: 100%;
  padding: 0.6rem;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;
}

.register button[type="submit"]:hover {
  background-color: #cc0000;
}
</style>
