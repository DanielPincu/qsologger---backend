export const dxSchemas = {
  DXSummary: {
    type: 'object',
    properties: {
      longestQso: { type: 'number', example: 7539.050637973356 },
      averageDistance: { type: 'number', example: 3936 },
      totalDistanceWorked: { type: 'number', example: 7872.635417907032 },
      confirmedQsos: { type: 'number', example: 2 },
      workedGrids: { type: 'number', example: 2 },
      workedDXCC: { type: 'number', example: 2 }
    }
  },

  DXByBandResponse: {
    type: 'object',
    additionalProperties: {
      type: 'number',
      example: 7539.050637973356
    },
    example: {
      '40m': 7539.050637973356,
      '20m': 5240.32
    }
  },

  DXForBandResponse: {
    type: 'object',
    properties: {
      band: { type: 'string', example: '20m' },
      hasRecord: { type: 'boolean', example: false },
      message: { type: 'string', example: 'No confirmed DX record found for 20m' },
      record: {
        $ref: '#/components/schemas/QSO'
      }
    }
  }
}