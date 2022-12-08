const calcPercent = (low: number, high: number, current: number): number => {
  const x = high - low
  const y = current - low
  return (y / x) * 100
}

export default calcPercent
