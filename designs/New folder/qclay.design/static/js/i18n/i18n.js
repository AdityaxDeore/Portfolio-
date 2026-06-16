import _ from "lodash"
import en from './translations/en.json'

const $t = (id = '') => {
    return _.get(en, id)
}

export {
    $t
}