/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MovieData {
  seoOnPage: any
  breadCrumb: any
  titlePage: string
  items: {
    tmdb: {
      type: 'tv'
      id: string
      season: number
      vote_average: number
      vote_count: number
    }
    imdb: {
      id: string
    }
    modified: {
      time: string
    }
    _id: string
    name: string
    slug: string
    origin_name: string
    type: string
    thumb_url: string
    poster_url: string
    sub_docquyen: boolean
    chieurap: boolean
    time: string
    episode_current: string
    quality: string
    lang: string
    year: number
    category: Array<{
      id: string
      name: string
      slug: string
    }>
    country: Array<{
      id: string
      name: string
      slug: string
    }>
  }[]
  params: {
    type_slug: string
    filterCategory: string[]
    filterCountry: string[]
    filterYear: string
    filterType: string
    sortField: string
    sortType: string
    pagination: {
      totalItems: number
      totalItemsPerPage: number
      currentPage: number
      pageRanges: number
    }
  }
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface MovieDetailData {
  item: {
    id: string
    tmdb: {
      type: string | null
      id: string
      season: string | null
      vote_average: number
      vote_count: number
    }
    imdb: {
      id: string
    }
    created: {
      time: string
    }
    modified: {
      time: string
    }
    _id: string
    name: string
    origin_name: string
    content: string
    type: string
    status: string
    thumb_url: string
    poster_url: string
    is_copyright: boolean
    sub_docquyen: boolean
    chieurap: boolean
    slug: string
    trailer_url: string
    time: string
    episode_current: string
    episode_total: string
    quality: string
    lang: string
    year: number
    view: number
    actor: string[]
    director: string[]
    category: {
      id: string
      name: string
      slug: string
    }[]
    country: {
      id: string
      name: string
      slug: string
    }[]
    episodes: {
      server_name: string
      server_data: {
        name: string
        slug: string
        filename: string
        link_embed: string
        link_m3u8: string
      }[]
    }[]
  }
}

export interface CategoryData {
  items: {
    _id: string
    name: string
    slug: string
  }[]
}

export interface DataHistory {
  movie_id: string
  slug: string
  episode_slug: string
}

export interface AnimeSearchData {
  items: {
    _id: string
    name: string
    slug: string
  }[]
}

export interface LoginResponse {
  status: number
  message: string
  payload: {
    user: {
      _id: string
      username: string
      email: string
      location?: string
      ip?: string
      role: 'USER' | 'ADMIN'
      createdAt: string
      updatedAt: string
      isDeleted: boolean
      deletedAt?: string
    }
    accessToken: string
    refreshToken: string
  }
}

export interface RegisterResponse {
  status: number
  message: string
  payload: {
    user: {
      _id: string
      username: string
      email: string
      location?: string
      ip?: string
      role: 'USER' | 'ADMIN'
      createdAt: string
      updatedAt: string
      isDeleted: boolean
      deletedAt?: string
    }
  }
}

export interface ApiResponse<T> {
  status: number
  message: string
  payload: T
}

export interface CommentData {
  _id: string
  content: string
  user: {
    _id: string
    username: string
    email: string
    location?: string
    ip?: string
    role: 'USER' | 'ADMIN'
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    deletedAt?: string
  }
  animeId: string
  animeSlug: string
  createdAt: string
  updatedAt: string
}
