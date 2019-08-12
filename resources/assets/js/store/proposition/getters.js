export const getters = {
    getPropositions: state => state.propositions,
    getCart: state => state.cart,
    getShoppingCartVisible: state => state.shoppingCartVisible,
    getAttachCreatorVisible: state => state.attachCreatorVisible,
    getCreators: state => state.creators,
    getMyPropositions: state => state.myPropositions
}

export default getters