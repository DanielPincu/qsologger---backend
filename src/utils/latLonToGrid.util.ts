export const latLonToGrid = (lat: number, lon: number) => {
  const A = 'A'.charCodeAt(0)

  const lonField = Math.floor((lon + 180) / 20)
  const latField = Math.floor((lat + 90) / 10)

  const lonSquare = Math.floor(((lon + 180) % 20) / 2)
  const latSquare = Math.floor((lat + 90) % 10)

  return (
    String.fromCharCode(A + lonField) +
    String.fromCharCode(A + latField) +
    lonSquare +
    latSquare
  )
}