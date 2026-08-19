import { dateFromString } from "@/utils/dates";

export type GithubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: unknown;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
  };
};

export type Commit = {
  html_url: string;
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
    };
  };
};

export type LatestCommit = {
  url: string;
  message: string;
  date: string;
  sha: string;
  repo: string;
};

const GITHUB_API_URL = "https://api.github.com";
const USERNAME = "zachurich";

const _fetchRepos = async (
  username: string,
  token?: string,
  additionalParams?: string,
) => {
  const url = `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos${additionalParams ? `?${additionalParams}` : ""}`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const responseData = (await response.json()) as GithubRepo[];

  const sorted = responseData?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return sorted;
};

const _fetchLatestCommits = async (
  repo: string,
  token?: string,
): Promise<LatestCommit[]> => {
  const url = `${GITHUB_API_URL}/repos/${encodeURIComponent(
    USERNAME,
  )}/${encodeURIComponent(repo)}/commits`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await fetch(url, { headers, cache: "no-store" });
  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const responseData = await response.json();
  const latestCommits = responseData; // Get the latest commit (first item in the array)
  return latestCommits.map((latestCommit: Commit) => ({
    url: latestCommit.html_url,
    message: latestCommit.commit.message,
    date: dateFromString(latestCommit.commit.author.date),
    sha: latestCommit.sha,
    repo: latestCommit.html_url.split("/commit")[0], // Extract repo name from URL
  }));
};

const _fetchLatestCommit = async (repo: string, token?: string) =>
  _fetchLatestCommits(repo, token)
    .then((commits) => commits[0])
    .catch((error) => {
      console.error(`Error fetching latest commit for repo ${repo}:`, error);
      return {
        url: "",
        message: "Unable to fetch latest commit",
        date: "",
        sha: "",
        repo: "",
      };
    });

// Example usage:
const getRepos = () =>
  _fetchRepos(USERNAME, process.env.GH_TOKEN).catch((e) => {
    console.error("Error fetching repos:", e);
    return [];
  });

const getReposLatest = (limit: number) =>
  _fetchRepos(
    USERNAME,
    process.env.GH_TOKEN,
    `sort=updated&direction=desc&per_page=${limit}`,
  ).catch((e) => {
    console.error("Error fetching latest repos:", e);
    return [];
  });

const getLatestUserCommits = ({
  limitPerRepo = 3,
  maxRepos = 5,
}: {
  limitPerRepo?: number;
  maxRepos?: number;
}) =>
  _fetchRepos(USERNAME, process.env.GH_TOKEN, `sort=updated&direction=asc`)
    .then((repos) =>
      Promise.all(
        repos.flatMap((repo) =>
          _fetchLatestCommits(repo.name, process.env.GH_TOKEN)
            .then((commits) => commits.slice(0, limitPerRepo))
            .catch((e) => {
              console.error(
                `Error fetching latest commits for repo ${repo.name}:`,
                e,
              );
              return [];
            }),
        ),
      )
        .then((allCommits) => allCommits.flat().slice(0, maxRepos))
        .catch((e) => {
          console.error("Error fetching latest user commits:", e);
          return [];
        })
        .then((all) =>
          [...all].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        ),
    )
    .catch((e) => {
      console.error("Error fetching latest user commits:", e);
      return [];
    });

const getLatestCommit = (): Promise<LatestCommit> =>
  _fetchLatestCommit("zach-urich-2026", process.env.GH_TOKEN).catch((error) => {
    console.error("Error fetching latest commit:", error);
    return {
      url: "",
      message: "Unable to fetch latest commit",
      date: "",
      sha: "",
      repo: "",
    };
  });

const github = {
  getRepos,
  getReposLatest,
  getLatestCommit,
  getLatestUserCommits,
};

export default github;
