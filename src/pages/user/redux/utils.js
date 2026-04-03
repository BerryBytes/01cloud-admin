export const getNewUserList = (userList, userData) => {
  const userId = userData.id;
  const userListIndex = userList.findIndex((user) => user.id === userId);

  if (userListIndex < 0) {
    
    return userList;
  }
  userList[userListIndex] = userData;
  return [...userList];
};
