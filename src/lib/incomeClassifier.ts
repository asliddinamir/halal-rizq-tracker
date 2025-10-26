import { ComplianceCategory } from '@/types/income';

interface ClassificationResult {
  category: ComplianceCategory;
  reasoning: string;
}

const halalKeywords = [
  'freelance', 'consulting', 'halal', 'salary', 'wages', 'business', 'trade',
  'services', 'design', 'development', 'programming', 'teaching', 'tutoring',
  'education', 'agriculture', 'farming', 'crafts', 'handmade', 'retail',
  'restaurant', 'halal food', 'clothing', 'construction', 'repair', 'maintenance'
];

const haramKeywords = [
  'interest', 'riba', 'alcohol', 'gambling', 'casino', 'betting', 'lottery',
  'haram', 'pork', 'nightclub', 'bar', 'brewery', 'tobacco', 'cigarette',
  'adult entertainment', 'conventional bank interest', 'usury', 'loan interest'
];

const doubtfulKeywords = [
  'stock', 'shares', 'trading', 'forex', 'cryptocurrency', 'crypto', 'investment',
  'dividend', 'mutual fund', 'etf', 'bonds', 'insurance', 'conventional',
  'mixed income', 'uncertain', 'unsure', 'music', 'entertainment'
];

export function classifyIncome(source: string, description: string = ''): ClassificationResult {
  const text = `${source} ${description}`.toLowerCase();
  
  // Check for haram indicators first
  for (const keyword of haramKeywords) {
    if (text.includes(keyword)) {
      return {
        category: 'haram',
        reasoning: getHaramReasoning(keyword)
      };
    }
  }
  
  // Check for doubtful indicators
  for (const keyword of doubtfulKeywords) {
    if (text.includes(keyword)) {
      return {
        category: 'doubtful',
        reasoning: getDoubtfulReasoning(keyword)
      };
    }
  }
  
  // Check for halal indicators
  for (const keyword of halalKeywords) {
    if (text.includes(keyword)) {
      return {
        category: 'halal',
        reasoning: getHalalReasoning(keyword)
      };
    }
  }
  
  // Default to doubtful if no clear match
  return {
    category: 'doubtful',
    reasoning: 'Unable to determine clear classification. Please verify the source according to Islamic guidelines. Consult with a scholar if needed to ensure compliance with Shariah principles.'
  };
}

function getHaramReasoning(keyword: string): string {
  const reasons: Record<string, string> = {
    'interest': 'Riba (interest) is explicitly prohibited in Islam. "Allah has permitted trade and forbidden riba" (Qur\'an 2:275). Any income from interest is considered haram.',
    'riba': 'Riba is one of the major sins in Islam. "Those who consume interest cannot stand except as one stands who is being beaten by Satan" (Qur\'an 2:275).',
    'alcohol': 'Alcohol production or trade is prohibited. "O you who believe! Intoxicants are an abomination" (Qur\'an 5:90). Income from alcohol-related business is haram.',
    'gambling': 'Gambling is explicitly forbidden. "They ask you about wine and gambling. Say: In them is great sin" (Qur\'an 2:219). Any income from gambling activities is haram.',
    'pork': 'Pork trade is prohibited as pork consumption is forbidden. "He has forbidden you only dead animals, blood, the flesh of swine" (Qur\'an 2:173).',
    'default': 'This source involves activities that are explicitly prohibited in Islam according to the Qur\'an and Sunnah. Income from such sources is considered haram and should be avoided.'
  };
  
  return reasons[keyword] || reasons['default'];
}

function getDoubtfulReasoning(keyword: string): string {
  const reasons: Record<string, string> = {
    'stock': 'Stock trading permissibility depends on the company\'s operations. If the company deals in halal products/services and avoids interest-based transactions, it may be permissible. Scholars have different opinions; seek verification.',
    'crypto': 'Cryptocurrency is a subject of scholarly debate. Some scholars permit it as a digital asset, while others question its basis. The ruling depends on how it\'s used and whether it involves speculation or legitimate exchange.',
    'trading': 'Trading can be halal if conducted according to Islamic principles: fair trade, no interest, no gharar (excessive uncertainty). However, day trading and speculative practices may be doubtful.',
    'insurance': 'Conventional insurance is considered doubtful by many scholars due to elements of gharar and riba. However, Takaful (Islamic insurance) based on cooperation is permissible.',
    'music': 'Income from music is debated among scholars. Some permit it if the content is moral and doesn\'t contradict Islamic values, while others have reservations. The permissibility depends on the nature and purpose.',
    'default': 'This income source falls into a gray area where Islamic scholars have differing opinions. The permissibility depends on specific circumstances and methodologies involved. Consultation with a knowledgeable scholar is recommended.'
  };
  
  return reasons[keyword] || reasons['default'];
}

function getHalalReasoning(keyword: string): string {
  const reasons: Record<string, string> = {
    'freelance': 'Freelance work providing legitimate services is halal. "It is He who made the earth tame for you - so walk among its slopes and eat of His provision" (Qur\'an 67:15). Earning through honest work is encouraged.',
    'salary': 'Earning a salary from lawful employment is permissible and encouraged. "And when the prayer has been concluded, disperse within the land and seek from the bounty of Allah" (Qur\'an 62:10).',
    'business': 'Legitimate business and trade are fundamental to halal income. "Allah has permitted trade" (Qur\'an 2:275). As long as the business deals in permissible goods and avoids prohibited practices, it is halal.',
    'teaching': 'Teaching beneficial knowledge is highly encouraged in Islam. The Prophet (ﷺ) said: "The best among you are those who learn the Qur\'an and teach it" (Sahih Bukhari). Income from education is halal.',
    'agriculture': 'Agriculture and farming are blessed professions. "There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him" (Sahih Bukhari).',
    'default': 'This income source represents honest, lawful work that benefits society and involves no prohibited elements. Such earnings are blessed and encouraged in Islam.'
  };
  
  return reasons[keyword] || reasons['default'];
}
