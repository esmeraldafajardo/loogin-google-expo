export const GOOGLE_CONFIG_DEV = {
  clientId:
    '554160733577-6651gmlbpadb52tvbv62010nf79ok8is.apps.googleusercontent.com',
  iosClientId:
    '554160733577-v979srseula768ptok2fholrlig2bf08.apps.googleusercontent.com',
  scopesForLogIn: ['profile', 'email'],
  scopesForGmailAuthz: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/gmail.readonly',
  ],
  gmailRedirectURI:
    'https://auth.expo.io/@anonymous/lingocards-8367d658-4670-4a97-b67e-136d61bb7944',
  googleOauthEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth/',
};

export const getGoogleConfig = () => {
  // eslint-disable-next-line no-console
  console.warn('Running without ENV. Using development');
  return GOOGLE_CONFIG_DEV;
};
