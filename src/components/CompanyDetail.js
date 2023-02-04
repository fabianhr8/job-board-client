import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries.js';

function CompanyDetail() {
  const [company, setCompany] = useState(null)
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then((company) => setCompany(company))
  }, [companyId])

  if (!company) return <p>loading...</p>

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyDetail;
