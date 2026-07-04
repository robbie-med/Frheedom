export type NodeKind =
  | 'primary'
  | 'contributing'
  | 'revision'
  | 'retrieval'
  | 'institution'
  | 'question';

export type Lane =
  | 'Biblical and Christian'
  | 'Classical and legal'
  | 'Medieval and English'
  | 'Reformation and post-Reformation'
  | 'Anglo-American constitutionalism'
  | 'Modern retrievals and critiques';

export type Source = {
  title: string;
  author?: string;
  year?: string;
  url: string;
  note?: string;
};

export type AtlasNode = {
  id: string;
  title: string;
  shortTitle?: string;
  date: string;
  lane: Lane;
  kind: NodeKind;
  position: { x: number; y: number };
  beginner: string;
  expert: string;
  contribution: string;
  tags: string[];
  sources: Source[];
};

export type AtlasEdge = {
  id: string;
  source: string;
  target: string;
  kind: 'primary' | 'contributing' | 'revision' | 'retrieval' | 'institutional';
  label?: string;
};

export const laneMeta: Record<Lane, { order: number; description: string }> = {
  'Biblical and Christian': {
    order: 0,
    description: 'Biblical claims about God, rulers, law, church, conscience, covenant, and human responsibility.'
  },
  'Classical and legal': {
    order: 1,
    description: 'Classical and Roman legal vocabulary that supplied concepts of office, law, citizenship, and moral order.'
  },
  'Medieval and English': {
    order: 2,
    description: 'Christian and English legal developments that placed rulers under inherited law and corporate institutions.'
  },
  'Reformation and post-Reformation': {
    order: 3,
    description: 'Protestant resistance theory, church polity, covenant thought, and confessional arguments about magistracy.'
  },
  'Anglo-American constitutionalism': {
    order: 4,
    description: 'Colonial and founding-era institutions that translated inherited ideas into constitutions, federalism, and rights protections.'
  },
  'Modern retrievals and critiques': {
    order: 5,
    description: 'Later attempts to retrieve, expand, revise, or criticize the older inheritance in response to modern mass society and state power.'
  }
};

