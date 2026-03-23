export const healthPaths = {
  '/ok': {
    get: {
      tags: ['Health'],
      summary: 'Health check',
      responses: {
        '200': {
          description: 'API is running',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'ok' }
                }
              }
            }
          }
        }
      }
    }
  }
}