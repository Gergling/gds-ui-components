import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import {
  AppHeader,
  AppThemeProvider,
  useAppTheme,
} from '@gergling/ui-components';

const StyledApp = styled.div`
  // Your style here
`;

const ThemeDisplay = () => {
  const { theme: { colors } } = useAppTheme();
  return (
    <>
      <div style={{ backgroundColor: colors.primary.main, color: colors.primary.on }}>Primary: {colors.primary.main}</div>
      <div style={{ backgroundColor: colors.secondary.main, color: colors.secondary.on }}>Secondary: {colors.secondary.main}</div>
      <div style={{ backgroundColor: colors.tertiary.main, color: colors.tertiary.on }}>Tertiary: {colors.tertiary.main}</div>
    </>
  );
};

export function App() {
  return (
    <AppThemeProvider>
      <StyledApp>
        <AppHeader title='Gregory, Michael & Davies' />
        <ThemeDisplay />

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
