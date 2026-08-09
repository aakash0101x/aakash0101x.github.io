document.getElementById("Download").addEventListener("click", () => {
    window.location.href = "components/resume.pdf";
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector(".SubmitBtn");
        const originalBtnText = submitBtn.textContent;
        
        // Find or create status element
        let statusEl = document.getElementById("form-status");
        if (!statusEl) {
            statusEl = document.createElement("div");
            statusEl.id = "form-status";
            statusEl.className = "FormStatus";
            contactForm.appendChild(statusEl);
        }
        
        // Reset status message
        statusEl.className = "FormStatus";
        statusEl.textContent = "";
        statusEl.style.display = "none";
        
        // Set loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch("https://formspree.io/f/xvkpkzjj", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                statusEl.textContent = "Thank you! Your message has been sent successfully.";
                statusEl.className = "FormStatus success";
                statusEl.style.display = "block";
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data && data.errors) {
                    statusEl.textContent = data.errors.map(error => error.message).join(", ");
                } else {
                    statusEl.textContent = "Oops! There was a problem submitting your form.";
                }
                statusEl.className = "FormStatus error";
                statusEl.style.display = "block";
            }
        } catch (error) {
            statusEl.textContent = "Oops! There was a network error. Please try again later.";
            statusEl.className = "FormStatus error";
            statusEl.style.display = "block";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}