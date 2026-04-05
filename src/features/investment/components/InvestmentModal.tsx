import type { ColumnsType } from 'antd/es/table';
import type { InvestmentCoin } from 'types/types';

import { Modal, Table, InputNumber, Button, Typography } from 'antd';
import { useMemo, useState } from 'react';

type InvestmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const seedCoins: InvestmentCoin[] = [
  {
    name: 'BNB',
    buyPrice: 350,
    buyAmount: 500,
    sellPrice: 500,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'CAKE',
    buyPrice: 18,
    buyAmount: 500,
    sellPrice: 35,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'ETH',
    buyPrice: 2700,
    buyAmount: 370,
    sellPrice: 3500,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'LINK',
    buyPrice: 32,
    buyAmount: 250,
    sellPrice: 45,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: '1INCH',
    buyPrice: 3.5,
    buyAmount: 250,
    sellPrice: 5.5,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'REEF',
    buyPrice: 0.25,
    buyAmount: 250,
    sellPrice: 0.45,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'SOL',
    buyPrice: 33,
    buyAmount: 250,
    sellPrice: 50,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'SWAP',
    buyPrice: 1.25,
    buyAmount: 250,
    sellPrice: 3.25,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'SUPER',
    buyPrice: 0.8,
    buyAmount: 250,
    sellPrice: 1.75,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'XED',
    buyPrice: 0.31,
    buyAmount: 200,
    sellPrice: 0.6,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'BONDLY',
    buyPrice: 0.22,
    buyAmount: 200,
    sellPrice: 0.45,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'BSCX',
    buyPrice: 3.75,
    buyAmount: 200,
    sellPrice: 10,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'DDIM',
    buyPrice: 16.5,
    buyAmount: 200,
    sellPrice: 40,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'YLD',
    buyPrice: 0.33,
    buyAmount: 150,
    sellPrice: 0.75,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'POLS',
    buyPrice: 1.8,
    buyAmount: 150,
    sellPrice: 3.5,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
  {
    name: 'BTC',
    buyPrice: 37000,
    buyAmount: 150,
    sellPrice: 45000,
    holdings: 0,
    sellAmount: 0,
    profitPercent: 0,
  },
];

const normalizeCoin = (coin: InvestmentCoin): InvestmentCoin => {
  const holdingsRaw = coin.buyPrice > 0 ? coin.buyAmount / coin.buyPrice : 0;
  const holdings = Number(coin.name === 'BTC' ? holdingsRaw.toFixed(8) : holdingsRaw.toFixed(6));
  const sellAmount = Number((holdings * coin.sellPrice).toFixed(2));
  const profitPercent = coin.buyAmount > 0 ? Number((((sellAmount - coin.buyAmount) / coin.buyAmount) * 100).toFixed(2)) : 0;
  return { ...coin, holdings, sellAmount, profitPercent };
};

const InvestmentTable = () => {
  const [coins, setCoins] = useState<InvestmentCoin[]>(() => seedCoins.map(normalizeCoin));

  const totals = useMemo(() => {
    const totalBuy = coins.reduce((sum, coin) => sum + coin.buyAmount, 0);
    const totalSell = coins.reduce((sum, coin) => sum + coin.sellAmount, 0);
    const percentage = totalBuy > 0 ? ((totalSell - totalBuy) / totalBuy) * 100 : 0;
    return { totalBuy, totalSell, percentage };
  }, [coins]);

  const updateCoin = (coinName: string, field: 'buyPrice' | 'buyAmount' | 'sellPrice', nextValue: number) => {
    setCoins(prevCoins =>
      prevCoins.map(coin =>
        coin.name === coinName
          ? normalizeCoin({
              ...coin,
              [field]: Number.isFinite(nextValue) ? nextValue : 0,
            })
          : coin
      )
    );
  };

  const parseInput = (value: number | null) => value ?? 0;

  const columns: ColumnsType<InvestmentCoin & { index: number }> = [
    { title: '#', dataIndex: 'index', width: 40 },
    { title: 'Name', dataIndex: 'name', width: 70 },
    {
      title: 'Buy Price',
      dataIndex: 'buyPrice',
      render: (val: number, record) => <InputNumber size="small" defaultValue={val} onChange={v => updateCoin(record.name, 'buyPrice', parseInput(v))} />,
    },
    {
      title: 'Buy Amount',
      dataIndex: 'buyAmount',
      render: (val: number, record) => <InputNumber size="small" defaultValue={val} onChange={v => updateCoin(record.name, 'buyAmount', parseInput(v))} />,
    },
    { title: 'Holdings', dataIndex: 'holdings' },
    {
      title: 'Sell Price',
      dataIndex: 'sellPrice',
      render: (val: number, record) => <InputNumber size="small" defaultValue={val} onChange={v => updateCoin(record.name, 'sellPrice', parseInput(v))} />,
    },
    { title: 'Sell Amount', dataIndex: 'sellAmount', render: (v: number) => `${v}$` },
    { title: 'Profit %', dataIndex: 'profitPercent', render: (v: number) => `${v}%` },
  ];

  const dataSource = coins.map((c, i) => ({ ...c, index: i, key: c.name }));

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} size="small" scroll={{ x: 600 }} />
      <Typography.Paragraph style={{ marginTop: 8 }}>
        Total Buy: <b>{totals.totalBuy.toFixed(2)}$</b> | Total Sell: <b>{totals.totalSell.toFixed(2)}$</b> | Profit: <b>{totals.percentage.toFixed(2)}%</b>
      </Typography.Paragraph>
    </>
  );
};

const InvestmentModal = ({ open, onClose }: InvestmentModalProps) => (
  <Modal
    title="All Transactions"
    open={open}
    onCancel={onClose}
    width={900}
    footer={[
      <Button key="close" onClick={onClose}>
        Close
      </Button>,
      <Button key="add" type="primary">
        Add Transaction
      </Button>,
    ]}
  >
    <InvestmentTable />
  </Modal>
);

export default InvestmentModal;
