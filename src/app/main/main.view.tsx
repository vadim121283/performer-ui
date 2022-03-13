import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

import { AppBarView } from '../appBar/appBar.view';
import { DrawerComponent, DrawerHeader } from '../drawer/drawer.view';
import { DrawerMenuItem } from '../drawer/DrawerMenuItem';
import { useDrawerService } from '../drawer/drawer.service';
import { UsersView } from '../users/users.view';
import { useUsersViewModel } from '../users/users.view.model';

const Users = () => <UsersView model={useUsersViewModel()} />;

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

export const MainView = (): JSX.Element => {
  const { menuItem } = useDrawerService();

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
      <AppBarView open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
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
