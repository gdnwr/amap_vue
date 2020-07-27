<template>
  <div class="coord-type">
    <span>坐标类型：</span>
    <el-radio-group
      v-model="inputCoordTypeData"
      class="coord-type-rg"
      @change="coordTypeChange"
    >
      <el-radio
        class="coord-type-radio"
        label="WGS84"
      >
        WGS84(原始)
      </el-radio>
      <el-radio
        class="coord-type-radio"
        label="GCJ02"
      >
        GCJ02(高德)
      </el-radio>
      <el-radio
        class="coord-type-radio"
        label="BD09"
      >
        BD09(百度)
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'CoordType',
  model: {
    prop: 'inputCoordType',
    event: 'change',
  },
  props: {
    // 输入坐标类型：WGS84(原始)、WGS84(原始)、BD09(百度)
    inputCoordType: {
      type: String,
      default: 'GCJ02',
    },
  },

  data() {
    return {
      inputCoordTypeData: '',
    };
  },
  watch: {
    inputCoordType: {
      immediate: true,
      handler(val) {
        this.inputCoordTypeData = val;
      },
    },
  },
  methods: {
    coordTypeChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .coord-type {
    display: flex;
    .coord-type-rg {
        display: flex;
        flex-direction: column;
        .coord-type-radio {
          line-height: 24px;
        }
      }
  }
</style>
