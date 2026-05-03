import { OpenAPIV3 } from 'openapi-types'

import { healthPaths } from './paths/health.paths'
import { authPaths } from './paths/auth.paths'
import { operatorPaths } from './paths/operator.paths'
import { qsoPaths } from './paths/qso.paths'
import { dxPaths } from './paths/dx.paths'

import { commonSchemas } from './schemas/common.schemas'
import { authSchemas } from './schemas/auth.schemas'
import { operatorSchemas } from './schemas/operator.schemas'
import { qsoSchemas } from './schemas/qso.schemas'
import { dxSchemas } from './schemas/dx.schemas'

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'QSOLogger API',
    description: 'API documentation for QSOLogger backend',
    version: '1.0.0',
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development',
    },
    {
      url: 'https://qsologger-backend-dev.onrender.com',
      description: 'Development',
    },
    {
      url: 'https://qsologger-backend.onrender.com',
      description: 'Production',
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...commonSchemas,
      ...authSchemas,
      ...operatorSchemas,
      ...qsoSchemas,
      ...dxSchemas,
    } as Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject>,
  },

  paths: {
    ...healthPaths,
    ...authPaths,
    ...operatorPaths,
    ...qsoPaths,
    ...dxPaths,
  } as OpenAPIV3.PathsObject,

  tags: [
    { name: 'Health', description: 'Health and test endpoints' },
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Operator', description: 'Operator profile endpoints' },
    { name: 'QSO', description: 'QSO management endpoints' },
    { name: 'DX', description: 'DX statistics and records endpoints' },
  ],
}