import React from 'react';
import { gql, useQuery } from '@apollo/client';

const getPages = gql`
  query getPages {
    pages {
      nodes {
        slug
        link
      }
    }
  }
`;

const index = () => {
  const { loading, error, data } = useQuery(getPages);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>error :)</p>;

  const pages = data.pages.nodes;

  return (
    <div>
      <main>
        <h1>Pages</h1>

        <ul>
          {pages.map(({ slug, link }) => (
            <li>
              <h1>{slug}</h1>
              <p>{link}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default index;
