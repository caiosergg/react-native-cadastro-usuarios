import React, { createContext, useReducer } from "react";

//components
import users from "../data/users";

const initialState = { users };
const UsersContext = createContext({});

const actions = {
  deleteUser(state, action) {
    const user = action.payload;
    return {
      //...state,
      users: state.users.filter((u) => u.id !== user.id), //remove o usuário da lista
    };
  },
};

export const UsersProvider = (props) => {
  function reducer(state, action) {
    const fn = actions[action.type]; //busca a função correspondente
    return fn ? fn(state, action) : state; //se existir, executa; se não, mantém o estado igual
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
