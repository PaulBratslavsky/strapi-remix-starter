export async function updateProfile(
  data: any,
  image: any,
  userId: string,
  jwt: string
) {
  const baseUrl = process.env.STRAPI_API_URL;
  const query = `/api/users/${userId}`;

  const url = baseUrl + query;

  const hasImage = image._name === "" ? false : true;

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (hasImage) formData.append("files.image", image, image.name);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  return response.json();
}
