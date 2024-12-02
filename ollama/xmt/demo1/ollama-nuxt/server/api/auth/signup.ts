const signUp = async (name: string, email: string, password: string) => {
  if (!name || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and password cannot be empty'
    })
  }
}