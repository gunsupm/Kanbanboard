<template>
  <div class="Page">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" placeholder="Enter your username" required />
        </div>

        <div class="input-group password-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input 
              id="password"
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Enter your password" 
              required
            />
            <button 
              type="button" 
              @click.prevent="togglePassword" 
              class="toggle-password"
            >
              <img 
                class="eye-icon" 
                src="../assets/pic/eyeicon.png" 
                alt="Eye Icon"
              />
            </button>
          </div>
        </div>

        <p class="register-text">
          Don't have an account?
          <router-link to="/regis" class="register-link">
            Register
          </router-link>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const router = useRouter()

    // สลับสถานะแสดง/ซ่อน password
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    // ฟังก์ชันเมื่อกดปุ่ม Login
    const handleLogin = () => {
      // ดึงข้อมูลผู้ใช้จาก Local Storage
      const storedUser = localStorage.getItem('userData')
      if (!storedUser) {
        alert('ไม่พบข้อมูลผู้ใช้ กรุณาลงทะเบียนก่อน')
        return
      }

      const parsedUser = JSON.parse(storedUser)

      // ตรวจสอบข้อมูลผู้ใช้
      if (
        parsedUser.username === username.value &&
        parsedUser.password === password.value
      ) {
        alert('Login สำเร็จ!')
        router.push('/')
      } else {
        alert('Login ไม่สำเร็จ Username หรือ Password ไม่ถูกต้อง')
      }
    }

    return {
      username,
      password,
      showPassword,
      togglePassword,
      handleLogin
    }
  }
}
</script>

<style scoped>
.Page {
  background-color: #E4E4E4; 
  width: 100vw;       /* ครอบคลุมความกว้างของ viewport */
  height: 100vh;      /* ครอบคลุมความสูงของ viewport */
  display: flex;
  justify-content: center;  
  align-items: center;     
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}


.login {

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

.login h2 {
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

.register-text {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
}

.register-link {
  color: #ef4444;
  font-weight: bold;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.login button[type="submit"] {
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

.login button[type="submit"]:hover {
  background-color: #cc0000;
}
</style>
