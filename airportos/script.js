document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.getElementById('design-partner-form');
const note = document.getElementById('form-note');
const submitButton = form?.querySelector('button[type="submit"]');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting…';
    note.textContent = 'Sending your Design Partner request…';
    note.className = 'form-note';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Formspree rejected the submission.');
      }

      form.reset();
      note.textContent = 'Thank you—your Design Partner request has been recorded.';
      note.className = 'form-note success';
    } catch (error) {
      console.error(error);
      note.textContent = 'The form could not be submitted. Please try again in a moment.';
      note.className = 'form-note error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
