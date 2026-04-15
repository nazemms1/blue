export const CMS_ROUTES = {
  dashboard: "cms",
  library: "cms/library",
  upload: "cms/upload",
  vodMovies: "cms/vod/movies",
  vodSeries: "cms/vod/series",
  vodPlays: "cms/vod/plays",
  vodGenres: "cms/vod/genres",
  vodTvShows: "cms/vod/tv-shows",
  musicSingers: "cms/music/singers",
  musicSongs: "cms/music/songs",
  musicGenres: "cms/music/genres",
  streamingRadio: "cms/streaming/radio",
  streamingChannels: "cms/streaming/channels",
  streamingGenres: "cms/streaming/genres",
  ads: "cms/ads",
} as const;

export function cmsPath(
  route: (typeof CMS_ROUTES)[keyof typeof CMS_ROUTES],
): string {
  return `/${route}`;
}
