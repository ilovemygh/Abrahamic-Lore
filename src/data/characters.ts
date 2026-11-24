export type CharacterTradition = 'judaism' | 'christianity' | 'islam'

export const CHARACTER_CONTENT_REVISION = 1

export interface ScriptureReference {
  location: string
  collection: string
  sourceUrl: string
  editionNote: string
}

export interface CharacterName {
  id: string
  slug: string
  name: string
  searchTerms?: string[]
  context: string
  tradition: CharacterTradition
  summary: string
  referenceNote: string
  editorialStatus: string
  editorialNote: string
  references: ScriptureReference[]
}

export interface NameRelationship {
  id: string
  kind: 'comparison-group' | 'name-claim' | 'homonym'
  label: string
  nameIds: string[]
  searchTerm?: string
  reviewStatus: string
  note: string
  sourceHref?: string
}

const EDITION_REVIEW_NOTE =
  'The existing project draft does not record the edition or translation used. This profile links to a passage for reference and reproduces no translated text.'

const KJV_EDITION_NOTE =
  'King James Version passage link. The project draft does not record the edition of its source wording.'

const QURAN_EDITION_NOTE =
  'Quran.com passage link. No translation is embedded in this profile.'

export const CHARACTER_NAMES: CharacterName[] = [
  {
    id: 'name-moshe',
    slug: 'moshe',
    name: 'Moshe',
    context: 'Judaism section of the existing comparison',
    tradition: 'judaism',
    summary:
      'The current project comparison presents Moshe Rabbenu as a teacher and lawgiver, and points readers to Deuteronomy 34:10–12.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The project comparison lists this location without recording its source edition. No translated passage is reproduced here.',
    references: [
      {
        location: 'Deuteronomy 34:10–12',
        collection: 'Tanakh',
        sourceUrl: 'https://www.sefaria.org/Deuteronomy.34.10-12?lang=bi',
        editionNote: 'Sefaria passage link. The edition used by this project is not recorded.',
      },
    ],
  },
  {
    id: 'name-moses',
    slug: 'moses',
    name: 'Moses',
    context: 'Christianity section of the existing comparison',
    tradition: 'christianity',
    summary:
      'The current project comparison presents Moses in relation to the law and cites John 1:17 among its references.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The project comparison lists this location without recording its source edition. No translated passage is reproduced here.',
    references: [
      {
        location: 'John 1:17',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=John%201%3A17&version=KJV',
        editionNote: KJV_EDITION_NOTE,
      },
    ],
  },
  {
    id: 'name-musa',
    slug: 'musa',
    name: 'Musa',
    context: 'Islam section of the existing comparison',
    tradition: 'islam',
    summary:
      'The current project comparison presents Musa as a prophet and cites An-Nisa 4:164 among its references.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The project comparison lists these locations without recording its source edition. No translated passage is reproduced here.',
    references: [
      {
        location: 'An-Nisa 4:164',
        collection: 'Quran',
        sourceUrl: 'https://quran.com/4/164',
        editionNote: QURAN_EDITION_NOTE,
      },
      {
        location: 'Ta-Ha 20:9–98',
        collection: 'Quran',
        sourceUrl: 'https://quran.com/20/9-98',
        editionNote: QURAN_EDITION_NOTE,
      },
    ],
  },
  {
    id: 'name-yeshua',
    slug: 'yeshua',
    name: 'Yeshua of Nazareth',
    context: 'Judaism section of the existing comparison',
    tradition: 'judaism',
    summary:
      'The current project comparison uses this name in its Judaism section and cites Sanhedrin 43a and Maimonides, Hilchot Melachim 11:4.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The project comparison lists these sources. Their relevance and edition details need review before publication.',
    references: [
      {
        location: 'Sanhedrin 43a',
        collection: 'Talmud',
        sourceUrl: 'https://www.sefaria.org/Sanhedrin.43a?lang=bi',
        editionNote: 'Sefaria passage link. Edition and translation used by this project are not recorded.',
      },
      {
        location: 'Mishneh Torah, Hilchot Melachim 11:4',
        collection: 'Mishneh Torah',
        sourceUrl: 'https://www.sefaria.org/Mishneh_Torah%2C_Kings_and_Wars.11.4?lang=bi',
        editionNote: 'Sefaria passage link. Edition and translation used by this project are not recorded.',
      },
    ],
  },
  {
    id: 'name-jesus',
    slug: 'jesus',
    name: 'Jesus Christ',
    context: 'Christianity section of the existing comparison',
    tradition: 'christianity',
    summary:
      'The current project comparison presents Jesus Christ through Christian theological language and cites the Gospel of John and Pauline letters.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The project comparison lists these sources. Their relevance and edition details need review before publication.',
    references: [
      {
        location: 'John 1:1–14',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=John%201%3A1-14&version=KJV',
        editionNote: KJV_EDITION_NOTE,
      },
      {
        location: '1 Corinthians 15:3–4',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=1%20Corinthians%2015%3A3-4&version=KJV',
        editionNote: KJV_EDITION_NOTE,
      },
    ],
  },
  {
    id: 'name-isa',
    slug: 'isa',
    name: 'Isa ibn Maryam',
    context: 'Islam section of the existing comparison',
    tradition: 'islam',
    summary:
      'The current project comparison presents Isa ibn Maryam in its Islam section and cites Ali ‘Imran 3:45–59 and An-Nisa 4:157–159.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The project comparison lists these locations without recording its source edition. No translated passage is reproduced here.',
    references: [
      {
        location: 'Ali ‘Imran 3:45–59',
        collection: 'Quran',
        sourceUrl: 'https://quran.com/3/45-59',
        editionNote: QURAN_EDITION_NOTE,
      },
      {
        location: 'An-Nisa 4:157–159',
        collection: 'Quran',
        sourceUrl: 'https://quran.com/4/157-159',
        editionNote: QURAN_EDITION_NOTE,
      },
    ],
  },
  {
    id: 'name-mary-nazareth',
    slug: 'mary-of-nazareth',
    name: 'Mary of Nazareth',
    searchTerms: ['Mary'],
    context: 'Christian scripture references in the existing shared-figures material',
    tradition: 'christianity',
    summary:
      'A distinct candidate for searches on “Mary”. The pilot keeps this profile separate from Mary Magdalene and records passages for each.',
    referenceNote:
      'These passage locations support disambiguation. The project has not selected a translation for publication.',
    editorialStatus: 'Editorial review required',
    editorialNote: 'These sources were selected for the pilot to distinguish two candidates. No translated passage is reproduced here.',
    references: [
      {
        location: 'Luke 1:26–38',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=Luke%201%3A26-38&version=KJV',
        editionNote: 'KJV passage link. No passage text is reproduced here.',
      },
      {
        location: 'John 19:25–27',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=John%2019%3A25-27&version=KJV',
        editionNote: 'KJV passage link. No passage text is reproduced here.',
      },
    ],
  },
  {
    id: 'name-mary-magdalene',
    slug: 'mary-magdalene',
    name: 'Mary Magdalene',
    searchTerms: ['Mary'],
    context: 'A separate candidate for searches on “Mary”',
    tradition: 'christianity',
    summary:
      'A distinct candidate for searches on “Mary”. The cited passages name Mary Magdalene in their own narrative contexts.',
    referenceNote:
      'These passage locations support disambiguation. The project has not selected a translation for publication.',
    editorialStatus: 'Editorial review required',
    editorialNote: 'These sources were selected for the pilot to distinguish two candidates. No translated passage is reproduced here.',
    references: [
      {
        location: 'Luke 8:1–3',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=Luke%208%3A1-3&version=KJV',
        editionNote: 'KJV passage link. No passage text is reproduced here.',
      },
      {
        location: 'John 20:1–18',
        collection: 'New Testament',
        sourceUrl: 'https://www.biblegateway.com/passage/?search=John%2020%3A1-18&version=KJV',
        editionNote: 'KJV passage link. No passage text is reproduced here.',
      },
    ],
  },
  {
    id: 'name-maryam',
    slug: 'maryam',
    name: 'Maryam',
    searchTerms: ['Mary'],
    context: 'Islam section of the existing shared-figures comparison',
    tradition: 'islam',
    summary:
      'The existing shared-figures comparison includes Maryam in its Islamic section and cites Ali ‘Imran 3:42 and Surah Maryam 19.',
    referenceNote: EDITION_REVIEW_NOTE,
    editorialStatus: 'Editorial review required',
    editorialNote: 'The shared-figures comparison groups this entry with Mary. That relationship remains an editorial claim awaiting review.',
    references: [
      {
        location: 'Ali ‘Imran 3:42',
        collection: 'Quran',
        sourceUrl: 'https://quran.com/3/42',
        editionNote: QURAN_EDITION_NOTE,
      },
      {
        location: 'Maryam 19:16–36',
        collection: 'Quran',
        sourceUrl: 'https://quran.com/19/16-36',
        editionNote: QURAN_EDITION_NOTE,
      },
    ],
  },
  {
    id: 'name-enoch',
    slug: 'enoch',
    name: 'Enoch',
    context: 'Sparse genealogy pilot',
    tradition: 'judaism',
    summary:
      'This brief profile records one genealogy passage and does not add a longer biography.',
    referenceNote:
      'The pilot intentionally keeps this entry limited to the passage recorded below.',
    editorialStatus: 'Sparse pilot profile',
    editorialNote: 'This intentionally brief record contains one genealogy passage and no expanded biography.',
    references: [
      {
        location: 'Genesis 5:18–24',
        collection: 'Tanakh',
        sourceUrl: 'https://www.sefaria.org/Genesis.5?lang=en',
        editionNote: 'Sefaria chapter link. Edition and translation used by this project are not recorded.',
      },
    ],
  },
]

