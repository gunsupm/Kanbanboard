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
  <div class="title"><H1>Title</H1></div>
  <button class="editred" onclick="" ><img src="../pic/editredicon.png" ></button> 
  <button class="NEWTASK" onclick="" >NEW TASK</button>


</div>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({

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
font-size: 24px;
align-items: center;
height: 100px;
font-family: Prompt,Bold;
display: inline-flex;
border: 3px solid #000000;
padding: 0.1px 40px;
margin: 0px;
margin-right: 50px;
}
.editred {
  background-color: white;
  cursor: pointer;
  border: 0px;  
  margin-top: 20px;
  margin-right: 50px;
}
.NEWTASK{
  cursor: pointer;
  border-radius: 45px;
  letter-spacing: 1px;
  font-size: 24px;
  font-family: Prompt,Bold;
  color: #FFFFFF;
  background-color: #F61010;
  padding: 1px 20px;
  height: 100px;
  width: 200px;
  margin: 0px;
}
</style>
