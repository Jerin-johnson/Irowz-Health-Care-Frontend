import { api } from "../../axios.config";

export async function getSignedUrlApi(key: string) {
  const result = await api.get(`/private/get-signed-url?key=${key}`);
  return result.data.data;
}
