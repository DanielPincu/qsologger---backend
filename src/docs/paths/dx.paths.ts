export const dxPaths = {
  '/dx/summary': {
    get: {
      tags: ['DX'],
      summary: 'Get DX summary statistics',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'DX summary',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DXSummary'
              }
            }
          }
        }
      }
    }
  },

  '/dx/longest': {
    get: {
      tags: ['DX'],
      summary: 'Get longest confirmed DX QSO',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Longest DX record',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/QSO'
              }
            }
          }
        }
      }
    }
  },

  '/dx/longest-by-band': {
    get: {
      tags: ['DX'],
      summary: 'Get longest DX distance for each band',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Longest DX by band',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DXByBandResponse'
              }
            }
          }
        }
      }
    }
  },

  '/dx/longest-by-band/{band}': {
    get: {
      tags: ['DX'],
      summary: 'Get longest DX record for one band',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'band',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '20m'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Longest DX record for band',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DXForBandResponse'
              }
            }
          }
        }
      }
    }
  },

  '/dx/grids': {
    get: {
      tags: ['DX'],
      summary: 'Get worked Maidenhead grids',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Worked grids list',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'string',
                  example: 'JO44'
                }
              }
            }
          }
        }
      }
    }
  },

  '/dx/dxcc': {
    get: {
      tags: ['DX'],
      summary: 'Get worked DXCC entities',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Worked DXCC entities',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'string',
                  example: 'Germany'
                }
              }
            }
          }
        }
      }
    }
  }
}