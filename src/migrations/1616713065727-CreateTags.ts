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
        name: 'Tags',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'tag_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tool_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Tags',
      new TableForeignKey({
        columnNames: ['tool_id'],
        referencedTableName: 'Tools',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Tags');
  }
}
