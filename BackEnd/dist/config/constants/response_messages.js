"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessages = void 0;
exports.ResponseMessages = {
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
    LOGIN_BODY_ERROR: 'Email and password are not valid',
    ID_ERROR: 'Invalid id',
    NO_BODY_ERROR: 'No body',
    REGISTER_FAILED: 'Register failed',
    QUERY_PARAMS_ERROR: 'Query params are required',
    GET_STADIUMS_ERROR: 'Get stadiums error',
    BODY_ERROR: 'Some or all of the body fields are missing',
    REGISTER_BODY_ERROR: 'Email,password,phone or name are not valid',
    RESERVATION_DATETIME_ERROR: 'Reservation date or time are not valid',
    ADD_RESERVATION_SUCCESS: 'Reservation added successfully',
    RESERVATION_CONFLICT: 'Stadium is already reserved on the given time/date',
    DELETE_RESERVATION_SUCCESS: 'Reservation deleted successfully',
    // Custom success messages
    LOGIN_SUCCESS: 'Loged in successfully',
    REGISTER_SUCCESS: 'Registered successfully',
    GET_STADIUMS_SUCCESS: 'stadiums fetched successfully',
    UPDATE_STADIUM_SUCCESS: 'stadium updated successfully',
    GET_RESERVATIONS_SUCCESS: 'reservations fetched successfully',
    UPDATE_RESERVATION_SUCCESS: 'reservation updated successfully',
    CUSTOMERS_FETCHED: 'customers fetched successfully',
    GET_REVENUE_SUCCESS: 'revenue fetched successfully',
};
