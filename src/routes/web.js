import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Users from '../components/users/List';
import Posts from '../components/posts/Page';
import Albums from '../components/albums/Page';
import Home from '../components/Home';
import Register from '../components/Register';
import NotFound from '../components/NotFound';

import User from '../components/users/Card';
import Post from '../components/posts/Card';

import UserProfile from '../components/users/Profile';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts,
  },
  {
    path: '/albums',
    name: 'albums',
    component: Albums,
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
      },
    ],
    props: true,
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
    props: true,
  },
  {
    path: '*',
    component: NotFound,
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

export default new VueRouter({
  routes,
});
