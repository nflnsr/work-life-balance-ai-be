"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = exports.responseBuilder = void 0;
// interface ResponseBuilder<T> {
//   status: "success" | "error";
//   message: string;
//   data?: T;
// }
exports.responseBuilder = {
    success({ res, message = "data fetched successfully", data, meta, }) {
        res.status(200).json({ status: "success", message, data, meta });
    },
    created({ res, message = "data created successfully", data, }) {
        res.status(201).json({ status: "success", message, data });
    },
    noContent({ res }) {
        res.status(204).end();
    },
    unauthorized({ res, message = "unauthorized" }) {
        res.status(401).json({ status: "error", message });
    },
    forbidden({ res, message = "forbidden" }) {
        res.status(403).json({ status: "error", message });
    },
    badRequest({ res, message = "bad request" }) {
        res.status(400).json({ status: "error", message });
    },
    notFound({ res, message = "not found" }) {
        res.status(404).json({ status: "error", message });
    },
    conflict({ res, message = "data already exists" }) {
        res.status(409).json({ status: "error", message });
    },
    unprocessableEntity({ res, message = "unprocessable entity", }) {
        res.status(422).json({ status: "error", message });
    },
    internalServerError({ res, message = "internal server error", }) {
        res.status(500).json({ status: "error", message });
    },
    optional({ res, category, code, data, message, }) {
        switch (category) {
            case "informational":
            case "redirection":
                res.status(code);
                break;
            case "success":
                res.status(code).json({ status: "success", data });
                break;
            case "client_error":
            case "server_error":
                res.status(code).json({ status: "error", message });
                break;
            default:
                res.status(code);
                break;
        }
    },
    // error(
    //   res: Response,
    //   message: string = "Something went wrong",
    //   statusCode: number = 400
    // ) {
    //   res.status(statusCode).json({ status: "error", message });
    // },
};
exports.responseHandler = {
    success({ res, data }) {
        res.status(200).json({ success: true, data });
    },
    created({ res, data }) {
        res.status(201).json({ success: true, data });
    },
    noContent({ res }) {
        res.status(204).end();
    },
    unauthorized({ res, message = "Anda belum melakukan autentikasi", }) {
        res.status(401).json({ error: true, message });
    },
    forbidden({ res, message = "Anda tidak memiliki akses" }) {
        res.status(403).json({ error: true, message });
    },
    badRequest({ res, message = "Permintaan tidak valid" }) {
        res.status(400).json({ error: true, message });
    },
    notFound({ res, message = "Data tidak ditemukan" }) {
        res.status(404).json({ error: true, message });
    },
    conflict({ res, message = "Data yang dimasukkan sudah dipakai", }) {
        res.status(409).json({ error: true, message });
    },
    unprocessableEntity({ res, message = "Data tidak valid" }) {
        res.status(422).json({ error: true, message });
    },
    internalServerError({ res, message = "Terjadi kesalahan pada server", }) {
        res.status(500).json({ error: true, message });
    },
    optional({ res, category, code, data, message, }) {
        switch (category) {
            case "informational":
            case "redirection":
                res.status(code);
                break;
            case "success":
                res.status(code).json({ success: true, data });
                break;
            case "client_error":
            case "server_error":
                res.status(code).json({ error: true, message });
                break;
            default:
                res.status(code);
                break;
        }
    },
};
// export const JsonResponse = <T>({
//   res,
//   type,
//   message,
//   data,
// }: {
//   res: Response;
//   type: ResponseStatus;
//   message: string;
//   data: T;
// }) => {
//   switch (type) {
//     case "success":
//       responseBuilder.success(res, data);
//       break;
//     case "created":
//       responseBuilder.created(res, data);
//       break;
//     case "unauthorized":
//       responseBuilder.unauthorized(res, message);
//       break;
//     case "forbidden":
//       responseBuilder.forbidden(res, message);
//       break;
//     case "bad_request":
//       responseBuilder.badRequest(res, message);
//       break;
//     case "not_found":
//       responseBuilder.notFound(res, message);
//       break;
//     case "server_error":
//       responseBuilder.serverError(res, message);
//       break;
//     default:
//       responseBuilder.success(res, data);
//   }
// };
