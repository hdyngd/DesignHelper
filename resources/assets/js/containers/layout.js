import { connect } from './connect'

import Layout from '../components/Layout';

export default connect({
    gettersToProps: {
        // isWorkroom: 'isWorkroom',
    },
})('layout', Layout)