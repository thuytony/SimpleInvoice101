import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import Navigation from './navigation';
import { LoadingSpinner } from './components/common';
import { useAuth } from './hooks/useAuth';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { queryClient } from './constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Navigation />
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <AppContent />
        </PaperProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default App;