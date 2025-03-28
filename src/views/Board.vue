<template>
  <KonBanBoard />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KonBanBoard from '@/components/KonBanBoard.vue';

export default defineComponent({
  name: 'Board',
  components: { KonBanBoard },
  mounted() {
    document.title = 'KanBanBoard';
    }
});
</script>
