import { SITE } from '../config/site';

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

/** Submit using FormData (recommended by Web3Forms). */
export async function submitWeb3FormData(formData: FormData): Promise<Web3FormsResult> {
  const accessKey = SITE.web3formsAccessKey;

  if (!accessKey) {
    return {
      success: false,
      message:
        'Form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file (see .env.example).',
    };
  }

  formData.append('access_key', accessKey);
  if (!formData.has('from_name')) {
    formData.append('from_name', SITE.name);
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !data.success) {
    return {
      success: false,
      message: data.message ?? 'Something went wrong. Please try WhatsApp or email us directly.',
    };
  }

  return {
    success: true,
    message: 'Form submitted successfully. We will contact you shortly.',
  };
}

/** Submit an HTML form element (fields must use `name` attributes). */
export async function submitWeb3Form(
  form: HTMLFormElement,
  extraFields?: Record<string, string>
): Promise<Web3FormsResult> {
  const formData = new FormData(form);
  if (extraFields) {
    Object.entries(extraFields).forEach(([key, value]) => formData.append(key, value));
  }
  return submitWeb3FormData(formData);
}

/** Programmatic submit for multi-step / controlled forms (e.g. booking wizard). */
export async function submitToWeb3Forms(fields: Record<string, string>): Promise<Web3FormsResult> {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });
  return submitWeb3FormData(formData);
}
