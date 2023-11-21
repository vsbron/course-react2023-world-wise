import { createContext, useContext, useReducer } from "react";

// Creating the context
const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

// The reducer function that holds all the logic
function reducer(state, action) {
  switch (action.type) {
    // User logged in case
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    // User logged out case
    case "logout":
      return { ...state, user: {}, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

// Fake user details
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  // Getting the state and dispatch function from useReducer
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Login function
  function login(email, password) {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password)
      throw new Error("Email and/or password are incorrect");

    dispatch({ type: "login", payload: FAKE_USER });
  }

  // Logout function
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={(login, logout, isAuthenticated, user)}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access Context API
function useAuth() {
  const context = useContext(AuthContext);

  // Guard clause
  if (context === undefined)
    throw new Error("AuthContext was used outside of its scope");

  return context;
}

export { AuthProvider, useAuth };
