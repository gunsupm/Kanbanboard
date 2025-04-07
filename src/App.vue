<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import Board from './views/Board.vue';
import Header from './components/Header.vue';
export default defineComponent({
  name: 'App',
  components: { 
    Board,
    Header 
  },
  mounted() {
    document.title = 'KanBanBoard';
    }

});

</script>
<style>
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
  width: 200px; 
  background: #eee; 
  overflow: auto;   
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