<template>
  <div
    id="container-amap"
    class="container-amap"
  />
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: 'AmapContainer',
  mounted() {
    this.initAmap();
  },
  methods: {
    async initAmap() {
      const AMap = await AMapLoader.load({
        key: '7a99eaac79b63cac6e4f076ec000fd84', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 插件列表
      });

      window.AMap = AMap;
      window.amap = new AMap.Map('container-amap');
    },
  },
};
</script>

<style lang="scss" scoped>
  .container-amap {
    height: 100%;
  }
</style>
