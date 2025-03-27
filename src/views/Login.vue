<template>
  <loginform />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import loginform from '@/components/logincontent.vue';

export default defineComponent({
  name: 'Login',
  components: { loginform }
});
</script>
