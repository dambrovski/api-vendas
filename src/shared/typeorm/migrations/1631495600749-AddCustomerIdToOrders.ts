import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCustomerIdToOrders1631495600749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    //criação da foreign key
    await queryRunner.createForeignKey(
      //informar tabela que será criada a foreign
      'orders',
      //inicio da criação da migração
      new TableForeignKey({
        //nome simbolico
        name: 'OrdersCustomer',
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
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropColumn('orders', 'customer_id');
  }
}
