import type { InvestmentCoin } from '@/types/types';
import type { ColumnsType } from 'antd/es/table';

import { Table, InputNumber, Typography } from 'antd';
import { useMemo } from 'react';

import { useInvestments, useUpdateInvestment } from '../hooks';

const normalizeCoin = (coin: InvestmentCoin): InvestmentCoin => {
  const holdingsRaw = coin.buyPrice > 0 ? coin.buyAmount / coin.buyPrice : 0;
  const holdings = Number(coin.name === 'BTC' ? holdingsRaw.toFixed(8) : holdingsRaw.toFixed(6));
  const sellAmount = Number((holdings * coin.sellPrice).toFixed(2));
  const profitPercent = coin.buyAmount > 0 ? Number((((sellAmount - coin.buyAmount) / coin.buyAmount) * 100).toFixed(2)) : 0;
  return { ...coin, holdings, sellAmount, profitPercent };
};

const InvestmentTable = () => {
  const { data: rawCoins = [] } = useInvestments();
  const updateMutation = useUpdateInvestment();

  const coins = useMemo(() => rawCoins.map(normalizeCoin), [rawCoins]);

  const totals = useMemo(() => {
    const totalBuy = coins.reduce((sum, coin) => sum + coin.buyAmount, 0);
    const totalSell = coins.reduce((sum, coin) => sum + coin.sellAmount, 0);
    const percentage = totalBuy > 0 ? ((totalSell - totalBuy) / totalBuy) * 100 : 0;
    return { totalBuy, totalSell, percentage };
  }, [coins]);

  const updateCoin = (coin: InvestmentCoin, field: 'buyPrice' | 'buyAmount' | 'sellPrice', nextValue: number) => {
    const value = Number.isFinite(nextValue) ? nextValue : 0;
    updateMutation.mutate({ id: coin.id, data: { [field]: value } });
  };

  const parseInput = (value: number | null) => value ?? 0;

  const columns: ColumnsType<InvestmentCoin & { index: number }> = [
    { title: '#', dataIndex: 'index', width: 40 },
    { title: 'Name', dataIndex: 'name', width: 70 },
    {
      title: 'Buy Price',
      dataIndex: 'buyPrice',
      render: (val: number, record) => <InputNumber size="small" defaultValue={val} onChange={v => updateCoin(record, 'buyPrice', parseInput(v))} />,
    },
    {
      title: 'Buy Amount',
      dataIndex: 'buyAmount',
      render: (val: number, record) => <InputNumber size="small" defaultValue={val} onChange={v => updateCoin(record, 'buyAmount', parseInput(v))} />,
    },
    { title: 'Holdings', dataIndex: 'holdings' },
    {
      title: 'Sell Price',
      dataIndex: 'sellPrice',
      render: (val: number, record) => <InputNumber size="small" defaultValue={val} onChange={v => updateCoin(record, 'sellPrice', parseInput(v))} />,
    },
    { title: 'Sell Amount', dataIndex: 'sellAmount', render: (v: number) => `${v}$` },
    { title: 'Profit %', dataIndex: 'profitPercent', render: (v: number) => `${v}%` },
  ];

  const dataSource = coins.map((c, i) => ({ ...c, index: i, key: c.id }));

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} size="small" scroll={{ x: 600 }} />
      <Typography.Paragraph style={{ marginTop: 8 }}>
        Total Buy: <b>{totals.totalBuy.toFixed(2)}$</b> | Total Sell: <b>{totals.totalSell.toFixed(2)}$</b> | Profit: <b>{totals.percentage.toFixed(2)}%</b>
      </Typography.Paragraph>
    </>
  );
};

export default InvestmentTable;
