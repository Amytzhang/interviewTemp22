/**
 * 
 * @param {*} instructions 
 * 无限的平面上，机器人最初位于 (0, 0) 处，面朝北方。注意:
  北方向 是y轴的正方向。
  南方向 是y轴的负方向。
  东方向 是x轴的正方向。
  西方向 是x轴的负方向。
  机器人可以接受下列三条指令之一：
    "G"：直走 1 个单位
    "L"：左转 90 度
    "R"：右转 90 度
  机器人按顺序执行指令 instructions，并一直重复它们。
  只有在平面中存在环使得机器人永远无法离开时，返回 true。否则，返回 false。
 * @returns 
 */
var isRobotBounded = function (instructions) {
  let angle = 0
  let originCenter = [0, 0]
  /**
   * 1.只算四个象限上‘G’往前走的数值
   * 2.旋转的角度总和只要能360
   */
  for (let v of instructions) {
      if (v === 'G') {
          if (angle % 360 === 0) originCenter[1] += 1
          else if (angle % 360 === 90) originCenter[0] += 1
          else if (angle % 360 === 180) originCenter[1] -= 1
          else if (angle % 360 === 270) originCenter[0] -= 1
      }
      else if (v === 'L') angle += 270
      else if (v === 'R') angle += 90
  }
  return angle % 360 !== 0 || originCenter.join('') === '00'
};
