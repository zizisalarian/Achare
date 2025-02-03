const { createApp, ref } = Vue;

createApp({
    setup() {
        const formData = ref({
            name: '',
            lastname: '',
            mobile: '',
            phone: '',
            address:'',
            gender: ''
        });
        
        const errors = ref({
            name: '',
            lastname: '',
            mobile: '',
            phone: '',
            address:'',
            gender: ''
        });

        const successMessage = ref('');

        const validateName = () => {
            if (!formData.value.name.trim()) {
                errors.value.name = "نام نباید خالی باشد!";
            } else if (formData.value.name.length < 3) {
                errors.value.name = "نام حداقل باید ۳ کاراکتر باشد!";
            } else {
                errors.value.name = "";
            }
        };
        const validateLastname = () => {
            if (!formData.value.lastname.trim()) {
                errors.value.lastname = "نام خانوادگی نباید خالی باشد!";
            } else if (formData.value.name.length < 3) {
                errors.value.lastname = "نام خانوادگی باید ۳ کاراکتر باشد!";
            } else {
                errors.value.lastname = "";
            }
        };
        const validateAddress = () => {
            if (!formData.value.address.trim()) {
                errors.value.address = "  آدرس نباید خالی باشد";
            } else if (formData.value.address.length < 10) {
                errors.value.address = "  آدرس باید 10 کاراکتر باشد";
            } else {
                errors.value.address = "";
            }
        };
        const validateMobile = () => {
            if (formData.value.mobile.length < 11) {
                errors.value.mobile = "پر کردن این فیلد الزامی است";
            }else {
                errors.value.mobile = "";
            }
        };
        const validatePhone = () => {
            if (formData.value.phone.length < 11 && formData.value.phone.length >0) {
                errors.value.phone = "لطفا شماره تماس را به درستی و با پیش شماره وارد نمایید";
            }else {
                errors.value.phone = "";
            }
        };
        
        const validateMobileNumber = (event) => {
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];

            if (allowedKeys.includes(event.key)) return;

            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
                return;
            }

            if (formData.value.mobile.length === 0 && event.key !== "0") {
                event.preventDefault();
                return;
            }

            if (formData.value.mobile.length === 1 && event.key !== "9") {
                event.preventDefault();
                return;
            }

            if (formData.value.mobile.length >= 11) {
                event.preventDefault();
            }
        };
        const validatePhoneNumber = (event) => {
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];

            if (allowedKeys.includes(event.key)) return;

            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
                return;
            }

            if (formData.value.phone.length === 0 && event.key !== "0") {
                event.preventDefault();
                return;
            }

            if (formData.value.phone.length >= 11) {
                event.preventDefault();
            }
        };
        const submitForm = () => {
            validateName();

            if (!errors.value.name && !errors.value.email && !errors.value.password) {
                successMessage.value = "فرم با موفقیت ارسال شد!";
                console.log("اطلاعات ارسال شده:", formData.value);
                formData.value = { name: '', email: '', password: '' };
            }
        };

        const clearInput = (event) => {
            const inputElement = event.currentTarget.closest('.input-container').querySelector('input');
            if (inputElement) {
              inputElement.value = '';
              formData.value.lastname = ''; 
              errors.value.lastname = ''; 
            }
          };

        return { formData, errors, successMessage,validateAddress, validateMobileNumber, validatePhoneNumber,validatePhone ,  validateMobile, validateName, validateLastname, submitForm  , clearInput};
    }
}).mount('#register-form');