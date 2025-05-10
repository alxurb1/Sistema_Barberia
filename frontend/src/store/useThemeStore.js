import {create} from "zustand";

export const useThemeStore = create((set) =>({
    theme:localStorage.getItem("fav-theme") || "forest",
    setTheme: (theme) => {
        localStorage.setItem("fav-theme",theme);
        set({theme});
    },
}));