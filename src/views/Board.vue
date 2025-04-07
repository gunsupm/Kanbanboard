<template>
  <KanBanBoard />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KanBanBoard from '@/components/KanBanBoard.vue';

export default defineComponent({
  name: 'Board',
  components: { KanBanBoard },
  mounted() {
    document.title = 'KanBanBoard';
    }
});
</script>
