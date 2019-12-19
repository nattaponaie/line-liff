import {
  Select,
  Table,
} from 'antd';
import { head } from 'lodash';

import { STATUS_TYPE } from '/utils/constants/order-status';

import style from './admin.scss';
import {
  useAdmin,
  useAdminSSE,
  useAdminUpdate,
} from './adminHooks';

const { Option } = Select;

const AdminPage = () => {

  const {
    allOrderLoading,
    allOrder,
    appendResponseMessage,
    allOrderWrapper,
  } = useAdmin();
  useAdminSSE({ appendResponseMessage, allOrderWrapper });

  const {
    onStatusChange,
  } = useAdminUpdate();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Select
            className={style.selectStatus}
            defaultValue={head(STATUS_TYPE)}
            onChange={onStatusChange(record)}
          >
            {STATUS_TYPE.map((status) => (
              <Option
                key={status}
                value={status}
              >
                {status}
              </Option>
          ))}
          </Select>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={allOrderLoading}
        columns={columns}
        dataSource={allOrder}
      />
    </div>
  );
};

AdminPage.getInitialProps = () => ({
  namespacesRequired: ['page.admin'],
});

export default AdminPage;
