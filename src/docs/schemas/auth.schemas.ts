export const authSchemas = {
  RegisterRequest: {
    type: 'object',
    required: ['callsign', 'email', 'password', 'locator'],
    properties: {
      callsign: { type: 'string', example: 'OZ1ABC' },
      email: { type: 'string', example: 'operator@example.com' },
      password: { type: 'string', example: 'secret123' },
      locator: { type: 'string', example: 'JO55' }
    }
  },

  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', example: 'operator@example.com' },
      password: { type: 'string', example: 'secret123' }
    }
  },

  OperatorPublic: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '65f123abc456def789012345' },
      callsign: { type: 'string', example: 'OZ1ABC' },
      email: { type: 'string', example: 'operator@example.com' }
    }
  },

  AuthResponse: {
    type: 'object',
    properties: {
      operator: {
        $ref: '#/components/schemas/OperatorPublic'
      },
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      }
    }
  }
}