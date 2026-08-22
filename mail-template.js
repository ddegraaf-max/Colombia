// E-mailsjabloon in de huisstijl. E-mailclients zijn beperkt: alleen tabellen,
// inline stijlen en webveilige lettertypes. Georgia benadert Playfair Display,
// Arial staat voor Poppins. Geen afbeeldingen, zodat er niets geblokkeerd wordt.

const NAVY = '#002b55';
const NAVY2 = '#063f70';
const GOLD = '#c8962f';
const GOLD2 = '#e0b14e';
const BG = '#f6f4ef';
const LINE = '#e7e2d8';
const TEXT = '#1a2b40';
const MUTED = '#5b6b7d';

const ENTITY_LINE = 'Honor Care International is een handelsnaam van Creditline B.V. · KvK 59683198';
const SITE = 'https://honorcareinternational.com';
const MAIL = 'info@honorcareinternational.com';
const TEL = '+31 6 46 15 01 60';
const TEL_RAW = '+31646150160';
const WA = 'https://wa.me/31646150160';

const FOOT = {
  nl: { auto: 'Dit is een automatisch bericht van honorcareinternational.com', offices: 'Torenlaan 5A, 1402 AT Bussum, Nederland', legal: 'Honor Care International verzorgt werving, voorbereiding en begeleiding. De officiële arbeidsbemiddeling en het dienstverband lopen via ons geregistreerde partnerbureau. Voor kandidaten zijn onze diensten vanaf taalniveau A2 kosteloos.', site: 'Website', wa: 'WhatsApp' },
  en: { auto: 'This is an automated message from honorcareinternational.com', offices: 'Torenlaan 5A, 1402 AT Bussum, the Netherlands', legal: 'Honor Care International provides recruitment, preparation and support. The official placement and employment run through our registered partner agency. Our services are free of charge for candidates from language level A2 onwards.', site: 'Website', wa: 'WhatsApp' },
  es: { auto: 'Este es un mensaje automático de honorcareinternational.com', offices: 'Torenlaan 5A, 1402 AT Bussum, Países Bajos', legal: 'Honor Care International se encarga de la captación, la preparación y el acompañamiento. La intermediación laboral y el empleo se gestionan a través de nuestra agencia asociada registrada. Nuestros servicios son gratuitos para los candidatos a partir del nivel A2.', site: 'Sitio web', wa: 'WhatsApp' },
  pl: { auto: 'To jest wiadomość automatyczna z honorcareinternational.com', offices: 'Torenlaan 5A, 1402 AT Bussum, Holandia', legal: 'Honor Care International zajmuje się rekrutacją, przygotowaniem i wsparciem. Oficjalne pośrednictwo pracy i zatrudnienie realizuje nasze zarejestrowane biuro partnerskie. Dla kandydatów nasze usługi są bezpłatne od poziomu A2.', site: 'Strona', wa: 'WhatsApp' }
};

// opts: { lang, intro, rows, cta: {label, url}, note, preheader }
function mailWrap(title, rows, opts, esc) {
  const o = opts || {};
  const f = FOOT[o.lang] || FOOT.nl;
  const E = esc || (x => String(x == null ? '' : x).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])));

  const body = (rows || []).map(([k, v], i) => {
    const long = String(v || '').length > 90;
    const top = i === 0 ? '0' : '1px solid ' + LINE;
    if (long) {
      return `<tr><td colspan="2" style="padding:14px 0 4px;border-top:${top}">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTED};letter-spacing:.4px;text-transform:uppercase">${E(k)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${TEXT};line-height:1.65;padding-top:6px;white-space:pre-wrap">${E(v)}</div></td></tr>`;
    }
    return `<tr>
<td style="padding:13px 16px 13px 0;border-top:${top};font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};vertical-align:top;width:38%">${E(k)}</td>
<td style="padding:13px 0;border-top:${top};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${TEXT};font-weight:bold;vertical-align:top">${E(v)}</td></tr>`;
  }).join('');

  const intro = o.intro ? `<p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${TEXT}">${E(o.intro)}</p>` : '';
  const note = o.note ? `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px"><tr><td style="background:${BG};border-left:3px solid ${GOLD};padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.6;color:${MUTED}">${E(o.note)}</td></tr></table>` : '';
  const cta = o.cta ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 0"><tr><td style="background:${GOLD};border-radius:6px">
<a href="${o.cta.url}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:.6px;color:#ffffff;text-decoration:none;text-transform:uppercase">${E(o.cta.label)}</a></td></tr></table>` : '';
  const pre = o.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${E(o.preheader)}</div>` : '';

  return `<!doctype html><html><body style="margin:0;padding:0;background:${BG}">${pre}
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BG};padding:28px 12px">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${LINE};border-radius:14px;overflow:hidden">

<tr><td style="background:${NAVY};padding:26px 32px">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;letter-spacing:2.5px;color:#ffffff;text-transform:uppercase">Honor Care</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:10.5px;letter-spacing:4px;color:${GOLD2};text-transform:uppercase;padding-top:4px">International</div>
</td></tr>
<tr><td style="height:3px;background:${GOLD};font-size:0;line-height:0">&nbsp;</td></tr>

<tr><td style="padding:32px 32px 30px">
<h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:23px;line-height:1.3;color:${NAVY};font-weight:normal">${E(title)}</h1>
${intro}
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">${body}</table>
${cta}
${note}
</td></tr>

<tr><td style="background:${BG};padding:22px 32px;border-top:1px solid ${LINE}">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:${NAVY2};line-height:1.8">
<a href="mailto:${MAIL}" style="color:${NAVY2};text-decoration:none">${MAIL}</a> &nbsp;·&nbsp;
<a href="tel:${TEL_RAW}" style="color:${NAVY2};text-decoration:none">${TEL}</a> &nbsp;·&nbsp;
<a href="${WA}" style="color:${NAVY2};text-decoration:none">${f.wa}</a> &nbsp;·&nbsp;
<a href="${SITE}" style="color:${NAVY2};text-decoration:none">${f.site}</a>
</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:${MUTED};line-height:1.7;padding-top:8px">${E(f.offices)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${MUTED};line-height:1.6;padding-top:4px">${E(ENTITY_LINE)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${MUTED};line-height:1.65;padding-top:12px;border-top:1px solid ${LINE};margin-top:12px">${E(f.legal)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:10.5px;color:#8a97a5;padding-top:10px">${E(f.auto)}</div>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

module.exports = { mailWrap, SITE, WA };
