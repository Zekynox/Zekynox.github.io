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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get('name')?.trim();
  const email = data.get('email')?.trim();

  if (!name || !email) {
    note.textContent = 'Please enter your name and work email.';
    note.className = 'form-note error';
    return;
  }

  // Temporary email fallback for the research-stage launch.
  // Replace this block with your Formspree, Tally, Airtable, or CRM endpoint later.
  const subject = encodeURIComponent('AirportOS Design Partner Interest');
  const body = encodeURIComponent([
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${data.get('organization') || ''}`,
    `Role: ${data.get('role') || ''}`,
    `Interested in beta testing: ${data.get('beta_interest') === 'yes' ? 'Yes' : 'No'}`,
    '',
    'What should be easier:',
    data.get('challenge') || ''
  ].join('\n'));

  window.location.href = `mailto:ezekiel@ezdavis.com?subject=${subject}&body=${body}`;
  note.textContent = 'Your email app should open with the information ready to send.';
  note.className = 'form-note success';
});
