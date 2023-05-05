export async function submitJoinForm(formData: {
  data: {
    email: string;
  } | null;
}): Promise<any> {
  const URL = `http://localhost:1337/api/lead-form-submissions`;
  const SUBMIT_FORM_STRAP_KEY =
    "5113bbe1c06866889f13a7f6c77047227bc5f25ecea9c0cd7439c6df0d938e68f5ae336e3dc4376368978901a05ed521f67e1dade3df263cfe49e76923f087484460e76cc661e927c6d0968513b6a84163e880d13cda23c7ea04f70c0d132ddeae427e687f65cf04b5845ab7c72bed37f01a64fb1c7d0d2be9a49487cbe05006";

  console.log(formData, "formData");
  try {
    const data = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUBMIT_FORM_STRAP_KEY}`,
      },
      body: JSON.stringify(formData),
    });
    console.log(data, "data");
    return data;
  } catch (error) {
    console.error(error, "error");
  }
}
