import http from '@/lib/http'
import type { CategoryData, MovieData, MovieDetailData } from '@/types'
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
  await new Promise((resolve) => setTimeout(resolve, 10000))
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
