import { QSOModel } from '../../models/qso.model'
import { latLonToGrid } from '../../utils/latLonToGrid.util'
import { getDXCCCountry } from '../../utils/dxcc.util'

export const getDxRecord = async (operatorId: string) => {
  const qso = await QSOModel
    .findOne({ operatorId, confirmed: true, distanceKm: { $exists: true } })
    .sort({ distanceKm: -1 })
    .lean()

  return qso
}

export const getDxStats = async (operatorId: string) => {
  const qsos = await QSOModel.find({
    operatorId,
    confirmed: true,
    distanceKm: { $exists: true }
  }).lean()

  if (qsos.length === 0) {
    return {
      longestQso: 0,
      averageDistance: 0,
      totalDistanceWorked: 0,
      confirmedQsos: 0
    }
  }

  const distances = qsos.map(q => q.distanceKm ?? 0)
  const total = distances.reduce((a, b) => a + b, 0)

  const grids = new Set<string>()
  const countries = new Set<string>()

  for (const q of qsos) {
    const to = (q as any).to
    if (to) {
      const grid = latLonToGrid(to.lat, to.lon)
      grids.add(grid)
    }

    const country = getDXCCCountry(q.remoteCallsign)
    if (country) {
      countries.add(country)
    }
  }

  return {
    longestQso: Math.max(...distances),
    averageDistance: Math.round(total / distances.length),
    totalDistanceWorked: total,
    confirmedQsos: distances.length,
    workedGrids: grids.size,
    workedDXCC: countries.size
  }
}

export const getDxByBand = async (operatorId: string) => {
  const qsos = await QSOModel.find({
    operatorId,
    confirmed: true,
    distanceKm: { $exists: true }
  }).lean()

  const result: Record<string, number> = {}

  for (const q of qsos) {
    if (!q.distanceKm) continue

    if (!result[q.band] || q.distanceKm > result[q.band]) {
      result[q.band] = q.distanceKm
    }
  }

  return result
}

export const getWorkedGrids = async (operatorId: string) => {
  const qsos = await QSOModel.find({
    operatorId,
    confirmed: true,
    to: { $exists: true }
  }).lean()

  const grids = new Set<string>()

  for (const q of qsos) {
    const to = (q as any).to
    if (!to) continue

    const grid = latLonToGrid(to.lat, to.lon)
    grids.add(grid)
  }

  return Array.from(grids)
}

export const getDXCCStats = async (operatorId: string) => {
  const qsos = await QSOModel.find({
    operatorId,
    confirmed: true
  }).lean()

  const countries = new Set<string>()

  for (const q of qsos) {
    const country = getDXCCCountry(q.remoteCallsign)
    if (country) {
      countries.add(country)
    }
  }

  return {
    countriesWorked: countries.size,
    countries: Array.from(countries)
  }
}