export const NAME_RELATIONSHIPS: NameRelationship[] = [
  {
    id: 'moses-musa-comparison',
    kind: 'comparison-group',
    label: 'Names grouped together in the current comparison',
    nameIds: ['name-moshe', 'name-moses', 'name-musa'],
    reviewStatus: 'Editorial review required',
    note:
      'This records how the existing project groups these names. It does not assert that every tradition tells the same account.',
    sourceHref: '/compare/moses-musa',
  },
  {
    id: 'jesus-isa-comparison',
    kind: 'comparison-group',
    label: 'Names grouped together in the current comparison',
    nameIds: ['name-yeshua', 'name-jesus', 'name-isa'],
    reviewStatus: 'Editorial review required',
    note:
      'This records how the existing project groups these names. The relationship and its scope need source-by-source review.',
    sourceHref: '/compare/jesus-isa',
  },
  {
    id: 'mary-name-candidates',
    kind: 'homonym',
    label: 'Several profiles appear for “Mary”',
    nameIds: ['name-mary-nazareth', 'name-mary-magdalene'],
    searchTerm: 'Mary',
    reviewStatus: 'Candidate distinctions are shown by their cited passage locations',
    note:
      'The search includes distinct Christian profiles for Mary of Nazareth and Mary Magdalene, alongside the Islamic Maryam profile. Names remain separate while their contexts and relationships are reviewed.',
  },
  {
    id: 'mary-maryam-comparison',
    kind: 'name-claim',
    label: 'Mary and Maryam in the existing comparison',
    nameIds: ['name-mary-nazareth', 'name-maryam'],
    reviewStatus: 'Editorial review required',
    note:
      'The existing shared-figures comparison groups these names. This profile records that editorial claim without expanding it into a biography.',
    sourceHref: '/compare/shared-figures',
  },
]

export function getCharacterBySlug(slug: string) {
  return CHARACTER_NAMES.find((character) => character.slug === slug)
}

export function getRelationshipsForCharacter(characterId: string) {
  return NAME_RELATIONSHIPS.filter((relationship) =>
    relationship.nameIds.includes(characterId),
  )
}

export function getRelationshipsForComparison(comparisonSlug: string) {
  return NAME_RELATIONSHIPS.filter(
    (relationship) =>
      relationship.kind !== 'homonym' &&
      relationship.sourceHref === `/compare/${comparisonSlug}`,
  )
}
