import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMovieTable1717637916505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Movie',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar(100)',
          },
          {
            name: 'actors',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'genre',
            type: 'varchar',
          },
          {
            name: 'release_date',
            type: 'datetime',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Movie')
  }
}
