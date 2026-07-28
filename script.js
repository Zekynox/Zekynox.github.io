const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const planSelect = document.querySelector('#plan-select');
document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    if (planSelect) planSelect.value = button.dataset.plan;
  });
});

document.querySelector('#interest-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`EZ Aircraft Care interest — ${form.get('aircraft')}`);
  const body = encodeURIComponent(
`Name: ${form.get('name')}
Email: ${form.get('email')}
Aircraft: ${form.get('aircraft')}
Service: ${form.get('plan')}

Notes:
${form.get('notes') || 'None provided'}`
  );
  window.location.href = `mailto:ezekiel@ezdavis.com?subject=${subject}&body=${body}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
