
// PLAATS DIT IN server.js NA DE ROUTE VOOR /documents

app.get('/documents/:id', requireAuth, async (req, res) => {
  const item = await Document.findById(req.params.id).lean();
  if (!item) return res.redirect('/documents');

  const contentMap = {
    'Businessplan Honor Care International Poland': `
      <h2>Businessplan Honor Care International Poland</h2>
      <p>Honor Care International bouwt een professioneel recruitment- en integratieplatform tussen Colombia en Polen.</p>
      <h3>Doel</h3>
      <p>Het oplossen van personeelstekorten in de Poolse zorg door gekwalificeerde Colombiaanse zorgprofessionals te werven, op te leiden en duurzaam te begeleiden.</p>
      <h3>Onderdelen</h3>
      <ul><li>Recruitment en selectie in Colombia</li><li>Poolse taalopleiding</li><li>Documentcontrole en legalisatie</li><li>Huisvesting en integratie</li><li>Partnercontracten met zorginstellingen</li><li>Subsidieprojecten via de stichting</li></ul>
    `,
    'Subsidie Roadmap Polen / EU': `
      <h2>Subsidie Roadmap Polen / EU</h2>
      <p>Roadmap voor integratie, taal, arbeidsmarkttoeleiding en zorgcapaciteit.</p>
      <ul><li>AMIF</li><li>ESF+</li><li>FERS</li><li>Regionale fondsen</li></ul>
    `,
    'Stichting Honor Care Poland dossier': `
      <h2>Stichting Honor Care Poland</h2>
      <p>De stichting richt zich op taal, integratie, maatschappelijke begeleiding en subsidieprojecten.</p>
    `,
    'Werkmaatschappij procesplan': `
      <h2>Werkmaatschappij Procesplan</h2>
      <p>De werkmaatschappij beheert recruitment, matching, CRM, contracten en facturatie.</p>
    `,
    'Kandidaten intakeformulier Colombia': `
      <h2>Kandidaten Intakeformulier Colombia</h2>
      <ul><li>Persoonlijke gegevens</li><li>Diploma's</li><li>Werkervaring</li><li>Taalniveau</li><li>Beschikbaarheid</li></ul>
    `,
    'Zorginstellingen partnerformulier': `
      <h2>Zorginstellingen Partnerformulier</h2>
      <ul><li>Type instelling</li><li>Openstaande functies</li><li>Kwalificaties</li><li>Locatie</li><li>Contractvorm</li></ul>
    `,
    'Projectplanning eerste 12 maanden': `
      <h2>Projectplanning eerste 12 maanden</h2>
      <ol><li>Juridische structuur</li><li>Recruitment Colombia</li><li>Academy starten</li><li>Zorginstellingen contracteren</li><li>Eerste plaatsingen</li></ol>
    `
  };

  const fallback = `
    <h2>${item.title}</h2>
    <p><strong>Categorie:</strong> ${item.category || ''}</p>
    <p><strong>Taal:</strong> ${item.language || ''}</p>
    <p><strong>Status:</strong> ${item.status || ''}</p>
    <p>${item.notes || 'Nog geen uitgebreide inhoud toegevoegd.'}</p>
  `;

  res.render('document-detail', view(req, { doc: item, content: contentMap[item.title] || fallback }));
});
