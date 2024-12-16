import { supabaseUrl } from "/utils/supabase";
import supabaseClient from "/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.log("Companies not found", error);
    return null;
  }

  return data;
}

export async function addNewcompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.log("Error uploading Company Logo", storageError);
    return null;
  }

  //const logo_url = `${supabaseUrl}/storage/v1/object/sign/company-logo/${fileName}`;
  // Generate a signed URL
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("company-logo")
    .createSignedUrl(fileName, 315360000); // 60 seconds expiration ab 10 year hgya he hehehehe

  if (signedUrlError) {
    console.log("Error generating signed URL", signedUrlError);
    return null;
  }

  const logo_url = signedUrlData.signedUrl;

  const { data, error } = await supabase
    .from("companies")
    .insert([{ name: companyData.name, logo_url }])
    .select();

  if (error) {
    console.log("Error Submitting Company", error);
    return null;
  }

  return data;
}
