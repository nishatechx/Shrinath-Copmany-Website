/**
 * Formspree Integration for sending user inquiries and consultation requests via email.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjyvnzrr';

export interface FormSubmissionData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  businessName?: string;
  message?: string;
  source?: string;
  _subject?: string;
  [key: string]: unknown;
}

export async function submitToFormspree(
  data: FormSubmissionData
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      ...data,
      _subject:
        data._subject ||
        `New Inquiry: ${data.service || 'Website Lead'} from ${data.name}`,
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true };
    }

    const result = await response.json().catch(() => null);
    const errorMessage =
      result?.errors?.[0]?.message ||
      result?.error ||
      'Failed to send your request. Please try again or reach out on WhatsApp.';

    return { success: false, error: errorMessage };
  } catch (err: unknown) {
    console.error('Formspree submission error:', err);
    return {
      success: false,
      error:
        'Network error while sending form. Please check your internet connection or contact us directly on WhatsApp.',
    };
  }
}
