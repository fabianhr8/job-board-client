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

export const apolloClient = new ApolloClient({
  link: concat(customLink, httpLink),
  cache: new InMemoryCache()
});

const jobDetailFragment = gql`
  fragment jobDetail on Job {
    id
    company {
      id
      name
    }
    date
    title
    description
  }
`;

export const companyByIdQuery = gql`
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

export const getJobsQuery = gql`
  query JobsQuery($limit: Int, $offset: Int) {
    jobs (limit: $limit, offset: $offset) {
      items {
        id
        company {
          id
          name
        }
        date
        title
      }
      totalCount
    }
  }
`;

export const jobByIdQuery = gql`
  query jobQuery ($id: ID!) {
    job(id: $id) {
      ...jobDetail
    }
  }
  ${jobDetailFragment}
`;

export const createJobMutation = gql`
  mutation createJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...jobDetail
    }
  }
  ${jobDetailFragment}
`;