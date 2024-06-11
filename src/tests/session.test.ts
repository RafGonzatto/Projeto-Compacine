import supertest from 'supertest'

const request = supertest('http://localhost:3000')

describe('Session API', () => {
  let movieId: number

  beforeAll(async () => {
    const movieResponse = await request.post('/api/v1/movies').send({
      image: 'https://www.example.com/image.jpg',
      name: 'Movie Name22',
      description: 'Movie description',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024/05/20',
    })
    movieId = movieResponse.body.id
  })

  it('should create a new session', async () => {
    const response = await request
      .post(`/api/v1/movies/${movieId}/sessions`)
      .send({
        room: 'Room 3',
        capacity: 150,
        day: '23/10/2024',
        time: '19:20:00',
      })

    expect(response.status).toBe(201)
  })
  it('should edit a session', async () => {
    const sessionId = 1
    const response = await request
      .put(`/api/v1/movies/${movieId}/sessions/${sessionId}`)
      .send({
        room: 'Updated room 1',
        capacity: 200,
        day: '07/06/2024',
        time: '20:00:00',
      })

    expect(response.status).toBe(200)
  })

  it('should delete a session', async () => {
    const sessionId = 1
    const response = await request.delete(
      `/api/v1/movies/${movieId}/sessions/${sessionId}`,
    )

    expect(response.status).toBe(204)
  })
})
