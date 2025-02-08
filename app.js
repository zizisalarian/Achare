const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const isActiveLink = (route) => {
            return window.location.pathname === route;
          }
          return {isActiveLink}
    }
    }).mount('#nav');
createApp({
    setup() {
        const formData = ref({
            name: '',
            lastname: '',
            mobile: '',
            phone: '',
            address: '',
            gender: 'male',
            lat: '', 
            lng: ''
        });

        const errors = ref({
            name: '',
            lastname: '',
            mobile: '',
            phone: '',
            address: '',
            gender: ''

        });
        // const addresses  = ref([])
        const map = ref(null);
        const marker = ref(null); 

        const step = ref(1)

        onMounted(() => {
            map.value = L.map("map" ,
                {zoomControl: false , attributionControl: false}
            ).setView([35.6892, 51.3890], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            }).addTo(map.value);
            
            map.value.on('click', function (e) {

                var lat = e.latlng.lat;
                var lng = e.latlng.lng;
    
                formData.value.lat = lat;
                formData.value.lng = lng;
                if (marker.value) {
                    map.value.removeLayer(marker.value);
                }
                marker.value = L.marker([lat, lng]).addTo(map.value);
    
            });
            
        });
        
        const isActiveLink = (route) => {
            return window.location.pathname === route;
          }
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
        const validateMobile = (event) => {
            if (formData.value.mobile.length < 11) {
                
                errors.value.mobile = "پر کردن این فیلد الزامی است";
            } else {
                errors.value.mobile = "";
            }
        };
        const validatePhone = () => {
            if (formData.value.phone.length < 11 && formData.value.phone.length > 0) {
                errors.value.phone = "لطفا شماره تماس را به درستی و با پیش شماره وارد نمایید";
            } else {
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
        const nextStep = () => {
            if( formData.value.name && formData.value.lastname && formData.value.mobile && formData.value.address && formData.value.gender && !errors.value.name && !errors.value.lastname && !errors.value.mobile && !errors.value.address && !errors.value.gender){
                step.value = 2
            }else{
                validateName()
                validateLastname();
                validateMobile();
                validatePhone();
                validateAddress();
            }
        }
        const submitForm = () =>{
            document.querySelectorAll('.submit-container').forEach(c =>{
                c.classList.add('loading')
            })
            axios.post('https://stage.achareh.ir/api/karfarmas/address', {
                first_name : formData.value.name ,
                last_name : formData.value.lastname ,
                coordinate_mobile : formData.value.mobile ,
                coordinate_phone_number : formData.value.phone ,
                address : formData.value.address ,
                region: "1",
                lat : formData.value.lat ,
                lng : formData.value.lng ,
                gender : formData.value.gender ,
                // id: 1000,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
                }
            })
            .then(response => {
                step.value = 3;
                document.querySelectorAll('.submit-container').forEach(c =>{
                    c.classList.remove('loading')
                })
                
            })
            .catch(error => {
                console.error('Error:', error);
                alert('مشکلی در ارسال اطلاعات وجود دارد ❌');
            });
        }

        const handleSubmit = () => {
            if( formData.value.lat && formData.value.lng ){
                submitForm()
          }
        }
        const showResults = ()=>{
            console.log('object');
            axios.get('https://stage.achareh.ir/api/karfarmas/address', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
                }
            })
            .then(response => {
                console.log('Response Data:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        const prevStep = () => {
            step.value = 1
        }
        const saveDataMap = () => {
            console.log(formData.value);
        }
        const clearInput = ( name) => {
            const inputElement =  document.querySelector(`#${name}`)
           
            if (inputElement) {
                inputElement.value = '';
                inputElement.focus();
                formData.value[name] = '';
                errors.value[name] = '';
            }
        };

        

        

        return { formData, errors, step, validateAddress, validateMobileNumber, validatePhoneNumber, validatePhone, validateMobile, validateName, validateLastname, submitForm, clearInput, prevStep, nextStep, saveDataMap , handleSubmit , isActiveLink};
    }
    

}).mount('#app');




createApp({
    setup() {
      

        const addresses = ref();
        // const addresses  = ref([])
        

        onMounted(() => {
            axios.get('https://stage.achareh.ir/api/karfarmas/address', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
                }
            })
            .then(response => {
                addresses.value = response.data
                console.log('object' , addresses.value);
            })
            .catch(error => {
                console.error('Error fetching addresses:', error);
            });
            
        });
        
      
        return { addresses};
    }
    

}).mount('#list');


