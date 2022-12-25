export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Error messages constants

export const ResponseMessages = {
  // 200
  OK: '200 OK',
  CREATED: 'Created',
  ACCEPTED: 'Accepted',
  NO_CONTENT: 'No Content',
  ERROR: 'Error',

  // Error messages
  // 400
  BAD_REQUEST: '400 Bad Request',
  // 401
  UNAUTHORIZED: '401 Unauthorized',
  // 403
  FORBIDDEN: 'Forbidden',
  // 404
  NOT_FOUND: '404 Not Found',
  // 409
  CONFLICT: 'Conflict',
  // 500
  INTERNAL_SERVER_ERROR: '500 Internal Server Error',
  // 503
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  // 504
  GATEWAY_TIMEOUT: 'Gateway Timeout',

  // Custom error messages
  EXAM_NOT_FOUND: 'Exam not found',
  EXAM_ALREADY_SUBMITTED: 'Exam already submitted',
  STUDENT_NOT_FOUND: 'Student not found',
  STUDENT_ALREADY_REGISTERED: 'Student already registered',
  LOGIN_UNAUTHORIZED: 'Wrong username or password',
  LOGIN_BODY_ERROR: 'Username and password are required',
  ID_ERROR: 'Invalid id',
  NO_BODY_ERROR: 'No body',
  REGISTER_FAILED: 'Register failed',
  QUERY_PARAMS_ERROR: 'Query params are required',
  GET_STADIUMS_ERROR: 'Get stadiums error',
  // Custom success messages
  LOGIN_SUCCESS: 'Loged in successfully',
  REGISTER_SUCCESS: 'Registered successfully',
  GET_STADIUMS_SUCCESS: 'stadiums fetched successfully',
};

export const database = {
  HOST: process.env.DB_HOST,
  DATABASE: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  // DIALECT: process.env.DB_DIALECT,
};

export const PORT = process.env.PORT || 3000;
