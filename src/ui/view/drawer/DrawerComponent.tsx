import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { useIntl } from 'react-intl';
import { useDrawerViewModel } from '../../view-model/drawer/DrawerViewModel';
import { DrawerMenuItem } from '../../../data/drawer/DrawerMenuItem';

export const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const DrawerComponent = ({ open, handleDrawerClose }: { open: boolean; handleDrawerClose: () => void }) => {
  const COMPONENT_ID = `DrawerComponent`;

  const { logout, menuItem, setMenuItem } = useDrawerViewModel();
  const theme = useTheme();
  const intl = useIntl();

  const handlerMenuButton = (menuItem: DrawerMenuItem) => {
    setMenuItem(menuItem);
  };

  const firstButtons = [
    {
      id: `${COMPONENT_ID}-dashboard-button`,
      text: intl.formatMessage({ id: `drawer.dashboard` }),
      icon: <DashboardIcon />,
      menuItem: DrawerMenuItem.dashboard,
    },
    {
      id: `${COMPONENT_ID}-accidents-button`,
      text: intl.formatMessage({ id: `drawer.accidents` }),
      icon: <ReportProblemIcon />,
      menuItem: DrawerMenuItem.accidents,
    },
    {
      id: `${COMPONENT_ID}-operators-button`,
      text: intl.formatMessage({ id: `drawer.operators` }),
      icon: <PeopleIcon />,
      menuItem: DrawerMenuItem.operators,
    },
    {
      id: `${COMPONENT_ID}-threads-button`,
      text: intl.formatMessage({ id: `drawer.threads` }),
      icon: <SettingsApplicationsIcon />,
      menuItem: DrawerMenuItem.threads,
    },
  ];

  const secondButtons = [
    {
      id: `${COMPONENT_ID}-logout-button`,
      text: intl.formatMessage({ id: `drawer.logout` }),
      icon: <LogoutIcon />,
      click: logout,
    },
  ];

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton id={`${COMPONENT_ID}-drawer-close-button`} onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {firstButtons.map((button, index) => (
          <ListItemButton
            id={button.id}
            key={button.text}
            onClick={() => handlerMenuButton(button.menuItem)}
            selected={menuItem === button.menuItem}
          >
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {secondButtons.map((button, index) => (
          <ListItem button id={button.id} key={button.text} onClick={button.click}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
