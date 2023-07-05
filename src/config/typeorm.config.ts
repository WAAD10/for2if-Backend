import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123qwe',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
