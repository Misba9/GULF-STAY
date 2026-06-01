import { SITE } from '../config/site';

export interface Web3FormsPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

export async function submitToWeb3Forms(
  payload: Web3FormsPayload,
  extraFields?: Record<string, string>
): Promise<Web3FormsResult> {
  const accessKey = SITE.web3formsAccessKey;

  if (!accessKey) {
    return {
      success: false,
      message:
        'Booking form is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file (get a free key at web3forms.com).',
    };
  }

  const body = {
    access_key: accessKey,
    from_name: SITE.name,
    ...payload,
    ...extraFields,
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
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
    message: data.message ?? 'Your request was sent successfully. We will contact you shortly.',
  };
}
