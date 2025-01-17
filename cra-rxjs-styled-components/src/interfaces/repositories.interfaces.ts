export interface Repository {
	id: number;
	name: string;
	full_name: string;
	owner: { login: string; type: RepositoryOwnerType };
	description: string;
	private: boolean;
	html_url: string;
	url: string;
	updated_at: Date;
	stargazers_count: number;
	language: string;
	branches_url: string;
	visibility: 'public' | 'private';
	subscribers_count: number;
	forks_count: number;
	open_issues_count: number;
	pulls: number;
	default_branch: string;
	homepage: string;
}

export interface RepositoryWithBranchCount extends Repository {
	branches_count?: number;
}

export interface Pagination {
	prevPage: string | undefined;
	nextPage: string | undefined;
	hasPrevPage: boolean;
	hasNextPage: boolean;
}

export interface UseRepo {
	repositories: RepositoryWithBranchCount[];
	prevPage: () => void;
	nextPage: () => void;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}
export type RepositoryOwnerType = 'User' | 'Organization';
