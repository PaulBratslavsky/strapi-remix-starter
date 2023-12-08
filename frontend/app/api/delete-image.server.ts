export async function deleteImage(imageId: string, jwt: string) {
  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/upload/files/" + imageId;

  const url = baseUrl + path;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = await response.json();
  return data;
}
