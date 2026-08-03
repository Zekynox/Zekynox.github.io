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

const network = document.getElementById('airportos-network');
const networkCaption = document.getElementById('network-caption');
const departmentNodes = document.querySelectorAll('.department-node');

const departmentCopy = {
  'Airport management': 'Management gains a clearer operational picture for faster decisions and fewer disconnected updates.',
  'Airport operations': 'Operations can coordinate tasks, incidents, facilities, and daily activity from one shared workspace.',
  'FBO and line service': 'FBO and line teams can receive service requests and keep status visible across the airport.',
  'Maintenance': 'Maintenance issues, ownership, and progress stay connected to the people affected by them.',
  'Tenants and businesses': 'Tenants and on-airport businesses receive relevant updates without chasing separate communication channels.',
  'Guests and pilots': 'Guest and pilot requests can reach the right department faster, improving the airport experience.'
};

let activeTimer;
departmentNodes.forEach((node) => {
  const activate = () => {
    clearTimeout(activeTimer);
    departmentNodes.forEach((item) => item.classList.remove('is-active'));
    node.classList.add('is-active');
    networkCaption.textContent = departmentCopy[node.dataset.department];
    networkCaption.classList.add('is-active');
  };

  const reset = () => {
    activeTimer = setTimeout(() => {
      node.classList.remove('is-active');
      networkCaption.textContent = 'A concept for one shared operating layer connecting the people and departments that keep an airport moving.';
      networkCaption.classList.remove('is-active');
    }, 220);
  };

  node.addEventListener('mouseenter', activate);
  node.addEventListener('focus', activate);
  node.addEventListener('mouseleave', reset);
  node.addEventListener('blur', reset);
  node.addEventListener('click', activate);
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  network?.classList.add('is-paused');
}
