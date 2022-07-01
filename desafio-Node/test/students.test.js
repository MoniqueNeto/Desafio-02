const supertest = require('supertest');

const app = require('../src/app');

test('Deve inserir um students', () => {
  return supertest(app).post('/students')
    .send({
      registration: '20192EWBJ0035',
      name: 'mtfn@discente.ifpe.edu.br',
      email: 'Monique Tereza Ferreira Neto',
      birth_date: '17/01/2001',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.registration).toBe('20192EWBJ0035');
      expect(res.body.name).toBe('mtfn@discente.ifpe.edu.br');
      expect(res.body.email).toBe('Monique Tereza Ferreira Neto');
      expect(res.body.birth_date).toBe('17/01/2001');
    });
});

test('Deve inserir outro students com sucesso', () => {
  return supertest(app).post('/students')
    .send({
      registration: '20192EWBJ0280',
      name: 'atss1@discente.ifpe.edu.br',
      email: 'Ana Thamyres Santana Santos',
      birth_date: '16/11/2001',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.registration).toBe('20192EWBJ0280');
      expect(res.body.name).toBe('atss1@discente.ifpe.edu.br');
      expect(res.body.email).toBe('Ana Thamyres Santana Santos');
      expect(res.body.birth_date).toBe('16/11/2001');
    });
});

test('Deve listar todos os students', () => {
  return supertest(app).get('/students').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(22);
    expect(res.body[11]).toEqual({
      registration: '20192EWBJ0035',
      name: 'mtfn@discente.ifpe.edu.br',
      email: 'Monique Tereza Ferreira Neto',
      birth_date: '17/01/2001',
      id: 12,
    });
    expect(res.body[2]).toEqual({
      registration: '20192EWBJ0280',
      name: 'atss1@discente.ifpe.edu.br',
      email: 'Ana Thamyres Santana Santos',
      birth_date: '16/11/2001',
      id: 3,
    });
  });
});

test('Deve listar um students', () => {
  return supertest(app).get('/students/12').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20192EWBJ0035');
    expect(res.body.name).toBe('mtfn@discente.ifpe.edu.br');
    expect(res.body.email).toBe('Monique Tereza Ferreira Neto');
    expect(res.body.birth_date).toBe('17/01/2001');
  });
});

test('Deve apagar um students', () => {
  return supertest(app).delete('/students/12').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20192EWBJ0035');
    expect(res.body.name).toBe('mtfn@discente.ifpe.edu.br');
    expect(res.body.email).toBe('Monique Tereza Ferreira Neto');
    expect(res.body.birth_date).toBe('17/01/2001');
  });
});

test('Deve alterar um students', () => {
  return supertest(app).put('/students/3')
    .send({
      registration: '20192EWBJ0280',
      name: 'atss1@discente.ifpe.edu.br',
      email: 'Ana Thamyres Santana',
      birth_date: '16/11/2001',
    }).then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        registration: '20192EWBJ0280',
        name: 'atss1@discente.ifpe.edu.br',
        email: 'Ana Thamyres Santana',
        birth_date: '16/11/2001',
        id: 3,
      });
    });
});

test('Deve listar o estudante com os dados alterados', () => {
  return supertest(app).get('/students/3').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20192EWBJ0280');
    expect(res.body.name).toBe('atss1@discente.ifpe.edu.br');
    expect(res.body.email).toBe('Ana Thamyres Santana');
    expect(res.body.birth_date).toBe('16/11/2001');
  });
});

test('Deve apagar outro estudante', () => {
  return supertest(app).delete('/students/4').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20192EWBJ0175');
    expect(res.body.name).toBe('dcs12@discente.ifpe.edu.br');
    expect(res.body.email).toBe('Deise Cristiane Silva');
    expect(res.body.birth_date).toBe('28/06/2000');
  });
});
