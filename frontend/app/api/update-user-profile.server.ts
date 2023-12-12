export async function updateProfile(
  data: any,
  imageId: string,
  userId: string,
  jwt: string
) {
  const baseUrl = process.env.STRAPI_API_URL;
  const query = `/api/users/${userId}`;

  const url = baseUrl + query;
  const formData = new FormData();

  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      formData.append(key, data[key]);
    }
  }

  if (imageId) formData.append("image", imageId);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  const dataResponse = await response.json();
  return dataResponse;
}
