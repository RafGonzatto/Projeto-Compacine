import supertest from 'supertest'
const request = supertest('http://localhost:3000')

describe('Movies API', () => {
  it('should create a new movie', async () => {
    const response = await request.post('/api/v1/movies').send({
      image: 'https://www.example.com/image.jpg',
      name: 'Movie Name',
      description: 'Movie description',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024/05/20',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should not create a new movie without required fields', async () => {
    const response = await request.post('/api/v1/movies').send({})

    expect(response.status).toBe(400)
  })

  it('should not create a new movie if it already exists', async () => {
    await request.post('/api/v1/movies').send({
      image: 'https://www.example.com/image.jpg',
      name: 'Existing Movie',
      description: 'Movie description',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024/05/20',
    })

    const response = await request.post('/api/v1/movies').send({
      image: 'https://www.example.com/image.jpg',
      name: 'Existing Movie',
      description: 'Movie description',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024/05/20',
    })

    expect(response.status).toBe(409)
  })

  it('should not create a new movie if data is invalid', async () => {
    const response = await request.post('/api/v1/movies').send({
      image: 'Invalid URL',
      name: '',
    })

    expect(response.status).toBe(400)
  })
})
