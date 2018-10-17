import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import db from '../db'
import { formatDate } from "../plugs/common";
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    users: {},
    orders: [],
    cards: [],
    users: [],
    messages: [],
    info:[],
    exams: [],
    questions: [],
    subjects: [],
    permissions: [],
    lessons: [],
    uploads: [],
    Information: [],
    pageCount: {},
    pageTitle: '',
    token: null,
    errorMsg: '',
  },
  getters: {
    users(state) {
      return state.users || {};
    },
    questions(state) {
      return state.questions || db.get('questions') || [];
    },
    Information(state) {
      return state.Information || db.get('Information') || [];
    },
    Info(state) {
      return state.Info || db.get('Info') || [];
    },
    cards(state) {
      return state.cards || db.get('cards') || [];
    },
    subjects(state) {
      return state.subjects || db.get('subjects') || [];
    },
    uploads(state) {
      return state.uploads || db.get('uploads') || [];
    },
    permissions(state) {
      return state.permissions || db.get('permissions') || [];
    },
    messages(state) {
      return state.messages || db.get('messages') || [];
    },
    orders(state) {
      return state.orders || db.get('orders') || [];
    },
    exams(state) {
      return state.exams || db.get('exams') || [];
    },
    errorMsg(state) {
      return state.errorMsg || '';
    },
    token(state) {
      return state.token || db.get('token') || '';
    },
    pageTitle(state) {
      return state.pageTitle || '';
    }
  },
  actions: {
    loadOrders({ commit, state }, filter) {
      axios.get('/api/orders', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'orders', val: res.headers });
        commit('updateOrders', res);
      })
    },
    loadInformation({ commit, state }, filter) {
      axios.get('/api/Information', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'orders', val: res.headers });
        commit('updateInformation', res);
      })
    },
    loadInfo({ commit, state }, filter) {
      axios.get('/api/Info', { params: filter }).then((res) => {
        res.data.forEach(e => {
          e.created_at = formatDate(new Date(e.created_at))
          e.updated_at = formatDate(new Date(e.updated_at))
        });
        commit('updatePageCount', { key: 'info', val: res.headers });
        commit('updateInfo', res);
      })
    },

    loadMessages({ commit, state }, filter) {
      axios.get('/api/messages', { params: filter }).then((res) => {
        res.data.forEach(e => {
          e.created_at = formatDate(new Date(e.created_at))
          e.updated_at = formatDate(new Date(e.updated_at))
        });
        commit('updatePageCount', { key: 'messages', val: res.headers });
        commit('updateMessages', res);
      })
    },
    loadPermissions({ commit, state }, filter) {
      axios.get('/api/permissions', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'permissions', val: res.headers });
        commit('updatePermissions', res);
      })
    },
    loadSubjects({ commit, state }, filter) {
      axios.get('/api/subjects', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'subjects', val: res.headers });
        commit('updateSubjects', res);
      })
    },
    loadLessons({ commit, state }, filter) {
      axios.get('/api/lessons', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'lessons', val: res.headers });
        commit('updateLessons', res);
      })
    },
    loadUploads({ commit, state }, filter) {
      axios.get('/api/uploads', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'uploads', val: res.headers });
        commit('updateUploads', res);
      })
    },
    loadExams({ commit, state }, filter) {
      axios.get('/api/exams', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'exams', val: res.headers });
        commit('updateExams', res);
      })
    },
    loadQuestions({ commit, state }, filter) {
      axios.get('/api/questions', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'questions', val: res.headers });
        commit('updateQuestions', res);
      })
    },
    loadUsers({ commit, state }, filter) {
      axios.get('/api/users', { params: filter }).then((res) => {
        res.data.forEach(e => {
          e.created_at = formatDate(new Date(e.created_at))
          e.updated_at = formatDate(new Date(e.updated_at))
        });
        commit('updatePageCount', { key: 'users', val: res.headers });
        commit('updateUsers', res);
      })
    },
    loadCards({ commit, state }, filter) {
      axios.get('/api/cards', { params: filter }).then((res) => {
        commit('updatePageCount', { key: 'cards', val: res.headers });
        commit('updateCards', res);
      })
    },
  },
  mutations: {
    updateUser(state, user_data) {
      if (user_data && user_data.length) {
        user_data = user_data[0];
      }
      state.user = user_data;
    },
    updateCards(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.cards = state.cards.concat(models.data);
      } else {
        state.cards = models.data;
        db.set('cards', models.data);
      }
    },
    updateToken(state, token) {
      state.token = token;
    },
    updateOrders(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.orders = state.orders.concat(models.data);
      } else {
        state.orders = models.data;
        db.set('orders', models.data);
      }
    },
    updateMessages(state, models) {
      state.messages = [];
      if (models.headers['x-page-num'] > 1) {
        state.messages = state.messages.concat(models.data);
      } else {
        state.messages = models.data;
        db.set('messages', models.data);
      }
    },
    updateInfo(state, models) {
      state.info = [];
      if (models.headers['x-page-num'] > 1) {
        state.info = state.info.concat(models.data);
      } else {
        state.info = models.data;
        db.set('info', models.data);
      }
    },

    updateInformation(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.Information = state.Information.concat(models.data);
      } else {
        state.Information = models.data;
        db.set('Information', models.data);
      }
    },
    updatePermissions(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.permissions = state.permissions.concat(models.data);
      } else {
        state.permissions = models.data;
        db.set('permissions', models.data);
      }
    },
    updateUploads(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.uploads = state.uploads.concat(models.data);
      } else {
        state.uploads = models.data;
        db.set('uploads', models.data);
      }
    },
    updateSubjects(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.subjects = state.subjects.concat(models.data);
      } else {
        state.subjects = models.data;
        db.set('subjects', models.data);
      }
    },
    updateLessons(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.lessons = state.lessons.concat(models.data);
      } else {
        state.lessons = models.data;
        db.set('lessons', models.data);
      }
    },
    updateExams(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.exams = state.exams.concat(models.data);
      } else {
        state.exams = models.data;
        db.set('exams', models.data);
      }
    },
    updateQuestions(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.questions = state.questions.concat(models.data);
      } else {
        state.questions = models.data;
        db.set('questions', models.data);
      }
    },
    updateOrders(state, models) {
      if (models.headers['x-page-num'] > 1) {
        state.orders = state.orders.concat(models.data);
      } else {
        state.orders = models.data;
        db.set('orders', models.data);
      }
    },
    updateUsers(state, models) {
      state.users = [];
      if (models.headers['x-page-num'] > 1) {
        state.users = state.users.concat(models.data);
      } else {
        state.users = models.data;
        db.set('users', models.data);
      }
    },
    updatePageCount(state, page_count) {
      var tmp = {};
      tmp[page_count.key] = { page_num: parseInt(page_count.val['x-page-num']), total_count: parseInt(page_count.val['x-total-count']), total_page: parseInt(page_count.val['x-total-page']) }
      state.pageCount = Object.assign({}, state.page_count, tmp);
    },
    updatePageTitle(state, page_title) {
      state.pageTitle = page_title;
    },
    updateErrorMsg(state, error_msg) {
      state.errorMsg = error_msg;
    }
  }
})
