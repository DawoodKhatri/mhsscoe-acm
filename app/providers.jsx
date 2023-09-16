import ReduxProvider from "@/providers/reduxProvider";
import QueryProvider from "@/providers/queryClientProvider";
import ThemeProvider from "@/providers/themeProvider";
import LoadingProvider from "@/providers/loadingProvider";
import AuthProvider from "@/providers/authProvider";

const AppProviders = ({ children }) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <LoadingProvider>
            <AuthProvider>{children}</AuthProvider>
          </LoadingProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
