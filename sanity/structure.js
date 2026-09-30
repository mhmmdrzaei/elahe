const singleton = (S, type, title) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title))

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'settings', 'Settings'),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      singleton(S, 'about', 'About'),
      singleton(S, 'links', 'Links'),
      singleton(S, 'contact', 'Contact'),
    ])
