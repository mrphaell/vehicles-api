import * as HttpStatus from 'http-status-codes';
import _ from 'lodash';

class Response {

  constructor() { }

  setApp(app) {
    app.use((req, res, next) => {
      res.api = {
        res: res,
        req: req,
        send: Response.send,
        codes: HttpStatus
      };
      next()
    })
  }

  static send(data, responseCode, metadata = {}, customMessage = null) {
    return this.res.status(responseCode).json(
      {
        code: responseCode,
        data: data,
        message: customMessage ? customMessage : Response._getStatusMessage(responseCode),
        metadata: Response._generateResponseMetadata(this.req, metadata)
      }
    );
  }

  static _getStatusMessage(statusCode) {
    return Object
      .keys(HttpStatus)[Object.values(HttpStatus).indexOf(statusCode)]
      .toLowerCase();
  }

  static _generateResponseMetadata(expressReq, customMetadata = {}) {
    const defaultMetadata = {
      responseAt: new Date().toISOString(),
      method: expressReq.method,
      route: expressReq.originalUrl
    };

    return _.merge(defaultMetadata, customMetadata);
  }
}

export default Response;