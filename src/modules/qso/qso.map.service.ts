import { QSOModel } from '../../models/qso.model'
import { OperatorModel } from '../../models/operator.model'
import { locatorToLatLon } from '../../utils/gridToLatLon.util'
import { distanceKm } from '../../utils/distance.util'

export async function getConfirmedQsoMap(operatorId: string) {
  const operator = await OperatorModel.findById(operatorId).lean()

  if (!operator?.locator) {
    throw new Error('Operator locator not set')
  }

  const myCoords = locatorToLatLon(operator.locator)

  const qsos = await QSOModel.find({
    operatorId,
    confirmed: true
  }).lean()

  const results = []

  for (const qso of qsos) {
    if (!qso.matchedQsoId) continue

    const matched = await QSOModel.findById(qso.matchedQsoId).lean()
    if (!matched) continue

    const remoteOperator = await OperatorModel.findById(
      matched.operatorId
    ).lean()

    if (!remoteOperator?.locator) continue

    const remoteCoords = locatorToLatLon(remoteOperator.locator)

    const dist = distanceKm(
      myCoords.lat,
      myCoords.lon,
      remoteCoords.lat,
      remoteCoords.lon
    )

    results.push({
      remoteCallsign: qso.remoteCallsign,
      distanceKm: Math.round(dist),
      from: myCoords,
      to: remoteCoords
    })
  }

  return results
}