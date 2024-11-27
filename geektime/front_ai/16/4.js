function generateUserIds(numUsers) { 
  const userIds = []; 
  for (let i = 0; i < numUsers; i++) { 
    userIds.push(`user_${i + 1}`); 
  } 
  return userIds;
}

