import { theme, type ThemeConfig } from 'antd';

type ThemeMode = 'light' | 'dark';

const baseTokens = {
  colorPrimary: '#21bf73',
  colorError: '#fd5e53',
  colorWarning: '#f7c025',
  colorInfo: '#4d7cfd',
  borderRadius: 8,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

const baseComponents: ThemeConfig['components'] = {
  Typography: {
    titleMarginBottom: 0,
    titleMarginTop: 0,
  },
  Divider: {
    marginLG: 12,
  },
  Menu: {
    itemBorderRadius: 15,
  },
};

export function getThemeConfig(mode: ThemeMode): ThemeConfig {
  if (mode === 'dark') {
    return {
      algorithm: theme.darkAlgorithm,
      token: {
        ...baseTokens,
        colorBgBase: '#1a1d2e',
        colorBgContainer: '#242838',
        colorText: '#f0f1f3',
        colorTextSecondary: '#9ca3af',
        colorBorder: '#363a4a',
        colorSplit: '#363a4a',
      },
      components: {
        ...baseComponents,
        Layout: {
          siderBg: '#1e2132',
          bodyBg: '#1a1d2e',
          headerBg: '#1e2132',
        },
        Menu: {
          ...baseComponents?.Menu,
          darkItemBg: 'transparent',
          darkItemSelectedBg: '#21bf74',
          darkItemHoverBg: 'rgba(33, 191, 115, 0.2)',
          darkItemColor: '#f0f1f3',
          darkItemSelectedColor: '#ffffff',
        },
        Card: {
          colorBgContainer: '#242838',
        },
      },
    };
  }

  return {
    algorithm: theme.defaultAlgorithm,
    token: {
      ...baseTokens,
      colorBgBase: '#f7f8fa',
      colorBgContainer: '#ffffff',
      colorText: '#1f2937',
      colorTextSecondary: '#6b7280',
      colorBorder: '#e5e7eb',
      colorSplit: '#e5e7eb',
    },
    components: {
      ...baseComponents,
      Layout: {
        siderBg: '#ffffff',
        bodyBg: '#f7f8fa',
        headerBg: '#ffffff',
      },
      Menu: {
        ...baseComponents?.Menu,
        itemSelectedBg: 'rgba(33, 191, 115, 0.12)',
        itemSelectedColor: '#16a34a',
        itemHoverBg: 'rgba(33, 191, 115, 0.06)',
      },
    },
  };
}
