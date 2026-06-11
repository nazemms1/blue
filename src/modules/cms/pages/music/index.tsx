import { lazy } from "react";

export const CmsMusicGenresPage = lazy(() =>
  import("../music-genres").then((m) => ({ default: m.CmsMusicGenresPage })),
);

export const CmsMusicSingersPage = lazy(() =>
  import("../music-singers").then((m) => ({ default: m.CmsMusicSingersPage })),
);

export const CmsMusicSongsPage = lazy(() =>
  import("../music-songs").then((m) => ({ default: m.CmsMusicSongsPage })),
);
