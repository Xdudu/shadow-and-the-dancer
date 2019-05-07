export const getDataForDraw = ({
  R,  // radius of shadow
  r,  // radius of the dancer
  seriesCnt,  // total count in series
  seriesAngBias,  // total angle bias across series
  drawDisRange, // range of distances(in ratio of r) from connecting point towards inside in series
  totalTranslate,  // translate center of draw for series
  rgb, alpha,  // color for each one in series
}) => {
  const data = []
  for (let i = 0; i < seriesCnt; i++) {
    const drawDis = getValFromRange(...drawDisRange, seriesCnt, i)
    const angleBias = seriesAngBias / seriesCnt * i
    const initialDrawPoint = [
      (R - drawDis * r) * Math.sin(angleBias),
      -(R - drawDis * r) * Math.cos(angleBias)
    ]
    const translate = totalTranslate.map(val => val / seriesCnt * i)
    const color = getColorFromRange(rgb, alpha, seriesCnt, i)
    data.push({ drawDis, angleBias, initialDrawPoint, translate, color })
  }
  return data
}

const getValFromRange = (start, end, cnt, i) => start + i * (end - start) / cnt

const getColorFromRange = (rgb, alpha, cnt, i) => {
  let rgbStr = ''
  if (typeof rgb[0] === 'number') rgbStr = rgb.join()
  else {
    const rgbArr = []
    for (let iForHue = 0; iForHue < 3; iForHue++) {
      rgbArr.push(Math.round(
        getValFromRange(rgb[0][iForHue], rgb[1][iForHue]
        , cnt, i))
      )
    }
    rgbStr = rgbArr.join()
  }
  const alphaStr = typeof alpha === 'number' ?
    alpha
    : getValFromRange(...alpha, cnt, i)
  return `rgba(${rgbStr}, ${alphaStr})`
}

export const getDrawPoint = (
  R, r,
  { drawDis, angleBias, color },
  speed, time,
) => {
  const theta_R = speed * time
  const pastLength = R * theta_R
  const theta_r = pastLength / r % (2 * Math.PI)
  // anchor means the initial tangent point between shadow and the dancer
  const anchorFromTangentPoint = 2 * r * Math.sin(theta_r / 2)
  const anchorFromRCenter = Math.sqrt(
    Math.pow(anchorFromTangentPoint, 2)
    + Math.pow(R, 2)
    - 2 * Math.abs(anchorFromTangentPoint) * R * Math.cos(Math.abs((Math.PI - theta_r) / 2))
  )
  const anchorDeltaTheta = takeSign(Math.sin(theta_r))
    * Math.acos((
      Math.pow(anchorFromRCenter, 2)
      + Math.pow(R, 2)
      - Math.pow(anchorFromTangentPoint, 2)
    ) / (2 * anchorFromRCenter * R)
  )
  const anchorTheta = theta_R % (2 * Math.PI) - anchorDeltaTheta + angleBias
  const anchor = [
    anchorFromRCenter * Math.sin(anchorTheta),
    - anchorFromRCenter * Math.cos(anchorTheta),
  ]
  const center_r = [
    (R - r) * Math.sin(theta_R + angleBias),
    - (R - r) * Math.cos(theta_R + angleBias)
  ]
  const drawPoint = [
    anchor[0] + drawDis * (center_r[0] - anchor[0]),
    anchor[1] + drawDis * (center_r[1] - anchor[1]),
  ]
  return drawPoint
}

const takeSign = number => number === 0 ? 0 : (number > 0 ? 1 : -1)
