<template>
  <div class="point-location">
    <div class="row-item">
      <el-input v-model.number="lng" />
      <span>-</span>
      <el-input v-model.number="lat" />
    </div>
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
import { coordTransInput } from '../../../../utils/GeometryUtil';

export default {
  name: 'PointLocation',
  props: {
    // 输入坐标类型：WGS84(原始)、WGS84(原始)、BD09(百度)
    inputCoordType: {
      type: String,
      default: 'GCJ02',
    },
  },
  data() {
    return {
      lng: '116.397451', // 经度
      lat: '39.909187', // 纬度
    };
  },
  methods: {
    locationMarker(lng, lat) {
      const { amap, AMap } = window;

      amap.clearMap();

      const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
      });

      amap.add(marker);
      amap.setFitView();
    },
    // 定位资源
    handleLocation() {
      const xy = coordTransInput(this.lng, this.lat, this.inputCoordType);
      this.locationMarker(xy[0], xy[1]);
    },
  },
};
</script>

<style lang="scss" scoped>
  .point-location {
    .row-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
  }
</style>
