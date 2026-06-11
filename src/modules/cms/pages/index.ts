import { lazy } from "react";

export const CmsDashboardPage = lazy(() => import("./dashboard").then((m) => ({ default: m.CmsDashboardPage })));
export const CmsListPage = lazy(() => import("./list").then((m) => ({ default: m.CmsListPage })));
export const CmsUploadPage = lazy(() => import("./upload").then((m) => ({ default: m.CmsUploadPage })));
export const CmsAdsPage = lazy(() => import("./ads/index.ts").then((m) => ({ default: m.CmsAdsPage })));

export const CmsMovieEditorPage = lazy(() => import("./movies/editor").then((m) => ({ default: m.CmsMovieEditorPage })));
export const CmsPlayEditorPage = lazy(() => import("./plays/editor").then((m) => ({ default: m.CmsPlayEditorPage })));
export const CmsSeriesEditorPage = lazy(() => import("./series/editor").then((m) => ({ default: m.CmsSeriesEditorPage })));
export const CmsTvShowEditorPage = lazy(() => import("./tvshows/editor").then((m) => ({ default: m.CmsTvShowEditorPage })));
export const CmsSingerEditorPage = lazy(() => import("./music-singers/editor").then((m) => ({ default: m.CmsMusicSingerEditorPage })));
export const CmsSongEditorPage = lazy(() => import("./music-songs/editor").then((m) => ({ default: m.CmsSongEditorPage })));
export const CmsRadioEditorPage = lazy(() => import("./radio/editor").then((m) => ({ default: m.CmsRadioEditorPage })));
export const CmsChannelEditorPage = lazy(() => import("./channels/editor").then((m) => ({ default: m.CmsChannelEditorPage })));
export const CmsAdEditorPage = lazy(() => import("./ads/editor").then((m) => ({ default: m.CmsAdsEditorPage })));

export * from "./vod";
export * from "./music";
export * from "./streaming";
