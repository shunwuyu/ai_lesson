import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);

  return client.post<{
    code: number;
    message: string;
    data: {
      original_name: string;
      saved_name: string;
      size: number;
    };
  }>("/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}