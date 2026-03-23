export const commonSchemas = {
  ErrorResponse: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Invalid credentials' }
    }
  },

  MessageResponse: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Operation completed successfully' }
    }
  }
}