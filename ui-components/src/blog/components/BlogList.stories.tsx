import type { Meta, StoryObj } from '@storybook/react';
import { BlogList, BlogListProps } from './BlogList';

const meta: Meta<typeof BlogList> = {
  component: BlogList,
  title: 'Blog/List',
};

export default meta;
type Story = StoryObj<typeof BlogList>;

const articles: BlogListProps['articles'] = [
  {
    media: {
      image: '/images/red.jpg',
    },
    slug: 'stop-making-art-and-do-what-you-are-told',
    subheader: 'Published 13 seconds ago',
    title: 'Do we really need more art?',
  },
  {
    media: {
      image: '/images/yellow.png',
    },
    slug: 'you-have-no-friends-only-the-chosen-authority-figure-cares',
    subheader: 'Published 13 minutes ago',
    title: 'How to know if your friends don\'t like you',
  },
  {
    media: {
      image: '/images/green.png',
    },
    slug: 'buy-our-expensive-health-products',
    subheader: 'Published 13 hours ago',
    title: 'The doctor says you are in perfect health, but are you?',
  },
  {
    media: {
      image: '/images/blue.png',
    },
    slug: 'you-will-not-be-successful-because-you-were-not-born-rich',
    subheader: 'Published 13 days ago',
    title: '5 common mistakes which cost people their whole careers',
  },
];

export const Default: Story = {
  args: {
    articles,
  },
};