export const nodes: AtlasNode[] = [
  {
    id: 'old-testament',
    title: 'Old Testament: covenant, law, and limited kingship',
    shortTitle: 'Old Testament',
    date: 'c. 1200–400 BC',
    lane: 'Biblical and Christian',
    kind: 'primary',
    position: { x: 40, y: 260 },
    beginner: 'Israel’s king was never meant to be the source of law. Kings, priests, elders, judges, households, and prophets held different roles under God’s covenant.',
    expert: 'The Torah and historical books portray rulers as accountable to a prior divine law. Deuteronomy 17 constrains kingship; Exodus 18 distributes judgment; prophetic literature rebukes rulers; covenantal categories join authority to obligation rather than bare power.',
    contribution: 'Law above rulers; non-absolute kingship; differentiated offices; covenantal accountability.',
    tags: ['covenant', 'law above rulers', 'kingship', 'family', 'justice'],
    sources: [
      { title: 'The Holy Bible: Exodus 18', year: 'n.d.', url: 'https://www.biblegateway.com/passage/?search=Exodus%2018&version=ESV' },
      { title: 'The Holy Bible: Deuteronomy 17:14–20', year: 'n.d.', url: 'https://www.biblegateway.com/passage/?search=Deuteronomy%2017%3A14-20&version=ESV' },
      { title: 'The Holy Bible: 1 Samuel 8', year: 'n.d.', url: 'https://www.biblegateway.com/passage/?search=1%20Samuel%208&version=ESV' }
    ]
  },
  {
    id: 'new-testament',
    title: 'New Testament: Christ, church, and civil authority',
    shortTitle: 'New Testament',
    date: '1st century AD',
    lane: 'Biblical and Christian',
    kind: 'primary',
    position: { x: 240, y: 260 },
    beginner: 'The New Testament recognizes civil rulers as real authorities, while denying that Caesar or any state can claim ultimate allegiance. Christ governs His Church.',
    expert: 'The canonical texts hold civil authority, conscience, and ecclesial authority in a differentiated relationship: Romans 13, Matthew 22, Acts 5, and the pastoral epistles cannot be reduced either to civil absolutism or to anarchism.',
    contribution: 'Christ’s supreme lordship; church distinct from civil power; qualified obedience; conscience before God.',
    tags: ['Christ and Caesar', 'church', 'civil authority', 'conscience'],
    sources: [
      { title: 'The Holy Bible: Matthew 22:15–22', year: 'n.d.', url: 'https://www.biblegateway.com/passage/?search=Matthew%2022%3A15-22&version=ESV' },
      { title: 'The Holy Bible: Acts 5:29', year: 'n.d.', url: 'https://www.biblegateway.com/passage/?search=Acts%205%3A29&version=ESV' },
      { title: 'The Holy Bible: Romans 13:1–7', year: 'n.d.', url: 'https://www.biblegateway.com/passage/?search=Romans%2013%3A1-7&version=ESV' }
    ]
  },
  {
    id: 'roman-law',
    title: 'Roman law and public office',
    shortTitle: 'Roman law',
    date: 'c. 450 BC–AD 565',
    lane: 'Classical and legal',
    kind: 'contributing',
    position: { x: 350, y: 70 },
    beginner: 'Roman law supplied durable legal vocabulary for property, contracts, civic offices, legal procedure, and corporate bodies.',
    expert: 'Roman jurisprudence did not create Christian political theology, but its concepts of office, jurisdiction, persons, property, and legal procedure shaped medieval canon law and later European legal traditions.',
    contribution: 'Legal technique; office; jurisdiction; procedure; corporate personality.',
    tags: ['Roman law', 'jurisdiction', 'office', 'property'],
    sources: [
      { title: 'The Digest of Justinian', author: 'Justinian I', year: '533', url: 'https://droitromain.univ-grenoble-alpes.fr/Anglica/digest_Scott.htm' },
      { title: 'The Institutes of Justinian', author: 'Justinian I', year: '533', url: 'https://www.thelatinlibrary.com/justinian/institutes.html' }
    ]
  },
  {
    id: 'augustine',
    title: 'Augustine: two cities and limited earthly peace',
    shortTitle: 'Augustine',
    date: 'AD 413–426',
    lane: 'Biblical and Christian',
    kind: 'contributing',
    position: { x: 440, y: 430 },
    beginner: 'Augustine taught that no earthly political order is the kingdom of God. Governments can preserve a limited peace, but they cannot save humanity.',
    expert: 'Augustine’s two-cities framework resists the sacralization of political order. Civil peace remains a genuine temporal good, but the state cannot deliver humanity’s final end.',
    contribution: 'Political humility; limits of earthly rule; distinction between temporal order and ultimate salvation.',
    tags: ['Augustine', 'two cities', 'political humility'],
    sources: [
      { title: 'The City of God', author: 'Augustine', year: 'AD 426', url: 'https://www.gutenberg.org/ebooks/45304' }
    ]
  },
  {
    id: 'gelasius',
    title: 'Gelasius I: two authorities',
    shortTitle: 'Gelasius I',
    date: 'AD 494',
    lane: 'Biblical and Christian',
    kind: 'contributing',
    position: { x: 615, y: 430 },
    beginner: 'Pope Gelasius argued that the spiritual and civil powers are distinct. Neither should simply swallow the other.',
    expert: 'The letter Duo sunt articulated a highly influential distinction between sacerdotal authority and royal power. Later traditions disagreed sharply over its implications, but the distinction itself was a durable anti-monistic resource.',
    contribution: 'Distinction of spiritual and temporal authority.',
    tags: ['two powers', 'church and state', 'Gelasius'],
    sources: [
      { title: 'Letter to Emperor Anastasius: Duo sunt', author: 'Gelasius I', year: '494', url: 'https://sourcebooks.fordham.edu/source/gelasius1.asp' }
    ]
  },
  {
    id: 'aquinas',
    title: 'Aquinas: natural law and the common good',
    shortTitle: 'Aquinas',
    date: 'c. 1265–1274',
    lane: 'Biblical and Christian',
    kind: 'contributing',
    position: { x: 800, y: 430 },
    beginner: 'Aquinas taught that human law should serve the common good and must be answerable to a moral order beyond government command.',
    expert: 'Aquinas’s account of eternal, natural, human, and divine law gave Catholic political thought an enduring framework: human law participates in reasoned moral order and becomes defective when it contradicts justice.',
    contribution: 'Natural law; common good; law as rational ordinance; moral limits on legislation.',
    tags: ['natural law', 'common good', 'Catholic', 'law'],
    sources: [
      { title: 'Summa Theologiae, I–II, Questions 90–97', author: 'Thomas Aquinas', year: 'c. 1270', url: 'https://www.newadvent.org/summa/2090.htm' }
    ]
  },
  {
    id: 'alfred',
    title: 'King Alfred’s Doom Book',
    shortTitle: 'Alfred’s laws',
    date: 'c. AD 890',
    lane: 'Medieval and English',
    kind: 'institution',
    position: { x: 600, y: 180 },
    beginner: 'King Alfred’s law code placed English custom alongside a substantial biblical legal prologue, showing a Christian ruler claiming to govern under, not above, moral law.',
    expert: 'Alfred’s Dōmbōc is not a modern constitution. Its significance is historical and symbolic: it links biblical norms, received custom, and royal law in an early English legal compilation.',
    contribution: 'Biblical legal framing joined to English custom and royal law.',
    tags: ['Alfred', 'Doom Book', 'English law', 'biblical law'],
    sources: [
      { title: 'The Laws of King Alfred', author: 'King Alfred', year: 'c. 890', url: 'https://avalon.law.yale.edu/medieval/lawalf.asp' }
    ]
  },
  {
    id: 'magna-carta',
    title: 'Magna Carta: ruler under law',
    shortTitle: 'Magna Carta',
    date: '1215',
    lane: 'Medieval and English',
    kind: 'institution',
    position: { x: 1000, y: 180 },
    beginner: 'Magna Carta did not create modern democracy. It did establish a powerful principle: even the king is bound by law.',
    expert: 'The 1215 charter was a baronial settlement in a medieval context, not a universal bill of rights. Its later constitutional importance grew through repeated reissue, legal interpretation, and political memory.',
    contribution: 'Rule of law; constraints on royal prerogative; due process tradition.',
    tags: ['Magna Carta', 'rule of law', 'England', 'due process'],
    sources: [
      { title: 'Magna Carta, 1215', year: '1215', url: 'https://avalon.law.yale.edu/medieval/magframe.asp' },
      { title: 'Magna Carta: Muse and Mentor', author: 'National Archives', year: 'n.d.', url: 'https://www.archives.gov/exhibits/featured-documents/magna-carta' }
    ]
  },
  {
    id: 'common-law',
    title: 'English common law and Parliament',
    shortTitle: 'Common law',
    date: '13th–17th centuries',
    lane: 'Medieval and English',
    kind: 'contributing',
    position: { x: 1210, y: 180 },
    beginner: 'English law developed through courts, custom, statutes, and precedent. It helped form the expectation that law is inherited and publicly knowable rather than made afresh by executive will.',
    expert: 'Common law was neither static nor purely anti-state, but its procedural and institutional traditions supported later arguments against arbitrary prerogative and for the continuity of legal liberties.',
    contribution: 'Precedent; due process; limits on arbitrary power; parliamentary development.',
    tags: ['common law', 'Parliament', 'precedent', 'England'],
    sources: [
      { title: 'Commentaries on the Laws of England', author: 'William Blackstone', year: '1765–1769', url: 'https://avalon.law.yale.edu/subject_menus/blackstone.asp' },
      { title: 'The English Bill of Rights', author: 'Parliament of England', year: '1689', url: 'https://avalon.law.yale.edu/17th_century/england.asp' }
    ]
  },
  {
    id: 'calvin',
    title: 'Calvin: magistracy and the Church’s distinct rule',
    shortTitle: 'Calvin',
    date: '1536–1559',
    lane: 'Reformation and post-Reformation',
    kind: 'primary',
    position: { x: 1150, y: 520 },
    beginner: 'Calvin treated civil government as a good gift of God, but he insisted that Christ governs the Church and that civil rulers are not ultimate.',
    expert: 'Institutes IV.20 provides a major Reformed account of civil magistracy. Calvin’s corpus also helped establish a distinct Reformed tradition of ecclesial discipline, covenantal social order, and limited resistance through lesser authorities.',
    contribution: 'Reformed magistracy; Christ’s headship; church discipline distinct from civil office.',
    tags: ['Calvin', 'Reformed', 'magistrate', 'church government'],
    sources: [
      { title: 'Institutes of the Christian Religion, Book IV', author: 'John Calvin', year: '1559', url: 'https://ccel.org/ccel/calvin/institutes/institutes.iv.html' }
    ]
  },
  {
    id: 'magdeburg',
    title: 'Magdeburg Confession: lesser magistrates',
    shortTitle: 'Magdeburg',
    date: '1550',
    lane: 'Reformation and post-Reformation',
    kind: 'primary',
    position: { x: 1320, y: 520 },
    beginner: 'The Magdeburg pastors argued that lower public officials may resist a higher ruler who commands grave evil or destroys the true order of government.',
    expert: 'The confession is a landmark Lutheran resistance text. It supplies a graded account of resistance and is a key witness against the claim that Protestant political thought taught simple passive obedience.',
    contribution: 'Lesser-magistrate doctrine; lawful resistance to tyranny.',
    tags: ['lesser magistrate', 'resistance', 'Lutheran', 'tyranny'],
    sources: [
      { title: 'The Magdeburg Confession', year: '1550', url: 'https://www.magdeburgconfession.com/' }
    ]
  },
  {
    id: 'beza',
    title: 'Beza: the right of magistrates',
    shortTitle: 'Beza',
    date: '1574',
    lane: 'Reformation and post-Reformation',
    kind: 'primary',
    position: { x: 1490, y: 520 },
    beginner: 'Theodore Beza argued that rulers are accountable to God and may be resisted through lawful public authorities when they become tyrannical.',
    expert: 'Beza’s De iure magistratuum became a central Reformed resistance text. It treats political authority as entrusted and conditional rather than a private possession of a ruler.',
    contribution: 'Covenantal and representative resistance theory.',
    tags: ['Beza', 'resistance', 'Reformed', 'magistrate'],
    sources: [
      { title: 'The Right of Magistrates', author: 'Theodore Beza', year: '1574', url: 'https://www.monergism.com/right-magistrates-theodore-beza' }
    ]
  },
  {
    id: 'vindiciae',
    title: 'Vindiciae contra tyrannos',
    shortTitle: 'Vindiciae',
    date: '1579',
    lane: 'Reformation and post-Reformation',
    kind: 'contributing',
    position: { x: 1660, y: 520 },
    beginner: 'This Huguenot resistance work asked whether a ruler who violates God’s law and the people’s liberties may still claim obedience.',
    expert: 'Vindiciae develops covenantal arguments between God, ruler, and people; it became a landmark in the Protestant resistance tradition, though its authorship remains debated.',
    contribution: 'Covenant and resistance; ruler accountable to law and people.',
    tags: ['Huguenot', 'resistance', 'covenant', 'tyranny'],
    sources: [
      { title: 'Vindiciae contra tyrannos', year: '1579', url: 'https://oll.libertyfund.org/titles/junius-vindiciae-contra-tyrannos' }
    ]
  },
  {
    id: 'althusius',
    title: 'Althusius: society built from associations',
    shortTitle: 'Althusius',
    date: '1603',
    lane: 'Reformation and post-Reformation',
    kind: 'primary',
    position: { x: 1830, y: 520 },
    beginner: 'Althusius described political life as growing upward from families, associations, towns, provinces, and commonwealths—not downward from a single absolute state.',
    expert: 'Politica Methodice Digesta is a major early-modern account of federal, covenantal, and associative order. Its organizing insight is consociation: political life consists of layered communities with real functions.',
    contribution: 'Federal and associative political order; distributed authority.',
    tags: ['Althusius', 'federalism', 'associations', 'subsidiarity'],
    sources: [
      { title: 'Politica Methodice Digesta', author: 'Johannes Althusius', year: '1603', url: 'https://oll.libertyfund.org/titles/althusius-politica' }
    ]
  },
  {
    id: 'rutherford',
    title: 'Rutherford: Lex, Rex',
    shortTitle: 'Lex, Rex',
    date: '1644',
    lane: 'Reformation and post-Reformation',
    kind: 'primary',
    position: { x: 1995, y: 520 },
    beginner: 'Samuel Rutherford argued that the law is king—not that a king is law. Rulers receive authority under conditions and remain accountable.',
    expert: 'Lex, Rex rejects royal absolutism through covenantal and legal argument. It was influential in Scottish Presbyterian political theology and later remembered in Anglo-American constitutional discussions.',
    contribution: 'Law above king; conditional magistracy; Scottish covenantal resistance.',
    tags: ['Rutherford', 'Lex Rex', 'Scotland', 'rule of law'],
    sources: [
      { title: 'Lex, Rex', author: 'Samuel Rutherford', year: '1644', url: 'https://www.monergism.com/lex-rex-law-and-prince' }
    ]
  },
  {
    id: 'westminster-1646',
    title: 'Westminster Confession: distinct church government',
    shortTitle: 'WCF 1646',
    date: '1646–1647',
    lane: 'Reformation and post-Reformation',
    kind: 'institution',
    position: { x: 2160, y: 520 },
    beginner: 'The original Westminster Confession said that Christ governs the Church through church officers distinct from the civil magistrate. It still assumed a confessional civil order with duties toward true religion.',
    expert: 'WCF 23, 30, and 31 distinguish the keys of the kingdom from civil power, while assigning the original magistrate public responsibilities for religion and permitting synodal involvement. It is not a modern disestablishment settlement.',
    contribution: 'Church jurisdiction distinct from civil magistracy; confessional-state model.',
    tags: ['Westminster', 'Presbyterian', 'church and state', 'confessional state'],
    sources: [
      { title: 'Westminster Confession of Faith: original text', year: '1646', url: 'https://www.opc.org/documents/WCF_orig.html' }
    ]
  },
  {
    id: 'bill-of-rights',
    title: 'English Bill of Rights',
    shortTitle: 'English Bill of Rights',
    date: '1689',
    lane: 'Medieval and English',
    kind: 'institution',
    position: { x: 1980, y: 180 },
    beginner: 'After the Glorious Revolution, the English Bill of Rights limited royal power and affirmed parliamentary rights.',
    expert: 'The 1689 settlement did not produce universal democracy, but it institutionalized important constraints on the crown and entered later Anglo-American constitutional memory.',
    contribution: 'Constitutional monarchy; parliamentary limits; anti-prerogative tradition.',
    tags: ['Bill of Rights', 'Glorious Revolution', 'Parliament', 'England'],
    sources: [
      { title: 'English Bill of Rights', year: '1689', url: 'https://avalon.law.yale.edu/17th_century/england.asp' }
    ]
  },
  {
    id: 'locke',
    title: 'Locke: consent, rights, and limited government',
    shortTitle: 'Locke',
    date: '1689',
    lane: 'Anglo-American constitutionalism',
    kind: 'contributing',
    position: { x: 2290, y: 150 },
    beginner: 'John Locke argued that government exists to protect life, liberty, and property, and that people may resist rulers who destroy that trust.',
    expert: 'Locke’s natural-rights and consent theory became highly influential in Anglo-American political thought. The degree and manner of his influence on particular founders remains debated and should be documented rather than assumed.',
    contribution: 'Natural rights; consent; fiduciary government; resistance.',
    tags: ['Locke', 'natural rights', 'consent', 'property'],
    sources: [
      { title: 'Two Treatises of Government', author: 'John Locke', year: '1689', url: 'https://oll.libertyfund.org/titles/locke-two-treatises-of-government-hollis-ed' }
    ]
  },
  {
    id: 'montesquieu',
    title: 'Montesquieu: separated powers',
    shortTitle: 'Montesquieu',
    date: '1748',
    lane: 'Anglo-American constitutionalism',
    kind: 'contributing',
    position: { x: 2450, y: 150 },
    beginner: 'Montesquieu argued that concentrated power tends toward abuse. Dividing legislative, executive, and judicial functions can help preserve liberty.',
    expert: 'The Spirit of the Laws offered a comparative account of institutions and became a major source for the American vocabulary of separated powers, though the American system was not a simple copy of his model.',
    contribution: 'Separation of powers; institutional checks.',
    tags: ['Montesquieu', 'separation of powers', 'checks and balances'],
    sources: [
      { title: 'The Spirit of Laws', author: 'Montesquieu', year: '1748', url: 'https://oll.libertyfund.org/titles/montesquieu-complete-works-vol-1-the-spirit-of-laws' }
    ]
  },
  {
    id: 'colonial-self-government',
    title: 'Colonial assemblies, covenants, and local self-government',
    shortTitle: 'Colonial self-government',
    date: '17th–18th centuries',
    lane: 'Anglo-American constitutionalism',
    kind: 'institution',
    position: { x: 2450, y: 490 },
    beginner: 'Colonial America included assemblies, town meetings, churches, covenants, charters, local courts, and varied forms of self-government. The colonies were not politically uniform.',
    expert: 'Colonial political culture drew from English law, local practice, Protestant moral language, commercial interests, imperial conflicts, and regional institutions. Its importance lies partly in practical habits of local governance.',
    contribution: 'Practical self-government; charters; representative assemblies; local institutions.',
    tags: ['colonies', 'local government', 'charters', 'assemblies'],
    sources: [
      { title: 'Mayflower Compact', year: '1620', url: 'https://avalon.law.yale.edu/17th_century/mayflower.asp' },
      { title: 'The Massachusetts Body of Liberties', year: '1641', url: 'https://www.mass.gov/guides/massachusetts-body-of-liberties' }
    ]
  },
  {
    id: 'declaration',
    title: 'Declaration of Independence',
    shortTitle: 'Declaration',
    date: '1776',
    lane: 'Anglo-American constitutionalism',
    kind: 'institution',
    position: { x: 2640, y: 490 },
    beginner: 'The Declaration stated that human beings possess rights and that governments exist to secure them. It justified independence by accusing the king of a pattern of abuses.',
    expert: 'The Declaration combines natural-rights language, political grievance, and an appeal to a Creator and providence. Its moral language became central to American self-understanding, even as its application was contested and incomplete.',
    contribution: 'Rights language; government by consent; resistance to tyranny; moral accountability of rulers.',
    tags: ['Declaration', 'rights', 'independence', 'consent'],
    sources: [
      { title: 'Declaration of Independence', year: '1776', url: 'https://www.archives.gov/founding-docs/declaration-transcript' }
    ]
  },
  {
    id: 'constitution',
    title: 'United States Constitution',
    shortTitle: 'Constitution',
    date: '1787–1788',
    lane: 'Anglo-American constitutionalism',
    kind: 'institution',
    position: { x: 2840, y: 490 },
    beginner: 'The Constitution created a federal government of enumerated powers and divided authority among branches, states, and institutions.',
    expert: 'The Constitution is an institutional compromise, not a complete political philosophy. Its key structural devices include federalism, separated powers, bicameralism, representation, judicial process, and a written amendment process.',
    contribution: 'Enumerated powers; federalism; separated powers; written constitutionalism.',
    tags: ['Constitution', 'federalism', 'enumerated powers', 'separation of powers'],
    sources: [
      { title: 'Constitution of the United States', year: '1787', url: 'https://www.archives.gov/founding-docs/constitution-transcript' },
      { title: 'The Federalist Papers', author: 'Alexander Hamilton, James Madison, John Jay', year: '1787–1788', url: 'https://avalon.law.yale.edu/subject_menus/fed.asp' }
    ]
  },
  {
    id: 'first-amendment',
    title: 'First Amendment: no establishment and free exercise',
    shortTitle: 'First Amendment',
    date: '1791',
    lane: 'Anglo-American constitutionalism',
    kind: 'revision',
    position: { x: 3025, y: 490 },
    beginner: 'The First Amendment barred Congress from establishing religion and protected the free exercise of religion, along with speech, press, assembly, and petition.',
    expert: 'The amendment created federal limits. Its later application to state governments and its judicial interpretation developed over time; it did not instantly create a settled modern theory of church-state relations.',
    contribution: 'Federal non-establishment; free exercise; protections for speech, press, assembly, and petition.',
    tags: ['First Amendment', 'religious liberty', 'free exercise', 'speech'],
    sources: [
      { title: 'Bill of Rights: First Amendment', year: '1791', url: 'https://www.archives.gov/founding-docs/bill-of-rights-transcript' }
    ]
  },
  {
    id: 'wcf-1788',
    title: 'American Presbyterian revision of Westminster',
    shortTitle: 'WCF 1788',
    date: '1788',
    lane: 'Anglo-American constitutionalism',
    kind: 'revision',
    position: { x: 3000, y: 680 },
    beginner: 'American Presbyterians revised Westminster’s teaching on the civil magistrate. The revision prohibited interference in matters of faith and rejected preference among Christian denominations.',
    expert: 'The 1788 American revision removed the original confession’s magistrate duties to suppress blasphemy and heresy and its language regarding synods. It is a major internal Reformed development, not a 1646 statement.',
    contribution: 'American Presbyterian development toward non-preference and noninterference in ecclesiastical matters.',
    tags: ['Westminster', '1788', 'Presbyterian', 'religious liberty'],
    sources: [
      { title: 'Westminster Confession of Faith: American Presbyterian form', year: '1788', url: 'https://www.opc.org/wcf.html' },
      { title: 'The Westminster Confession and the American Revision', author: 'The Bible Researcher', year: 'n.d.', url: 'https://www.bible-researcher.com/wescoappb.html' }
    ]
  },
  {
    id: 'rerum-novarum',
    title: 'Rerum Novarum: property, labor, family, associations',
    shortTitle: 'Rerum Novarum',
    date: '1891',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 2700, y: 960 },
    beginner: 'Pope Leo XIII rejected socialism’s abolition of private property and also criticized unjust labor conditions. He defended family, property, voluntary associations, and duties toward workers.',
    expert: 'Rerum Novarum launched modern Catholic social teaching as a formal corpus. It rejects both revolutionary socialism and a view of economic life that treats workers as disposable commodities.',
    contribution: 'Catholic social doctrine on property, labor, family, associations, and the limits of state and market.',
    tags: ['Catholic social teaching', 'property', 'labor', 'family'],
    sources: [
      { title: 'Rerum Novarum', author: 'Leo XIII', year: '1891', url: 'https://www.vatican.va/content/leo-xiii/en/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html' }
    ]
  },
  {
    id: 'kuyper',
    title: 'Kuyper: sphere sovereignty',
    shortTitle: 'Kuyper',
    date: '1898',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 2880, y: 960 },
    beginner: 'Abraham Kuyper argued that family, church, school, business, science, and state have their own proper responsibilities under God. No sphere should rule them all.',
    expert: 'Kuyper’s sphere sovereignty applied a neo-Calvinist account of creation, common grace, and Christ’s lordship to social plurality. It became a major source for later Reformed anti-statist and institutional thought.',
    contribution: 'Distinct social spheres; critique of total state; neo-Calvinist social thought.',
    tags: ['Kuyper', 'sphere sovereignty', 'neo-Calvinism', 'civil society'],
    sources: [
      { title: 'Lectures on Calvinism', author: 'Abraham Kuyper', year: '1898', url: 'https://www.gutenberg.org/ebooks/12749' }
    ]
  },
  {
    id: 'quadragesimo',
    title: 'Quadragesimo Anno: subsidiarity',
    shortTitle: 'Subsidiarity',
    date: '1931',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 3060, y: 960 },
    beginner: 'Pius XI stated the principle of subsidiarity: higher authorities should not take over what persons, families, and lower associations can do themselves.',
    expert: 'Quadragesimo Anno’s subsidiarity formula became central to Catholic social doctrine. It is paired with solidarity and the common good; it is not simply a slogan for minimal government.',
    contribution: 'Subsidiarity; anti-absorption principle; limits on bureaucratic centralization.',
    tags: ['subsidiarity', 'Catholic social teaching', 'civil society'],
    sources: [
      { title: 'Quadragesimo Anno', author: 'Pius XI', year: '1931', url: 'https://www.vatican.va/content/pius-xi/en/encyclicals/documents/hf_p-xi_enc_19310515_quadragesimo-anno.html' }
    ]
  },
  {
    id: 'van-til',
    title: 'Van Til: antithesis and no neutrality',
    shortTitle: 'Van Til',
    date: '20th century',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 3230, y: 960 },
    beginner: 'Cornelius Van Til argued that public reasoning is never fully neutral because all reasoning rests on basic commitments about God, humanity, and truth.',
    expert: 'Van Til’s presuppositional apologetics emphasized the antithesis between autonomous and covenantal thought. It strongly influenced later Reconstructionist thinkers, though it does not by itself entail Reconstructionism.',
    contribution: 'Epistemological critique of neutrality; major intellectual source for Rushdoony.',
    tags: ['Van Til', 'presuppositionalism', 'antithesis', 'Reformed'],
    sources: [
      { title: 'The Defense of the Faith', author: 'Cornelius Van Til', year: '1955', url: 'https://www.monergism.com/defense-faith-cornelius-van-til' }
    ]
  },
  {
    id: 'john-paul-ii',
    title: 'John Paul II: civil society and the total state',
    shortTitle: 'Centesimus Annus',
    date: '1991',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 3060, y: 1140 },
    beginner: 'John Paul II criticized totalitarianism and warned that a welfare bureaucracy can displace the family, local community, and personal responsibility.',
    expert: 'Centesimus Annus synthesizes Catholic anti-totalitarianism, subsidiarity, solidarity, private property, civil society, and the common good. It explicitly warns against the state’s absorption of intermediary institutions.',
    contribution: 'Catholic critique of totalitarianism and bureaucratic substitution for civil society.',
    tags: ['John Paul II', 'totalitarianism', 'civil society', 'Catholic social teaching'],
    sources: [
      { title: 'Centesimus Annus', author: 'John Paul II', year: '1991', url: 'https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_01051991_centesimus-annus.html' }
    ]
  },
  {
    id: 'rushdoony',
    title: 'Rushdoony: Christian Reconstructionism',
    shortTitle: 'Rushdoony',
    date: '1958–2001',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 3420, y: 960 },
    beginner: 'R. J. Rushdoony built a minority Reformed program that applied biblical law comprehensively to society. He strongly opposed statist centralization but drew disputed conclusions about civil law.',
    expert: 'Rushdoony’s project synthesizes Van Til, covenant theology, historical critique, and theonomy. It is influential in some circles but should be represented as a modern Reconstructionist retrieval and expansion, not as a consensus endpoint of Reformed thought.',
    contribution: 'Minority Reconstructionist synthesis; comprehensive biblical-law program; anti-statist institutional critique.',
    tags: ['Rushdoony', 'Reconstructionism', 'theonomy', 'minority retrieval'],
    sources: [
      { title: 'By What Standard?', author: 'R. J. Rushdoony', year: '1958', url: 'https://chalcedon.edu/resources/books/by-what-standard' },
      { title: 'The Institutes of Biblical Law', author: 'R. J. Rushdoony', year: '1973', url: 'https://chalcedon.edu/resources/books/the-institutes-of-biblical-law' }
    ]
  },
  {
    id: 'demar',
    title: 'Gary DeMar: multiple governments',
    shortTitle: 'Gary DeMar',
    date: '1982–present',
    lane: 'Modern retrievals and critiques',
    kind: 'retrieval',
    position: { x: 3600, y: 960 },
    beginner: 'Gary DeMar presents self-government, family government, church government, and civil government as distinct forms of authority, each limited by God and the others.',
    expert: 'DeMar’s God and Government series popularizes a Reconstructionist account of plural government and civil jurisdiction. His work should be situated near, but not simply identified with, every distinctive claim of Rushdoony.',
    contribution: 'Popular application of plural jurisdictions: self, family, church, and civil government.',
    tags: ['Gary DeMar', 'government', 'family', 'church', 'civil authority'],
    sources: [
      { title: 'God and Government, Volume 1', author: 'Gary DeMar', year: '1982', url: 'https://americanvision.org/product/god-and-government-volume-1/' }
    ]
  },
  {
    id: 'modern-state',
    title: 'Modern United States: the continuing contest over state power',
    shortTitle: 'Modern contest',
    date: '20th–21st centuries',
    lane: 'Modern retrievals and critiques',
    kind: 'question',
    position: { x: 3350, y: 520 },
    beginner: 'Modern America retains elections, courts, federalism, churches, families, and voluntary institutions. It also faces recurring pressure toward centralization, bureaucracy, surveillance, and political control over social life.',
    expert: 'This node is deliberately a question, not a conclusion. The atlas asks how constitutional limits, civil society, religious liberty, local institutions, and moral accountability operate under modern administrative, technological, economic, and security pressures.',
    contribution: 'Current question: whether constitutional and social limits on power remain effective.',
    tags: ['administrative state', 'federalism', 'civil society', 'modern America'],
    sources: [
      { title: 'Constitution of the United States', year: '1787', url: 'https://www.archives.gov/founding-docs/constitution-transcript' },
      { title: 'Centesimus Annus', author: 'John Paul II', year: '1991', url: 'https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_01051991_centesimus-annus.html', note: 'For one major anti-totalizing critique of bureaucratic absorption.' }
    ]
  }
];

