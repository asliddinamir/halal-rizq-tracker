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
    'interest': '**Riba (Interest) is Absolutely Forbidden.** Allah declares in Qur\'an 2:275: "Allah has permitted trade and forbidden riba." In 2:278-279, Allah warns: "O you who believe, fear Allah and give up what remains of riba if you are believers. If you do not, then be warned of war from Allah and His Messenger." The Prophet ﷺ said: "Riba has 70 segments, the least serious being equivalent to a man committing adultery with his own mother" (Ibn Majah). All four schools of Islamic jurisprudence (Hanafi, Maliki, Shafi\'i, Hanbali) unanimously agree that any form of interest is strictly haram. **This income must be given to charity without expecting reward.**',
    'riba': '**Riba is Among the Gravest Sins.** Qur\'an 2:275 states: "Those who consume riba will not stand except as one stands who is being beaten by Satan into insanity." The Prophet ﷺ cursed: "The one who consumes riba, the one who pays it, the one who writes it down, and the two witnesses to it" (Muslim). Imam Ibn Kathir explains that riba destroys wealth\'s blessing (barakah) and erodes societal justice. **Immediate repentance and disposal of such income is obligatory.**',
    'alcohol': '**Trading in Intoxicants is Categorically Haram.** Qur\'an 5:90 declares: "O you who believe! Intoxicants and gambling are abominations from Satan\'s handiwork, so avoid them that you may be successful." The Prophet ﷺ said: "Allah has cursed alcohol, the one who drinks it, the one who serves it, the one who sells it, the one who buys it, the one who presses it, the one for whom it is pressed, the one who carries it, and the one to whom it is carried" (Abu Dawud). **This applies to production, distribution, and sale - all income from alcohol is impure.**',
    'gambling': '**Gambling Income is Explicitly Prohibited.** Qur\'an 2:219 states: "They ask you about wine and gambling. Say: In them is great sin and some benefit for people, but their sin is greater than their benefit." Qur\'an 5:90-91 describes gambling as "an abomination of Satan\'s handiwork" that creates enmity. The Prophet ﷺ said: "Whoever says to his companion \'Come, let us gamble,\' should give charity" (Bukhari & Muslim) - even the invitation requires expiation. Scholars agree all forms of gambling, betting, and games of chance are haram. **Any winnings must be returned or given to charity.**',
    'pork': '**Trade in Pork is Forbidden Like Its Consumption.** Qur\'an 2:173 states: "He has forbidden you dead meat, blood, the flesh of swine, and that on which any other name has been invoked besides that of Allah." The Prophet ﷺ said: "When Allah forbids something, He also forbids its price" (Abu Dawud). Imam Ahmad and the majority of scholars confirm that selling prohibited items is itself prohibited. **Income from pork trade is impure and must be disposed of properly.**',
    'nightclub': '**Entertainment Venues Promoting Sin are Haram.** Environments that facilitate and promote activities forbidden in Islam - such as alcohol consumption, illicit relationships, and music that leads to immorality - are prohibited. The Prophet ﷺ said: "Whoever believes in Allah and the Last Day should not sit at a table where alcohol is being served" (Tirmidhi). Scholars agree that earning from establishments centered on haram activities shares in the sin. **Employment alternatives should be sought urgently.**',
    'default': '**This Source Involves Prohibited Activities.** The Prophet ﷺ taught: "That which is halal is clear and that which is haram is clear" (Bukhari & Muslim). The Qur\'an and authentic Sunnah explicitly prohibit certain activities, and earning from them is equally forbidden. Ibn Taymiyyah states: "Whatever leads to haram is itself haram." Contemporary scholars from Al-Azhar, the Islamic Fiqh Council, and major fatwa bodies unanimously reject income from explicitly forbidden sources. **Such earnings lack barakah (blessing) and must be purified through charity.**'
  };
  
  return reasons[keyword] || reasons['default'];
}

