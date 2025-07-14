import { HttpRequest, HttpResponse } from "../../../protocols/http.protocols"
import { CreateUsuarioController } from "./create-usuario.controller"

interface TypeSut {
    sut: CreateUsuarioController
}

const makeSut = (): TypeSut => {
    return {
        sut: new CreateUsuarioController()
    }
}

const getData = () => {
    return {
        nome: 'any-valid-name',
        email: 'any-valid-email'
    }
}

describe('create-usuario.controller.ts', () => {
    it('deve retornar statusCode 400 quando o campo nome nao fornecido', async () => {
        const { sut } = makeSut();

        const { nome, ...body } = getData();

        const httpRequest: HttpRequest = {
            body: body
        };

        const httpResponse: HttpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body.message).toBe('campo nome deve ser preenchido corretamente');
    })
})