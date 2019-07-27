import { connect } from './connect'

import Layout from '../components/Layout';

export default connect({
    gettersToProps: {
        loading: 'getLoading',
    },
})('layout', Layout)