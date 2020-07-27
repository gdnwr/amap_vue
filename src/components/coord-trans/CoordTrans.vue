<template>
  <div class="cord-trans">
    <LeftTool class="left-tool" />
    <AmapContainer class="container-amap" />
  </div>
</template>

<script>
import LeftTool from './components/left-tool/LeftTool.vue';
import AmapContainer from '../common/amap-container/AmapContainer.vue';

export default {
  name: 'CoordTrans',
  components: {
    LeftTool,
    AmapContainer,
  },
};
</script>

<style lang="scss" scoped>
  .cord-trans {
    height: 100%;
    display: flex;
    .left-tool {
      width: 300px;
    }
    .container-amap {
      flex: 1;
    }
  }
</style>
