import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'error' | 'beaforExist'
  >
  implements OnModuleInit
{
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    // console.log(process.env.NODE_ENV);
    // console.log(this.configService.get<string>('AT_SECRET'));

    try {
      await this.$connect();
      // console.log('Connected to database');
    } catch (err) {
      console.error(`Error connecting to database: ${err.message}`);
      process.exit(1);
    }
    this.$on('query', (e) => {
      // console.log(`Query: ${e.query}`);
      // console.log(`Params: ${JSON.stringify(e.params)}`);
      // console.log(`Duration: ${e.duration}ms`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beaforExist', async () => {
      await app.close();
      console.log('Application shut down successfully');
    });
  }
}
