import Vue from 'vue'
import Vuex from 'vuex'
import comment from './comment'
import message from './message'
import staticAjax from '@/ajax/static.js'
import indexAjax from '@/ajax/index.js'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    articleId: 0,// 默认最高浏览量的文章
    emoji: [], // Emoji表情
    user: null,
    newMessages: null,
    articles: [],
    curPage: 1,
    limit: 6,
  },
  mutations: {
    changeStateId(state, payload) {
      state.articleId = payload;
    },
    emojiChange(state, payload) {
      state.emoji = payload;
    },
    userChange(state, payload) {
      state.user = payload;
    },
    newMessagesChange(state, payload) {
      state.newMessages = payload;
    },
    articlesChange(state, payload) {
      payload && (state.articles = payload);
    },
    pageChange(state, payload) {
      payload && (state.curPage = payload);
    },
    limitChange(state, payload) {
      payload && (state.limit = payload);
    },

  },
  actions: {
    emojiGet({ commit, state }, payload) {
      staticAjax.getEmoji().then((req) => {
        commit('emojiChange', req.data)
      });
    },
    userLogin({ context }, payload) {
      indexAjax
        .login()
        .then((req) => {
          if (req.code == 0) {
            // console.log("当前用户", req.data);
            context.commit("userChange", req.data);
          } else if (req.code == 500) {
            // console.log("未登录");
            context.commit("userChange", null);
          }
        })
        .catch(() => {
          context.commit("userChange", null);
        });

    },
    getNewMessages({ commit, state }) {
      indexAjax.getMessageByPage({
        page: 1,
        limit: 6,
        orderProp: "createdAt",
        order: "DESC",
      }).then((req) => {
        // console.log('最新的', req.data);
        commit('newMessagesChange', req.data)
      });
    },
    getArticles({ commit, state }) {
      indexAjax.getArticlePage({
        page: state.curPage,
        limit: state.limit
      }).then(req => {
        commit('articlesChange',req.data)
      }).catch(err => {
        // console.log(err);
      })
    }
  },
  modules: {
    comment,
    message
  }
})

