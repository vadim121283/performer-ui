import React, { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

import { AppBarComponent } from '../appBar/AppBarComponent';
import { DrawerComponent, DrawerHeader } from '../drawer/DrawerComponent';
import { DrawerMenuItem } from '../../../data/drawer/DrawerMenuItem';
import { useDrawerStorage } from '../../../data/drawer/DrawerStorage';
import { gql } from '@apollo/client';
import { useGqlOperate } from '../../../data/graphql/GqlOperate';
import { useGqlStorage } from '../../../data/graphql/GqlStorage';

const MainPageSelector = ({
  menuItem,
}: {
  menuItem: DrawerMenuItem;
}): JSX.Element => {
  switch (menuItem) {
    case DrawerMenuItem.dashboard:
      return <></>;
    default:
      return <></>;
  }
};

const exMessage = gql`
  query ExampleQuery {
    users {
      guid
      login
    }
  }
`;

export const MainComponent = (): JSX.Element => {
  const { menuItem } = useDrawerStorage();
  const { connectGql, sendGqlMessage } = useGqlOperate();
  const { gqlClient } = useGqlStorage();

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    connectGql();
  }, []);

  useEffect(() => {
    if (gqlClient) {
      sendGqlMessage(exMessage);
    }
  }, [gqlClient]);

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