export const edges: AtlasEdge[] = [
  { id: 'e1', source: 'old-testament', target: 'new-testament', kind: 'primary', label: 'canonical inheritance' },
  { id: 'e2', source: 'new-testament', target: 'augustine', kind: 'primary' },
  { id: 'e3', source: 'new-testament', target: 'gelasius', kind: 'primary' },
  { id: 'e4', source: 'roman-law', target: 'aquinas', kind: 'contributing', label: 'legal vocabulary' },
  { id: 'e5', source: 'augustine', target: 'aquinas', kind: 'contributing' },
  { id: 'e6', source: 'old-testament', target: 'alfred', kind: 'primary', label: 'biblical legal prologue' },
  { id: 'e7', source: 'alfred', target: 'magna-carta', kind: 'institutional', label: 'English legal memory' },
  { id: 'e8', source: 'magna-carta', target: 'common-law', kind: 'institutional' },
  { id: 'e9', source: 'gelasius', target: 'calvin', kind: 'contributing', label: 'distinct jurisdictions' },
  { id: 'e10', source: 'aquinas', target: 'calvin', kind: 'contributing', label: 'shared Christian inheritance' },
  { id: 'e11', source: 'calvin', target: 'magdeburg', kind: 'contributing' },
  { id: 'e12', source: 'calvin', target: 'beza', kind: 'primary' },
  { id: 'e13', source: 'beza', target: 'vindiciae', kind: 'contributing' },
  { id: 'e14', source: 'calvin', target: 'althusius', kind: 'primary' },
  { id: 'e15', source: 'beza', target: 'rutherford', kind: 'contributing' },
  { id: 'e16', source: 'rutherford', target: 'westminster-1646', kind: 'contributing', label: 'Scottish context' },
  { id: 'e17', source: 'common-law', target: 'bill-of-rights', kind: 'institutional' },
  { id: 'e18', source: 'bill-of-rights', target: 'locke', kind: 'contributing', label: 'shared 1689 setting' },
  { id: 'e19', source: 'common-law', target: 'colonial-self-government', kind: 'primary' },
  { id: 'e20', source: 'westminster-1646', target: 'colonial-self-government', kind: 'contributing', label: 'Presbyterian and congregational reception' },
  { id: 'e21', source: 'locke', target: 'declaration', kind: 'contributing', label: 'rights vocabulary' },
  { id: 'e22', source: 'colonial-self-government', target: 'declaration', kind: 'primary' },
  { id: 'e23', source: 'montesquieu', target: 'constitution', kind: 'contributing', label: 'separated powers' },
  { id: 'e24', source: 'declaration', target: 'constitution', kind: 'institutional' },
  { id: 'e25', source: 'constitution', target: 'first-amendment', kind: 'revision' },
  { id: 'e26', source: 'westminster-1646', target: 'wcf-1788', kind: 'revision', label: 'American revision' },
  { id: 'e27', source: 'declaration', target: 'wcf-1788', kind: 'contributing', label: 'American context' },
  { id: 'e28', source: 'aquinas', target: 'rerum-novarum', kind: 'primary' },
  { id: 'e29', source: 'rerum-novarum', target: 'quadragesimo', kind: 'primary' },
  { id: 'e30', source: 'quadragesimo', target: 'john-paul-ii', kind: 'primary' },
  { id: 'e31', source: 'calvin', target: 'kuyper', kind: 'retrieval', label: 'neo-Calvinist retrieval' },
  { id: 'e32', source: 'kuyper', target: 'van-til', kind: 'contributing' },
  { id: 'e33', source: 'van-til', target: 'rushdoony', kind: 'retrieval', label: 'major intellectual source' },
  { id: 'e34', source: 'rushdoony', target: 'demar', kind: 'retrieval' },
  { id: 'e35', source: 'constitution', target: 'modern-state', kind: 'institutional' },
  { id: 'e36', source: 'first-amendment', target: 'modern-state', kind: 'institutional' },
  { id: 'e37', source: 'kuyper', target: 'modern-state', kind: 'retrieval', label: 'sphere sovereignty critique' },
  { id: 'e38', source: 'john-paul-ii', target: 'modern-state', kind: 'retrieval', label: 'subsidiarity critique' },
  { id: 'e39', source: 'demar', target: 'modern-state', kind: 'retrieval', label: 'plural governments critique' }
];

