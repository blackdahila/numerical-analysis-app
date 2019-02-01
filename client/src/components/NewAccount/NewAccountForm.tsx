import { Button, Form, Icon, Input } from 'antd';
// tslint:disable-next-line:no-submodule-imports
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';

import { colors, LABELS } from '../../utils';

const FormItem = Form.Item;

type Props = {
  onSubmit: (password: string) => void;
} & FormComponentProps;

export const NewAccountWithToken = (props: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      props.onSubmit(values.password_);
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} style={{ padding: '20px 20px 0', width: '350px' }}>
      <FormItem>
        {getFieldDecorator('password_', {
          rules: [{ required: true, message: LABELS.passwordRequired }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: colors.semiLightGrey }} />}
            type="password"
            placeholder={LABELS.password}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password_confirm_', {
          rules: [{ required: true, message: LABELS.passwordRequired }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: colors.semiLightGrey }} />}
            type="password"
            placeholder={LABELS.confirmPassword}
          />
        )}
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%', marginTop: '20px' }}
      >
        OK
      </Button>
    </Form>
  );
};

export const NewAccountWithTokenForm = Form.create()(NewAccountWithToken);
