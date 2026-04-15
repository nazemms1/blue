import { lazy } from "react";

export const CmsMusicGenresPage = lazy(() =>
  import("./CmsMusicGenresPage").then((m) => ({
    default: m.CmsMusicGenresPage,
  })),
);

export const CmsMusicSingersPage = lazy(() =>
  import("./CmsMusicSingersPage").then((m) => ({
    default: m.CmsMusicSingersPage,
  })),
);

export const CmsMusicSongsPage = lazy(() =>
  import("./CmsMusicSongsPage").then((m) => ({
    default: m.CmsMusicSongsPage,
  })),
);
