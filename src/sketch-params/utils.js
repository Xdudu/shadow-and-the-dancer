export const getRoundCntToComplete = (R, r) => r / gcd(R, r)

const gcd = (a, b) => (
  b === 0 ?
    a
    : gcd(b, a % b)
)
