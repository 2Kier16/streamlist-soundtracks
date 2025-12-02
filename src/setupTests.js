import '@testing-library/jest-dom';
import React from 'react';

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => () => {},
}));
