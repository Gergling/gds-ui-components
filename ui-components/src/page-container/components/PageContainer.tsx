import { PropsWithChildren, useEffect } from "react";
import {
  NavigationDrawer,
  NavigationDrawerProps,
  NavigationDrawerProvider,
  useNavigationDrawer,
} from "../../navigation-drawer";
import { AppHeader, AppHeaderProps } from "../../app-header";

type PageContainerProps = PropsWithChildren & {
  appHeaderProps?: Partial<AppHeaderProps>;
  navigationDrawerProps: NavigationDrawerProps;
};

const Wrapper = ({
  appHeaderProps,
  children,
  navigationDrawerProps: { items },
}: PageContainerProps) => {
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
        marginTop: `${appHeaderHeight}px`,
        marginLeft: `${containerLeftMargin}px`,
        transition: 'all 0.3s ease-in-out',
        // position: 'fixed',
      }}>
        {children}
      </div>
    </>
  );
};

export const PageContainer = ({
  appHeaderProps,
  children,
  navigationDrawerProps
}: PageContainerProps) => (
  <NavigationDrawerProvider>
    <Wrapper
      appHeaderProps={appHeaderProps}
      navigationDrawerProps={navigationDrawerProps}
    >
      {children}
    </Wrapper>
  </NavigationDrawerProvider>
);
