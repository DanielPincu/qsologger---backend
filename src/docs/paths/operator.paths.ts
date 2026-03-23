export const operatorPaths = {
  '/operator/me': {
    get: {
      tags: ['Operator'],
      summary: 'Get current operator profile',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Operator profile',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OperatorProfile'
              }
            }
          }
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },

    put: {
      tags: ['Operator'],
      summary: 'Update current operator profile',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateOperatorRequest'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Operator updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OperatorProfile'
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
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },

    delete: {
      tags: ['Operator'],
      summary: 'Delete current operator account',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Operator deleted successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MessageResponse'
              }
            }
          }
        },
        '401': {
          description: 'Unauthorized',
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