function getDoubtfulReasoning(keyword: string): string {
  const reasons: Record<string, string> = {
    'stock': '**Stock Trading Requires Shariah Screening.** The principle in Qur\'an 4:29 states: "Do not consume one another\'s wealth unjustly, but only through trade by mutual consent." Stocks can be halal if: (1) The company\'s core business is permissible, (2) Debt-to-asset ratio is below 33% (following opinions of scholars like Mufti Taqi Usmani), (3) Interest income is less than 5% of total income, (4) No involvement in haram activities. The Islamic Fiqh Council permits trading in shares of permissible companies. However, mixed portfolios and companies with interest-bearing debt create doubt. **Verify through Shariah-compliant screening services (AAOIFI standards) and purify dividends from impermissible income.**',
    'crypto': '**Cryptocurrency: Subject of Contemporary Ijtihad.** The Fiqh principle states: "The default ruling for transactions is permissibility unless proven otherwise." Supportive scholars (like Dr. Monzer Kahf, Mufti Faraz Adam) argue cryptocurrencies can be permissible as digital assets with value by consensus, citing Qur\'an 2:275: "Allah has permitted trade." They liken it to currency exchange. However, cautionary scholars (including some from Al-Azhar) cite concerns about gharar (uncertainty), lack of intrinsic value, and speculative nature. The Islamic Fiqh Council has not reached consensus. Bitcoin may have more acceptance than highly speculative altcoins. **Use only for genuine trade, avoid excessive speculation, and consult qualified scholars about specific cryptocurrencies.**',
    'trading': '**Legitimate Trade vs. Speculation.** Qur\'an 2:275 explicitly permits trade: "Allah has permitted trade and forbidden riba." However, the Prophet ﷺ prohibited transactions involving gharar (excessive uncertainty) and maysir (gambling-like speculation). Long-term investing based on company fundamentals aligns with Islamic principles. Day trading and high-frequency speculation fall into a gray area - scholars like Dr. Yusuf Al-Qaradawi express reservations due to gambling-like characteristics, while others permit it if no riba or gharar exists. **Avoid derivatives, margin trading with interest, and purely speculative gambling-like behavior. Focus on genuine value exchange.**',
    'investment': '**Investment Instruments Vary in Permissibility.** Islamic finance principles from the Qur\'an and Sunnah require: no riba (interest), no gharar (excessive uncertainty), no maysir (gambling), and investment in halal sectors only. Conventional bonds are haram (they are interest-bearing loans). Stocks require screening. Mutual funds must be Shariah-compliant. Real estate investment is generally permissible if financed properly. The AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) and Islamic Fiqh Council provide standards. **Each investment vehicle needs individual Shariah assessment. Seek Shariah-compliant alternatives and certified halal investment products.**',
    'insurance': '**Conventional Insurance Contains Problematic Elements.** Traditional insurance involves gharar (uncertainty about if/when payout occurs) and riba (interest from investing premiums), which scholars note conflicts with hadith: "The Prophet ﷺ forbade transactions involving gharar" (Muslim). The Islamic Fiqh Council (Resolution 9/2) states conventional insurance is impermissible. However, Takaful (Islamic cooperative insurance) is permissible - participants contribute to a mutual fund, not purchasing uncertainty, based on the Qur\'anic principle of ta\'awun (cooperation) in 5:2: "Cooperate in righteousness and piety." **Transition to Takaful alternatives where available, or seek scholarly guidance if no alternative exists in your jurisdiction.**',
    'music': '**Musical Income: Scholarly Divergence Exists.** Some scholars cite hadith collections (though their authenticity is debated): "There will be people who will regard as permissible adultery, silk, alcohol and musical instruments" (Bukhari). Conservative scholars prohibit most music. However, other scholars (including some Malikis and contemporaries like Dr. Yusuf Al-Qaradawi) permit music that: doesn\'t contain haram lyrics, doesn\'t promote immorality, uses traditional instruments (duff is explicitly permitted), and doesn\'t lead to spiritual harm. The permissibility of professional music careers divides scholars significantly. **Focus on content promoting virtue, avoid explicitly prohibited themes, and consult trusted scholars regarding your specific situation.**',
    'default': '**Gray Areas Require Careful Examination.** The Prophet ﷺ taught: "That which is halal is clear and that which is haram is clear, and between them are doubtful matters which many people do not know. Whoever guards against doubtful matters clears himself in regard to his religion and honor" (Bukhari & Muslim). This hadith establishes the category of mushtabihat (doubtful matters). The Fiqh principle states: "Certainty is not removed by doubt." When scholars differ significantly, the principle of ijtihad (scholarly reasoning) applies. **Research this specific case thoroughly, examine opinions of qualified contemporary scholars, consider adopting the more cautious position (wara\'), and consult a trusted local scholar for personal guidance.**'
  };
  
  return reasons[keyword] || reasons['default'];
}

