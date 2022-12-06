import React, { ReactElement, useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Query } from '../../hooks/useTransactions';

const FIELD_BENEFICIARY = 'beneficiary_like';

type Filters = {
  [FIELD_BENEFICIARY]?: string;
};

type TransactionsFiltersProps = {
  getTransactions: (query?: Query) => void;
};

const TRANSACTIONS_LIMIT_PER_PAGE = 20;
const DEFAULT_TRANSACTION_QUERY = `?_page=1&_limit=${TRANSACTIONS_LIMIT_PER_PAGE}`;

function TransactionsFilters({ getTransactions }: TransactionsFiltersProps): ReactElement {
  const [filters, setFilters] = useState<Filters>({
    [FIELD_BENEFICIARY]: '',
  });

  function handleFiltersSubmit(e: React.FormEvent): void {
    e.preventDefault();

    // if every filter is empty, get transactions with default query
    if (Object.values(filters).filter(Boolean).length === 0) {
      getTransactions();
      return;
    }

    getTransactions(
      `${DEFAULT_TRANSACTION_QUERY}&${Object.keys(filters)
        .map((filter) => `${filter}=${filters[filter as keyof Filters]}`)
        .join('&')}`,
    );
  }

  return (
    <form onSubmit={handleFiltersSubmit}>
      <div>Filters</div>
      <div>
        <Input
          id={FIELD_BENEFICIARY}
          name={FIELD_BENEFICIARY}
          label="Beneficiary:"
          onChange={(value) => setFilters((state) => ({ ...state, [FIELD_BENEFICIARY]: value }))}
          value={filters[FIELD_BENEFICIARY]}
        />
        <Button>Filter</Button>
      </div>
    </form>
  );
}

export default TransactionsFilters;
