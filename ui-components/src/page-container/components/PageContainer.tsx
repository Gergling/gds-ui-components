import { PropsWithChildren, useEffect, useRef } from "react";
import {
  NavigationDrawer,
  NavigationDrawerProps,
  NavigationDrawerProvider,
  useNavigationDrawer,
} from "../../navigation-drawer";
import { AppHeader, AppHeaderProps } from "../../app-header";
import { useElementHeight } from "../../common/use-element-height";
import { Content } from "./PageContainer.style";
import { NavigationDrawerBackdrop } from "../../navigation-drawer/components/NavigationDrawerBackdrop";

type PageContainerProps = PropsWithChildren & {
  appHeaderProps?: Partial<AppHeaderProps>;
  navigationDrawerProps: NavigationDrawerProps;
};

const Wrapper = ({
  appHeaderProps,
  children,
}: PageContainerProps) => {
  const {
    containerLeftMargin,
    setAppBarHeight,
    setState,
    state,
  } = useNavigationDrawer();
  const handleToggleMenu = () => setState(!state);

  const appHeaderRef = useRef<HTMLDivElement>(null);
  const appHeaderHeight = useElementHeight(appHeaderRef);

  useEffect(() => {
    setAppBarHeight(appHeaderHeight);
  }, [appHeaderHeight, setAppBarHeight]);

  return (
    <>
      <NavigationDrawerBackdrop />
      <AppHeader
        toggleMenu={handleToggleMenu}
        appBarProps={{
          ...appHeaderProps,
          ref: appHeaderRef,
        }}
        {...appHeaderProps}
      />
      <NavigationDrawer />
      <Content
        appHeaderHeight={appHeaderHeight}
        containerLeftMargin={containerLeftMargin}
      >
        {children}
      </Content>
    </>
  );
};

export const PageContainer = ({
  appHeaderProps,
  children,
  navigationDrawerProps
}: PageContainerProps) => (
  <NavigationDrawerProvider items={navigationDrawerProps.items}>
    <Wrapper
      appHeaderProps={appHeaderProps}
      navigationDrawerProps={navigationDrawerProps}
    >
      {children}
    </Wrapper>
  </NavigationDrawerProvider>
);
