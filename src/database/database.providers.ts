
import { envs } from 'src/config/envs';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: envs.HOST_DATABASE,
                port: envs.PORT_DATABASE,
                username: envs.USERNAME_DATABASE,
                password: envs.PASSWORD_DATABASE,
                database: envs.NAME_DATABASE,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
