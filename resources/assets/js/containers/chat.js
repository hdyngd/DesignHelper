import { connect } from './connect'

// import store from "../store";
import Chat from "../components/modules/chats/Chat";
export default connect({
    gettersToProps: {
        participants: 'getParticipants',
        messageList: 'getMessageList',
    },
    actionsToProps: {
        addMessage: 'addMessage',
        storeMessage: 'storeMessage',

    },
    // lifecycle: {
    //     beforeRouteEnter (to, from, next) {
    //         alert('aaa');
    //         let max = 2;
    //         let count = 0;
    //
    //         store.dispatch('fetchParticipants', to.params.id)
    //             .then(() => {
    //                 count++;
    //                 if(count === max) {
    //                     next()
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //
    //         store.dispatch('fetchMessageList', to.params.id)
    //             .then(() => {
    //                 count++;
    //                 if(count === max) {
    //                     next()
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    // },
})('chat', Chat)