import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnCustomerIdToUsers1631837977509
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',

      new TableColumn({
        name: 'customer_id',

        type: 'uuid',

        isNullable: true,
      }),
    );

    //criação da foreign key

    await queryRunner.createForeignKey(
      //informar tabela que será criada a foreign

      'users',

      //inicio da criação da migração

      new TableForeignKey({
        //nome simbolico

        name: 'CustomerUsers',

        //coluna referenciada na tabela orders

        columnNames: ['customer_id'],

        //nome da tabela de destino da foreign key (a qual se refere)

        referencedTableName: 'customers',

        //nome da coluna que se refere ao campo customer_id só que na tabela customers

        referencedColumnNames: ['id'],

        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //nome da tabela de origem da chave estrangeira e apelido
    await queryRunner.dropForeignKey('customers', 'CustomerUsers');
    //nome da tabela de origem da chave estrangeira e nome da chave estrangeira
    await queryRunner.dropColumn('customers', 'customer_id');
  }
}
