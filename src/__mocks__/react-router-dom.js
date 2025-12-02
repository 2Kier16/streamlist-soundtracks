const React = require("react");

module.exports = {
  BrowserRouter: ({ children }) => React.createElement("div", null, children),
  Routes: ({ children }) => React.createElement("div", null, children),
  Route: ({ element }) => React.createElement("div", null, element),
  Link: ({ to, children }) => React.createElement("a", { href: to }, children),
  useNavigate: () => () => {},
};
