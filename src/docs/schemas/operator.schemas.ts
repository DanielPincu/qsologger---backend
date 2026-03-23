export const operatorSchemas = {
  OperatorProfile: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '65f123abc456def789012345' },
      callsign: { type: 'string', example: 'OZ1ABC' },
      email: { type: 'string', example: 'operator@example.com' },
      locator: { type: 'string', example: 'JO55' }
    }
  },

  UpdateOperatorRequest: {
    type: 'object',
    properties: {
      callsign: { type: 'string', example: 'OZ1ABC' },
      email: { type: 'string', example: 'operator@example.com' },
      locator: { type: 'string', example: 'JO55' }
    }
  }
}