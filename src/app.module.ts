import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // No need to import into other modules
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb', // Change to 'postgres' or 'mysql' for SQL databases
        url: process.env.DATABASE_URL,
        useNewUrlParser: true,
        synchronize: true, // Ensure production settings are safe for use!
        useUnifiedTopology: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
