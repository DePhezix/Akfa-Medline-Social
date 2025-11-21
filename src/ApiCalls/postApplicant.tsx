import axios from "axios";
import { useBoundStore } from '../store/Store.js'

interface ApplicantArguments {
  jobid: string;
  fullName: string;
  email: string;
  phone: string;
  citizenship: string;
  educationLevel: string;
  languages: { name: string; level: string }[];
  total_years?: string;
  startDate?: string;
  job_recent_title?: string;
  interested_joint_university?: string;
  relocate?: boolean;
  resume: File
}

export async function postApplicant(
  formData: ApplicantArguments
): Promise<string> {
    const setIsLoading = useBoundStore.getState().setLoading;
  try {
    setIsLoading(true)
    const formDataToSend: any = new FormData();

    formDataToSend.append("vacancyId", Number(formData.jobid));
    formDataToSend.append("full_name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_number", formData.phone);
    formDataToSend.append("country_of_citizenship", formData.citizenship);
    formDataToSend.append("degree_and_field_of_study", formData.educationLevel);
    formDataToSend.append(
      "language",
      formData.languages.map((l) => l.name).join(", ")
    );
    formDataToSend.append("total_years", "Unknown");
    formDataToSend.append("when_you_start", formData.startDate);
    formDataToSend.append("relocate", true);
    formDataToSend.append("job_recent_title", "LinkedIn");
    formDataToSend.append("interested_joint_university", "string");
    formDataToSend.append("resume", formData.resume);

    await axios.post(
      "https://hr.centralasian.uz/api/applicants/apply",
      formDataToSend
    );

    return "success";
  } catch (err: any) {
    const msg =
      err.response?.data?.message || "Failed to submit form. Please try again.";
    return msg;
  } finally {
    setIsLoading(false)
  }
}
