import { StoryContext } from '@storybook/react';
import { PropsWithChildren, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from '../../src/theme';

export const ThemedPreview = <T,>({
  children,
  globals,
}: {
  globals: StoryContext<T>['globals'];
} & PropsWithChildren) => {
  const { theme: { palette: { background } }, setTheme } = useTheme();

  useEffect(() => {
    setTheme({
      mode: globals.themeMode,
      project: globals.themeProject,
    });
  }, [globals.themeMode, globals.themeProject, setTheme]);

  return (
    <ErrorBoundary fallback={<div style={{
      color: 'white', backgroundColor: '#800', fontWeight: 'bold', padding: '10px'
    }}>Something bad has happened.</div>}>
      <div style={{ backgroundColor: background.default }}>
        <div style={{
          marginTop: '50px',
        }}>
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
};
