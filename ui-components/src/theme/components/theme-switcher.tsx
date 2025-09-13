import { FormControlLabel, FormGroup } from "@mui/material";
import { ThemeModeSwitch } from "./theme-switcher.style";
import { useAppTheme } from "../context";

// Example usage of a button to switch the theme
export const ThemeSwitcher = (): React.JSX.Element => {
  const { mode, setTheme } = useAppTheme();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme({ mode: event.target.checked ? 'dark' : 'light' });
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <ThemeModeSwitch
            sx={{ m: 1 }}
            checked={mode === 'dark'}
            onChange={handleChange}
          />
        }
        label="Mode switch"
      />
    </FormGroup>
  );
};
