import { lazy } from "react";

export const CmsStreamingGenresPage = lazy(() =>
  import("./CmsStreamingGenresPage").then((m) => ({
    default: m.CmsStreamingGenresPage,
  })),
);

export const CmsStreamingChannelsPage = lazy(() =>
  import("./CmsStreamingChannelsPage").then((m) => ({
    default: m.CmsStreamingChannelsPage,
  })),
);

export const CmsStreamingRadioPage = lazy(() =>
  import("./CmsStreamingRadioPage").then((m) => ({
    default: m.CmsStreamingRadioPage,
  })),
);
