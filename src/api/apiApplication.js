import { supabaseUrl } from "/utils/supabase";
import supabaseClient from "/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.log("Error uploading Resume", storageError);
    return null;
  }

  // const resume = `${supabaseUrl}/storage/v1/object/sign/resumes/${fileName}`;
  // Generate a signed URL
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("resumes")
    .createSignedUrl(fileName, 60); // 60 seconds expiration

  if (signedUrlError) {
    console.log("Error generating signed URL", signedUrlError);
    return null;
  }

  const resume = signedUrlData.signedUrl;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.log("Error Submitting Application", error);
    return null;
  }

  return data;
}

// export async function updateApplicationStatus(token, { job_id }, status) {
//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("applications")
//     .update({ status })
//     .eq("job_id", job_id)
//     .select();

//   if (error || data.length === 0) {
//     console.error("Error Updating Application Status:", error);
//     return null;
//   }

//   return data;
// }

export async function updateApplicationStatus(token, { job_id }, status) {
  console.log("Token:", token);
  console.log("Job ID:", job_id);
  console.log("Status:", status);

  const supabase = await supabaseClient(token);
  console.log("Supabase Client:", supabase);

  // Verify existing row
  const { data: existingRow, error: fetchError } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", job_id);

  if (fetchError) {
    console.error("Error Fetching Row:", fetchError);
    return null;
  }
  console.log("Existing Row:", existingRow);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || !data || data.length === 0) {
    console.error("Error Updating Application Status:", error, data);
    return null;
  }

  console.log("Update Successful:", data);
  return data;
}

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  // Verify existing row
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error Fetching Applications:", error, data);
    return null;
  }

  console.log("Update Successful:", data);
  return data;
}
