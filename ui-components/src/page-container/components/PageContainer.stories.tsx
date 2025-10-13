import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { within, userEvent, waitFor, expect } from 'storybook/test';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';
import { NavigationDrawerItem } from '../../navigation-drawer/types';
import { PageContainer } from './PageContainer';

const SAFE_TIMEOUT = 350;

type StoryUtilityProps<T extends React.FC<U>, U = Parameters<T>[0]> = {
  Meta: Meta<T>;
  Story: StoryObj<T>;
  Play: StoryContext<U>;
};

type PageContainerStoryProps = StoryUtilityProps<typeof PageContainer>;

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

const Wrapper = () => (
  <PageContainer
    appHeaderProps={{
      title: 'PageContainer Example',
    }}
    navigationDrawerProps={{
      items,
    }}
  >
    <div>This encapsulates a common use-case for the navigation drawer and app header.</div>
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

// Testing utilities
const getNavButtonElements = (
  canvasElement: HTMLElement
) => items.map(({
  text: name
}) => ({
  button: within(canvasElement).getByRole('button', { name: new RegExp(name, 'i') }),
  name,
}));

const getBackdrop = (canvasElement: HTMLElement) => within(canvasElement).getByLabelText('Close Navigation Drawer')

const clickMenuButton = ({
  canvasElement,
  step
}: PageContainerStoryProps['Play']) => step(
  'Click the menu button to toggle the drawer',
  () => userEvent.click(within(canvasElement).getByRole('button', { name: 'menu' })),
);
const clickBackdrop = ({
  canvasElement,
  step
}: PageContainerStoryProps['Play']) => step(
  'Click the backdrop to close the drawer',
  () => userEvent.click(getBackdrop(canvasElement)),
);

const waitForBackdrop = async (
  { canvasElement }: PageContainerStoryProps['Play'],
  assertionCondition: (backdropElement: HTMLElement) => Promise<void> | void,
) => {
  const backdropElement = await within(canvasElement).findByLabelText('Close Navigation Drawer');
  await waitFor(() => assertionCondition(backdropElement), { timeout: SAFE_TIMEOUT });
};

const waitForNavigationButtonElement = async (
  assertionCondition: () => Promise<void> | void,
) => waitFor(() => assertionCondition(), { timeout: SAFE_TIMEOUT });

// Assertions
const assertNavRailOnlyVisibility = (
  { canvasElement, step }: PageContainerStoryProps['Play']
) => step(
  'Check Navigation Drawer rail icons are visible and text is invisible',
  async () => getNavButtonElements(canvasElement).forEach(
    ({ button, name }) => {
      const textElement = within(button).getByText(name);
      expect(button).toBeVisible();
      waitForNavigationButtonElement(() => expect(textElement).toHaveStyle({
        width: 0,
      }));
    }
  )
);

const assertNavFullVisibility = (
  { canvasElement, step }: PageContainerStoryProps['Play'],
) => step(
  'Check Navigation Drawer rail and text are both visible',
  async () => {
    const elements = getNavButtonElements(canvasElement);

    for (const { button, name } of elements) {
      expect(button).toBeVisible();
      await waitFor(() => expect(button).toHaveTextContent(name), { timeout: SAFE_TIMEOUT })
    }
  }
);
  
const assertNavInvisibility = ({
  canvasElement,
  step,
}: PageContainerStoryProps['Play']) => step(
  'Check Navigation Drawer is invisible',
  () => items.forEach(({
    text
  }) => {
    expect(within(canvasElement).queryByText(text)).not.toBeVisible();
  })
);

const assertBackdropVisibility = (
  storyProps: PageContainerStoryProps['Play']
) => storyProps.step(
  'Check Navigation Drawer Backdrop is visible',
  () => waitForBackdrop(
    storyProps,
    (backdropElement) => expect(backdropElement).toBeVisible(),
  ),
);

const assertBackdropInvisibility = (
  storyProps: PageContainerStoryProps['Play']
) => storyProps.step(
  'Check Navigation Drawer Backdrop is invisible',
  () => waitForBackdrop(
    storyProps,
    (backdropElement) => expect(backdropElement).not.toBeVisible(),
  ),
);

// Interaction Test Stories
export const Mobile_CloseWithMenuButton: Story = {
  args: {},
  name: 'Mobile: Close With Menu Button',
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  play: async (props) => {
    await assertBackdropInvisibility(props);
    await assertNavInvisibility(props);

    await clickMenuButton(props);

    await assertNavFullVisibility(props);
    await assertBackdropVisibility(props);

    await clickMenuButton(props);

    await assertNavInvisibility(props);
    await assertBackdropInvisibility(props);
  },
};

export const Mobile_CloseWithBackdrop: Story = {
  args: {},
  name: 'Mobile: Close With Backdrop',
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  play: async (props) => {
    await assertBackdropInvisibility(props);
    await assertNavInvisibility(props);

    await clickMenuButton(props);

    await assertNavFullVisibility(props);
    await assertBackdropVisibility(props);

    await clickBackdrop(props);

    await assertNavInvisibility(props);
    await assertBackdropInvisibility(props);
  },
};

export const Tablet_CloseWithMenuButton: Story = {
  args: {},
  name: 'Tablet: Close With Menu Button',
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
  play: async (props) => {
    await assertBackdropInvisibility(props);
    await assertNavRailOnlyVisibility(props);

    await clickMenuButton(props);

    await assertNavFullVisibility(props);
    await assertBackdropVisibility(props);

    await clickMenuButton(props);

    await assertNavRailOnlyVisibility(props);
    await assertBackdropInvisibility(props);
  },
};

export const Tablet_CloseWithBackdrop: Story = {
  args: {},
  name: 'Tablet: Close With Backdrop',
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
  play: async (props) => {
    await assertBackdropInvisibility(props);
    await assertNavRailOnlyVisibility(props);

    await clickMenuButton(props);

    await assertNavFullVisibility(props);
    await assertBackdropVisibility(props);

    await clickBackdrop(props);

    await assertNavRailOnlyVisibility(props);
    await assertBackdropInvisibility(props);
  },
};

export const Desktop_CloseWithMenuButton: Story = {
  args: {},
  name: 'Desktop: Close With Menu Button',
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  play: async (props) => {
    await assertBackdropInvisibility(props);
    await assertNavRailOnlyVisibility(props);

    await clickMenuButton(props);

    await assertNavFullVisibility(props);
    await assertBackdropInvisibility(props);

    await clickMenuButton(props);

    await assertNavRailOnlyVisibility(props);
    await assertBackdropInvisibility(props);
  },
};
