import { ThemeProvider } from '@/components/provider/theme-provider';

export default function AuthLayout({
    children,
    }: {
    children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
    <div>{children}</div>
    </ThemeProvider>
  )
}
