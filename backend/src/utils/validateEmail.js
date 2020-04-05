`use strict`

import SQLHelper from '../models/sqlDB/helper'

var isUniqueEmail = async (email) => {
    var query
    query = "SELECT user_id from user where email = '" + email + "'"
    var result = await SQLHelper(query)
    if(result) {
        return false
    }
    
    query = "SELECT editor_id from editor where email = '" + email + "'"
    var result = await SQLHelper(query)
    if(result.length > 0) {
        return false
    }

    return true
}

module.exports = {
    isUniqueEmail: isUniqueEmail
}