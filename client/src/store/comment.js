import indexAjax from '@/ajax/index.js'
function commentHandle(comment) {
    // 整理评论，将回复的整理至回复评论下
    const newCom = []; // 新的数组
    let len = comment.length;
    // console.log(comment);
    for (let i = 0; i < len; i++) {
        if (!comment[i].mainId) {
            // 如果为null，表示是最高层评论，直接添加到新数组中
            comment[i].children = [];
            newCom.push(comment[i]);
        } else {
            const result = newCom.find((item) => {
                // 是否之前添加过
                return (item.id == comment[i].mainId);
            });
            if (!result) {
                // 没有则添加children属性
                comment[i].children = [];
            } else {
                // 再次对次评论归类，将同一主评论下的同一次评论放一起
                const secondIndex = result.children.lastIndexOf((item) => {
                    return (item.secondId = comment[i].secondId);
                });
                if (secondIndex != -1) {
                    result.children.splice(secondIndex, 0, comment[i]);
                }
                result.children.push(comment[i]); // push到children上
            }
        }
    }
    return newCom;
}
export default {
    state: {
        comments: null,
        curCom: null,
        article: null,
    },
    mutations: {
        comsChange(state, payload) {
            state.comments = payload;
        },
        curComChange(state, payload) {
            state.curCom = payload;
        },
        articleChange(state, payload) {
            state.article = payload;
        },
    },
    actions: {
        comsGet({ commit, state }, paload) {
            indexAjax.getCommentByArticleId(state.article.id).then((req) => {
                const newComment = commentHandle(req.data);
                commit('comsChange', newComment);
                // console.log("新评论", newComment);
            });
        }
    },
    getters: {}
}