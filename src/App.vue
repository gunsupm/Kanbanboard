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
import { defineComponent} from 'vue';
import Board from './views/Board.vue';

export default defineComponent({
  name: 'App',
  components: { Board },
  mounted() {
    document.title = 'KanBanBoard';
    }

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

@media (max-width: 1800px) {
  #app{      
    overflow-x: auto;
    align-items: center;
    text-align: center;
  }
  .board-container {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .edit-column
  {
    width: 20px;
    height: auto;
  }
  .nav{
  width: 200px; /* ความกว้างตามต้องการ */
  background: #eee; /* สีพื้นหลังเพื่อดูง่ายขึ้น */
  overflow: auto;   /* กันไม่ให้เนื้อหาล้น */
}
.columns-container {
    flex-direction: column; 
    flex-wrap: nowrap;      
  }
  .column {      
    flex: none;            
  }
.ADDCOL {
    border-radius: 8px;
    width: 150px;
    max-width: 90%;
    height: 100vh;
    bottom: 0;
    padding: 0;
    margin-top: 30px;
    margin-left: 50px;
  }
}
</style>