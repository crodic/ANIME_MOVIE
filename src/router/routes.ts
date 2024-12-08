import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'dang-nhap',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: 'dang-ky',
        name: 'register',
        component: () => import('@/views/RegisterView.vue'),
      },
      {
        path: 'tim-kiem',
        name: 'search',
        component: () => import('@/views/SearchView.vue'),
      },
      {
        path: 'thong-tin-phim/:slug',
        name: 'movie-detail',
        component: () => import('@/views/MovieDetailView.vue'),
      },
      {
        path: 'xem-phim/:slug',
        name: 'watch-movie',
        component: () => import('@/views/WatchMovieView.vue'),
      },
      {
        path: 'theo-doi',
        name: 'bookmark',
        component: () => import('@/views/BookmarkView.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
      },
    ],
  },
]
