// Copyright 2004-present Facebook. All Rights Reserved.

import request from '../../js/request'; // real request

export function getUserName(userID) {
  return request('/actors/' + userID).then(user => user.name);
}
