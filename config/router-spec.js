const request = require('supertest')
const server = require('../api/server');
const db = require('../database/dbConfig');
const Users = require('./router-model')
//require('dotenv').config();



describe('server', () =>{
      it('env set to server', () =>{
           expect(process.env.DB_ENV).toBe('testing') 
      });

      describe('GET /', () =>{
            it('should return 200 status', () =>{
                return request(server)
                    .get('/')
                    .then(res =>{
                        expect(res.status).toBe(200) 
                    })
            });



      });

      describe('POST / api/register', () =>{
          beforeEach(async () =>{
              await db('users').truncate()
          })


          const data = {
              username:'Some User',
              password:'this was rough'
          }


            it('should should not be null ', () =>{
                 expect(data).not.toBeNull() 
            });

            it('should should not be undefined ', () =>{
                expect(data).not.toBeUndefined() 
           });

           it('data should match key value and type', () =>{
            expect(data).toMatchObject({
                make: expect.any(String),
                model: expect.any(String),
                year: expect.any(Number)
            })

            it('should insert user into db', async () =>{
                await Users.register(data);
                const users = await db('users');
                expect(users).toHaveLength(1);
            });

            it('should retunr 200 status', () =>{
                
                return request(server)
                    .post('/api/register', data)
                    .then(res =>{
                        expect(res.status).toBe(200) 
                    })
            });
        });
            
      });
});
