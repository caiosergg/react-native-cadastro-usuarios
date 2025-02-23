import React, { createContext, useReducer } from "react";

//components
import users from "../data/users";

const initialState = { users };
const UsersContext = createContext({});

const actions = {
  createUser(state, action) {
    const user = action.payload;
    user.id = Math.random(); //gera um ID aleatório para o novo usuário
    return {
      ...state,
      users: [...state.users, user], //adiciona o usuário à lista
    };
  },
  deleteUser(state, action) {
    const user = action.payload;
    return {
      ...state,
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
