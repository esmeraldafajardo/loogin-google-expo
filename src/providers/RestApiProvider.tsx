import type { FC } from 'react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RestApi from '../apis/rest';
import { getUser } from '../store/selectors/auth';

interface Props {
  children: React.ReactNode;
}

const RestApiProvider: FC<Props> = ({ children }) => {
  const user = useSelector(getUser);
console.log(user,'--------------------****************************')
  // useEffect(() => {
  //   const api = RestApi.getInstance();
  //   if (user) api.setUser(user);
  // }, [user]);

  if (!children) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default RestApiProvider;
