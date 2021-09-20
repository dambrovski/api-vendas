import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIngredientesIndicaoUsoFoto1632160190829
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',

      new TableColumn({
        name: 'photo',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'photo');
  }
}
