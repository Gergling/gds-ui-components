import { PropsWithChildren, useEffect } from "react";
import {
  NavigationDrawer,
  NavigationDrawerItem,
  NavigationDrawerProvider,
  useNavigationDrawer,
} from "../../navigation-drawer";
import { AppHeader } from "../../app-header";

type PageContainerProps = PropsWithChildren & {
  items: NavigationDrawerItem[];
};

const Wrapper = ({ children, items }: PageContainerProps) => {
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

export const PageContainer = ({ children, items }: PageContainerProps) => (
  <NavigationDrawerProvider>
    <Wrapper items={items}>
      {children}
    </Wrapper>
  </NavigationDrawerProvider>
);
