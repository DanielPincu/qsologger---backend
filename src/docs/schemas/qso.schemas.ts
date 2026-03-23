export const qsoSchemas = {
  QSO: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '65f123abc456def789012345' },
      remoteCallsign: { type: 'string', example: 'DL3DLL' },
      band: { type: 'string', example: '40m' },
      mode: { type: 'string', example: 'SSB' },
      rstSent: { type: 'string', example: '59' },
      rstReceived: { type: 'string', example: '59' },
      qsoDate: { type: 'string', format: 'date-time', example: '2026-03-04T15:00:00.000Z' },
      confirmed: { type: 'boolean', example: true },
      distanceKm: { type: 'number', example: 7539.05 }
    }
  },

  CreateQSORequest: {
    type: 'object',
    required: ['remoteCallsign', 'band', 'mode', 'rstSent', 'rstReceived', 'qsoDate'],
    properties: {
      remoteCallsign: { type: 'string', example: 'DL3DLL' },
      band: { type: 'string', example: '40m' },
      mode: { type: 'string', example: 'SSB' },
      rstSent: { type: 'string', example: '59' },
      rstReceived: { type: 'string', example: '59' },
      qsoDate: { type: 'string', format: 'date-time', example: '2026-03-04T15:00:00.000Z' }
    }
  },

  UpdateQSORequest: {
    type: 'object',
    properties: {
      remoteCallsign: { type: 'string', example: 'DL3DLL' },
      band: { type: 'string', example: '20m' },
      mode: { type: 'string', example: 'CW' },
      rstSent: { type: 'string', example: '599' },
      rstReceived: { type: 'string', example: '599' },
      qsoDate: { type: 'string', format: 'date-time', example: '2026-03-04T15:00:00.000Z' }
    }
  }
}