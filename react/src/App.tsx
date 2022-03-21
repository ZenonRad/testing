import React from "react";
import { IntlProvider } from "react-intl";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink, InMemoryCache, split } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { setContext } from "apollo-link-context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import MainMenu from "pages/MainMenu";
import ResponsiveTypography from "./components/ResponsiveTypography";
import FreezingEventLoop from "components/FreezingEventLoop";
import Rerendering from "components/Rerendering";
import messages from "locales/messages";
import { API_URL, SUBSCRIPTION_URL } from "./config";
import { TOKEN_LOCAL_STORAGE_KEY } from "./constants";

import { theme } from "./theme";
import "./App.css";

const authToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || "";
localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, "");

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: API_URL,
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(SUBSCRIPTION_URL, {
    reconnect: true,
    connectionParams: {
      authToken,
    },
  })
);

const link = ApolloLink.from([
  split(
    ({ query }) => {
      //@ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    authLink.concat(httpLink)
  ),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const locale = navigator.language;

const App = () => {
  return (
    <ApolloProvider {...{ client }}>
      <ThemeProvider theme={theme}>
        {/* @ts-ignore */}
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Router>
            <Switch>
              <Route path="/" exact component={MainMenu} />
              <Route path="/loop/freeze" exact component={FreezingEventLoop} />
              <Route
                path="/responsive/typography"
                exact
                component={ResponsiveTypography}
              />
              <Route path="/rerendering" exact component={Rerendering} />
            </Switch>
          </Router>
        </IntlProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
