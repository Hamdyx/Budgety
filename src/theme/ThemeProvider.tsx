import type { ReactNode } from 'react';

import { App, ConfigProvider } from 'antd';
import { useEffect } from 'react';

import { useThemeStore } from '@/stores/themeStore';

import { getThemeConfig } from './themeConfig';

function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useThemeStore(state => state.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ConfigProvider theme={getThemeConfig(mode)}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

export default ThemeProvider;
