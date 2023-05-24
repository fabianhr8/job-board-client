import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql')

export const getJobs = async () => {
  const query = gql`
    query ExampleQuery {
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
  `
  const { jobs } = await client.request(query);
  return jobs;
}