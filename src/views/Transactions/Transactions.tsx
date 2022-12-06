import React, { ReactElement } from 'react';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import useTransactions from '../../hooks/useTransactions';

const TRANSACTIONS_LIMIT_PER_PAGE = 20;
const DEFAULT_TRANSACTION_QUERY = `?_page=1&_limit=${TRANSACTIONS_LIMIT_PER_PAGE}`;

function Transactions(): ReactElement {
  const { transactions, getTransactions, pagination } = useTransactions(DEFAULT_TRANSACTION_QUERY);

  return (
    <div>
      <div>Transactions</div>
      <div>
        <TransactionsTable transactions={transactions} pagination={pagination} getTransactions={getTransactions} />
      </div>
    </div>
  );
}

export default Transactions;
