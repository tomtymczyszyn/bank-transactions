import React, { ReactElement, useState } from 'react';
import { TransactionForm } from '../../features/transactions/components/TransactionForm';
import { TransactionsFilters } from '../../features/transactions/components/TransactionsFilters';
import { TransactionsTable } from '../../features/transactions/components/TransactionsTable';
import useTransactions from '../../hooks/useTransactions';

type Balance = number | undefined;

const TRANSACTIONS_LIMIT_PER_PAGE = 20;
const DEFAULT_TRANSACTION_QUERY = `?_page=1&_limit=${TRANSACTIONS_LIMIT_PER_PAGE}&_sort=date&_order=desc`;

function Transactions(): ReactElement {
  const { transactions, pagination, getTransactions, addTransaction } = useTransactions(DEFAULT_TRANSACTION_QUERY);

  const [balance, setBalance] = useState<Balance>();

  return (
    <div>
      <div>Transactions</div>
      <div>
        <div>
          <div>Balance:</div>
          <div>{balance}</div>
        </div>
        <div>
          <TransactionForm onSubmit={addTransaction} />
        </div>
        <div>
          <TransactionsFilters getTransactions={getTransactions} />
        </div>
        <TransactionsTable transactions={transactions} pagination={pagination} getTransactions={getTransactions} />
      </div>
    </div>
  );
}

export default Transactions;
