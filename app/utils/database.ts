import * as SQLite from "expo-sqlite";

const db = async () => {
  return await SQLite.openDatabaseAsync("honwaku.db");
};

export const createTable = async () => {
  const database = await db();

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS novels (
        'id' INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
        'slug' VARCHAR(255) NOT NULL,
        'title' VARCHAR(255) NOT NULL,
        'author' VARCHAR(255) NOT NULL,
        'status' ENUM('completed', 'ongoing', 'new') NOT NULL,
        'cover_url' VARCHAR(255) NOT NULL,
        'ranting' VARCHAR(255) NOT NULL DEFAULT 'N/A',
        'genre' VARCHAR(255) NOT NULL,
        'sinopsis' TEXT NULL,
        'view' BIGINT NOT NULL DEFAULT 0,
        'adult' BOOLEAN NOT NULL DEFAULT false,
        'created_at' TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
        'updated_at' DATETIME(3) NULL,
    
        UNIQUE INDEX 'novels_slug_unique'('slug'),
        INDEX 'novels_genre_index'('genre'),
        INDEX 'novels_id_index'('id'),
        INDEX 'novels_title_index'('title'),
        PRIMARY KEY ('id')
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS chapters (
        'id' BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        'novel_id' INTEGER UNSIGNED NOT NULL,
        'slug' VARCHAR(255) NOT NULL,
        'title' VARCHAR(255) NOT NULL,
        'content_length' INTEGER NOT NULL DEFAULT 0,
        'volume' VARCHAR(10) NOT NULL,
        'chapter' VARCHAR(10) NOT NULL,
        'content' LONGTEXT NOT NULL,
        'view' BIGINT NOT NULL DEFAULT 0,
        'created_at' TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
        'updated_at' TIMESTAMP(0) NULL,
    
        UNIQUE INDEX 'chapters_slug_unique'('slug'),
        INDEX 'chapters_id_index'('id'),
        INDEX 'chapters_novel_id_index'('novel_id'),
        INDEX 'chapters_title_index'('title'),
        PRIMARY KEY ('id')
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS histories (
        'id' BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        'chapter_id' BIGINT UNSIGNED NOT NULL,
        'created_at' TIMESTAMP(0) NULL,
        'updated_at' TIMESTAMP(0) NULL,
    
        INDEX 'histories_chapter_id_index'('chapter_id'),
        INDEX 'histories_user_id_index'('user_id'),
        PRIMARY KEY ('id')
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS bookmarks (
        'id' BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        'novel_id' INTEGER UNSIGNED NOT NULL,
        'created_at' TIMESTAMP(0) NULL,
        'updated_at' TIMESTAMP(0) NULL,
    
        INDEX 'bookmarks_novel_id_index'('novel_id'),
        INDEX 'bookmarks_user_id_index'('user_id'),
        PRIMARY KEY ('id')
    );`
  );

  await database.execAsync(
    "ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_novel_id_foreign` FOREIGN KEY (`novel_id`) REFERENCES `novels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;"
  );

  await database.execAsync(
    "ALTER TABLE `chapters` ADD CONSTRAINT `chapters_novel_id_foreign` FOREIGN KEY (`novel_id`) REFERENCES `novels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;"
  );
  await database.execAsync(
    "ALTER TABLE `histories` ADD CONSTRAINT `histories_chapter_id_foreign` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;"
  );

  console.log("✅ Table created or already exists.");
};

export const createNovel = () => {};
