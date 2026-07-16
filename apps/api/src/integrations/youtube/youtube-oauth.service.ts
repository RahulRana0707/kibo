import { Injectable } from '@nestjs/common';

import { env } from '../../config/env';

const YOUTUBE_READONLY_SCOPE =
  'https://www.googleapis.com/auth/youtube.readonly';

export const YOUTUBE_OAUTH_STATE_COOKIE = 'kibo_youtube_oauth_state';

type YouTubeOAuthState = {
  botId: string;
  nonce: string;
};

type YouTubeTokenResponse = {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
};

type YouTubeChannelResponse = {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
      thumbnails?: {
        default?: {
          url?: string;
        };
      };
    };
  }>;
};

type YouTubeLiveBroadcastsResponse = {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
      liveChatId?: string;
      scheduledStartTime?: string;
      actualStartTime?: string;
    };
    status?: {
      lifeCycleStatus?: string;
    };
  }>;
};

@Injectable()
export class YoutubeOAuthService {
  getConfig() {
    const clientId = env.GOOGLE_YOUTUBE_CLIENT_ID;
    const clientSecret = env.GOOGLE_YOUTUBE_CLIENT_SECRET;
    const redirectUri =
      env.GOOGLE_YOUTUBE_REDIRECT_URI ??
      `${env.API_URL}/integrations/youtube/callback`;

    if (!clientId || !clientSecret || !redirectUri) {
      return null;
    }

    return {
      clientId,
      clientSecret,
      redirectUri,
      scope: YOUTUBE_READONLY_SCOPE,
    };
  }

  createState(state: YouTubeOAuthState) {
    return Buffer.from(JSON.stringify(state), 'utf8').toString('base64url');
  }

  parseState(value: string | null | undefined) {
    if (!value) {
      return null;
    }

    try {
      const parsed = JSON.parse(
        Buffer.from(value, 'base64url').toString('utf8'),
      ) as Partial<YouTubeOAuthState>;

      if (!parsed.botId || !parsed.nonce) {
        return null;
      }

      return {
        botId: parsed.botId,
        nonce: parsed.nonce,
      };
    } catch {
      return null;
    }
  }

  createAuthorizationUrl({ botId, nonce }: YouTubeOAuthState) {
    const config = this.getConfig();

    if (!config) {
      return null;
    }

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('redirect_uri', config.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', config.scope);
    url.searchParams.set('state', this.createState({ botId, nonce }));
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('include_granted_scopes', 'true');
    url.searchParams.set('prompt', 'consent');

    return url;
  }

  async exchangeAuthorizationCode(code: string) {
    const config = this.getConfig();

    if (!config) {
      throw new Error('Missing YouTube OAuth configuration.');
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`YouTube token exchange failed: ${response.status}`);
    }

    return (await response.json()) as YouTubeTokenResponse;
  }

  async getAuthenticatedChannel(accessToken: string) {
    const url = new URL('https://www.googleapis.com/youtube/v3/channels');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('mine', 'true');

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`YouTube channel lookup failed: ${response.status}`);
    }

    const data = (await response.json()) as YouTubeChannelResponse;
    const channel = data.items?.[0];

    if (!channel?.id) {
      throw new Error(
        'No YouTube channel found for the authenticated account.',
      );
    }

    return {
      id: channel.id,
      title: channel.snippet?.title ?? 'YouTube channel',
      thumbnailUrl: channel.snippet?.thumbnails?.default?.url,
    };
  }

  async getActiveBroadcast(accessToken: string) {
    const url = new URL('https://www.googleapis.com/youtube/v3/liveBroadcasts');
    url.searchParams.set('part', 'snippet,status');
    url.searchParams.set('broadcastStatus', 'active');
    url.searchParams.set('mine', 'true');

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as YouTubeLiveBroadcastsResponse;
    const broadcast = data.items?.[0];

    if (!broadcast?.id) {
      return null;
    }

    return {
      id: broadcast.id,
      title: broadcast.snippet?.title,
      liveChatId: broadcast.snippet?.liveChatId,
      lifeCycleStatus: broadcast.status?.lifeCycleStatus,
      scheduledStartTime: broadcast.snippet?.scheduledStartTime,
      actualStartTime: broadcast.snippet?.actualStartTime,
    };
  }
}
