import { UserReposData, UserRepo, Repo, Repos } from 'src/app/gql';

export function parseQuery(data: UserReposData): Repos {
  const nodes = data.user.repositories.nodes;
  const pageInfo = data.user.repositories.pageInfo;
  const repos = nodes.reduce((acc: Repo[], repo: UserRepo) => {
    return repo
      ? [
          ...acc,
          {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stargazerCount: repo.stargazerCount,
            forkCount: repo.forkCount,
            languageColor: repo.primaryLanguage?.color,
            language: repo.primaryLanguage?.name,
            isPrivate: repo.isPrivate,
            isArchived: repo.isArchived,
            isFork: repo.isFork,
            updatedAt: new Date(repo.updatedAt),
          },
        ]
      : acc;
  }, []);

  return {
    repos,
    pageInfo,
  } as Repos;
}