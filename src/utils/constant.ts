const SERVER_PORT = 4000;

type ResponseStatus =
  | "success"
  | "created"
  | "unauthorized"
  | "forbidden"
  | "bad_request"
  | "not_found"
  | "internal_server_error";

type ResponseCategory =
  | "informational"
  | "success"
  | "redirection"
  | "client_error"
  | "server_error";

export { SERVER_PORT, type ResponseStatus, type ResponseCategory };
