<template>
  <Register />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Register from '@/components/Register.vue';
  
export default defineComponent({
  name: 'Regis',
  components: {Register},
  mounted() {
    document.title = 'Register';
    alert('เก็บข้อมูลครับแบบ Local');
  }
});
  </script>
  <style>

</style>