import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { RoleModule } from './modules/role/role.module';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { CountryModule } from './modules/country/country.module';
import { RegionModule } from './modules/region/region.module';
import { PlanningModule } from './modules/planning/planning.module';
import { PartnerModule } from './modules/partner/partner.module';
import { PackageModule } from './modules/package/package.module';
import { RoutesModule } from './modules/routes/routes.module';
import { HighlightModule } from './modules/highlight/highlight.module';
import { AccommodationModule } from './modules/accommodation/accommodation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    AuthModule,
    CountryModule,
    RegionModule,
    RoleModule,
    UserModule,
    PlanningModule,
    PartnerModule,
    PackageModule,
    RoutesModule,
    HighlightModule,
    AccommodationModule,
    ImageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule { }
