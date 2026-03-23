export const qsoPaths = {
  '/qso': {
    post: {
      tags: ['QSO'],
      summary: 'Create a new QSO',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateQSORequest'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'QSO created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/QSO'
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
    },

    get: {
      tags: ['QSO'],
      summary: 'List all QSOs for current operator',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'List of QSOs',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/QSO'
                }
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
  },

  '/qso/{id}': {
    get: {
      tags: ['QSO'],
      summary: 'Get one QSO by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        '200': {
          description: 'QSO details',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/QSO'
              }
            }
          }
        },
        '404': {
          description: 'QSO not found',
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
      tags: ['QSO'],
      summary: 'Update one QSO by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateQSORequest'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'QSO updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/QSO'
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
    },

    delete: {
      tags: ['QSO'],
      summary: 'Delete one QSO by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        '200': {
          description: 'QSO deleted successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MessageResponse'
              }
            }
          }
        },
        '404': {
          description: 'QSO not found',
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