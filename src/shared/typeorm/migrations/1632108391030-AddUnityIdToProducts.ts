import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUnityIdToProducts1632108391030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',

      new TableColumn({
        name: 'unity_id',

        type: 'uuid',

        isNullable: true,
      }),
    );

    //criação da foreign key

    await queryRunner.createForeignKey(
      //informar tabela que será criada a foreign

      'products',

      //inicio da criação da migração

      new TableForeignKey({
        //nome simbolico

        name: 'UnityProducts',

        //coluna referenciada na tabela orders

        columnNames: ['unity_id'],

        //nome da tabela de destino da foreign key (a qual se refere)

        referencedTableName: 'units',

        //nome da coluna que se refere ao campo id só que na tabela de origem

        referencedColumnNames: ['id'],

        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //nome da tabela de origem da chave estrangeira e apelido
    await queryRunner.dropForeignKey('units', 'UnityProducts');
    //nome da tabela de origem da chave estrangeira e nome da chave estrangeira
    await queryRunner.dropColumn('units', 'unity_id');
  }
}
