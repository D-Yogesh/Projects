import AddClientModal from './components/AddClientModal';
import Clients from './components/Clients'
import Header from './components/Header'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(previousData, newData){
            return newData;
          }
        },
        projects: {
          merge(previousData, newData) {
            return newData;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <div className="container">
          <AddClientModal/>
          <Clients/>
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
