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

const departmentCopy = {
  'Airport management': 'Management: a clearer view of priorities, activity, and decisions across the airport.',
  'Airport operations': 'Operations: shared tasks, coordination, and status updates in one workspace.',
  'FBO and line service': 'FBO / Line: connect service requests and handoffs without relying on scattered messages.',
  'Maintenance': 'Maintenance: make issues, ownership, and current status easier to see.',
  'Tenants and businesses': 'Tenants: centralize updates, access needs, and communication with airport businesses.',
  'Guests and pilots': 'Guests / Pilots: improve how requests are received, routed, and resolved.'
};

const networkCaption = document.getElementById('network-caption');
const networkNodes = document.querySelectorAll('.department-node');
const defaultNetworkCaption = networkCaption?.textContent.trim();

networkNodes.forEach((node) => {
  const showDepartment = () => {
    networkNodes.forEach((item) => item.classList.remove('active'));
    node.classList.add('active');
    if (networkCaption) {
      networkCaption.textContent = departmentCopy[node.dataset.department] || defaultNetworkCaption;
    }
  };

  node.addEventListener('mouseenter', showDepartment);
  node.addEventListener('focus', showDepartment);
  node.addEventListener('click', showDepartment);
});

document.getElementById('airportos-network')?.addEventListener('mouseleave', () => {
  networkNodes.forEach((item) => item.classList.remove('active'));
  if (networkCaption) networkCaption.textContent = defaultNetworkCaption;
});
