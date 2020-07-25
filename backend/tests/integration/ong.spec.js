    const request = require('supertest')
    const app = require('../../src/app')
    const connection = require('../../src/database/connection');

describe('Ong', ()=> {
    beforeEach( async ()=> {
        await connection.migrate.rollback();
        await connection.migrate.latest();    
    })

    afterAll(() => {
        connection.destroy();
    })


    it('should be able to create a new ONG',async () => {
        const response = await request(app).post('/ongs').send({
            name:"APAD2",
            email: "rodrigo@hotmail.com",
            whatsapp:"0000000238",
            city: "sao paulo",
            uf: "sp"
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
    
});