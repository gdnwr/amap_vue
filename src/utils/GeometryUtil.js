import coordtransform from 'coordtransform';

/**
 * 坐标转换
 * @function
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {String} coordType='GCJ02' WGS84(原始)、WGS84(原始)、BD09(百度)
 * @returns {Array} [lng,lat]
 */
export const coordTransInput = (lng, lat, coordType = 'GCJ02') => {
  if (coordType === 'GCJ02') {
    return [lng, lat];
  } if (coordType === 'WGS84') {
    const wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);
    return wgs84togcj02;
  } if (coordType === 'BD09') {
    const bd09togcj02 = coordtransform.bd09togcj02(lng, lat);
    return bd09togcj02;
  }

  return [lng, lat];
};

/**
 * 字符串转polyline、polygon的path
 * @function
 * @param {String} pathStr
 * @param {String} coordType='GCJ02'
 * @returns {Array} [[116.35,39.94],[116.43,39.94]]
 */
export const stringToPath = (pathStr, coordType = 'GCJ02') => {
  const path = [];

  // 字符串格式为：'116.35,39.94;116.43,39.94;'
  if (pathStr.indexOf(';') !== -1) {
    pathStr.split(';').forEach((pointStr) => {
      if (pathStr.indexOf(',') !== -1) {
        const x = Number(pointStr.split(',')[0]);
        const y = Number(pointStr.split(',')[1]);
        if (x && y) {
          const point = coordTransInput(x, y, coordType);
          path.push(point);
        }
      }
    });
  }

  return path;
};

export const extentSplit = ({
  minX, minY, maxX, maxY,
}, { splitX = 2, splitY = 2, tolerance = 0.01 } = {}) => {
  const paths = [];

  // X轴方向的间距
  const distX = (maxX - minX) / splitX;
  // Y轴方向的间距
  const distY = (maxY - minY) / splitY;

  for (let i = 0; i < splitX; i += 1) {
    for (let j = 0; j < splitY; j += 1) {
      let p1X = minX + distX * i;
      let p1Y = minY + distY * j;

      let p3X = minX + distX * (i + 1);
      let p3Y = minY + distY * (j + 1);

      let p2X = p1X;
      let p2Y = p3Y;

      let p4X = p3X;
      let p4Y = p1Y;

      p1X -= tolerance;
      p2X -= tolerance;
      p3X += tolerance;
      p4X += tolerance;
      p1Y -= tolerance;
      p2Y += tolerance;
      p3Y += tolerance;
      p4Y -= tolerance;

      const p1 = [p1X.toFixed(8), p1Y.toFixed(8)];
      const p2 = [p2X.toFixed(8), p2Y.toFixed(8)];
      const p3 = [p3X.toFixed(8), p3Y.toFixed(8)];
      const p4 = [p4X.toFixed(8), p4Y.toFixed(8)];

      const path = [p1, p2, p3, p4];
      paths.push(path);
    }
  }

  return paths;
};

export default {
  coordTransInput,
  stringToPath,
  extentSplit,
};
