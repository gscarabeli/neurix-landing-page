  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Nav shrink on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 60) {
      nav.classList.add('shrink');
    } else if (window.scrollY < 40) {
      nav.classList.remove('shrink');
    }
  });

  const form = document.getElementById('neurix-form');
  const btn  = document.getElementById('form-btn');
  const success = document.getElementById('form-success');

  if (new URLSearchParams(window.location.search).get('enviado') === 'true') {
    form.style.display = 'none';
    success.style.display = 'block';
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = form.querySelector('[name="nome"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const esp = form.querySelector('[name="especialidade"]').value;
    const autoriza = document.getElementById('autoriza').checked;

    if (!nome || !email || !esp || !autoriza) {
      btn.textContent = 'Preencha os campos obrigatórios';
      btn.style.background = '#95CE5C';
      setTimeout(() => {
        btn.textContent = 'Solicitar orçamento personalizado';
        btn.style.background = '';
      }, 2500);
      return;
    }

    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Erro ao enviar. Tente novamente.';
      btn.style.background = '#991b1b';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Solicitar orçamento personalizado';
        btn.style.background = '';
      }, 3000);
    }
  });