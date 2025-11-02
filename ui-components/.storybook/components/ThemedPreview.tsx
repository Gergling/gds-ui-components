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
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme({ mode: globals.themeMode });
  }, [globals.themeMode, setTheme]);

  return (
    <ErrorBoundary fallback={<div>Something bad has happened.</div>}>
      <div style={{
        marginTop: '50px',
      }}>
        {children}
      </div>
    </ErrorBoundary>
  );
};
