import type { Permission } from "@shared/types";
import {
  IconLayoutDashboard,
  IconPhoto,
  IconUpload,
  IconMovie,
  IconDeviceTv,
  IconMasksTheater,
  IconCategory,
  IconMusic,
  IconVideo,
  IconBrandNetflix,
  IconBrandYoutube,
  IconMicrophone2,
  IconRadio,
  IconAd,
} from "@tabler/icons-react";
import { CMS_ROUTES, cmsPath } from "../config/routes";

interface CmsNavBase {
  label: string;
  permission: Permission;
}

export interface CmsNavLink extends CmsNavBase {
  type: "link";
  href: string;
  icon: React.ElementType;
}

export interface CmsNavGroup extends CmsNavBase {
  type: "group";
  icon: React.ElementType;
  defaultOpen?: boolean;
  children: CmsNavLink[];
}

export type CmsNavItem = CmsNavLink | CmsNavGroup;

export const CMS_WORKSPACE_ITEMS: CmsNavItem[] = [
  {
    type: "link",
    label: "Dashboard",
    href: cmsPath(CMS_ROUTES.dashboard),
    icon: IconLayoutDashboard,
    permission: "cms",
  },
  {
    type: "link",
    label: "Library",
    href: cmsPath(CMS_ROUTES.library),
    icon: IconPhoto,
    permission: "cms",
  },
  {
    type: "link",
    label: "Upload",
    href: cmsPath(CMS_ROUTES.upload),
    icon: IconUpload,
    permission: "cms",
  },
  {
    type: "link",
    label: "Ads",
    href: cmsPath(CMS_ROUTES.ads),
    icon: IconAd,
    permission: "cms",
  },
  {
    type: "group",
    label: "VOD",
    icon: IconBrandYoutube,
    permission: "cms",
    defaultOpen: false,
    children: [
      {
        type: "link",
        label: "Genres",
        href: cmsPath(CMS_ROUTES.vodGenres),
        icon: IconCategory,
        permission: "cms",
      },
      {
        type: "link",
        label: "Movies",
        href: cmsPath(CMS_ROUTES.vodMovies),
        icon: IconMovie,
        permission: "cms",
      },
      {
        type: "link",
        label: "Series",
        href: cmsPath(CMS_ROUTES.vodSeries),
        icon: IconDeviceTv,
        permission: "cms",
      },
      {
        type: "link",
        label: "Plays",
        href: cmsPath(CMS_ROUTES.vodPlays),
        icon: IconMasksTheater,
        permission: "cms",
      },
      {
        type: "link",
        label: "TV Shows",
        href: cmsPath(CMS_ROUTES.vodTvShows),
        icon: IconBrandNetflix,
        permission: "cms",
      },
    ],
  },
  {
    type: "group",
    label: "Music",
    icon: IconMusic,
    permission: "cms",
    defaultOpen: false,
    children: [
      {
        type: "link",
        label: "Genres",
        href: cmsPath(CMS_ROUTES.musicGenres),
        icon: IconCategory,
        permission: "cms",
      },
      {
        type: "link",
        label: "Singers",
        href: cmsPath(CMS_ROUTES.musicSingers),
        icon: IconMicrophone2,
        permission: "cms",
      },
      {
        type: "link",
        label: "Songs",
        href: cmsPath(CMS_ROUTES.musicSongs),
        icon: IconMovie,
        permission: "cms",
      },
    ],
  },
  {
    type: "group",
    label: "Streaming",
    icon: IconVideo,
    permission: "cms",
    defaultOpen: false,
    children: [
      {
        type: "link",
        label: "Genres",
        href: cmsPath(CMS_ROUTES.streamingGenres),
        icon: IconCategory,
        permission: "cms",
      },
      {
        type: "link",
        label: "Radio",
        href: cmsPath(CMS_ROUTES.streamingRadio),
        icon: IconRadio,
        permission: "cms",
      },
      {
        type: "link",
        label: "Channels",
        href: cmsPath(CMS_ROUTES.streamingChannels),
        icon: IconDeviceTv,
        permission: "cms",
      },
    ],
  },
];

export const cmsMenuItems = CMS_WORKSPACE_ITEMS;
