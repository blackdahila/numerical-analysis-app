import { Button } from 'antd';
import { css } from 'emotion';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { UserDTO } from '../../../../common/api';
import { groupsService } from '../../api';

import { UploadUsers } from '.';

type State = {
  uploaded: UserDTO[];
};
export class ListGroupsContainer extends React.Component<RouteComponentProps, State> {
  state = {
    uploaded: [] as UserDTO[],
  };
  onUpload = (fileContent: string) => {
    groupsService.uploadUsers(fileContent).then(res => {
      this.setState({ uploaded: res.message });
    });
  };
  render() {
    return (
      <>
        <UploadUsers
          onUpload={this.onUpload}
          className={css`
            margin: 20px 20px 20px 0;
          `}
        />
        <ul>
          {this.state.uploaded.map(user => (
            <li key={user.email}>{`${user.user_name} ${user.email}`}</li>
          ))}
        </ul>
        <Button
          icon="usergroup-add"
          type="primary"
          onClick={() => this.props.history.push('/groups/new')}
        >
          Nowa grupa
        </Button>
      </>
    );
  }
}
