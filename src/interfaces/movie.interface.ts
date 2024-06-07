import { ISession } from './session.interface'
export interface IMovie {
  id: number
  image: string
  name: string
  description: string
  actors: string[]
  genre: string
  release_date: Date
  sessions: ISession[]
}
