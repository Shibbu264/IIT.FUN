export const validateEmail = (email: string): boolean => {
    // Check if the email ends with .ac.in and contains the specified substrings
    const regex = /^(?=.*(iitbhu|itbhu|iitr)).*\.ac\.in$/;
    return regex.test(email);
  };

export const cn = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
};