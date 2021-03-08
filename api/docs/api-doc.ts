

export const apiDoc = {
  swagger: '2.0',
  basePath: '/api',
  info: {
    title: 'Un api per un servizio di acquisto/vendita valute.',
    version: '1.0.0'
  },
  definitions: {
    Error: {
      additionalProperties: true
    },
    SignupViewModel: {
      properties: {
        name: {
          type: 'string'
        },
        surname: {
          type: 'string'
        },
        email: {
          type: 'string',
        },
        iban: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        confirmPassword: {
          type: 'string'
        },
      },
      required: ['name', 'surname', 'email', 'iban', 'password', 'confirmPassword']
    },
    LoginViewModel: {
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string'
        },
      },
      required: ['email', 'password']
    },
    LoginDto: {
      properties: {
        email: {
          type: 'string',
        },
        user: {
          type: 'object',
          schema: {
            $ref: "#/definitions/User"
          }
        },
      },
    },
    User: {
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string"
        },
        surname: {
          type: "string"
        },
        email: {
          type: "string"
        },
        iban: {
          type: "string"
        }
      }
    }
  },
  paths: {},
}

