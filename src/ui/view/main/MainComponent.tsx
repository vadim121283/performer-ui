import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

import { AppBarComponent } from '../appBar/AppBarComponent';
import { DrawerComponent, DrawerHeader } from '../drawer/DrawerComponent';
import { DrawerMenuItem } from '../../../data/drawer/DrawerMenuItem';
import { useDrawerStorage } from '../../../data/drawer/DrawerStorage';
import { gql, useQuery } from '@apollo/client';
import { User } from '../../../common/domain/entity/User';

const MainPageSelector = ({
  menuItem,
}: {
  menuItem: DrawerMenuItem;
}): JSX.Element => {
  switch (menuItem) {
    case DrawerMenuItem.dashboard:
      return <GQLTest />;
    default:
      return <></>;
  }
};

const EX_MESSAGE = gql`
  query ExampleQuery {
    users {
      guid
      login
    }
  }
`;

const GQLTest = () => {
  const { loading, error, data } = useQuery(EX_MESSAGE);
  console.log(data);

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

export const MainComponent = (): JSX.Element => {
  const { menuItem } = useDrawerStorage();

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarComponent open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
      <DrawerComponent
        open={openDrawer}
        handleDrawerClose={handleDrawerClose}
      />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <MainPageSelector menuItem={menuItem} />
      </Box>
    </Box>
  );
};
