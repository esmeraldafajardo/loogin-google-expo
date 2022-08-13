import React, { useEffect } from 'react';
import type { FC } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Localization from 'expo-localization';
import { useDispatch } from 'react-redux';

// import GoogleLogo from '../../../assets/img/googleIcon';
import { authenticate } from '../../store/slices/auth';
import { getGoogleConfig } from '../../config/google';
import ProviderAuthButton from './ProviderAuthButton';

interface Props {
  text?: string;
}

const SignInWithGoogle: FC<Props> = ({ text = 'Sign in with Google' }) => {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: getGoogleConfig().clientId,
    webClientId: getGoogleConfig().clientId,
    iosClientId: getGoogleConfig().iosClientId,
    scopes: getGoogleConfig().scopesForLogIn,
    language: Localization.locale,
    selectAccount: true,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token: idToken } = response.params;
      dispatch(authenticate({ provider: 'GOOGLE', id_token: idToken }));
    }
  }, [dispatch, response]);

  return (
    <ProviderAuthButton
      text={text}
      // icon={<GoogleLogo />}
      onPress={() => promptAsync()}
      disabled={!request}
    />
  );
};

export default SignInWithGoogle;
