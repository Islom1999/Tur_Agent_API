import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get<string>('FACEBOOK_CLINT_ID'), // App ID
      clientSecret: config.get<string>('FACEBOOK_CLINT_SECRET'), // App Secret
      callbackURL: `${config.get<string>(
        'APP_URL',
      )}/auth/client/facebook/callback`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      firstname: name.givenName,
      lastname: name.familyName,
      //   accessToken
    };
    return user;
  }
}
