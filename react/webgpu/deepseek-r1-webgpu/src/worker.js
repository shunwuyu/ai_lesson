self.addEventListener("message", async (e) => {
  const { type, data } = e.data;
  switch (type) {
    case "check":
      self.postMessage({
        status: "error"
      });
    break;
  }
})