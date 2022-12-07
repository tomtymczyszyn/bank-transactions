import { KeyboardEvent, ReactElement, useMemo, useState } from 'react';
import classnames from 'classnames';
import { Transaction } from '../../../../hooks/useTransactions';
import styles from './TransactionsTable.module.css';
import { Button } from '../../../../components/Button';
import { formatAmount } from '../../../../utils/formatters';

type TransactionProps = {
  transaction: Transaction;
  onTransactionRemove: (id: number) => Promise<Transaction>;
};

enum DeleteStatus {
  Idle,
  Deleting,
  Deleted,
}

export function TransactionRow({ transaction, onTransactionRemove }: TransactionProps): ReactElement | null {
  const [showDetails, setShowDetails] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<DeleteStatus>(DeleteStatus.Idle);

  function handleRowClick() {
    setShowDetails((state) => !state);
  }

  function handleRowKeyDown(e: KeyboardEvent) {
    if (['Space', 'Enter'].includes(e.code)) {
      e.preventDefault();
      setShowDetails((state) => !state);
    }
  }

  function handleRemoveClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowDetails(false);
    onTransactionRemove(transaction.id).then(() => {
      setDeleteStatus(DeleteStatus.Deleting);

      setTimeout(() => {
        setDeleteStatus(DeleteStatus.Deleted);
      }, 1000);
    });
  }

  const formattedDate = useMemo(() => {
    return new Date(transaction.date).toLocaleString();
  }, [transaction]);

  if (deleteStatus === DeleteStatus.Deleted) {
    return null;
  }

  return (
    <>
      <tr
        className={classnames(
          styles.transactionRow,
          deleteStatus === DeleteStatus.Deleting ? styles.transactionRowFade : false,
        )}
        onClick={handleRowClick}
        onKeyDown={handleRowKeyDown}
        role="button"
        tabIndex={0}
      >
        <td>{formattedDate}</td>
        <td>{transaction.beneficiary}</td>
        <td>{transaction.description}</td>
        <td className={styles.transactionAmount}>{formatAmount(transaction.amount)}</td>
        <td>
          <Button onClick={handleRemoveClick}>Delete</Button>
        </td>
      </tr>
      {showDetails && (
        <tr className={styles.transactionDetailsRow}>
          <td colSpan={5} className={styles.transactionDetailsCell}>
            <div>
              <strong>{transaction.beneficiary}</strong>
            </div>
            <div>
              <span className={styles.transactionDetailsLabel}>Address:</span>
              <span>{transaction.address}</span>
            </div>
            <div>
              <span className={styles.transactionDetailsLabel}>Account number:</span>
              <span>{transaction.account}</span>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
