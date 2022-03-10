import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

import { AppBarComponent } from '../appBar/AppBarComponent';
import { DrawerComponent, DrawerHeader } from '../drawer/DrawerComponent';
import { DrawerMenuItem } from '../../../data/drawer/DrawerMenuItem';
import { useDrawerStorage } from '../../../data/drawer/DrawerStorage';
import { UsersComponent } from '../users/UsersComponent';
import { useUsersViewModel } from '../../view-model/users/UsersViewModel';

const Users = () => <UsersComponent model={useUsersViewModel()} />;

const MainPageSelector = ({
  menuItem,
}: {
  menuItem: DrawerMenuItem;
}): JSX.Element => {
  switch (menuItem) {
    case DrawerMenuItem.dashboard:
      return <></>;
    case DrawerMenuItem.users:
      return <Users />;
    default:
      return <></>;
  }
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
