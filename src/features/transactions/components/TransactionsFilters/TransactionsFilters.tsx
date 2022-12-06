import React, { ReactElement } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Query } from '../../../../hooks/useTransactions';

const FIELD_BENEFICIARY = 'beneficiary_like';

type Filters = {
  [FIELD_BENEFICIARY]?: string;
};

type TransactionsFiltersProps = {
  getTransactions: (query?: Query) => void;
};

const TRANSACTIONS_LIMIT_PER_PAGE = 20;
const DEFAULT_TRANSACTION_QUERY = `?_page=1&_limit=${TRANSACTIONS_LIMIT_PER_PAGE}`;

export function TransactionsFilters({ getTransactions }: TransactionsFiltersProps): ReactElement {
  function handleFiltersSubmit(values: Filters): void {
    // if every filter is empty, get transactions with default query
    if (Object.values(values).filter(Boolean).length === 0) {
      getTransactions();
      return;
    }

    getTransactions(
      `${DEFAULT_TRANSACTION_QUERY}&${Object.keys(values)
        .map((filter) => `${filter}=${values[filter as keyof Filters]}`)
        .join('&')}`,
    );
  }

  return (
    <>
      <div>Filters</div>
      <Formik
        initialValues={{
          [FIELD_BENEFICIARY]: '',
        }}
        onSubmit={handleFiltersSubmit}
      >
        {() => (
          <Form>
            <Input label="Beneficiary:" id={FIELD_BENEFICIARY} name={FIELD_BENEFICIARY} type="text" />
            <Button type="submit">Filter</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
