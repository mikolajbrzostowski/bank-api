import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { HttpService } from '@nestjs/axios';
import { createMock } from '@golevelup/ts-jest';
import { SetupServer } from 'msw/node';
import { setupMockServer } from '../test/mock-server';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { ConfigService } from '@nestjs/config';
import querystring from 'node:querystring';
import request from 'supertest';
import 'jest';
import { rest } from 'msw';
import { RevolutTransactionDto } from '../integrations/revolut/revolut-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { SterlingTransactionDto } from '../integrations/sterling/sterling-transaction.dto';
import { MonzoTransactionDto } from '../integrations/monzo/monzo-transaction.dto';
import { MonzoTransactionDtoStub } from '../test/stubs/monzoTransactionDto.stub';
import { RevolutTransactionDtoStub } from '../test/stubs/revolutTransactionDto.stub';
import { SterlingTransactionDtoStub } from '../test/stubs/sterlingTransactionDto.stub';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;

  let configService: ConfigService;
  let httpServer: any;
  let app: INestApplication;
  const integrationMockServer: SetupServer = setupMockServer();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
    transactionsService = module.get<TransactionsService>(TransactionsService);
    configService = module.get<ConfigService>(ConfigService);
    integrationMockServer.listen({
      onUnhandledRequest: 'bypass',
    });
  });

  afterEach(() => integrationMockServer.resetHandlers());
  afterAll(async () => {
    await app.close();
    integrationMockServer.close();
  });

  it('should return revoult api response with mapped values', async () => {
    const revolutApiUrl = configService.get<string>('REVOLUT_API_URL');
    const revolutApiResponse: RevolutTransactionDto[] = [
      new RevolutTransactionDtoStub(),
    ];

    integrationMockServer.use(
      rest.get(revolutApiUrl, (req, res, ctx) => {
        return res(ctx.json(revolutApiResponse));
      }),
    );

    const params = querystring.stringify({
      source: 'revolut',
    });

    const response = await request(httpServer).get('/transactions?' + params);

    const expected: Transaction[] = [
      {
        id: 'tr_0987654321',
        created: '2022-03-21T14:16:32.000Z',
        description: 'John Doe',
        amount: { value: '78.99', currency: 'EUR' },
        type: 'UNKNOWN',
        reference: 'SEPA-0987654321',
        metadata: { source: 'Revolut' },
      },
    ];

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
  });

  it('should return sterling api response with mapped values', async () => {
    const sterlingApiUrl = configService.get<string>('STERLING_API_URL');
    const sterlingApiResponse: SterlingTransactionDto[] = [
      new SterlingTransactionDtoStub(),
    ];

    integrationMockServer.use(
      rest.get(sterlingApiUrl, (req, res, ctx) => {
        return res(ctx.json(sterlingApiResponse));
      }),
    );

    const params = querystring.stringify({
      source: 'sterling',
    });

    const response = await request(httpServer).get('/transactions?' + params);

    const expected: Transaction[] = [
      {
        id: '6d4c34fc-94e7-4e52-8a36-9c40b102ecfc',
        created: '2022-03-21T14:16:32.000Z',
        description: 'Payment to Jane Smith',
        amount: { value: '-25.00', currency: 'EUR' },
        type: 'UNKNOWN',
        reference: 'SEPA-1234567890',
        metadata: { source: 'Sterling' },
      },
    ];

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
  });

  it('should return monzo api response with mapped values', async () => {
    const monzoApiUrl = configService.get<string>('MONZO_API_URL');
    const monzoApiResponse: MonzoTransactionDto[] = [
      new MonzoTransactionDtoStub(),
    ];

    integrationMockServer.use(
      rest.get(monzoApiUrl, (req, res, ctx) => {
        return res(ctx.json(monzoApiResponse));
      }),
    );

    const params = querystring.stringify({
      source: 'monzo',
    });

    const response = await request(httpServer).get('/transactions?' + params);

    const expected: Transaction[] = [
      {
        id: 'tx_00001YpBqNqL8mWnKf4t2Z',
        created: '2023-04-05T09:12:00.000Z',
        description: 'Monthly rent payment',
        amount: { value: '-120000.00', currency: 'EUR' },
        type: 'UNKNOWN',
        reference: 'SEPA-0987654321',
        metadata: { source: 'Monzo' },
      },
    ];

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
  });

  it('should return api response from all banks with mapped values if source is not provided', async () => {
    const monzoApiUrl = configService.get<string>('MONZO_API_URL');
    const revolutApiUrl = configService.get<string>('REVOLUT_API_URL');
    const sterlingApiUrl = configService.get<string>('STERLING_API_URL');

    const monzoApiResponse: MonzoTransactionDto[] = [
      new MonzoTransactionDtoStub(),
    ];
    const revolutApiResponse: RevolutTransactionDto[] = [
      new RevolutTransactionDtoStub(),
    ];
    const sterlingApiResponse: SterlingTransactionDto[] = [
      new SterlingTransactionDtoStub(),
    ];

    integrationMockServer.use(
      rest.get(monzoApiUrl, (req, res, ctx) => {
        return res(ctx.json(monzoApiResponse));
      }),
      rest.get(revolutApiUrl, (req, res, ctx) => {
        return res(ctx.json(revolutApiResponse));
      }),
      rest.get(sterlingApiUrl, (req, res, ctx) => {
        return res(ctx.json(sterlingApiResponse));
      }),
    );

    const response = await request(httpServer).get('/transactions');

    const expected: Transaction[] = [
      {
        id: 'tx_00001YpBqNqL8mWnKf4t2Z',
        created: '2023-04-05T09:12:00.000Z',
        description: 'Monthly rent payment',
        amount: { value: '-120000.00', currency: 'EUR' },
        type: 'UNKNOWN',
        reference: 'SEPA-0987654321',
        metadata: { source: 'Monzo' },
      },
      {
        id: 'tr_0987654321',
        created: '2022-03-21T14:16:32.000Z',
        description: 'John Doe',
        amount: { value: '78.99', currency: 'EUR' },
        type: 'UNKNOWN',
        reference: 'SEPA-0987654321',
        metadata: { source: 'Revolut' },
      },
      {
        id: '6d4c34fc-94e7-4e52-8a36-9c40b102ecfc',
        created: '2022-03-21T14:16:32.000Z',
        description: 'Payment to Jane Smith',
        amount: { value: '-25.00', currency: 'EUR' },
        type: 'UNKNOWN',
        reference: 'SEPA-1234567890',
        metadata: { source: 'Sterling' },
      },
    ];

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
  });

  it('should return 500 error when fetched data is inconsistent', async () => {
    const monzoApiUrl = configService.get<string>('MONZO_API_URL');
    const monzoApiResponse = [
      { ...new MonzoTransactionDtoStub(), amount: 'asdasd' },
    ];

    integrationMockServer.use(
      rest.get(monzoApiUrl, (req, res, ctx) => {
        return res(ctx.json(monzoApiResponse));
      }),
    );

    const params = querystring.stringify({
      source: 'monzo',
    });

    const response = await request(httpServer).get('/transactions?' + params);

    const expected = {
      statusCode: 500,
      error: 'Something went wrong',
    };

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject(expected);
  });

  it('should return bad request 400 error when invalid source param is provided', async () => {
    const params = querystring.stringify({
      source: 'nosupported',
    });

    const response = await request(httpServer).get('/transactions?' + params);

    const expected = {
      statusCode: 400,
      error: 'Wrong source parameter',
    };

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected);
  });
});
