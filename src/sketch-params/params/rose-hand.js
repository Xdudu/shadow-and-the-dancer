import { getRoundCntToComplete } from '../utils'

const width = 2400
const height = 2400

const R = 420
const r = 180

const roundCntToComplete = getRoundCntToComplete(R, r)

export default {
  width,
  height,
  bg: '#dccdbc',
  drawList: [
    {
      R,
      r,
      canvasBias: [ width * 0.48, height * 0.48 ],
      speed: 2,
      drawMethod: {
        type: 'line',
      },
      roundCnt: roundCntToComplete * 5,
      seriesCnt: 300,
      seriesAngBias: Math.PI * 0.75,
      drawDisRange: [ 0.15, 1.8 ],
      totalTranslate: [ 250, 750 ],
      rgb: [ 173, 59, 80 ],
      alpha: [ 0.02, 0.01 ],
    },
  ]
}
