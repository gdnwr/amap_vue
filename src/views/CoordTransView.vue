<template>
  <div class="coord-trans-view">
    <CoordTrans />
  </div>
</template>

<script>
import CoordTrans from '../components/coord-trans/CoordTrans.vue';

export default {
  name: 'CoordTransView',
  components: {
    CoordTrans,
  },
};
</script>

<style lang="scss" scoped>
  .coord-trans-view {
    height: 100%;
  }
</style>
