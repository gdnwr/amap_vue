<template>
  <div class="polygon-location">
    <el-input
      v-model="polygonStr"
      type="textarea"
      :rows="5"
    />
    <div class="row-item">
      <el-button
        type="primary"
        @click="handleLocation"
      >
        定位
      </el-button>
    </div>
  </div>
</template>

<script>
import { stringToPolygonPath } from '../../../../utils/GeometryUtil';

export default {
  name: 'PolygonLocation',
  props: {
    // 输入坐标类型：WGS84(原始)、WGS84(原始)、BD09(百度)
    inputCoordType: {
      type: String,
      default: 'GCJ02',
    },
  },
  data() {
    return {
      polygonStr: '116.356029510498,39.949227017818;116.434478759766,39.949227017818;116.434478759766,39.9002550567572;116.356029510498,39.9002550567572;',
    };
  },
  methods: {
    locationPolygon(path) {
      const { amap, AMap } = window;

      amap.clearMap();

      const polygon = new AMap.Polygon({
        path,
        fillColor: '#fff', // 多边形填充颜色
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
      });

      amap.add(polygon);
      amap.setFitView();
    },
    // 定位资源
    handleLocation() {
      const path = stringToPolygonPath(this.polygonStr, this.inputCoordType);
      this.locationPolygon(path);
    },
  },
};
</script>

<style lang="scss" scoped>
  .polygon-location {
    .row-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
  }
</style>
