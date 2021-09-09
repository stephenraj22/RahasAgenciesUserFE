import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

const apolloCache = new InMemoryCache()
/*const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}*/
const uploadLink = createUploadLink({
  uri: '/api', 
  headers: {
    "keep-alive": "true"
  }
})

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink,
  //defaultOptions: defaultOptions,
  onError:({networkError,graphQLError})=>{
    console.log('g',graphQLError);
    console.log('n',networkError)
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
