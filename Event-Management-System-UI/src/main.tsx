import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "next-themes"
import { AppProvider } from "@/context/app-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider delay={200}>
        <AppProvider>
          <App />
          <Toaster position="top-right" />
        </AppProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
