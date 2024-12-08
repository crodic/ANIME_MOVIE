import http from '@/lib/http'
import request from '@/lib/request'
import type {
  ApiResponse,
  CategoryData,
  CommentData,
  LoginResponse,
  MovieData,
  MovieDetailData,
  RegisterResponse,
} from '@/types'
import type { AxiosResponse } from 'axios'
import QueryString from 'qs'

interface FilterDataType {
  page?: string
  category?: string[]
  year?: string
  keyword?: string
}

export const getAnimeList = async (params: FilterDataType) => {
  const queryParams = QueryString.stringify(params, {
    skipNulls: true,
    arrayFormat: 'comma',
    filter: (key, value) => value || undefined,
  })
  const res = await http.get<AxiosResponse<MovieData>>(
    `/v1/api/danh-sach/hoat-hinh?country=nhat-ban&${queryParams}`,
  )
  return res.data.data
}

export const getMovieDetail = async (slug: string) => {
  const res = await http.get<AxiosResponse<MovieDetailData>>(`/v1/api/phim/${slug}`)
  return res.data.data
}

export const getCategories = async () => {
  const res = await http.get<AxiosResponse<CategoryData>>('/v1/api/the-loai')
  return res.data.data
}

export const getSearchAnimeList = async (params: FilterDataType) => {
  const queryParams = QueryString.stringify(params, {
    skipNulls: true,
    arrayFormat: 'comma',
    filter: (key, value) => value || undefined,
  })
  // await new Promise((resolve) => setTimeout(resolve, 30000))
  let res
  if (params.keyword) {
    res = await http.get<AxiosResponse<MovieData>>(
      `/v1/api/tim-kiem?country=nhat-ban&type=hoathinh&${queryParams}`,
    )
  } else {
    res = await http.get<AxiosResponse<MovieData>>(
      `/v1/api/danh-sach/hoat-hinh?country=nhat-ban&${queryParams}`,
    )
  }
  return res.data.data
}

export const getAnimeByBookmarks = async (bookmark: string) => {
  const res = await http.get<AxiosResponse<MovieDetailData>>(`/v1/api/phim/${bookmark}`)
  return res.data.data
}

export const login = async (email: string, password: string) => {
  const res = await request.post<LoginResponse>('/auth/login', { email, password })
  return res.data
}

export const register = async (email: string, password: string, confirmPassword: string) => {
  const res = await request.post<RegisterResponse>('/auth/register', {
    email,
    password,
    confirmPassword,
  })
  return res.data
}

export const validateRequest = async () => {
  const res = await request.get<{ message: string }>('/auth/validate-request')
  return res.data
}

export const changePassword = async (
  newPassword: string,
  oldPassword: string,
  confirmPassword: string,
) => {
  const res = await request.put<{ message: string; status: number }>('/user/change-password', {
    newPassword,
    oldPassword,
    confirmPassword,
  })
  return res.data
}

export const createComment = async ({
  content,
  animeId,
  animeSlug,
}: {
  content: string
  animeId: string
  animeSlug: string
}) => {
  console.log({ content, animeId, animeSlug })
  const res = await request.post<ApiResponse<CommentData>>('/comment', {
    content,
    animeId,
    animeSlug,
  })
  return res.data
}

export const getCommentByAnimeId = async ({ animeId }: { animeId: string }) => {
  const res = await request.get<ApiResponse<CommentData[]>>(`/comment/${animeId}`)
  return res.data
}
