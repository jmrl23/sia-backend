import { get } from 'env-var';

export default () => ({
  NODE_ENV: get('NODE_ENV')
    .default('development')
    .asEnum(['development', 'production', 'test']),

  PORT: get('PORT').default(3001).asIntPositive(),

  ALLOWED_ORIGINS: get('ALLOWED_ORIGINS').required().asArray(','),

  NONCE: get('NONCE').default('keyboard_cat').asString(),

  CLIENT_URL: get('CLIENT_URL').required().asUrlString(),

  REDIS_URL: get('REDIS_URL').required().asUrlObject(),

  JWT_SECRET: get('JWT_SECRET').required().asString(),

  SMTP_TRANSPORT_URL: get('SMTP_TRANSPORT_URL').required().asUrlString(),

  DRIVE_FOLDER_ID: get('DRIVE_FOLDER_ID').required().asString(),

  BYPASS_KEY: get('BYPASS_KEY').default('keyboard_cat').asString(),

  GOOGLE_CLIENT_ID: get('GOOGLE_CLIENT_ID').required().asString(),

  GOOGLE_CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').required().asString(),

  GOOGLE_REFRESH_TOKEN: get('GOOGLE_REFRESH_TOKEN').required().asString(),

  GOOGLE_PLAYGROUND_URL: get('GOOGLE_PLAYGROUND_URL')
    .default('https://developers.google.com/oauthplayground')
    .asUrlString(),
});
