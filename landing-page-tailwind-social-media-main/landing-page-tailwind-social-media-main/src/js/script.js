'use strict';
const toggle = document.querySelector('#theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('drew-theme'); } catch { /* A página funciona sem armazenamento local. */ }
function setTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
}
setTheme(savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
toggle.addEventListener('click', () => {
  const dark = !document.documentElement.classList.contains('dark');
  setTheme(dark);
  try { localStorage.setItem('drew-theme', dark ? 'dark' : 'light'); } catch { /* Preferência não persistida. */ }
});
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service').value = link.dataset.service;
}));
document.querySelector('#briefing-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const text = `BRIEFING DO PROJETO\n\nNome ou negócio: ${values.get('name').trim()}\nServiço: ${values.get('service')}\n\nObjetivo e escopo:\n${values.get('message').trim()}\n\nResumo gerado localmente na demonstração Drew Studio.\n`;
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const download = document.createElement('a');
  download.href = url;
  download.download = 'briefing-projeto.txt';
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent = 'Briefing gerado. Confira o arquivo nos seus downloads. Nenhum dado foi enviado.';
});
