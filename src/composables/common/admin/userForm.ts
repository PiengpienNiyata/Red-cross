import { ref } from 'vue';
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';
// import { useRouter } from 'vue-router'


// let router = useRouter()

interface InputData {
  data: string;
  errorMessage: string;
}

interface Inputs {
  firstname: InputData;
  lastname: InputData;
  email: InputData;
  position: InputData;
  password: InputData;
}

interface ErrorObject {
  message: string;
  code: number;
}

export const errors = ref<ErrorObject[]>([]);
export const optionValues = ref<string[]>(['System', 'Admin', 'User']);

export const inputs = ref<Inputs>({
  firstname: { data: '', errorMessage: '' },
  lastname: { data: '', errorMessage: '' },
  email: { data: '', errorMessage: '' },
  position: { data: '', errorMessage: '' },
  password: { data: '', errorMessage: '' },
});

export const formSubmitted = ref<boolean>(false);
export const submitted = ref<boolean>(false);

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateInputs = (): boolean => {
  const values = inputs.value;
  let isValid = true;

  const validateField = (
    field: keyof Inputs,
    condition: boolean,
    message: string
  ) => {
    if (condition) {
      values[field].errorMessage = message;
      isValid = false;
    } else {
      values[field].errorMessage = '';
    }
  };

  validateField('firstname', values.firstname.data.trim().length < 3, 'Invalid first name (min 3 chars).');
  validateField('lastname', values.lastname.data.trim().length < 3, 'Invalid last name (min 3 chars).');
  validateField('email', !isValidEmail(values.email.data), 'Invalid email format.');
  validateField('position', values.position.data.trim().length < 1, 'Please select a valid position.');
  validateField('password', values.password.data.trim().length < 6, 'Password must be at least 6 characters.');

  return isValid;
};


export const onSubmit = () => {
  submitted.value = true;
  formSubmitted.value = true;

  const formIsValid = validateInputs();

  if (formIsValid) {
    console.log('✅ Form is valid! Submitting...', inputs.value);
    // รอdatabase/api
    // toast.success('Account created successfully ', { position: 'top-right', autoClose: 4000 });
    // router.replace('/admins/users');

  } else {
    console.log('❌ Form has errors. Fix them before submitting.');
    // toast.error('Opps... Form has errors. Fix them before submitting. ', { position: 'top-right', autoClose: 4000 });

  }
};

export const onEdit = async () => {
  submitted.value = true;
  formSubmitted.value = true;

  const formIsValid = validateInputs();
  if (formIsValid) {
    console.log('✅ Form is valid! Submitting...', inputs.value);

    try {
      // รอAPI
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('✅ Account edited successfully');
      return true;
    } catch (error) {
      console.error('❌ Submission failed:', error);
      return false;
    }
  } else {
    console.log('❌ Form has errors. Fix them before submitting.');
    return false;
  }
};

export const onDelete = async (userId: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`✅ User with ID ${userId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to delete user with ID ${userId}:`, error);
    return false;
  }
};

export const resetInputs = () => {
  inputs.value.firstname.data = "";
  inputs.value.lastname.data = "";
  inputs.value.email.data = "";
  inputs.value.position.data = "";
  inputs.value.password.data = "";
  inputs.value.firstname.errorMessage = "";
  inputs.value.lastname.errorMessage = "";
  inputs.value.email.errorMessage = "";
  inputs.value.position.errorMessage = "";
  inputs.value.password.errorMessage = "";

  formSubmitted.value = false;
};
