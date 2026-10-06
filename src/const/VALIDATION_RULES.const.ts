export default {
  USER: {
    EMAIL: () => {
      return {
        required: "Email is required!",
        pattern: { value: /^\S+@\S+\.\S+$/, message: "Email is not valid!" }
      };
    },
    PSEUDONYM: () => {
      return {
        required: "Pseudonym is required!",
        minLength: { value: 1, message: "Pseudonym is to short!" },
        maxLength: { value: 32, message: "Pseudonym is to long!" }
      };
    },
    PASSWORD: () => {
      return {
        required: "Password is required!",
        minLength: { value: 12, message: "Password is to short!" }
      };
    },
    PRIVACY_POLICY: () => {
      return { required: "You must accept our privacy policy!" };
    },
  },
  STORAGE_OBJECT: {
    NAME: () => {
      return {
        maxLength: { value: 64, message: "Name is to long!" },
        minLength: { value: 1, message: "Name is to short!" }
      };
    },
    QUALITY: () => {
      const msg: string = "Value must be between 0 and 100!";
      
      return {
        max: { value: 100, message: msg },
        min: { value: 0, message: msg }
      };
    },
    SIZE: () => {
      return {
        min: { value: 0, message: "Size is to small!" }
      };
    },
    CRF: () => {
      return {
        max: { value: 51, message: "CRF is to big!" },
        min: { value: 0, message: "CRF is to small!" }
      }
    }
  }
} as const;
