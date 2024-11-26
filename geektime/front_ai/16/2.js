function generateRandomGender() { 
  const genders = ['male', 'female']; 
  return genders[Math.floor(Math.random() * genders.length)];
}