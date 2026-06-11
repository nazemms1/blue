import { lazy } from "react";

export const CmsStreamingGenresPage = lazy(() =>
  import("../streaming-genres").then((m) => ({ default: m.CmsStreamingGenresPage })),
);

export const CmsStreamingRadioPage = lazy(() =>
  import("../radio").then((m) => ({ default: m.CmsStreamingRadioPage })),
);

export const CmsStreamingChannelsPage = lazy(() =>
  import("../channels").then((m) => ({ default: m.CmsStreamingChannelsPage })),
);