export const domainCards = [
  {
    title: 'Person and conscience',
    question: 'What must a person do before God, even when government disagrees?',
    summary: 'Conscience does not mean private preference alone. In this tradition, it means that persons bear moral responsibility that cannot simply be handed to a ruler, party, employer, or crowd.',
    examples: ['worship', 'speech', 'conversion', 'refusal to commit evil'],
    related: ['new-testament', 'first-amendment', 'modern-state']
  },
  {
    title: 'Family and household',
    question: 'Who has the first responsibility for raising children and sustaining household life?',
    summary: 'Family is treated as a real institution with duties and authority. The state may protect children and punish abuse, but it is not ordinarily the first parent, teacher, or moral formation system.',
    examples: ['education', 'care of children', 'household economy', 'elder care'],
    related: ['old-testament', 'rerum-novarum', 'quadragesimo']
  },
  {
    title: 'Church or religious community',
    question: 'Who governs worship, doctrine, membership, and discipline?',
    summary: 'Christian traditions disagree sharply about structure, but they commonly deny that the civil state may simply become the Church or treat worship as a government department.',
    examples: ['preaching', 'sacraments', 'membership', 'discipline'],
    related: ['new-testament', 'gelasius', 'westminster-1646', 'wcf-1788']
  },
  {
    title: 'Civil society',
    question: 'What belongs to associations between isolated individuals and the national state?',
    summary: 'Schools, workplaces, charities, neighborhoods, guilds, businesses, unions, local communities, and voluntary associations are institutions that organize real social life outside the state.',
    examples: ['schools', 'charities', 'businesses', 'local associations'],
    related: ['althusius', 'kuyper', 'john-paul-ii']
  },
  {
    title: 'Civil government',
    question: 'What may the state do, and what may it not take over?',
    summary: 'Civil government has a real task: public order, justice, defense, lawful coercion, and protection against violence. The central problem is how to keep its necessary authority from becoming total authority.',
    examples: ['courts', 'public safety', 'defense', 'lawful coercion'],
    related: ['old-testament', 'magna-carta', 'constitution', 'modern-state']
  }
] as const;

export const relationshipLabels: Record<AtlasEdge['kind'], string> = {
  primary: 'Primary inheritance',
  contributing: 'Contributing influence',
  revision: 'Institutional revision',
  retrieval: 'Later retrieval',
  institutional: 'Institutional development'
};
