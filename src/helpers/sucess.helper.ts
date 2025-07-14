import { HttpResponse } from "../protocols/http.protocols"

export const success = (message: string): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      message
    }
  }
}