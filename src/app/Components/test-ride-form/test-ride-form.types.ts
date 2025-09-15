export interface TestRideFormProps {
  timerDelay?: number; // Seconds before popup shows
  onClose?: () => void; // Optional callback when form is closed
}

export interface TestRideFormData {
  name: string;
  location: string;
  mobileNumber: string;
  modelInterested: string;
}

export interface TestRideFormState {
  isSubmitted: boolean;
  formData: TestRideFormData;
  errors: Partial<TestRideFormData> & { general?: string };
}
