import { HttpRequest, HttpResponse } from "../../../protocols/http.protocols"
import { CreateUsuarioController } from "./create-usuario.controller"

import emailValidator from "email-validator"

interface TypeSut {
  sut: CreateUsuarioController
}

const makeSut = (): TypeSut => {
  return {
    sut: new CreateUsuarioController()
  }
}

const getData = (): any => {
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
  });

  it('deve retornar statusCode 400 quando o campo email nao fornecido', async () => {
    const { sut } = makeSut();

    const { email, ...body } = getData();

    const httpRequest: HttpRequest = {
      body: body
    };

    const httpResponse: HttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe('campo email deve ser preenchido corretamente');
  });

  it('certificasse que a biblioteca emailValidator.validate seja chamada com os valores corretos', async () => {
    const { sut } = makeSut();
    const spyOn = jest.spyOn(emailValidator, "validate").mockImplementationOnce((email: string): boolean => {
      return true;
    });

    const body = getData();

    const httpRequest: HttpRequest = {
      body: body
    };

    await sut.handle(httpRequest);

    expect(spyOn).toHaveBeenCalledWith(body.email);
  });

  it('deve retornar o statusCode 400 quando enviar o email invalido', async () => {
    const { sut } = makeSut();
    jest.spyOn(emailValidator, "validate").mockImplementationOnce((email: string): boolean => {
      return false;
    });

    const body = getData();

    const httpRequest: HttpRequest = {
      body: body
    };

    const httpResponse: HttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe('campo email deve ser preenchido em um email valido');
  });

  it('deve retornar o statusCode 400 a bibliotaca emailValidator tiver uma excecao', async () => {
    const { sut } = makeSut();
    jest.spyOn(emailValidator, "validate").mockImplementationOnce((email: string): boolean => {
      throw new Error('ocorreu um erro inesperado')
    });

    const body = getData();

    const httpRequest: HttpRequest = {
      body: body
    };

    const httpResponse: HttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe('ocorreu um erro inesperado');
  });

  it('deve retornar o statusCode 200 quando tudo ocorrer corretamente', async () => {
    const { sut } = makeSut();
    jest.spyOn(emailValidator, "validate").mockImplementationOnce((email: string): boolean => {
      return true
    });

    const body = getData();

    const httpRequest: HttpRequest = {
      body: body
    };

    const httpResponse: HttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.message).toBe('registro cadastrado com sucesso');
  });
})