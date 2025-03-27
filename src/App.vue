<template>
  <div class="header">
      <div class="nav-bar">
        <div class="left-content">
          <h1>KanBan Board</h1>
        </div>
        <div class="right-content"></div>
      </div>
    </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './views/Board.vue';

export default defineComponent({
  name: 'App',
  components: { Board }
});
</script>
<style>
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
    font-weight: Medium; 
    letter-spacing: 1px;
  }
  
  .user-icon img {
    width: 50px;
    height: auto;
    margin-right: 60px;
  }
</style>