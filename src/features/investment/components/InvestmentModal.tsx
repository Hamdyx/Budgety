import { Modal, Button } from 'antd';

import InvestmentTable from './InvestmentTable';

type InvestmentModalProps = {
  open: boolean;
  onClose: () => void;
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
