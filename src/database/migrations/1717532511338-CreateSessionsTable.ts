import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateSessionsTable1717532511338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Session',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'movie_id',
            type: 'integer',
          },
          {
            name: 'room',
            type: 'varchar',
          },
          {
            name: 'capacity',
            type: 'integer',
          },
          {
            name: 'day',
            type: 'varchar',
          },
          {
            name: 'time',
            type: 'varchar',
          },
        ],
      }),
    )
    await queryRunner.createForeignKey(
      'Session',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Movie',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Session')
  }
}
