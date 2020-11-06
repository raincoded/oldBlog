import indexAjax from '@/ajax/index.js'
export default {
    state: {
        messages: null,
    },
    mutations: {
        messagesChange(state, payload) {
            state.messages = payload;
        },
    },
    actions: {
        // 获取留言
        messagesGet({ commit, state }, paload) {
            indexAjax.getMessageByPage(paload).then((req) => {
                if (req.code == 0) {
                    commit('messagesChange', req.data);
                    console.log("获取留言", req.data);
                } else {
                    commit('messagesChange', {
                        code: 0, rows: []
                    });
                }


            });
        }
    },
}