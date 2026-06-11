import type { BaseEntity } from "@shared/types";

export type ContentStatus = "draft" | "published" | "archived";
export type MovieRating = "G" | "PG" | "PG-13" | "R" | "NC-17";

export interface Movie extends BaseEntity {
  title: string;
  titleAr?: string;
  slug: string;
  description: string;
  descriptionAr?: string;
  duration: number;
  releaseDate: string;
  rating: number;
  voteCount: number;
  imdbUrl?: string;
  directors: string[];
  writers: string[];
  stars: string[];
  genres: string[];
  posterUrl?: string;
  trailerUrl?: string;
  mediaUrl?: string;
  price: number;
  cost: number;
  isPaid: boolean;
  productionRating: number;
  isAdult: boolean;
  status: ContentStatus;
}

export interface Season extends BaseEntity {
  seriesId: string;
  title: string;
  titleAr?: string;
  seasonNumber: number;
  posterUrl?: string;
  trailerUrl?: string;
  episodes: Episode[];
}

export interface Episode extends BaseEntity {
  seasonId: string;
  title: string;
  titleAr?: string;
  episodeNumber: number;
  duration: number;
  mediaUrl?: string;
  description: string;
  status: ContentStatus;
}

export interface Series extends BaseEntity {
  title: string;
  titleAr?: string;
  slug: string;
  description: string;
  descriptionAr?: string;
  posterUrl?: string;
  genres: string[];
  rating: number;
  status: ContentStatus;
  seasons: Season[];
}

export interface Singer extends BaseEntity {
  name: string;
  nameAr?: string;
  imageUrl?: string;
  bio?: string;
  genres: string[];
  albums: Album[];
}

export interface Album extends BaseEntity {
  singerId: string;
  title: string;
  titleAr?: string;
  coverUrl?: string;
  releaseDate: string;
  songs: Song[];
}

export interface Song extends BaseEntity {
  albumId: string;
  title: string;
  titleAr?: string;
  duration: number;
  audioUrl?: string;
  plays: number;
  genres: string[];
  status: ContentStatus;
}

export interface RadioStation extends BaseEntity {
  name: string;
  nameAr?: string;
  streamUrl: string;
  imageUrl?: string;
  isOnline: boolean;
  genres: string[];
  status: ContentStatus;
}

export interface ChannelCategory extends BaseEntity {
  name: string;
  nameAr?: string;
  sortOrder: number;
}

export interface Channel extends BaseEntity {
  name: string;
  nameAr?: string;
  categoryId: string;
  categoryName: string;
  logoUrl?: string;
  streamUrl?: string;
  isActive: boolean;
  status: ContentStatus;
}

export interface CmsGenre extends BaseEntity {
  name: string;
  nameAr?: string;
  iconUrl?: string;
  sortOrder: number;
  contentType: "vod" | "music" | "streaming";
}
