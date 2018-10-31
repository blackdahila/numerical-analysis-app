import React from "react";

import { Provider } from "./Context";

const reducer = (state: any, action: any) => {
  if (action.type === "AUTH") {
    return { ...state, userAuth: action.payload.userAuth };
  }
};

type State = {
  userAuth: boolean,
  userName: string,
  userRole: string,
  dispatch: (action: any) => void;
  error: boolean,
  errorMessage?: string,
}

export class AppProvider extends React.Component<{}, State> {
  state = {
    userAuth: false,
    userName: "",
    userRole: "admin",
    dispatch: (action: any) => {
      this.setState(state => reducer(state, action));
    },
    error: true,
    errorMessage: "Fetch failed.",
  };
  render() {
    const { state, props: { children } } = this;
    return <Provider value={state}>{children}</Provider>;
  }
}
