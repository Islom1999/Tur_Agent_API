import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLINT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLINT_SECRET'),
      callbackURL: `${config.get<string>(
        'APP_URL',
      )}/auth/client/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      firstname: name.givenName,
      lastname: name.familyName,
      //   picture: photos[0].value,
      //   accessToken
    };
    return user;
  }
}
