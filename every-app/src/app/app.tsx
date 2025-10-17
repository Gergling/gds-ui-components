import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';
import {
  AppThemeProvider,
  BlogList,
  BlogSummaryProps,
  MetricChip,
  PageContainer,
  useTheme,
} from '@gergling/ui-components-local';
import { NavigationDrawerItem } from '@gergling/ui-components-local/navigation-drawer';
import '@fontsource-variable/bodoni-moda-sc';
import '@fontsource-variable/raleway';
import '@fontsource-variable/raleway/wght-italic.css';

const StyledApp = styled.div`
  // Your style here
`;

const ThemeDisplay = () => {
  const { theme: { colors } } = useTheme();
  return (
    <>
      <div style={{ backgroundColor: colors.primary.main, color: colors.primary.on }}>Primary: {colors.primary.main}</div>
      <div style={{ backgroundColor: colors.secondary.main, color: colors.secondary.on }}>Secondary: {colors.secondary.main}</div>
      <div style={{ backgroundColor: colors.tertiary.main, color: colors.tertiary.on }}>Tertiary: {colors.tertiary.main}</div>
    </>
  );
};

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

export function App() {
  const articles: BlogSummaryProps[] = [
    {
      media: {
        image: '/images/red.jpg',
      },
      onClick: () => 'red',
      subheader: 'Published 13 minutes ago',
      title: 'Red',
    },
    {
      media: {
        image: '/images/green.png',
      },
      onClick: () => 'green',
      subheader: 'Published 13 hours ago',
      title: 'Green',
    },
    {
      media: {
        image: '/images/blue.png',
      },
      onClick: () => 'blue',
      subheader: 'Published 13 days ago',
      title: 'Blue',
    },
  ];
  return (
    <AppThemeProvider>
      <StyledApp>
        <PageContainer
          appHeaderProps={{
            title: 'Gregory, Michael & Davies',
          }}
          navigationDrawerProps={{
            items
          }}
        >
          <div style={{ margin: '1rem' }}>
            <MetricChip label='Days since last build issue' value='0' color='primary' />
          </div>
          <ThemeDisplay />
          <BlogList articles={articles} />
        </PageContainer>


        {/* START: routes */}
        {/* These routes and navigation have been generated for you */}
        {/* Feel free to move and update them to fit your needs */}
        <br />
        <hr />
        <br />
        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page-2">Page 2</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
              </div>
            }
          />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            }
          />
        </Routes>
        {/* END: routes */}
      </StyledApp>
    </AppThemeProvider>
  );
}

export default App;
