import styled from '@emotion/styled';
import { UserDTO, UserRole } from 'common';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import * as groupsService from '../../api/groupApi';
import { listUsers } from '../../api/userApi';
import { Breadcrumbs } from '../../components';

import {
  NewGroupFormValues,
  WrappedNewGroupForm,
} from './components/NewGroupForm';

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 80vh;
  justify-content: center;
`;

const initialState = {
  superUsers: [] as UserDTO[],
};

export class CreateGroupContainer extends React.Component<RouteComponentProps> {
  state = initialState;
  componentDidMount() {
    listUsers({ roles: UserRole.superUser }).then(res => {
      this.setState({ superUsers: res.users });
    });
  }

  handleSubmit = (formValues: NewGroupFormValues) => {
    const {
      academic_year,
      group: group_type,
      group_name,
      super_user_id,
    } = formValues;

    groupsService
      .addGroup({
        academic_year,
        group_name,
        group_type,
      })
      .then(res => {
        this.props.history.push(`/groups/${res.group_id}`);
      });

    // TODO: add relation table from super_user_id
    console.log({ super_user_id });
  };

  handleCancel = () => this.props.history.push('/groups');

  render() {
    return (
      <Container>
        <WrappedNewGroupForm
          superUsers={this.state.superUsers}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </Container>
    );
  }
}
