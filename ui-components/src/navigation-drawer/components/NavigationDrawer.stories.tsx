import type { Meta, StoryObj } from '@storybook/react';
import { NavigationDrawer } from './NavigationDrawer';
import { AppHeader } from '../../app-header/components/AppHeader';
import { NavigationDrawerProvider, useNavigationDrawer } from '../context';
import { useEffect } from 'react';
import { NavigationDrawerItem } from '../types';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';

const items: NavigationDrawerItem[] = [
  {
    icon: <HomeIcon />,
    text: 'Home',
    onClick: () => console.log('go home'),
  },
  {
    icon: <ListIcon />,
    text: 'Blogs',
    onClick: () => console.log('go to blogs'),
  },
];

const Wrapper = () => {
  const { setState, state, appHeaderRef } = useNavigationDrawer();
  const handleToggleMenu = () => setState(!state);

  useEffect(() => setState(true), [setState]);

  return (
    <>
      <AppHeader
        title="Navigation Drawer Example"
        toggleMenu={handleToggleMenu}
        appBarProps={{
          ref: appHeaderRef
        }}
      />
      <NavigationDrawer items={items} />
    </>
  );
};

const WrapperProvider = () => (
  <NavigationDrawerProvider>
    <Wrapper />
  </NavigationDrawerProvider>
);

const meta: Meta<typeof NavigationDrawer> = {
  component: WrapperProvider,
  title: 'Navigation/Drawer',
};

export default meta;
type Story = StoryObj<typeof NavigationDrawer>;

export const Default: Story = {
  args: {},
};
