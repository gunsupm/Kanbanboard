<template>
    <div class="login-container">
      <div class="login-box">
        <!-- ไอคอน และ หัวข้อ -->
        <div class="header">
          <UserIcon class="icon" />
          <h2>Login</h2> 
        </div>
  
        <!-- Username -->
        <div class="input-group">
          <label>Username</label>
          <input type="text" v-model="username" placeholder="Enter your username" />
        </div>
  
        <!-- Password -->
        <div class="input-group password-group">
          <label>Password</label>
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter your password" />
          <button @click="togglePassword" class="toggle-password"> <img class="eye-icon" src="../assets/pic/eyeicon.png" alt="Eye Icon">
          </button>
        </div>
  
        <!-- ปุ่ม Login -->
        <button @click="handleLogin" class="login-btn">Login</button>
  
        <!-- ลิงก์ Register -->
        <p class="register-text">
          Don't have an account?
          <router-link to="/regis" class="register-link">
          Register
        </router-link> 
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' 
  
  // ตัวแปรแบบ reactive
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  
  // ประกาศตัวแปร router
  const router = useRouter()
  
  // ฟังก์ชันแสดง/ซ่อนรหัสผ่าน
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  // ฟังก์ชัน login
  const handleLogin = () => {
    // ดึงข้อมูลผู้ใช้จาก Local Storage
    const storedUser = localStorage.getItem('userData')
    if (!storedUser) {
      alert('ยังไม่มีข้อมูลผู้ใช้ กรุณา Register ก่อน')
      return
    }
  
    const parsedUser = JSON.parse(storedUser)
  
    // ตรวจสอบ username และ password ตรงกันหรือไม่
    if (
      parsedUser.username === username.value &&
      parsedUser.password === password.value
    ) {
      alert('Login สำเร็จ!')
      // Redirect ไปหน้าอื่น
      router.push('/')
    } else {
      alert('Login ไม่สำเร็จ Username หรือ Password ไม่ถูกต้อง')
    }
  }
  </script>
  
  <style scoped>
  /* ตั้งค่าพื้นหลังและจัดกึ่งกลาง */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  /* กล่อง Login */
  .login-box {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #3b82f6;
    width: 350px;
    text-align: center;
  }
  
  /* ส่วนหัว */
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .icon {
    width: 40px;
    height: 40px;
    color: #ef4444;
  }
  
  h2 {
    color: #ef4444;
    font-size: 20px;
    margin-top: 5px;
  }
  
  /* กรอบ Input */
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .input-group label {
    display: block;
    font-weight: 600;
    color: #ef4444;
    margin-bottom: 5px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ef4444;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
  }
  
  .input-group input:focus {
    border-color: #dc2626;
  }
  
  /* ปุ่ม Login */
  .login-btn {
    width: 100%;
    background-color: #ef4444;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .login-btn:hover {
    background-color: #dc2626;
  }
  
  /* ปุ่มแสดง/ซ่อนรหัสผ่าน */
  .password-group {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    top: 60%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .eye-icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
  
  /* ข้อความ Register */
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
  .eye-icon {
  width: 20px;
  height: 20px;
  margin-top: 20px;
}

  </style>
  