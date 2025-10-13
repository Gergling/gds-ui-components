import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { NavigationDrawer } from './NavigationDrawer';
import { AppHeader } from '../../app-header/components/AppHeader';
import { NavigationDrawerProvider, useNavigationDrawer } from '../context';
import { useEffect, useRef } from 'react';
import { NavigationDrawerAppBarHTMLElement, NavigationDrawerItem } from '../types';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';
import { ThemeSwitcher } from '../../theme';
import { useElementHeight } from '../../common/use-element-height';
import { NavigationDrawerBackdrop } from './NavigationDrawerBackdrop';

const items: NavigationDrawerItem[] = [
  {
    icon: <HomeIcon />,
    text: 'Home',
    onClick: action('go home'),
  },
  {
    icon: <ListIcon />,
    text: 'Blogs',
    onClick: action('go to blogs'),
  },
];

const Wrapper = () => {
  const {
    containerLeftMargin,
    setAppBarHeight,
    setState,
    state,
  } = useNavigationDrawer();
  const handleToggleMenu = () => setState(!state);

  const appHeaderRef = useRef<NavigationDrawerAppBarHTMLElement>(null);
  const appHeaderHeight = useElementHeight(appHeaderRef);

  useEffect(() => {
    setAppBarHeight(appHeaderHeight);
  }, [appHeaderHeight, setAppBarHeight]);
  useEffect(() => setState(true), [setState]);

  return (
    <>
      <NavigationDrawerBackdrop />
      <AppHeader
        title="Navigation Drawer Example"
        toggleMenu={handleToggleMenu}
        appBarProps={{
          ref: appHeaderRef
        }}
      />
      <NavigationDrawer />
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
  <NavigationDrawerProvider items={items}>
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
