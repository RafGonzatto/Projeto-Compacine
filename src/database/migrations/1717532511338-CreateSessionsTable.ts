import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSessionsTable1717532511338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'INTEGER',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'room',
            type: 'VARCHAR',
          },
          {
            name: 'capacity',
            type: 'INTEGER',
          },
          {
            name: 'day',
            type: 'VARCHAR',
          },
          {
            name: 'time',
            type: 'VARCHAR',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions')
  }
}
