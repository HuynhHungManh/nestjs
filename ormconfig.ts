import { ConnectionOptions } from 'typeorm';
export default {
  type: 'mysql',
  host: 'database_server',
  port: 3306,
  username: 'nestjs_user',
  password: 'nestjs123',
  database: 'nestjs',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
} as ConnectionOptions;
