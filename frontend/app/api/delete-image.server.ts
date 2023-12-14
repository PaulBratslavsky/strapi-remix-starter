export async function deleteImage(imageId: string, jwt: string) {
  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/upload/files/" + imageId;

  const url = baseUrl + path;
  
  const checkIfImageExists = await fetch(url + imageId);

  if (checkIfImageExists.status === 403) return;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = await response.json();
  return data;
}
