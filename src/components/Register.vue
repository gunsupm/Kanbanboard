<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>

      <div>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>

      <button type="submit">Register</button>
    </form>
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
    const router = useRouter()

    /**
     * เมื่อกดปุ่ม Register
     */
    const handleRegister = () => {
      // สร้าง object ข้อมูลผู้ใช้
      const userData = {
        username: username.value,
        email: email.value,
        password: password.value
      }

      // บันทึกลง Local Storage
      localStorage.setItem('userData', JSON.stringify(userData))

      // เมื่อบันทึกแล้วให้ไปหน้า /login
      router.push('/login')
    }

    return {
      username,
      email,
      password,
      handleRegister
    }
  }
}
</script>
