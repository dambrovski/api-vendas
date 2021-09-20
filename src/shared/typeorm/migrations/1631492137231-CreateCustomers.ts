import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomers1631492137231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',

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
            name: 'cnpj',

            type: 'int',
          },
          {
            name: 'cep',

            type: 'int',
          },

          {
            name: 'numero',

            type: 'int',
          },

          {
            name: 'rua',

            type: 'varchar',
          },
          {
            name: 'bairro',

            type: 'varchar',
          },
          {
            name: 'cidade',

            type: 'varchar',
          },
          {
            name: 'complemento',

            type: 'varchar',
          },

          {
            name: 'email',

            type: 'varchar',

            isUnique: true,
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
    await queryRunner.dropTable('customers');
  }
}
