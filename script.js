// Show and hide portfolio projects

const toggleButton = document.querySelector("#toggle-projects");
const projectList = document.querySelector("#project-list");

if (toggleButton && projectList) {
    toggleButton.addEventListener("click", function () {
        projectList.hidden = !projectList.hidden;

        toggleButton.textContent = projectList.hidden
            ? "Show Projects"
            : "Hide Projects";

        toggleButton.setAttribute(
            "aria-expanded",
            String(!projectList.hidden)
        );
    });
}

// Accessible contact form validation

const contactForm = document.querySelector("#contact-validation");

if (contactForm) {
    contactForm.noValidate = true;
contactForm.addEventListener("input", function () {
    document.querySelector("#form-success").textContent = "";
});
    const fields = contactForm.querySelectorAll("[required]");

    function validateField(field) {
        const error = document.querySelector("#" + field.id + "-error");
        let message = "";

        if (field.value.trim() === "") {
            message = "Please fill out this field.";
        } else if (field.type === "email" && !field.validity.valid) {
            message = "Please enter a valid email address.";
        }

        error.textContent = message;

        if (message) {
            field.setAttribute("aria-invalid", "true");
            return false;
        }

        field.removeAttribute("aria-invalid");
        return true;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let firstInvalid = null;

        fields.forEach(function (field) {
            if (!validateField(field) && !firstInvalid) {
                firstInvalid = field;
            }
        });

        const successMessage = document.querySelector("#form-success");

if (firstInvalid) {
    successMessage.textContent = "";
    firstInvalid.focus();
} else {
    successMessage.textContent =
        "Validation successful! All required fields are complete. This is a demo form, so no message was sent.";
}
    });

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            if (field.hasAttribute("aria-invalid")) {
                validateField(field);
            }
        });
    });
}

// Random Fun Fact API

const factButton = document.querySelector("#fact-button");
const factDisplay = document.querySelector("#fact-display");

if (factButton && factDisplay) {
    let loading = false;

    factButton.addEventListener("click", async function () {
        if (loading) return;

        loading = true;
        factDisplay.textContent = "Loading a fun fact...";

        try {
            const response = await fetch(
                "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
            );

            if (!response.ok) {
                throw new Error("Unable to retrieve a fact.");
            }

            const data = await response.json();

            factDisplay.textContent = data.text;

        } catch (error) {
            factDisplay.textContent =
                "Sorry, we couldn't load a fun fact. Please try again.";
        } finally {
            loading = false;
        }
    });
}