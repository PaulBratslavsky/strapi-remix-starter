export async function uploadImage(
  image: any,
  jwt: string
) {
  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/upload";

  const url = baseUrl + path;
  const formData = new FormData();

  formData.append("files", image, image.name);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  const dataResponse = await response.json();
  return dataResponse;
}
