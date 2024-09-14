import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import Home from './pages/Home';
import Header from './components/Header';

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
        <Router>
          <Header/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
