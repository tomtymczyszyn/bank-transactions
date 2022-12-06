import { Formik, Form } from 'formik';
import { ReactElement } from 'react';
import * as Yup from 'yup';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import styles from './TransactionForm.module.css';

const FIELD_AMOUNT = 'amount';
const FIELD_BENEFICIARY = 'beneficiary';
const FIELD_ACCOUNT = 'account';
const FIELD_ADDRESS = 'address';
const FIELD_DESCRIPTION = 'description';

type Values = {
  [FIELD_AMOUNT]: number;
  [FIELD_BENEFICIARY]: string;
  [FIELD_ACCOUNT]: string;
  [FIELD_ADDRESS]: string;
  [FIELD_DESCRIPTION]: string;
};

type TransactionFormProps = {
  onSubmit: (values: Values) => void;
};

const TransactionSchema = Yup.object().shape({
  [FIELD_AMOUNT]: Yup.number().min(0.01, 'Amount must be positive').required('Amount is required'),
  [FIELD_BENEFICIARY]: Yup.string().required('Beneficiary is required'),
  [FIELD_ACCOUNT]: Yup.string()
    .min(8, 'Account number must be at least 8 characters long')
    .required('Account number is required')
    .matches(/^[0-9]*$/, 'Account number format is invalid, it should contain only digits'),
  [FIELD_ADDRESS]: Yup.string().required('Address is required'),
  [FIELD_DESCRIPTION]: Yup.string().required('Description is required'),
});

export function TransactionForm({ onSubmit }: TransactionFormProps): ReactElement {
  return (
    <Formik
      initialValues={{
        [FIELD_AMOUNT]: 0,
        [FIELD_BENEFICIARY]: '',
        [FIELD_ACCOUNT]: '',
        [FIELD_ADDRESS]: '',
        [FIELD_DESCRIPTION]: '',
      }}
      validationSchema={TransactionSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div className={styles.inputsContainer}>
            <Input label="Amount:" id={FIELD_AMOUNT} name={FIELD_AMOUNT} type="number" />
            <Input label="Beneficiary:" id={FIELD_BENEFICIARY} name={FIELD_BENEFICIARY} type="text" />
            <Input label="Account number:" id={FIELD_ACCOUNT} name={FIELD_ACCOUNT} type="number" />
            <Input label="Address:" id={FIELD_ADDRESS} name={FIELD_ADDRESS} type="text" />
            <Input label="Description:" id={FIELD_DESCRIPTION} name={FIELD_DESCRIPTION} type="text" />
          </div>
          <Button type="submit">Add</Button>
        </Form>
      )}
    </Formik>
  );
}
