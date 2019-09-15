export const getters = {
    getPropositions: state => state.propositions,
    getProposition: state => state.proposition,
    getCart: state => state.cart,
    getAmounts: state => state.amounts,
    getShoppingCartVisible: state => state.shoppingCartVisible,
    getAttachCreatorVisible: state => state.attachCreatorVisible,
    getCreators: state => state.creators,
    getMyPropositions: state => state.myPropositions,
    getParticipants: state => state.participants,
    getMessageList: state => state.messageList,
}

export default getters