import { badRequest } from "../../../helpers/bad-request.helper";
import { success } from "../../../helpers/sucess.helper";
import { Controller, HttpRequest, HttpResponse } from "../../../protocols/http.protocols";

import emailValidator from "email-validator";

export class CreateUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      if (!body.nome) {
        return badRequest('campo nome deve ser preenchido corretamente');
      }

      if (!body.email) {
        return badRequest('campo email deve ser preenchido corretamente');
      }

      const isEmailValid = emailValidator.validate(body.email);

      if (!isEmailValid) {
        return badRequest('campo email deve ser preenchido em um email valido')
      }

      return success('registro cadastrado com sucesso')

    } catch (erro: unknown) {
      if (erro instanceof Error) {
        return badRequest(erro.message);
      } else {
        return badRequest(JSON.stringify(erro));
      }
    }
  }
}