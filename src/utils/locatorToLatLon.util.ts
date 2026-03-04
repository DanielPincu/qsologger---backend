export function locatorToLatLon(locator: string) {
  locator = locator.toUpperCase()

  const A = 'A'.charCodeAt(0)

  const lon =
    (locator.charCodeAt(0) - A) * 20 -
    180 +
    parseInt(locator[2]) * 2 +
    (locator.charCodeAt(4) - A) * (5 / 60) +
    2.5 / 60

  const lat =
    (locator.charCodeAt(1) - A) * 10 -
    90 +
    parseInt(locator[3]) +
    (locator.charCodeAt(5) - A) * (2.5 / 60) +
    1.25 / 60

  return { lat, lon }
}