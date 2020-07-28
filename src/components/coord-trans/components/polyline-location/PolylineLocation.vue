<template>
  <div class="polyline-location">
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
import { stringToPath } from '../../../../utils/GeometryUtil';

export default {
  name: 'PolylineLocation',
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
    locationPolyline(path) {
      const { amap, AMap } = window;

      amap.clearMap();

      const polyline = new AMap.Polyline({
        path,
        strokeWeight: 4, // 轮廓线宽度
        strokeOpacity: 1, // 轮廓线透明度
        strokeColor: 'red', // 线条颜色
      });

      amap.add(polyline);
      amap.setFitView();
    },
    // 定位资源
    handleLocation() {
      const path = stringToPath(this.polygonStr, this.inputCoordType);
      this.locationPolyline(path);
    },
  },
};
</script>

<style lang="scss" scoped>
  .polyline-location {
    .row-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
  }
</style>
