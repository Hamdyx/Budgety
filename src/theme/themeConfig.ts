import { theme, type ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#21bf73',
    colorError: '#fd5e53',
    colorWarning: '#f7c025',
    colorInfo: '#4d7cfd',
    colorBgBase: '#212646',
    colorBgContainer: '#2a2d32',
    colorText: '#fbfcfe',
    colorTextSecondary: '#545963',
    colorSplit: '#363a3e',
    borderRadius: 8,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Layout: {
      siderBg: '#272a2f',
      bodyBg: '#212646',
      headerBg: '#272a2f',
    },
    Menu: {
      darkItemBg: '#272a2f',
      darkItemSelectedBg: '#21bf74',
      darkItemHoverBg: '#285944',
      darkItemColor: '#fbfcfe',
      darkItemSelectedColor: '#fbfcfe',
      itemBorderRadius: 15,
    },
    Card: {
      colorBgContainer: '#2a2d32',
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Divider: {
      marginLG: 12,
    },
  },
};

export default themeConfig;
