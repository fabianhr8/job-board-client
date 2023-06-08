import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import JobList from '../components/JobList';
import { getCompany } from '../lib/graphql/queries';

function CompanyPage() {
  const [company, setCompany] = useState()
  const { companyId } = useParams();
  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId])

  if (!company) return <div>loading...</div>

  console.log(company?.jobs)

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
