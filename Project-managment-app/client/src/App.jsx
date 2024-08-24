import Clients from './components/Clients'
import Header from './components/Header'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <Clients/>
      </ApolloProvider>
    </>
  )
}

export default App
