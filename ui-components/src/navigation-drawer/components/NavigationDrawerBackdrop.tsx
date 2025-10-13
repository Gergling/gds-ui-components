import { Backdrop } from "@mui/material";
import { useNavigationDrawer } from "../context";

export const NavigationDrawerBackdrop = () => {
  const {
    props: {
      backdrop,
    },
    setState,
  } = useNavigationDrawer();

  return (
    <Backdrop
      aria-label="Close Navigation Drawer"
      aria-hidden={undefined}
      sx={(theme) => ({
        color: theme.colors.primary.on,
        zIndex: theme.zIndex.drawer
      })}
      open={backdrop}
      onClick={() => setState(false)}
    />
  );
}