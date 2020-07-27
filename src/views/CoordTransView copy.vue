<template>
  <div class="coordtransform">
    <div class="left-tool">
      <el-form
        ref="form"
        :model="formModel"
        label-width="100px"
      >
        <el-form-item label="经纬度：">
          <div class="row-item">
            <el-input v-model="lng" />
            <span>-</span>
            <el-input v-model="lat" />
          </div>
        </el-form-item>
        <el-form-item label="坐标类型：">
          <div class="coordinate-type-list">
            <el-radio
              v-model="coordinateType"
              label="WGS84"
              class="coordinate-type"
            >
              WGS84
            </el-radio>
            <el-radio
              v-model="coordinateType"
              label="GCJ02"
              class="coordinate-type"
            >
              GCJ02
            </el-radio>
            <el-radio
              v-model="coordinateType"
              label="BD09"
              class="coordinate-type"
            >
              BD09
            </el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div class="row-item">
        <el-button
          type="primary"
          @click="handleLocation"
        >
          定位
        </el-button>
        <el-button @click="test">
          测试
        </el-button>
      </div>
    </div>
    <div
      id="container-amap"
      class="container-amap"
    />
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import coordtransform from 'coordtransform';

export default {
  name: 'CoordTransView',
  data() {
    return {
      formModel: {},
      lng: '116.397451', // 经度
      lat: '39.909187', // 纬度
      coordinateType: 'GCJ02',
    };
  },
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
      this.AMap = AMap;

      this.amap = new AMap.Map('container-amap');
    },
    test() {
      const paths = [
        [[118.359429, 31.225331], [118.359429, 31.591176], [119.257036, 31.591176], [119.257036, 31.225331]],
        [[118.359429, 31.571176], [118.359429, 31.937022], [119.257036, 31.937022], [119.257036, 31.571176]],
        [[118.359429, 31.917022], [118.359429, 32.282867], [119.257036, 32.282867], [119.257036, 31.917022]],
        [[118.359429, 32.262867], [118.359429, 32.628713], [119.257036, 32.628713], [119.257036, 32.262867]],
      ];

      paths.forEach((path) => {
        const polygon = new this.AMap.Polygon({
          path,
          fillColor: '#fff', // 多边形填充颜色
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'red', // 线条颜色
        });

        this.amap.add(polygon);
      });

      this.amap.setFitView();
    },
    locationMarker(lng, lat) {
      this.amap.clearMap();

      const marker = new this.AMap.Marker({
        position: new this.AMap.LngLat(lng, lat),
      });

      this.amap.add(marker);
      this.amap.setFitView();
    },
    // 定位资源
    handleLocation() {
      if (this.coordinateType === 'GCJ02') {
        this.locationMarker(this.lng, this.lat);
      } else if (this.coordinateType === 'WGS84') {
        const wgs84togcj02 = coordtransform.wgs84togcj02(this.lng, this.lat);
        this.locationMarker(wgs84togcj02[0], wgs84togcj02[1]);
      } else if (this.coordinateType === 'BD09') {
        const bd09togcj02 = coordtransform.bd09togcj02(this.lng, this.lat);
        this.locationMarker(bd09togcj02[0], bd09togcj02[1]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .coordtransform {
    display: flex;
    height: 100%;
    .left-tool {
      width: 300px;
      height: 100%;
      margin: 20px 20px 20px 0;

      .row-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .coordinate-type-list {
        display: flex;
        flex-direction: column;
        .coordinate-type {
          line-height: 30px;
        }
      }
    }
    .container-amap {
      flex: 1;
      height: 100%;
    }
  }
</style>
