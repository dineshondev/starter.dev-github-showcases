import gqlClient from '@lib/gqlClient';
import { useRouter } from 'next/router';
import {
  useUserReposQuery,
  OrderDirection,
  RepositoryOrderField,
} from '@lib/github';
import { parseError } from '@lib/parseError';
import Pagination from '@components/Pagination';
import { parseQuery } from './parseQuery';
import LoadingRepos from './LoadingRepos';
import UserReposView from './UserRepos.view';

interface UserReposProps {
  username: string;
}

function UserRepos({ username }: UserReposProps) {
  const { query } = useRouter();
  const afterCursor = typeof query.after === 'string' ? query.after : undefined;
  const beforeCursor =
    typeof query.before === 'string' ? query.before : undefined;

  const {
    data,
    isLoading,
    error: queryError,
  } = useUserReposQuery(gqlClient, {
    username,
    orderBy: {
      field: RepositoryOrderField.UpdatedAt,
      direction: OrderDirection.Desc,
    },
    afterCursor,
    beforeCursor,
  });

  const repos = parseQuery(data);
  const error = parseError(queryError);

  if (isLoading) {
    return <LoadingRepos />;
  }

  if (error || !repos) {
    return (
      <div
        data-testid="errorMsg"
        className="py-4 text-lg font-medium text-gray-800"
      >
        Error Loading Repositories. Check console / network tab for more
        information.
      </div>
    );
  }

  return (
    <>
      <UserReposView repos={repos.repos} owner={username} />
      <Pagination pageInfo={repos.pageInfo} owner={username} />
    </>
  );
}

export default UserRepos;