function getHalalReasoning(keyword: string): string {
  const reasons: Record<string, string> = {
    'freelance': '**Freelancing is Noble Earning Through Skills.** Qur\'an 67:15 states: "It is He who made the earth tame for you - so walk among its slopes and eat of His provision." Providing services through one\'s skills and labor is explicitly encouraged. The Prophet ﷺ said: "Nobody has ever eaten better food than that earned by his own hands" (Bukhari). Many Prophets worked with their hands - Prophet Dawud made armor, Prophet Zakariya was a carpenter. Freelancing embodies the principle of mutual benefit in Qur\'an 4:29: "Trade by mutual consent." **Ensure contracts are clear (no gharar), deliver quality work (amanah/trustworthiness), and avoid prohibited industries. This is blessed, pure income (kasb tayyib).**',
    'salary': '**Lawful Employment is Encouraged Income.** Qur\'an 62:10 commands: "When the prayer has been concluded, disperse within the land and seek from the bounty of Allah." This verse directly links worship with seeking halal provision. The Prophet ﷺ said: "It is better for anyone of you to carry a bundle of wood on his back and sell it than to beg from others" (Bukhari). Umar ibn Al-Khattab said: "None of you should sit idle and pray to Allah for sustenance, for you know that the sky does not rain gold or silver." Scholars universally agree that employment in permissible fields is not just allowed but encouraged. **Ensure your workplace and duties do not involve haram activities, fulfill your employment contract with excellence (ihsan), and this income carries Allah\'s blessing.**',
    'business': '**Trade is Foundational to Halal Wealth.** Qur\'an 2:275 explicitly states: "Allah has permitted trade." The Prophet ﷺ himself was a successful merchant before prophethood, as was his wife Khadijah. The Prophet ﷺ said: "The truthful and trustworthy merchant will be in the company of the Prophets, the truthful, and the martyrs" (Tirmidhi). Nine-tenths of sustenance comes from commerce, according to scholarly wisdom. Islamic civilization flourished on ethical trade. **Business must avoid riba (interest), gharar (deception), monopoly, hoarding, and deal only in halal goods/services. Honest trade with fair weights and measures is among the most blessed earnings.**',
    'teaching': '**Education is Among the Most Noble Professions.** The first revelation was "Read!" (Qur\'an 96:1), emphasizing knowledge\'s centrality. The Prophet ﷺ said: "The best among you are those who learn the Qur\'an and teach it" (Bukhari). Another hadith states: "Whoever teaches knowledge, the reward of those who act upon it will be written for him without diminishing their reward" (Ibn Majah). Imam Al-Ghazali devoted volumes to honoring teachers. Scholars agree teaching beneficial knowledge - whether religious or worldly sciences that benefit humanity - is among the highest forms of worship and earning. **Ensure content taught is truthful and beneficial. Income from education is not only halal but highly rewarded, with ongoing sadaqah jariyah (continuous charity) through students\' success.**',
    'agriculture': '**Farming is Blessed by Direct Divine Promise.** The Prophet ﷺ said: "There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift (sadaqah) for him" (Bukhari & Muslim). This hadith uniquely ties agricultural work to continuous charity. The Prophet ﷺ also said: "If the Hour is imminent and one of you has a palm sapling in his hand, if he can plant it before the Hour comes, let him do so" (Ahmad). Qur\'an 6:141 mentions agriculture as divine provision. All schools of jurisprudence honor farming. **Working the land combines halal earning with ongoing spiritual reward. This is among the purest and most blessed forms of rizq.**',
    'consulting': '**Professional Expertise is Valued Islamic Earning.** Sharing beneficial knowledge and experience falls under "amr bil ma\'ruf" (enjoining good). The Prophet ﷺ encouraged seeking and sharing expertise, saying: "Wisdom is the lost property of the believer" (Tirmidhi). Providing consultation utilizes skills Allah granted you to benefit others, embodying the Qur\'anic principle (4:29) of "trade by mutual consent." The Sahaba would consult experts in various fields. **Ensure advice is honest, based on true expertise (not deception), and serves the client\'s genuine interest. Consultation income is halal when it provides real value and benefits society.**',
    'crafts': '**Skilled Craftsmanship Has Prophetic Endorsement.** Many Prophets worked in crafts - Dawud made armor (Qur\'an 34:10), Nuh built the ark, Isa (Jesus) worked with his adoptive father. The Prophet ﷺ said: "Allah loves that when one of you does something, he perfects it" (Bayhaqi). Creating useful or beautiful items through skill is productive work encouraged in Islam. The Islamic Golden Age celebrated artisans and craftspeople. **Handmade goods represent honest labor, creativity Allah blessed you with, and providing benefit to others. This is pure halal income, especially when you maintain quality and fair dealings.**',
    'services': '**Providing Beneficial Services is Encouraged Trade.** Qur\'an 4:29 permits "trade by mutual consent," which includes services. The Prophet ﷺ said: "Whoever relieves a believer\'s distress from the hardships of this world, Allah will relieve his distress on the Day of Resurrection" (Muslim). Services that solve problems, create value, and benefit others align with Islamic ethics of helping humanity. From the time of the Prophet ﷺ, service providers - tailors, builders, helpers - were respected professions. **Ensure services are genuinely beneficial (not frivolous or harmful), contracts are clear, and work is done with excellence. Service income is blessed when it serves people\'s legitimate needs.**',
    'default': '**This Represents Honest, Lawful Labor.** The fundamental Islamic principle from Qur\'an 2:275 is: "Allah has permitted trade" and from 4:29: "Trade by mutual consent." The Prophet ﷺ taught: "The best earnings are from a man\'s own hands, and every honest sale" (Ibn Majah). When work: (1) Provides genuine value, (2) Involves no deception or injustice, (3) Deals in permissible products/services, (4) Is done with integrity and excellence - it is not just permitted but encouraged. The Qur\'an repeatedly commands believers to "seek from Allah\'s bounty" through lawful means. **This income source appears to meet Islamic criteria for halal earnings. Maintain honesty, fulfill commitments, and this work carries barakah (blessing) and divine pleasure.**'
  };
  
  return reasons[keyword] || reasons['default'];
}
