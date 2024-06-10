import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import path from 'path'
import { Ticket } from '../entitys/ticket.entity'
import { Session } from '../entitys/session.entity'
import { Movie } from '../entitys/movie.entity'

dotenv.config()

const { DB_PATH } = process.env

if (!DB_PATH) {
  throw new Error('DB_PATH must be defined in the environment variables')
}
const srcDir = path.resolve(__dirname, '..', '..', 'src')

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(srcDir, DB_PATH),
  synchronize: false,
  logging: true,
  entities: [Session, Ticket, Movie],
  migrations: ['dist/database/migrations/*.js'],
})

export default AppDataSource
