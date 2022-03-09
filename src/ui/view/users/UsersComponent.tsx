import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { User } from '../../../common/domain/entity/User';

const EX_MESSAGE = gql`
  query ExampleQuery {
    users {
      guid
      login
    }
  }
`;

export const UsersComponent = (): JSX.Element => {
  const { loading, error, data } = useQuery(EX_MESSAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map((user: User) => (
    <div key={user.login}>
      <p>
        {user.login}: {user.guid}
      </p>
    </div>
  ));
};
