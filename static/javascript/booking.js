// Multi-Step Booking Form JavaScript
class BookingForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
        this.populateMinDate();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevStep());
        
        // Form submission
        document.getElementById('bookingForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Input events for floating labels
        this.setupFloatingLabels();
        
        // Input validation
        this.setupValidation();
        
        // Select change events
        document.getElementById('eventType').addEventListener('change', this.handleSelectChange);
        
        // Prevent browser validation tooltips for select elements
        document.getElementById('eventType').addEventListener('invalid', (e) => {
            e.preventDefault();
        });
    }
    
    setupFloatingLabels() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Set initial state
            this.updateFloatingLabel(input);
            
            // Listen for changes
            input.addEventListener('input', () => this.updateFloatingLabel(input));
            input.addEventListener('focus', () => this.updateFloatingLabel(input));
            input.addEventListener('blur', () => this.updateFloatingLabel(input));
            input.addEventListener('change', () => this.updateFloatingLabel(input));
        });
    }
    
    updateFloatingLabel(input) {
        const label = input.parentNode.querySelector('.floating-label');
        if (label) {
            if (input.value !== '' || document.activeElement === input) {
                label.style.top = '0';
                label.style.fontSize = '0.85rem';
                label.style.color = input === document.activeElement ? 'var(--accent-color)' : 'var(--accent-color)';
                label.style.fontWeight = '500';
            } else {
                label.style.top = '50%';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-secondary)';
                label.style.fontWeight = '400';
            }
        }
    }
    
    handleSelectChange(e) {
        const label = e.target.parentNode.querySelector('.floating-label');
        if (label) {
            if (e.target.value !== '') {
                label.style.top = '0';
                label.style.fontSize = '0.85rem';
                label.style.color = 'var(--accent-color)';
                label.style.fontWeight = '500';
            }
        }
    }
    
    setupValidation() {
        const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    validateField(field) {
        const isValid = field.checkValidity();
        
        if (!isValid) {
            this.showFieldError(field);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }
    
    showFieldError(field) {
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Skip showing error message for select elements to avoid annoying "Please select" text
        if (field.tagName.toLowerCase() === 'select') {
            return;
        }
        
        // Add error message
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.fontSize = '0.85rem';
        errorMessage.style.marginTop = '5px';
        errorMessage.style.display = 'block';
        errorMessage.textContent = field.validationMessage || 'This field is required';
        
        field.parentNode.appendChild(errorMessage);
    }
    
    clearFieldError(field) {
        field.style.borderColor = 'var(--border-color)';
        field.style.boxShadow = 'none';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    populateMinDate() {
        const dateInput = document.getElementById('date');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
    
    validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('input[required], textarea[required], select[required]');
        
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Special validation for step 4 (terms checkbox)
        if (this.currentStep === 4) {
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                this.showFieldError(termsCheckbox);
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    collectStepData() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.name === 'services') {
                    if (!this.formData.services) this.formData.services = [];
                    if (input.checked) {
                        this.formData.services.push(input.value);
                    }
                } else {
                    this.formData[input.name] = input.checked;
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }
    
    nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }
        
        this.collectStepData();
        
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStep();
            
            if (this.currentStep === 4) {
                this.populateReview();
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    }
    
    updateStep() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        document.querySelector(`.form-step[data-step="${this.currentStep}"]`).classList.add('active');
        
        // Update progress indicator
        this.updateProgress();
        
        // Update navigation buttons
        this.updateNavigation();
        
        // Scroll to top of form
        document.querySelector('.form-container').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressPercent = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        // Update step indicators
        document.querySelectorAll('.step').forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        // Previous button
        if (this.currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        
        // Next/Submit buttons
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }
    
    populateReview() {
        const reviewContainer = document.getElementById('reviewContainer');
        
        // Clear existing content
        reviewContainer.innerHTML = '';
        
        // Define review items
        const reviewItems = [
            { label: 'Name', value: this.formData.name || 'Not provided' },
            { label: 'Email', value: this.formData.email || 'Not provided' },
            { label: 'Phone', value: this.formData.phone || 'Not provided' },
            { label: 'Organization', value: this.formData.organization || 'Not provided' },
            { label: 'Event Date', value: this.formData.date ? this.formatDate(this.formData.date) : 'Not provided' },
            { label: 'Event Time', value: this.formData.time || 'Not specified' },
            { label: 'Location', value: this.formData.location || 'Not provided' },
            { label: 'Event Type', value: this.formData.eventType || 'Not specified' },
            { label: 'Expected Attendees', value: this.formData.expectedAttendees || 'Not specified' },
            { label: 'Budget Range', value: this.formData.budget || 'Not specified' },
            { label: 'Additional Services', value: this.formData.services && this.formData.services.length > 0 
                ? this.formData.services.join(', ') : 'None selected' },
            { label: 'Message', value: this.formData.message || 'Not provided' }
        ];
        
        // Create review items
        reviewItems.forEach(item => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            reviewItem.innerHTML = `
                <span class="review-label">${item.label}:</span>
                <span class="review-value">${item.value}</span>
            `;
            
            reviewContainer.appendChild(reviewItem);
        });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        this.collectStepData();
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual submission)
        setTimeout(() => {
            this.showSuccessMessage();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
        // If using actual form submission, you can submit the form here
        // e.target.submit();
    }
    
    showSuccessMessage() {
        const successOverlay = document.getElementById('successOverlay');
        successOverlay.style.display = 'flex';
        
        // Add click outside to close
        successOverlay.addEventListener('click', (e) => {
            if (e.target === successOverlay) {
                successOverlay.style.display = 'none';
            }
        });
    }
}

// Initialize the booking form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookingForm();
});

// Add some smooth animations for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on load
    const animateElements = document.querySelectorAll('.booking-header, .form-container');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
