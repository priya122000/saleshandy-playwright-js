const accountTypes = {
  personal: {
    key: 'personal',
    displayName: 'Personal Use',
    tag: '@personal',
    signupOption: 'Personal Use',
    signupFields: {
      fullName: 'Personal QA User',
      companyName: '',
      role: 'Individual Contributor',
      teamSize: ''
    },
    onboarding: {
      expectedHeading: /personal|welcome|get started/i,
      steps: [
        { name: 'Choose goal', option: 'Find leads for myself' },
        { name: 'Connect email', option: 'Skip for now' },
        { name: 'Finish setup', option: 'Continue' }
      ]
    },
    expectedUi: [
      /personal workspace/i,
      /campaigns/i,
      /prospects/i
    ],
    forbiddenUi: [
      /client management/i,
      /team billing/i
    ]
  },
  business: {
    key: 'business',
    displayName: 'Business',
    tag: '@business',
    signupOption: 'Business',
    signupFields: {
      fullName: 'Business QA User',
      companyName: 'QA Automation Inc',
      role: 'Sales Manager',
      teamSize: '11-50'
    },
    onboarding: {
      expectedHeading: /business|team|workspace/i,
      steps: [
        { name: 'Company profile', option: 'B2B Sales' },
        { name: 'Invite team', option: 'Skip for now' },
        { name: 'Finish setup', option: 'Continue' }
      ]
    },
    expectedUi: [
      /team/i,
      /campaigns/i,
      /billing/i
    ],
    forbiddenUi: [
      /client portal/i
    ]
  },
  client: {
    key: 'client',
    displayName: 'Client',
    tag: '@client',
    signupOption: 'Client',
    signupFields: {
      fullName: 'Client QA User',
      companyName: 'Client Success LLC',
      role: 'Agency Owner',
      teamSize: '2-10'
    },
    onboarding: {
      expectedHeading: /client|agency|workspace/i,
      steps: [
        { name: 'Client workspace', option: 'Manage clients' },
        { name: 'Add client', option: 'Skip for now' },
        { name: 'Finish setup', option: 'Continue' }
      ]
    },
    expectedUi: [
      /clients/i,
      /client management/i,
      /campaigns/i
    ],
    forbiddenUi: [
      /personal workspace/i
    ]
  }
};

function getAccountTypes() {
  return Object.values(accountTypes);
}

function getAccountType(keyOrName) {
  const normalized = String(keyOrName).toLowerCase().replace(/\s+/g, '');
  const account = getAccountTypes().find((item) => {
    return item.key === normalized || item.displayName.toLowerCase().replace(/\s+/g, '') === normalized;
  });

  if (!account) {
    throw new Error(`Unsupported account type: ${keyOrName}`);
  }

  return account;
}

module.exports = {
  accountTypes,
  getAccountType,
  getAccountTypes
};
