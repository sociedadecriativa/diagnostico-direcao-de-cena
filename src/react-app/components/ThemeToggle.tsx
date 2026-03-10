import { Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useApp();

  return (
    <button
      onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
      aria-label={themeMode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {themeMode === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
