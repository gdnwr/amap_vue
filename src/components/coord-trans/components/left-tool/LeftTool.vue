<template>
  <div class="left-tool">
    <CoordType
      v-model="inputCoordType"
      class="coord-type"
    />
    <el-collapse
      v-model="activeNames"
    >
      <el-collapse-item
        title="单点定位"
        name="point-location"
      >
        <PointLocation :input-coord-type="inputCoordType" />
      </el-collapse-item>
      <el-collapse-item
        title="单线定位"
        name="polygon-location"
      >
        <PolylineLocation :input-coord-type="inputCoordType" />
      </el-collapse-item>
      <el-collapse-item
        title="单面定位"
        name="polygon-location"
      >
        <PolygonLocation :input-coord-type="inputCoordType" />
      </el-collapse-item>
      <el-collapse-item
        title="范围分割"
        name="extent-split"
      >
        <ExtentSplit :input-coord-type="inputCoordType" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import CoordType from '../coord-type/CoordType.vue';
import PointLocation from '../point-location/PointLocation.vue';
import PolylineLocation from '../polyline-location/PolylineLocation.vue';
import PolygonLocation from '../polygon-location/PolygonLocation.vue';
import ExtentSplit from '../extent-split/ExtentSplit.vue';

export default {
  name: 'LeftTool',
  components: {
    CoordType,
    PointLocation,
    PolylineLocation,
    PolygonLocation,
    ExtentSplit,
  },
  data() {
    return {
      inputCoordType: 'GCJ02',
      activeNames: 'point-location',
    };
  },
};
</script>

<style lang="scss" scoped>
  .left-tool {
    overflow-y: auto;
    padding: 20px;

    .coord-type {
      margin-bottom: 20px;
    }
  }
</style>
