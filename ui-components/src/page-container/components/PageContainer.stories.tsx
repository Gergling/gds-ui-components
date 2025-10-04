import type { Meta, StoryObj } from '@storybook/react';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';
import { ThemeSwitcher } from '../../theme';
import { NavigationDrawerItem } from '../../navigation-drawer/types';
import { PageContainer } from './PageContainer';

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

const Wrapper = () => (
  <PageContainer items={items}>
    <div>Line 1 is a block.</div>
    <ThemeSwitcher />
    <p>Line 2 is a paragraph.</p>
    <p>Low-RAM Ipsum.</p>
  </PageContainer>
);

const meta: Meta<typeof PageContainer> = {
  component: Wrapper,
  title: 'Navigation/Page Container',
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {
  args: {},
};
