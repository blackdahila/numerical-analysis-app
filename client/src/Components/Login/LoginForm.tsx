import { Button, Checkbox, Form, Icon, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { LABELS } from '../../utils/labels';

const FormItem = Form.Item;

const LoginTitle = () => (
  <div
    style={{
      color: 'rgba(0,0,0,.4)',
      textAlign: 'center',
    }}
  >
    {LABELS.appName}
  </div>
);

type FormValues = {
  username: string;
  password: string;
  remember: boolean;
};

type Props = {
  onSubmit: (username: string, password: string) => void;
} & FormComponentProps;
const LoginForm = (props: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values: FormValues) => {
      if (err) {
        return;
      }
      props.onSubmit(values.username, values.password);
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Modal visible centered title={<LoginTitle />} footer={null} width={400} closable={false}>
      <Form onSubmit={handleSubmit} style={{ padding: '20px 20px 0', width: '350px' }}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: LABELS.emailRequired }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={LABELS.email}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: LABELS.passwordRequired }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={LABELS.password}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            initialValue: true,
            valuePropName: 'checked',
          })(<Checkbox>{LABELS.rememberMe}</Checkbox>)}
          <Link to="/" style={{ float: 'right' }}>
            {LABELS.forgotPassword}
          </Link>
          <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
            {LABELS.logIn}
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export const WrappedLoginForm = Form.create()(LoginForm);