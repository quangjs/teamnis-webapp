export type TErrorMessage = {
   message: string,
   code: number
}

export const HTTP_ERROR_MESSAGES = {
  EMAIL_EXISTED: JSON.stringify({
    "message": "Email is existed",
    "code": 1000
 }),
  INVALID_LOGIN: JSON.stringify({
     "message": "Email or Password is incorrect",
     "code": 1001
  }),
  USER_NOT_FOUND: JSON.stringify({
     "message": "User not found",
     "code": 1002
  }),
  SESSION_EXPIRED: JSON.stringify({
     "message": "Session expired",
     "code": 1003
  }),
  ACCESS_DENIED: JSON.stringify({
     "message": "Access denied",
     "code": 1004
  }),
  EMAIL_NOT_EXISTED: JSON.stringify({
    "message": "Email is not existed",
    "code": 1005
 }),
 INACTIVE_USER: JSON.stringify({
   "message": "User is inactive",
   "code": 1006
}),
}