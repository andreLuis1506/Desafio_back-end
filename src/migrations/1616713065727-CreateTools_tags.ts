import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateToolTags1616713065727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Tool_tags',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'tag',
            type: 'varchar',
          },
          {
            name: 'toolId',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Tool_tags',
      new TableForeignKey({
        columnNames: ['toolId'],
        referencedTableName: 'Tools',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Tool_tags');
  }
}
