/* ============================================================
   SERVICE ONE — LANDING PAGE GOOGLE ADS
   Lógica Interativa, Conversão & Medição
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header com Efeito de Scroll
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Seletor de Marcas Interativo (Abas)
  const tabButtons = document.querySelectorAll('.brand-tab-btn');
  const panels = document.querySelectorAll('.brand-panel');
  const ribbonPills = document.querySelectorAll('.brand-pill');

  function setActiveBrand(brandId) {
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === brandId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === brandId);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      setActiveBrand(targetTab);
    });
  });

  ribbonPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const brand = pill.getAttribute('data-brand');
      if (brand) {
        const targetTab = `tab-${brand}`;
        setActiveBrand(targetTab);
      }
    });
  });

  // 3. Animação de Entrada (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in'));
  }

  // 4. Ano Atual no Rodapé
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 5. Aviso de Cookies LGPD + Google Ads Consent Mode
  const avisoCookies = document.getElementById('avisoCookies');
  const cookieAceitar = document.getElementById('cookieAceitar');
  const cookieRecusar = document.getElementById('cookieRecusar');

  try {
    const escolhaAnterior = localStorage.getItem('so-cookies');
    if (!escolhaAnterior && avisoCookies) {
      avisoCookies.hidden = false;
    }
  } catch (e) {}

  function responderCookie(escolha) {
    try {
      localStorage.setItem('so-cookies', escolha);
    } catch (e) {}

    if (escolha === 'aceito' && typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }

    if (avisoCookies) {
      avisoCookies.hidden = true;
    }
  }

  if (cookieAceitar) {
    cookieAceitar.addEventListener('click', () => responderCookie('aceito'));
  }
  if (cookieRecusar) {
    cookieRecusar.addEventListener('click', () => responderCookie('recusado'));
  }

  // 6. Rastreamento de Conversão do Google Ads no Clique de WhatsApp
  let conversaoDisparada = false;
  document.addEventListener('click', (evento) => {
    if (conversaoDisparada) return;

    const alvo = evento.target;
    if (!alvo || typeof alvo.closest !== 'function') return;

    const botaoWpp = alvo.closest('a[href*="wa.me"]');
    if (!botaoWpp) return;

    conversaoDisparada = true;

    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        send_to: 'AW-18356498936/MKDCCM34qOIcEPjjh7FE'
      });
    }
  }, true);
});
