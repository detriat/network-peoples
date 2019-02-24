<template>
    <nav v-if="visibility" aria-label="Pagination">
        <ul class="pagination">
            <li class="page-item"
                :class="{disabled: currentPage === 1}"
            >
                <router-link class="page-link"
                             :to="prevUrl()"
                             @click="currentPage--"
                             tabindex="-1"
                             aria-disabled="true"
                >Previous</router-link>
            </li>

            <li v-for="numberPage in pageItems"
                :key="numberPage"
                class="page-item"
                :class="{active: isCurrentPage(numberPage)}"
            >
                <router-link class="page-link" :to="pageUrl(numberPage)" @click="currentPage = page">
                    {{ numberPage }}
                    <span v-if="isCurrentPage(numberPage)" class="sr-only">(current)</span>
                </router-link>
            </li>

            <li class="page-item"
                :class="{disabled: currentPage === pageItems.length}"
            >
                <router-link class="page-link"
                             :to="nextUrl()"
                             @click="currentPage++"
                >Next</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>

import axios from 'axios';
import { BASE_URL } from '../settings/server';

export default {
  name: 'Pagination',
  props: {
    perPage: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      total: 0,
      currentPage: 0,
      pageItems: [],
    };
  },
  computed: {
    visibility() {
      return (this.total / this.perPage) > 1;
    },
  },
  methods: {
    setCurrentPage() {
      this.currentPage = this.$route.query._page ? parseInt(this.$route.query._page, 10) : 1;
    },
    async setTotalItems() {
      this.total = await this.getTotalItems();
      this.addPageItems();
    },
    addPageItems() {
      this.pageItems = [];
      const countPages = Math.ceil(this.total / this.perPage);

      for (let i = 1; i <= countPages; i++) {
        this.pageItems.push(i);
      }
    },
    getTotalItems() {
      const url = `${BASE_URL}${this.$route.name}`;

      return axios.get(url)
        .then(res => res.data.length)
        .catch(error => console.log(error));
    },
    isCurrentPage(page) {
      return page === this.currentPage;
    },
    prevUrl() {
      return `${this.$route.path}?_page=${this.currentPage - 1}&_limit=${this.perPage}`;
    },
    nextUrl() {
      return `${this.$route.path}?_page=${this.currentPage + 1}&_limit=${this.perPage}`;
    },
    pageUrl(page) {
      return `${this.$route.path}?_page=${page}&_limit=${this.perPage}`;
    },
  },
  watch: {
    $route() {
      this.setCurrentPage();
      this.setTotalItems();
    },
  },
  created() {
    this.setCurrentPage();
    this.setTotalItems();
  },
};
</script>

<style scoped>

</style>
