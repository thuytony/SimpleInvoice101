import Config from 'react-native-config';

// if (!Config.CLIENT_ID || !Config.CLIENT_SECRET || !Config.AUTH_BASE_URL || !Config.MAIN_BASE_URL) {
//   throw new Error('Missing required environment variables');
// }

// export const appConfig = {
//   api: {
//     authBaseUrl: Config.AUTH_BASE_URL,
//     baseUrl: Config.MAIN_BASE_URL,
//     timeout: 15000,
//   },
//   auth: {
//     clientId: Config.CLIENT_ID,
//     clientSecret: Config.CLIENT_SECRET,
//     grantType: 'password',
//     scope: 'openid',
//   },
// } as const;


export const appConfig = {
  api: {
    authBaseUrl: 'https://is-101digital-sandbox.101digital.io',
    baseUrl: 'https://api-wso2-101digital-sandbox.101digital.io',
    timeout: 15000,
  },
  auth: {
    clientId: 'v3V87ZIqjdUMnQlf4yv7eW3k1aAa',
    clientSecret: 'DXhnQ6TcE_wisvn6mWqAUqJrtpQa',
    grantType: 'password',
    scope: 'openid',
  },
} as const;