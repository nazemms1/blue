import { lazy } from "react";

export const CmsDashboardPage = lazy(() =>
  import("./dashboard").then((m) => ({
    default: m.CmsDashboardPage,
  })),
);

export const CmsListPage = lazy(() =>
  import("./list").then((m) => ({ default: m.CmsListPage })),
);

export const CmsUploadPage = lazy(() =>
  import("./upload").then((m) => ({ default: m.CmsUploadPage })),
);

export const CmsAdsPage = lazy(() =>
  import("./ads/index.ts").then((m) => ({
    default: m.CmsAdsPage,
  })),
);

export * from "./vod";
export * from "./music";
export * from "./streaming";
