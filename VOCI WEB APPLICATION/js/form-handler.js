// form-handler.js - Custom JavaScript for handling form submissions

document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('joinForm');
    const formMessage = document.getElementById('formMessage');

    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            formMessage.textContent = ''; // Clear previous messages
            formMessage.classList.remove('text-success', 'text-danger'); // Clear previous styling

            // Basic client-side validation
            let isValid = true;
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const interest = document.getElementById('interest');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');

            if (!fullName.value.trim()) {
                isValid = false;
                fullName.classList.add('is-invalid');
            } else {
                fullName.classList.remove('is-invalid');
            }

            if (!email.value.trim() || !email.value.includes('@')) {
                isValid = false;
                email.classList.add('is-invalid');
            } else {
                email.classList.remove('is-invalid');
            }

            if (!interest.value) {
                isValid = false;
                interest.classList.add('is-invalid');
            } else {
                interest.classList.remove('is-invalid');
            }

            if (!message.value.trim()) {
                isValid = false;
                message.classList.add('is-invalid');
            } else {
                message.classList.remove('is-invalid');
            }

            if (!consent.checked) {
                isValid = false;
                consent.classList.add('is-invalid'); // Visually indicate unchecked checkbox
            } else {
                consent.classList.remove('is-invalid');
            }

            if (!isValid) {
                formMessage.textContent = 'Please fill in all required fields and agree to the terms.';
                formMessage.classList.add('text-danger');
                return; // Stop execution if validation fails
            }

            // Simulate form submission
            const submitButton = joinForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';

            // In a real application, you would send this data to your backend
            // using fetch API or XMLHttpRequest. Example:
            /*
            const formData = new FormData(joinForm);
            fetch('/api/join', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.textContent = 'Application submitted successfully! We will contact you soon.';
                    formMessage.classList.add('text-success');
                    joinForm.reset(); // Clear the form
                    // Optionally close modal after success:
                    // var myModalEl = document.getElementById('joinModal');
                    // var modal = bootstrap.Modal.getInstance(myModalEl);
                    // modal.hide();
                } else {
                    formMessage.textContent = 'Submission failed: ' + (data.message || 'Please try again.');
                    formMessage.classList.add('text-danger');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                formMessage.textContent = 'An error occurred. Please try again later.';
                formMessage.classList.add('text-danger');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
            */

            // For demonstration, use a setTimeout to simulate API call
            setTimeout(() => {
                formMessage.textContent = 'Application submitted successfully! We will contact you soon.';
                formMessage.classList.add('text-success');
                joinForm.reset(); // Clear the form
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;

                // Optionally close modal after successful submission
                const joinModal = bootstrap.Modal.getInstance(document.getElementById('joinModal'));
                if (joinModal) {
                    joinModal.hide();
                }

                // Show a brief success message and then clear it
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.classList.remove('text-success');
                }, 5000); // Message disappears after 5 seconds

            }, 2000); // Simulate 2-second network delay
        });

        // Clear validation messages on input change
        joinForm.querySelectorAll('.form-control, .form-select, .form-check-input').forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    input.classList.remove('is-invalid');
                }
                // For checkbox, remove is-invalid if checked
                if (input.type === 'checkbox' && input.id === 'consent' && input.checked) {
                    input.classList.remove('is-invalid');
                }
            });
            // Handle change event for select element
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    if (input.classList.contains('is-invalid')) {
                        input.classList.remove('is-invalid');
                    }
                });
            }
        });
    }
});
