import { Button, Form, Icon, Input, Radio, Select } from 'antd';
// tslint:disable: no-submodule-imports
import { FormComponentProps } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';
// tslint:enable: no-submodule-imports
import { GroupType, UserDTO } from 'common';
import { css } from 'emotion';
import * as React from 'react';

import { Colors, LABELS } from '../../../utils';

import { SelectSemester } from './SelectSemester';
import { SelectSuperUser } from './SelectSuperUser';

const FormItem = Form.Item;

const FORM_ITEM_LAYOUT = {
  labelCol: {
    sm: { span: 8 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 24 },
  },
};

const formStyles = css`
  width: 420px;
`;

export type EditGroupFormValues = {
  academic_year: string;
  class_room: number | string;
  group: GroupType;
  group_name: string;
  lecturer_id: UserDTO['id'];
};

type Props = {
  lecturers: UserDTO[];
  onSubmit: (group: EditGroupFormValues) => void;
  onCancel: () => void;
  loading: boolean;
} & FormComponentProps;
class EditGroupForm extends React.Component<Props> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props.form.validateFields((err, values: EditGroupFormValues) => {
      if (err) {
        return;
      }
      this.props.onSubmit(values);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      lecturers,
      loading,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className={formStyles}>
        <FormItem label={LABELS.group} {...FORM_ITEM_LAYOUT}>
          {getFieldDecorator('group', {
            rules: [{ required: true, message: LABELS.groupRequired }],
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="lecture">{LABELS.lecture}</Radio.Button>
              <Radio.Button value="exercise">{LABELS.exercise}</Radio.Button>
              <Radio.Button value="lab">{LABELS.lab}</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label={LABELS.superUser} {...FORM_ITEM_LAYOUT}>
          {getFieldDecorator('lecturer_id', {
            rules: [{ required: true, message: LABELS.nameRequired }],
          })(<SelectSuperUser superUsers={lecturers} />)}
        </FormItem>
        <FormItem label={LABELS.groupName} {...FORM_ITEM_LAYOUT}>
          {getFieldDecorator('group_name', {
            rules: [{ required: true, message: LABELS.groupNameRequired }],
          })(
            <Input
              prefix={
                <Icon type="tags" style={{ color: Colors.SemiLightGrey }} />
              }
              placeholder={LABELS.groupName}
            />
          )}
        </FormItem>
        <FormItem label={LABELS.academicYear} {...FORM_ITEM_LAYOUT}>
          {getFieldDecorator('academic_year', {
            rules: [{ required: true, message: LABELS.academicYearRequired }],
          })(<SelectSemester />)}
        </FormItem>
        <FormItem label={LABELS.classRoomNumber} {...FORM_ITEM_LAYOUT}>
          {getFieldDecorator('class_room')(
            <Input
              prefix={
                <Icon type="book" style={{ color: Colors.SemiLightGrey }} />
              }
              placeholder={LABELS.classRoomNumber}
            />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            sm: { span: 16, offset: 8 },
            xs: { span: 24, offset: 0 },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '5px' }}
            loading={loading}
          >
            Dodaj
          </Button>
          <Button
            type="default"
            style={{ marginLeft: '5px' }}
            onClick={onCancel}
          >
            Anuluj
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedEditGroupForm = Form.create()(EditGroupForm);
