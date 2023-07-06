import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  gql,
  InMemoryCache
} from '@apollo/client';
import { getAccessToken } from '../auth'

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

const customLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
  };
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(customLink, httpLink),
  cache: new InMemoryCache()
});

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation createJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const { data: { job }} = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } }
  })
  return job;
}

export const getCompany = async (id) => {
  const query = gql`
    query companyQuery ($id: ID!) {
      company (id: $id) {
        id
        name
        description
        jobs {
          date
          description
          id
          title
        }
      }
    }
  `;

  const { data: { company } } = await apolloClient.query({
    query,
    variables: { id }
  });
  return company;
}

export const getJob = async (id) => {
  const query = gql`
    query jobQuery ($id: ID!) {
      job(id: $id) {
        id
        company {
          id
          name
        }
        date
        title
        description
      }
    }
  `;

  const { data: { job } } = await apolloClient.query({
    query,
    variables: { id }
  });
  return job;
}

export const getJobs = async () => {
  const query = gql`
    query JobsQuery {
      jobs {
        id
        company {
          id
          name
        }
        date
        title
      }
    }
  `;
  
  const { data: { jobs }} = await apolloClient.query({ query });
  return jobs;
}