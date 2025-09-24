const uploadExcelOpenAPI = {
  summary: 'Upload an Excel file with financial data',
  description: 'Uploads an Excel file containing financial data (month and amount) for a specific user and year. Requires authentication and a single file upload.',
  security: [{ bearerAuth: [] }],
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      description: 'ID of the user uploading the financial data',
      schema: { type: 'integer' },
    },
    {
      name: 'year',
      in: 'path',
      required: true,
      description: 'Year associated with the financial data',
      schema: { type: 'integer', minimum: 1900, maximum: 9999 },
    },
  ],
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: 'Excel file containing financial data with columns for month and amount',
            },
          },
          required: ['file'],
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Excel file uploaded and processed successfully.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Excel file uploaded and processed successfully' },
              fileName: { type: 'string', example: 'financial_data.xlsx' },
              totalRows: { type: 'integer', example: 12 },
              insertedRows: { type: 'integer', example: 10 },
              skippedRows: { type: 'integer', example: 2 },
            },
            required: ['message', 'fileName', 'totalRows', 'insertedRows', 'skippedRows'],
          },
        },
      },
    },
    400: {
      description: 'Bad request, e.g., no file uploaded or invalid file format.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'No file uploaded' },
            },
            required: ['error'],
          },
        },
      },
    },
    401: {
      description: 'Unauthorized, authentication required.',
    },
    403: {
      description: 'Forbidden, invalid or expired token.',
    },
    500: {
      description: 'Internal server error.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Internal server error' },
            },
            required: ['error'],
          },
        },
      },
    },
  },
};

const getFinancialRecordsOpenAPI = {
  summary: 'Retrieve financial records',
  description: 'Fetches financial records for a specific user and year. Requires authentication.',
  security: [{ bearerAuth: [] }],
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      description: 'ID of the user whose financial data is requested',
      schema: { type: 'integer' },
    },
    {
      name: 'year',
      in: 'path',
      required: true,
      description: 'Year of the financial data to retrieve',
      schema: { type: 'integer', minimum: 1900, maximum: 9999 },
    },
  ],
  responses: {
    200: {
      description: 'Financial records retrieved successfully.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 12 },
              records: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    user_id: { type: 'integer', example: 123 },
                    year: { type: 'integer', example: 2023 },
                    month: { type: 'integer', example: 6 },
                    amount: { type: 'number', example: 1000.50 },
                  },
                  required: ['id', 'user_id', 'year', 'month', 'amount'],
                },
              },
            },
            required: ['total', 'records'],
          },
        },
      },
    },
    401: {
      description: 'Unauthorized, authentication required.',
    },
    403: {
      description: 'Forbidden, invalid or expired token.',
    },
    404: {
      description: 'No financial records found for the specified user and year.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'No financial records found' },
            },
            required: ['error'],
          },
        },
      },
    },
    500: {
      description: 'Internal server error.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Internal server error' },
            },
            required: ['error'],
          },
        },
      },
    },
  },
};

module.exports = {
  uploadExcelOpenAPI,
  getFinancialRecordsOpenAPI,
};