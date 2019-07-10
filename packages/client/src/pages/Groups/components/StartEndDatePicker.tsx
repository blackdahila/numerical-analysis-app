/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { DatePicker, Form } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import React from 'react';

const RequiredIcon = styled.span`
  color: red;
`;

const datePickerStyles = css`
  width: 180px;
`;

type Props = {
  layout: {
    labelCol: { sm: { span: number }; xs: { span: number } };
    wrapperCol: { sm: { span: number }; xs: { span: number } };
  };
  getFieldDecorator: (
    id: string,
    options?: GetFieldDecoratorOptions | undefined
  ) => (node: React.ReactNode) => React.ReactNode;
  label: string;
  required?: boolean;
  startKey: string;
  endKey: string;
};
export const StartEndDatePicker = ({
  layout,
  getFieldDecorator,
  label,
  required,
  startKey,
  endKey,
}: Props) => (
  <Form.Item
    label={
      required ? (
        <span>
          <RequiredIcon>*</RequiredIcon> {label}
        </span>
      ) : (
        label
      )
    }
    {...layout}
    css={css`
      padding: 0;
      margin: 0;
    `}
  >
    <Form.Item
      {...layout}
      style={{ display: 'inline-block', maxWidth: '180px' }}
    >
      {getFieldDecorator(startKey, {
        rules: [{ required, message: 'pole jest wymagane' }],
      })(<DatePicker css={datePickerStyles} />)}
    </Form.Item>
    <span
      style={{
        padding: '10px',
        textAlign: 'center',
        width: '24px',
      }}
    >
      -
    </span>

    <Form.Item {...layout} style={{ display: 'inline-block' }}>
      {getFieldDecorator(endKey, {
        rules: [{ required, message: 'pole jest wymagane' }],
      })(<DatePicker css={datePickerStyles} />)}
    </Form.Item>
  </Form.Item>
);
