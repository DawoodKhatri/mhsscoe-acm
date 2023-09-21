import ReduxProvider from "@/providers/reduxProvider";
import QueryProvider from "@/providers/queryClientProvider";
import ThemeProvider from "@/providers/themeProvider";
import LoadingProvider from "@/providers/loadingProvider";
import AuthProvider from "@/providers/authProvider";
import AntdStyleProvider from "./antdStyleProvider";

const AppProviders = ({ children }) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AntdStyleProvider>
          <ThemeProvider>
            <LoadingProvider>
              <AuthProvider>{children}</AuthProvider>
            </LoadingProvider>
          </ThemeProvider>
        </AntdStyleProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
