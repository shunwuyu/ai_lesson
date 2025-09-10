export async function POST(req: Request) {
  console.log('--------------------------')
  try {
      return {
        status: 200,
        body: "Hello, world!"
      }
  } catch(error) {
    console.log("Error generating response: " + error);
    throw error
  }
}