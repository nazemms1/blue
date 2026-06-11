import { lazy } from "react";

export const CmsVodGenresPage = lazy(() =>
  import("../genres").then((m) => ({ default: m.CmsVodGenresPage })),
);

export const CmsVodMoviesPage = lazy(() =>
  import("../movies").then((m) => ({ default: m.CmsVodMoviesPage })),
);

export const CmsVodSeriesPage = lazy(() =>
  import("../series").then((m) => ({ default: m.CmsVodSeriesPage })),
);

export const CmsVodPlaysPage = lazy(() =>
  import("../plays").then((m) => ({ default: m.CmsVodPlaysPage })),
);

export const CmsVodTvShowsPage = lazy(() =>
  import("../tvshows").then((m) => ({ default: m.CmsVodTvShowsPage })),
);
