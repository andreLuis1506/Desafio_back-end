import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1617144947775 implements MigrationInterface {
    name = 'CreateTables1617144947775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tools" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "link" varchar NOT NULL, "description" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "Tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tag_name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "tool_id" integer)`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "users_tools__tools" ("usersId" integer NOT NULL, "toolsId" integer NOT NULL, PRIMARY KEY ("usersId", "toolsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_afc65eca67fda8910b20b94152" ON "users_tools__tools" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd198b229538d77742aa6eb9f3" ON "users_tools__tools" ("toolsId") `);
        await queryRunner.query(`CREATE TABLE "temporary_Tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tag_name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "tool_id" integer, CONSTRAINT "FK_523a3e87192ff7c08b23e05d7a1" FOREIGN KEY ("tool_id") REFERENCES "Tools" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Tags"("id", "tag_name", "created_at", "updated_at", "tool_id") SELECT "id", "tag_name", "created_at", "updated_at", "tool_id" FROM "Tags"`);
        await queryRunner.query(`DROP TABLE "Tags"`);
        await queryRunner.query(`ALTER TABLE "temporary_Tags" RENAME TO "Tags"`);
        await queryRunner.query(`DROP INDEX "IDX_afc65eca67fda8910b20b94152"`);
        await queryRunner.query(`DROP INDEX "IDX_dd198b229538d77742aa6eb9f3"`);
        await queryRunner.query(`CREATE TABLE "temporary_users_tools__tools" ("usersId" integer NOT NULL, "toolsId" integer NOT NULL, CONSTRAINT "FK_afc65eca67fda8910b20b94152d" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_dd198b229538d77742aa6eb9f38" FOREIGN KEY ("toolsId") REFERENCES "Tools" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("usersId", "toolsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_users_tools__tools"("usersId", "toolsId") SELECT "usersId", "toolsId" FROM "users_tools__tools"`);
        await queryRunner.query(`DROP TABLE "users_tools__tools"`);
        await queryRunner.query(`ALTER TABLE "temporary_users_tools__tools" RENAME TO "users_tools__tools"`);
        await queryRunner.query(`CREATE INDEX "IDX_afc65eca67fda8910b20b94152" ON "users_tools__tools" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd198b229538d77742aa6eb9f3" ON "users_tools__tools" ("toolsId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_dd198b229538d77742aa6eb9f3"`);
        await queryRunner.query(`DROP INDEX "IDX_afc65eca67fda8910b20b94152"`);
        await queryRunner.query(`ALTER TABLE "users_tools__tools" RENAME TO "temporary_users_tools__tools"`);
        await queryRunner.query(`CREATE TABLE "users_tools__tools" ("usersId" integer NOT NULL, "toolsId" integer NOT NULL, PRIMARY KEY ("usersId", "toolsId"))`);
        await queryRunner.query(`INSERT INTO "users_tools__tools"("usersId", "toolsId") SELECT "usersId", "toolsId" FROM "temporary_users_tools__tools"`);
        await queryRunner.query(`DROP TABLE "temporary_users_tools__tools"`);
        await queryRunner.query(`CREATE INDEX "IDX_dd198b229538d77742aa6eb9f3" ON "users_tools__tools" ("toolsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_afc65eca67fda8910b20b94152" ON "users_tools__tools" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "Tags" RENAME TO "temporary_Tags"`);
        await queryRunner.query(`CREATE TABLE "Tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tag_name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "tool_id" integer)`);
        await queryRunner.query(`INSERT INTO "Tags"("id", "tag_name", "created_at", "updated_at", "tool_id") SELECT "id", "tag_name", "created_at", "updated_at", "tool_id" FROM "temporary_Tags"`);
        await queryRunner.query(`DROP TABLE "temporary_Tags"`);
        await queryRunner.query(`DROP INDEX "IDX_dd198b229538d77742aa6eb9f3"`);
        await queryRunner.query(`DROP INDEX "IDX_afc65eca67fda8910b20b94152"`);
        await queryRunner.query(`DROP TABLE "users_tools__tools"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Tags"`);
        await queryRunner.query(`DROP TABLE "Tools"`);
    }

}
