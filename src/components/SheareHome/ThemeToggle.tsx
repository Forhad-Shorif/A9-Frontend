"use client";

import { useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";

// Chhoto theme toggle: html tag e "dark" class add/remove kore, ar choice
// localStorage e rakhe. React state na rekhe CSS (dark:hidden) diye icon
// change korchi, tai hydration mismatch hoy na.
//
// NOTE: page reload er por theme apply hoy src/app/layout.tsx er inline
// script diye, tai dashboard/auth page (navbar chara) o thik theme pay.
const ThemeToggle = () => {
  // Prothom load e user-er age selected theme apply kori (safety).
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    document.documentElement.style.colorScheme = isDarkNow ? "dark" : "light";
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full border-teal-100 bg-white text-teal-600 shadow-sm hover:bg-teal-50 dark:border-white/10 dark:bg-white/5 dark:text-teal-300 dark:hover:bg-white/10"
    >
      <HugeiconsIcon
        icon={Sun01Icon}
        size={18}
        strokeWidth={1.8}
        className="dark:hidden"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        size={18}
        strokeWidth={1.8}
        className="hidden dark:block"
      />
    </Button>
  );
};

export default ThemeToggle;
