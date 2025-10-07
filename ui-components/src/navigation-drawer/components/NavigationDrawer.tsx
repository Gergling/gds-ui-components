import { useNavigationDrawer } from "../context";
import { useCallback } from "react";
import { NavigationDrawerList } from "./NavigationDrawerList";
import { Drawer } from "@mui/material";

export const NavigationDrawer = () => {
  const {
    appHeaderHeight,
    props,
    setState,
  } = useNavigationDrawer();
  const onClose = useCallback(() => setState(false), [setState]);

  return (
    <Drawer
      variant={props.variant}
      open={props.open}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginTop: `${appHeaderHeight}px`,
          boxSizing: 'border-box',
        },
      }}
    >
      <NavigationDrawerList />
    </Drawer>
  );
};
