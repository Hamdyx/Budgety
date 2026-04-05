import SectionHeader from '@/components/common/SectionHeader';

import InvestmentCard from './InvestmentCard';

const InvestmentPage = () => {
  return (
    <div style={{ padding: 24 }}>
      <SectionHeader title="Investments" />
      <InvestmentCard />
    </div>
  );
};

export default InvestmentPage;
