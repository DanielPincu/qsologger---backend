export function locatorToLatLon(locator: string) {
  locator = locator.toUpperCase()

  const A = 'A'.charCodeAt(0)

  let lon =
    (locator.charCodeAt(0) - A) * 20 -
    180 +
    parseInt(locator[2]) * 2

  let lat =
    (locator.charCodeAt(1) - A) * 10 -
    90 +
    parseInt(locator[3])

  // If a 6‑character locator is provided, add subsquare precision
  if (locator.length >= 6) {
    lon += (locator.charCodeAt(4) - A) * (5 / 60)
    lat += (locator.charCodeAt(5) - A) * (2.5 / 60)
  }

  // Move to the center of the grid square
  lon += 1
  lat += 0.5

  return { lat, lon }
}