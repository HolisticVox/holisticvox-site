(function() {
  const topicRoutes = [
    ['women', '/womenshealth', "Women's Health - HolisticVox", ['/womens-health', '/women'], 'wellness-topic'],
    ['men', '/menshealth', "Men's Health - HolisticVox", ['/mens-health', '/men'], 'wellness-topic'],
    ['kids', '/kidshealth', 'Little Ones - HolisticVox', ['/kids-health', '/little-ones', '/littleones'], 'wellness-topic'],
    ['pets', '/petshealth', 'Pets Health - HolisticVox', ['/pets', '/pets-health'], 'wellness-topic'],
    ['remedies', '/naturalremedies', 'Natural Remedies - HolisticVox', ['/natural-remedies'], 'wellness-topic'],
    ['mindbody', '/mind-body', 'Mind & Body - HolisticVox', [], 'wellness-topic'],
    ['acupuncture', '/acupuncture', 'Acupuncture - HolisticVox', [], 'wellness-topic'],
    ['soundhealing', '/sound-healing', 'Sound Healing - HolisticVox', [], 'wellness-topic'],
    ['breathwork', '/breathwork', 'Breathwork - HolisticVox', [], 'wellness-topic'],
    ['forestbathing', '/forest-bathing', 'Forest Bathing - HolisticVox', [], 'wellness-topic'],
    ['coldtherapy', '/cold-therapy', 'Cold Therapy - HolisticVox', [], 'wellness-topic'],
    ['earthing', '/earthing', 'Earthing - HolisticVox', [], 'wellness-topic'],
    ['efttapping', '/eft-tapping', 'EFT Tapping - HolisticVox', [], 'wellness-topic'],
    ['ayurveda', '/ayurveda', 'Ayurveda - HolisticVox', [], 'wellness-topic'],
    ['tcm', '/tcm', 'Traditional Chinese Medicine - HolisticVox', [], 'wellness-topic'],
    ['homeopathy', '/homeopathy', 'Homeopathy - HolisticVox', [], 'wellness-topic'],
    ['naturopathy', '/naturopathy', 'Naturopathy - HolisticVox', [], 'wellness-topic'],
    ['herbalism', '/herbalism', 'Herbalism - HolisticVox', [], 'wellness-topic'],
    ['antiinflammatory', '/anti-inflammatory', 'Anti-Inflammatory Diet - HolisticVox', [], 'wellness-topic'],
    ['fasting', '/fasting', 'Intermittent Fasting - HolisticVox', [], 'wellness-topic'],
    ['gutmicrobiome', '/gut-microbiome', 'Gut Microbiome - HolisticVox', [], 'wellness-topic'],
    ['sleep', '/sleep', 'Sleep Optimization - HolisticVox', [], 'wellness-topic'],
    ['longevity', '/longevity', 'Longevity - HolisticVox', [], 'wellness-topic'],
    ['detox', '/detox', 'Detoxification - HolisticVox', [], 'wellness-topic'],
    ['massage', '/massage', 'Massage & Body Therapies - HolisticVox', [], 'wellness-topic'],
    ['holistickids', '/holistic-kids', 'Holistic Pediatrics - HolisticVox', [], 'wellness-topic'],
    ['holisticpregnancy', '/holistic-pregnancy', 'Holistic Pregnancy - HolisticVox', [], 'wellness-topic'],
    ['menopause', '/menopause', 'Menopause Naturally - HolisticVox', [], 'wellness-topic'],
    ['menshormones', '/mens-hormones', "Men's Hormonal Health - HolisticVox", [], 'wellness-topic'],
    ['elderwellness', '/elder-wellness', 'Elder Wellness - HolisticVox', [], 'wellness-topic']
  ];

  const baseRoutes = [
    ['home', '/', 'HolisticVox - Natural Healing & Holistic Wellness', [], 'home', 'HolisticVox is a bilingual platform for evidence-based natural healing, holistic wellness, vetted practitioners, curated wellness products, and healing recipes.'],
    ['about', '/about', 'About Us - HolisticVox', [], 'core'],
    ['start', '/start-here', 'Start Here - HolisticVox', [], 'core'],
    ['holistichealing', '/holistic-healing', 'Holistic Healing - HolisticVox', [], 'core'],
    ['wellnesshub', '/wellnesshub', 'Wellness Hub - HolisticVox', ['/wellness-hub'], 'core'],
    ['articles', '/articles', 'Wisdom Library - HolisticVox', [], 'content-index'],
    ['recipes', '/recipes', 'Healing Recipes - HolisticVox', [], 'content-index'],
    ['shop', '/market', 'HV Market - HolisticVox', ['/shop'], 'market'],
    ['media', '/podcast', 'Podcast & Video - HolisticVox', ['/media', '/podcasts', '/channels', '/videos', '/podcast-and-video'], 'media'],
    ['practitioners', '/practitioners', 'Practitioners - HolisticVox', [], 'directory'],
    ['book', '/book', 'Book a Session - HolisticVox', [], 'conversion'],
    ['contact', '/contact', 'Contact Us - HolisticVox', [], 'core'],
    ['privacy', '/privacy', 'Privacy Policy - HolisticVox', [], 'legal'],
    ['terms', '/terms', 'Terms of Service - HolisticVox', [], 'legal'],
    ['disclosure', '/disclosure', 'Affiliate Disclosure - HolisticVox', [], 'legal'],
    ['autism', '/autism', 'Autism Hub - HolisticVox', ['/autism-hub'], 'content-hub'],
    ['autism-nutrition', '/autism-nutrition', 'Autism & Nutrition - HolisticVox', [], 'article'],
    ['autism-gut', '/autism-gut', 'Gut Health & Autism - HolisticVox', [], 'article'],
    ['autism-sleep', '/autism-sleep', 'Sleep & Autism - HolisticVox', [], 'article'],
    ['autism-sensory', '/autism-sensory', 'Sensory Processing & Autism - HolisticVox', [], 'article'],
    ['autism-magnesium', '/autism-magnesium', 'Magnesium & Autism - HolisticVox', [], 'article'],
    ['autism-folinic', '/autism-folinic', 'Folinic Acid & Autism - HolisticVox', [], 'article'],
    ['longevity-article', '/longevity-article', 'Longevity Article - HolisticVox', [], 'article']
  ];

  const recipes = Array.from({ length: 6 }, (_, idx) => {
    const id = `recipe${idx + 1}`;
    return [id, `/${id}`, `Recipe ${idx + 1} - HolisticVox`, [], 'recipe'];
  });

  const legacyArticles = Array.from({ length: 19 }, (_, idx) => {
    const id = `article${idx + 1}`;
    return [id, `/${id}`, `Article ${idx + 1} - HolisticVox`, [], 'article'];
  });

  const libraryIds = [
    'library-01-hormone-balance-naturally-evidence-b',
    'library-02-menopause-and-perimenopause-natural-',
    'library-03-pregnancy-nutrition-evidence-based-g',
    'library-04-testosterone-optimization-naturally-',
    'library-05-men-s-immune-health-evidence-based-s',
    'library-06-men-s-vitality-after-40-natural-stra',
    'library-07-natural-immune-support-for-children-',
    'library-08-sleep-foundations-for-babies-and-chi',
    'library-09-gut-health-in-children-building-a-mi',
    'library-10-natural-digestive-support-for-dogs-a',
    'library-11-managing-pet-anxiety-naturally-evide',
    'library-12-supporting-aging-pets-naturally-mobi',
    'library-13-herbs-for-stress-and-anxiety-what-th',
    'library-14-natural-remedies-for-pain-and-inflam',
    'library-15-natural-home-protocols-for-common-he',
    'library-16-meditation-and-the-brain-what-neuros',
    'library-17-breathwork-for-health-the-science-be',
    'library-18-emotional-regulation-natural-tools-f',
    'library-19-acupuncture-for-pain-management-what',
    'library-20-acupuncture-for-stress-anxiety-and-s',
    'library-21-acupuncture-for-fertility-and-women-',
    'library-22-ayurvedic-nutrition-eating-for-your-',
    'library-23-ayurvedic-daily-routines-dinacharya-',
    'library-24-ayurvedic-herbs-and-formulas-ancient'
  ].map(id => [id, `/${id}`, `${id.replace(/^library-\d+-/, '').replace(/-/g, ' ')} - HolisticVox`, [], 'library-article']);

  function toRoute(tuple) {
    return {
      pageId: tuple[0],
      canonicalPath: tuple[1],
      title: tuple[2],
      aliases: tuple[3] || [],
      includeInSitemap: true,
      pageType: tuple[4],
      seoDescription: tuple[5] || 'HolisticVox educational wellness content and resources.'
    };
  }

  const routes = [...baseRoutes, ...topicRoutes, ...legacyArticles, ...recipes, ...libraryIds].map(toRoute);
  window.HV_ROUTE_REGISTRY = routes;
  window.PAGE_SLUGS = Object.fromEntries(routes.map(route => [route.pageId, route.canonicalPath]));
  window.SLUG_ALIASES = routes.reduce((aliases, route) => {
    route.aliases.forEach(path => { aliases[path] = route.pageId; });
    return aliases;
  }, {});
  window.SLUG_TO_PAGE = {
    ...Object.fromEntries(routes.map(route => [route.canonicalPath, route.pageId])),
    ...window.SLUG_ALIASES
  };
  window.pageTitles = Object.fromEntries(routes.map(route => [route.pageId, route.title]));
  window.HV_CANONICAL_ORIGIN = 'https://holisticvox.com';
})();
