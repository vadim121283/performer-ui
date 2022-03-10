import React from 'react';
import { User } from '../../../common/domain/entity/User';
import { UsersViewModel } from '../../view-model/users/UsersViewModel';

export const UsersComponent = ({
  model,
}: {
  model: UsersViewModel;
}): JSX.Element => {
  const { users } = model;

  if (users) {
    return (
      <>
        {users.map((user: User) => (
          <div key={user.login}>
            <p>
              {user.login}: {user.guid}
            </p>
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};
