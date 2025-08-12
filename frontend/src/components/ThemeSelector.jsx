import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore"; // ajustá la ruta

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className="btn btn-ghost btn-circle " onClick={toggleTheme}>
      {theme === "dark" ? <div className="indicator">
        <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
          <Sun className="size-5"/>
        </div>
      </div> : <div className="indicator">
        <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
          <Moon className="size-5"/>
        </div>
      </div>}
    </button>
  );
};

export default ThemeSelector;