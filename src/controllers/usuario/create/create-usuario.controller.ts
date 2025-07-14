import { Controller, HttpRequest, HttpResponse } from "../../../protocols/http.protocols";

export class CreateUsuarioController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.name) {
            return {
                statusCode: 400,
                body: {
                    message: 'campo nome deve ser preenchido corretamente'
                }
            }
        }
        
        return {
            statusCode: 200
        }
    }
}