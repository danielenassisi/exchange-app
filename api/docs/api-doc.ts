

export const apiDoc = {
  swagger: '2.0',
  basePath: '/api',
  info: {
    title: 'Un api per un servizio di acquisto/vendita valute.',
    version: '1.0.0'
  },
  definitions: {
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
        },
        eurCurrentAccount: {
          $ref: '#/definitions/CurrentAccount'
        },
        usdCurrentAccount: {
          $ref: '#/definitions/CurrentAccount'
        },
      }
    },
    Transaction: {
      properties: {
        id: {
          type: 'string',
        },
        date: {
          type: 'string',
          format: 'date',
        },
        value: {
          type: 'number'
        },
        symbol: {
          type: 'string',
          enum: ['EUR', 'USD']
        },
        operation: {
          type: 'string',
          enum: ["WITHDRAW", "DEPOSIT", "BUY_WITHDRAW", "BUY_DEPOSIT"]
        }
      }
    },
    CurrentAccount: {
      properties: {
        id: {
          type: 'string',
        },
        value: {
          type: 'number'
        },
        symbol: {
          type: 'string',
          enum: ['EUR', 'USD']
        },
      }
    },
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
        token: {
          type: 'string',
        },
        user: {
          $ref: "#/definitions/User"
        },
      },
    },
    DepositViewModel: {
      properties: {
        value: {
          type: 'number',
          minimum: 0,
        },
        symbol: {
          type: 'string',
          enum: ['EUR', 'USD']
        }
      },
      required: ['value', 'symbol']
    },
    WithdrawViewModel: {
      properties: {
        value: {
          type: 'number',
          minimum: 0,
        },
        symbol: {
          type: 'string',
          enum: ['EUR', 'USD']
        }
      },
      required: ['value', 'symbol']
    },
    BuyViewModel: {
      properties: {
        value: {
          type: 'number',
          minimum: 0,
        },
        symbol: {
          type: 'string',
          enum: ['EUR', 'USD']
        }
      },
      required: ['value', 'symbol']
    },
    BuyDto: {
      properties: {
        value: {
          type: 'number'
        },
        symbol: {
          type: 'string'
        }
      }
    }
  },
  paths: {},
}

