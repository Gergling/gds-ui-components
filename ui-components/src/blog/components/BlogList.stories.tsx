import type { Meta, StoryObj } from '@storybook/react';
import { BlogList, BlogListProps } from './BlogList';
import { action } from 'storybook/actions';
import { PropsWithChildren, ReactNode } from 'react';

const meta: Meta<typeof BlogList> = {
  component: BlogList,
  title: 'Data Display/Blog List',
};

export default meta;
type Story = StoryObj<typeof BlogList>;

const Wrapper = ({ children }: PropsWithChildren): ReactNode => children;

const articles: BlogListProps['articles'] = [
  {
    media: {
      image: '/images/red.jpg',
    },
    onClick: action('stop-making-art-and-do-what-you-are-told'),
    subheader: 'Published 13 seconds ago',
    title: <Wrapper>Do we really need more art?</Wrapper>,
  },
  {
    media: {
      image: '/images/yellow.png',
    },
    onClick: action('you-have-no-friends-only-the-chosen-authority-figure-cares'),
    subheader: 'Published 13 minutes ago',
    title: <div style={{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '12rem',
      height: '4rem',
    }}>How to know if your friends don't like you</div>,
  },
  {
    media: {
      image: '/images/green.png',
    },
    onClick: action('buy-our-expensive-health-products'),
    subheader: 'Published 13 hours ago',
    title: 'The doctor says you are in perfect health, but are you?',
  },
  {
    media: {
      image: '/images/blue.png',
    },
    onClick: action('you-will-not-be-successful-because-you-were-not-born-rich'),
    subheader: 'Published 13 days ago',
    title: '5 common mistakes which cost people their whole careers',
  },
];

export const Default: Story = {
  args: {
    articles,
  },
};
