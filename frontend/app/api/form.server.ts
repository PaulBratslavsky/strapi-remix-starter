export async function submitJoinForm(formData: {
  data: {
    email: string;
  } | null;
}): Promise<any> {
  const URL =  process.env.STRAPI_API_URL + "/api/lead-form-submissions";
  const SUBMIT_FORM_STRAP_KEY = process.env.SUBMIT_FORM_STRAPI_KEY;

  try {
    const data = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUBMIT_FORM_STRAP_KEY}`,
      },
      body: JSON.stringify(formData),
    });
    return data;
  } catch (error) {
    console.error(error, "error");
  }
}
