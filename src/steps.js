/**
 * Election process steps data.
 * Each step represents a stage in the election journey.
 */
export const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    icon: '📋',
    description:
      'The first step in exercising your democratic right is registering to vote. Registration requirements vary by jurisdiction but typically involve providing proof of identity, age, and residency. Many places now offer online registration to make the process easier.',
    tips: [
      'Check your registration status well before Election Day — most jurisdictions have a deadline weeks in advance.',
      'Keep a copy of your registration confirmation for your records in case of disputes at the polling place.',
    ],
    commonMistakes:
      'Waiting until the last minute to register. Many voters miss deadlines or assume they are already registered when they have been removed from the rolls due to inactivity or an address change.',
  },
  {
    id: 2,
    title: 'Understanding Candidates & Ballot',
    icon: '🔍',
    description:
      'Before heading to the polls, research the candidates and ballot measures you will be voting on. Understanding each candidate\'s platform and the implications of ballot initiatives ensures you make informed choices. Non-partisan voter guides can be especially helpful.',
    tips: [
      'Use official voter guides and non-partisan resources like ballotpedia.org to compare candidate positions side by side.',
      'Review the full ballot ahead of time — down-ballot races and local measures can have a huge impact on your community.',
    ],
    commonMistakes:
      'Only researching top-of-ticket races and ignoring local candidates or ballot measures that directly affect your daily life, such as school boards, judges, and city council members.',
  },
  {
    id: 3,
    title: 'Finding Your Polling Place',
    icon: '📍',
    description:
      'Knowing where and when to vote is essential. Your assigned polling place is based on your registered address and may change between elections. Many jurisdictions also offer early voting locations and mail-in ballot options for added convenience.',
    tips: [
      'Look up your polling place on your state or county election website at least a week before Election Day.',
      'Note the hours of operation and bring a valid photo ID if your jurisdiction requires one.',
    ],
    commonMistakes:
      'Assuming your polling place is the same as last time. Redistricting, venue changes, or an address update can reassign you to a different location.',
  },
  {
    id: 4,
    title: 'Casting Your Vote',
    icon: '🗳️',
    description:
      'On Election Day — or during early voting — you will check in, receive your ballot, and mark your choices. Voting methods range from paper ballots and optical scanners to electronic touchscreens. Take your time and double-check your selections before submitting.',
    tips: [
      'Bring any required identification and your voter registration confirmation to avoid delays at check-in.',
      'If you make a mistake on a paper ballot, ask a poll worker for a replacement — do not try to correct it yourself.',
    ],
    commonMistakes:
      'Rushing through the ballot and accidentally skipping races, or filling in the ballot incorrectly (e.g., circling instead of filling in the bubble), which can cause your vote to be rejected by the scanner.',
  },
  {
    id: 5,
    title: 'Understanding Vote Counting',
    icon: '📊',
    description:
      'After polls close, election officials begin the counting process. Ballots are tallied by machine or hand under strict observation from representatives of all parties. Mail-in and provisional ballots may take additional days to verify and count.',
    tips: [
      'Be patient — accurate counting takes time, especially with mail-in ballots, and delays do not indicate problems.',
      'Follow official election office updates rather than unofficial projections or social media rumors.',
    ],
    commonMistakes:
      'Assuming that election-night results are final. Mail-in, overseas, and provisional ballots are often counted in the days following the election, and results can shift as these are added.',
  },
  {
    id: 6,
    title: 'Post-Election & Results',
    icon: '✅',
    description:
      'Once counting is complete, results are certified by election officials. Candidates may request recounts if margins are within legal thresholds. After certification, elected officials prepare to take office and begin their transition into their new roles.',
    tips: [
      'Check your local election office website for the official certified results, which may differ from preliminary counts.',
      'Stay engaged after the election — contact your elected officials and participate in public meetings to hold them accountable.',
    ],
    commonMistakes:
      'Disengaging from the political process after the election. Civic participation does not end on Election Day — attending town halls, contacting representatives, and voting in every election keeps democracy healthy.',
  },
];
