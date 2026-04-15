import { lazy } from "react";

export const CmsVodMoviesPage = lazy(() =>
  import("./CmsVodMoviesPage").then((m) => ({
    default: m.CmsVodMoviesPage,
  })),
);

export const CmsVodSeriesPage = lazy(() =>
  import("./CmsVodSeriesPage").then((m) => ({
    default: m.CmsVodSeriesPage,
  })),
);

export const CmsVodPlaysPage = lazy(() =>
  import("./CmsVodPlaysPage").then((m) => ({
    default: m.CmsVodPlaysPage,
  })),
);

export const CmsVodGenresPage = lazy(() =>
  import("./CmsVodGenresPage").then((m) => ({
    default: m.CmsVodGenresPage,
  })),
);

export const CmsVodTvShowsPage = lazy(() =>
  import("./CmsVodTvShowsPage").then((m) => ({
    default: m.CmsVodTvShowsPage,
  })),
);
