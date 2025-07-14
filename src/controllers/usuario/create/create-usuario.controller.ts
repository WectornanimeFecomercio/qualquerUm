import { badRequest } from "../../../helpers/bad-request.helper";
import { Controller, HttpRequest, HttpResponse } from "../../../protocols/http.protocols";

export class CreateUsuarioController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.name) {
            return badRequest('campo nome deve ser preenchido corretamente');
        }
        
        return {
            statusCode: 200
        }
    }
}