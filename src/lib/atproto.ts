const BSKY_PUBLIC_API = "https://public.api.bsky.app/xrpc";
const HANDLE = "zachurich.com";

export type AtprotoProfile = {
  did: string;
  handle: string;
  displayName?: string;
  avatarUrl?: string;
  description?: string;
};

type GetProfileResponse = {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  description?: string;
};

/**
 * Fetches public AT Protocol (Bluesky) profile info for the site owner's
 * handle. Unauthenticated and cached for an hour — falls back to `null`
 * if the AppView is unreachable so the homepage never breaks on this.
 */
export const getAtprotoProfile = async (): Promise<AtprotoProfile | null> => {
  try {
    const res = await fetch(
      `${BSKY_PUBLIC_API}/app.bsky.actor.getProfile?actor=${HANDLE}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) return null;

    const data: GetProfileResponse = await res.json();

    return {
      did: data.did,
      handle: data.handle,
      displayName: data.displayName,
      avatarUrl: data.avatar,
      description: data.description,
    };
  } catch {
    return null;
  }
};
