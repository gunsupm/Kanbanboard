<template>
  <div class="header">
    <div class="nav-bar">
      <div class="left-content">
        <h1>KanBan Board</h1>
      </div>
      <div class="right-content">
        <router-link to="/login" class="user-icon">
          <img src="../pic/UserIcon.png" alt="User Icon">
        </router-link> 
      </div>
    </div>
  </div>
  <div class="content">
    <div class="title">
      <h1 v-if="!isEditing">{{ titleText[0].name }}</h1> 
      <input type="text" maxlength="9"  v-else v-model="newTitle" @keyup.enter="saveTitle"@blur="saveTitle"/>
      </div>
    <button class="editred" @click="toggleEdit">
      <img src="../pic/editredicon.png" />
    </button>
    <button class="NEWTASK">NEW TASK</button>
  </div>
  <div class="column">
    <h1> To Do</h1>
  </div>

  <router-view/>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      isEditing: false,
      titleText: [{ name: 'Todo' }],
      newTitle: '',
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.newTitle = this.titleText[0].name; 
      }
    },
    saveTitle() {
  if (this.newTitle.length < 1){
    return this.titleText[0].name = 'Name..'

  }

  this.titleText[0].name = this.newTitle;
   this.isEditing = false;
}

addTask(){

}


  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
#app {
  text-align: center;
  font-family: Prompt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  justify-content: center;
}

/*Nav Bar*/ 
.nav-bar {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 15px 20px;
  background-color: #F5F5F5;
}

.left-content h1 {
  color: #F60000;
  margin-left: 100px; 
}

.user-icon img {
  width: 50px;
  height: auto;
  margin-right: 60px;
}

/*Content*/ 
.content {
  display: flex;
  margin-top: 150px; 
  margin-left: 120px;
}

.title {
  font-size: 18px;
  align-items: center;
  font-family: Prompt, Bold;
  display: inline-flex;
  border: 3px solid #000000;
  padding: 10px 40px;
  margin: 0px;
  margin-right: 50px;
  justify-content: center;
  width: 200px;
  height: 70px;
}

.title input {
  font-size: 36px; /* ขนาดตัวอักษร */
  color: #F60000;
  background-color: #f8f8f8;
  font-family: Prompt, sans-serif; /* ฟอนต์ที่ใช้ */
  font-weight: bold; /* น้ำหนักตัวอักษร */
  border: 0 ; /* ขอบของ input */
  padding: 10px 40px; /* ระยะห่างภายใน */
  margin: 0px;
  width: 200px;
  height: 70px;
  text-align: center; /* จัดข้อความให้อยู่กลาง */
}

.editred {
  background-color: white;
  cursor: pointer;
  border: 0px;  
  margin-top: 20px;
  margin-right: 50px;
}

.NEWTASK {
  cursor: pointer;
  border-radius: 45px;
  letter-spacing: 1px;
  font-size: 24px;
  font-family: Prompt, Bold;
  color: #FFFFFF;
  background-color: #F61010;
  padding: 1px 20px;
  height: 80px;
  width: 200px;
  margin: 0px;
}
</style>
