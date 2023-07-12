import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import JobList from '../components/JobList';
import { companyByIdQuery } from '../lib/graphql/queries';

function CompanyPage() {
  const { companyId } = useParams();
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id: companyId }
  });

  if (loading) return <div>loading...</div>
  if (error) return <div className='has-text-danger'>Data unavailable</div>

  const { company } = data;

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <div className="title is-5">
        Jobs at {company.name}
      </div>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
