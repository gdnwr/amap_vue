<template>
  <div class="extent-split">
    <div class="row-item">
      <span class="label">最小经度：</span>
      <el-input v-model.number="minX" />
    </div>
    <div class="row-item">
      <span class="label">最小纬度：</span>
      <el-input v-model.number="minY" />
    </div>
    <div class="row-item">
      <span class="label">最大经度：</span>
      <el-input v-model.number="maxX" />
    </div>
    <div class="row-item">
      <span class="label">最大纬度：</span>
      <el-input v-model.number="maxY" />
    </div>
    <div class="row-item">
      <span class="label">X轴分割数：</span>
      <el-input v-model.number="splitX" />
    </div>
    <div class="row-item">
      <span class="label">Y轴分割数：</span>
      <el-input v-model.number="splitY" />
    </div>
    <div class="row-item">
      <span class="label">容差：</span>
      <el-input v-model.number="tolerance" />
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
import randomColor from 'randomcolor';
import { extentSplit } from '../../../../utils/GeometryUtil';

export default {
  name: 'ExtentSplit',
  data() {
    return {
      minX: 116.3560295, // 最小经度
      minY: 39.90025506, // 最小纬度
      maxX: 116.4344788, // 最大经度
      maxY: 39.94922702, // 最大纬度
      splitX: 2, // X轴方向分割份数
      splitY: 2, // Y轴方向分割份数
      tolerance: 0.01, // 分割后的容差
    };
  },
  methods: {
    locationPolygons(paths) {
      const { amap, AMap } = window;
      amap.clearMap();

      paths.forEach((path) => {
        const color = randomColor({ luminosity: 'dark' });
        const polygon = new AMap.Polygon({
          path,
          fillColor: color, // 多边形填充颜色
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: color, // 线条颜色
        });

        amap.add(polygon);
        amap.setFitView();
      });
    },
    handleLocation() {
      const {
        minX, minY, maxX, maxY, splitX, splitY, tolerance,
      } = this;
      const paths = extentSplit({
        minX, minY, maxX, maxY,
      }, { splitX, splitY, tolerance });

      this.locationPolygons(paths);
    },
  },
};
</script>

<style lang="scss" scoped>
  .extent-split {
    .row-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      .label {
        white-space: nowrap;
      }
    }
  }
</style>
