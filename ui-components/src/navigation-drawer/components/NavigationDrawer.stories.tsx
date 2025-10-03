import type { Meta, StoryObj } from '@storybook/react';
import { NavigationDrawer } from './NavigationDrawer';
import { AppHeader } from '../../app-header/components/AppHeader';
import { NavigationDrawerProvider, useNavigationDrawer } from '../context';
import { useEffect } from 'react';
import { NavigationDrawerItem } from '../types';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';
import { ThemeSwitcher } from '../../theme';

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
  const {
    appHeaderHeight,
    appHeaderRef,
    containerLeftMargin,
    setState,
    state,
  } = useNavigationDrawer();
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
      <div style={{
        top: `${appHeaderHeight}px`,
        left: `${containerLeftMargin}px`,
        transition: 'all 0.3s ease-in-out',
        position: 'fixed',
      }}>
        <div>Line 1 is a block.</div>
        <ThemeSwitcher />
        <p>Line 2 is a paragraph.</p>
        <p>Low-RAM Ipsum.</p>
      </div>
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
