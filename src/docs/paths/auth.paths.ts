export const authPaths = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new operator',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterRequest'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Operator registered successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse'
              }
            }
          }
        },
        '400': {
          description: 'Invalid request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },

  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login operator',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse'
              }
            }
          }
        },
        '401': {
          description: 'Invalid credentials',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  }
}