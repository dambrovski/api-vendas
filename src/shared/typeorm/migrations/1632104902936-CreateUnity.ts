import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUnity1632104902936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'units', //nome da tabela no banco

        columns: [
          {
            name: 'id',

            type: 'uuid',

            isPrimary: true,

            generationStrategy: 'uuid',

            default: 'uuid_generate_v4()',
          },

          {
            name: 'name',

            type: 'varchar',
          },

          {
            name: 'initials',

            type: 'varchar',
          },

          {
            name: 'created_at',

            type: 'timestamp with time zone',

            default: 'now()',
          },

          {
            name: 'updated_at',

            type: 'timestamp with time zone',

            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('units');
  }
}
