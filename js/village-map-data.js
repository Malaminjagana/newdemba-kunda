/* Replace bracketed text and null coordinates only with verified village records. */
let villageHistoryData = {
    map: {
        center: null,
        zoom: 15,
        attribution: 'OpenStreetMap contributors'
    },
    locations: [
        { id: 'village-mosque', name: 'Village Mosque', category: 'Faith & community', markerIcon: 'fa-mosque', mapPosition: [26, 22], coordinates: null, description: '[ADD VERIFIED HISTORICAL DESCRIPTION FROM THE VILLAGE HISTORY BOOK]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: ['event-001'], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'school', name: 'School', category: 'Education', markerIcon: 'fa-school', mapPosition: [15, 55], coordinates: null, description: '[ADD VERIFIED HISTORICAL DESCRIPTION FROM THE VILLAGE HISTORY BOOK]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'village-center', name: 'Village Center', category: 'Community', markerIcon: 'fa-users', mapPosition: [45, 48], coordinates: null, description: '[ADD VERIFIED HISTORICAL DESCRIPTION FROM THE VILLAGE HISTORY BOOK]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'market', name: 'Market', category: 'Commerce', markerIcon: 'fa-store', mapPosition: [72, 66], coordinates: null, description: '[ADD VERIFIED HISTORICAL DESCRIPTION FROM THE VILLAGE HISTORY BOOK]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'historical-houses', name: 'Historical Houses', category: 'Family history', markerIcon: 'fa-home', mapPosition: [73, 29], coordinates: null, description: '[IDENTIFY THIS PLACE AND ADD VERIFIED HISTORY]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'community-area', name: 'Community Area', category: 'Community', markerIcon: 'fa-users', mapPosition: [82, 49], coordinates: null, description: '[IDENTIFY THIS PLACE AND ADD VERIFIED HISTORY]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'important-people', name: 'Important People of the Village', category: 'People', markerIcon: 'fa-user', mapPosition: [55, 27], coordinates: null, description: '[ADD VERIFIED INFORMATION ABOUT SONS, DAUGHTERS, OR OTHER IMPORTANT PEOPLE]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'important-historical-place', name: 'Important Historical Place', category: 'Heritage', markerIcon: 'fa-landmark', mapPosition: [43, 77], coordinates: null, description: '[NAME THIS PLACE AND ADD VERIFIED HISTORY]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } },
        { id: 'farms-agricultural-areas', name: 'Farms & Agricultural Areas', category: 'Agriculture', markerIcon: 'fa-seedling', mapPosition: [24, 76], coordinates: null, description: '[IDENTIFY THIS AREA AND ADD VERIFIED HISTORY]', historicalSignificance: '[ADD VERIFIED HISTORICAL SIGNIFICANCE]', people: [], eventIds: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], currentImages: [], videos: [], audio: [], documents: [] } }
    ],
    events: [
        { id: 'event-001', year: '[YEAR]', title: '[HISTORICAL EVENT]', description: '[ADD VERIFIED EVENT INFORMATION]', locationId: 'village-mosque', people: [], bookReference: { chapter: '[CHAPTER]', page: '[PAGE]', section: '[SECTION TITLE]' }, media: { historicalImages: [], videos: [], audio: [], documents: [] } }
    ]
};

villageHistoryData = {
    map: { center: null, zoom: 15, attribution: 'OpenStreetMap contributors' },
    locations: [
        { id: 'village-centre', name: 'Village Centre', category: 'Community history', markerIcon: 'fa-users', mapPosition: [45, 48], coordinates: null, description: 'The centre of the settlement connects accounts of founding, early families, leadership, migration and village expansion.', historicalSignificance: 'Accounts of New Demba Kunda’s founding place it around 1905-1909, alongside the histories of its families, leaders, migration and expansion.', people: ['Foday Jagana', 'Samba Sabally', 'Marry Jagana'], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['village-begins', 'three-huts', 'first-families', 'ten-leaders', 'diaspora', 'diamond-years', 'traditional-crafts', 'village-expansion'] },
        { id: 'central-mosque', name: 'Central Mosque', category: 'Religion and scholarship', markerIcon: 'fa-mosque', mapPosition: [26, 22], coordinates: null, description: 'The Central Mosque developed from a BAFA pavilion into a Friday-prayer structure, with major rebuilding in 1969 and 2016-2017.', historicalSignificance: 'It connects the history of religious leadership, scholarship and reform in the village.', people: [], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['central-mosque', 'tradition-knowledge', 'religious-reform'] },
        { id: 'arabic-schools', name: 'Arabic Schools', category: 'Education', markerIcon: 'fa-school', mapPosition: [15, 55], coordinates: null, description: 'Traditional primary-school locations and later Arab-Islamic schools are part of the village education record.', historicalSignificance: 'Traditional learning, the Eight Villages’ School and Dar al-Islam al-Salafiya School form important chapters in New Demba Kunda’s educational history.', people: ['Sheikh Ibrahima Khonteh'], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['traditional-education', 'eight-villages-school', 'dar-al-islam', 'education-beyond-village'], media: { historicalImages: ['img/schools/traditional-school1.webp', 'img/schools/traditional-school2.webp', 'img/schools/traditional-school3.webp'] } },
        { id: 'english-school', name: 'English School', category: 'Education', markerIcon: 'fa-school', mapPosition: [72, 66], coordinates: null, description: 'An English school was inaugurated in 1998 after community attitudes toward English-language education changed over time.', historicalSignificance: 'The school later expanded to higher grades and had more than 800 pupils by the period described.', people: [], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['english-education'], media: { historicalImages: ['img/schools/english-school1.webp', 'img/schools/english-school2.webp', 'img/schools/english-school3.webp', 'img/schools/english-school4.webp', 'img/schools/english-school5.webp', 'img/schools/english-school6.webp', 'img/schools/english-school7.webp'] } },
        { id: 'historic-wells', name: 'Historic Wells', category: 'Land and water', markerIcon: 'fa-tint', mapPosition: [43, 77], coordinates: null, description: 'Historic wells sustained daily village life before the 2004 borehole water project, including Khuban Ghede.', historicalSignificance: 'The project reduced the burden of collecting water through a borehole, two 60,000-litre tanks and 74 taps.', people: [], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['historic-wells', 'water-project'] },
        { id: 'farms-gardens', name: 'Farms and Gardens', category: 'Community life', markerIcon: 'fa-seedling', mapPosition: [24, 76], coordinates: null, description: 'Agriculture and gardening formed part of women’s roles in household life and community development.', historicalSignificance: 'These contributions shaped village life without reducing women’s work to a single role.', people: [], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['women-community'] },
        { id: 'lost-villages', name: 'Lost Villages', category: 'Lost history', markerIcon: 'fa-landmark', mapPosition: [73, 29], coordinates: null, description: 'Tenkinam, Tobali Kunda, Jinna Wurunde, Biraima Kaara, Simbanou, Koba Kaara, Sirihin Kaara and Tumbun Khore are remembered among New Demba Kunda’s former settlements.', historicalSignificance: 'Their locations are not placed as geographic coordinates because geographic coordinates have not been verified.', people: [], bookReference: { source: 'The History of New Demba Kunda' }, storyIds: ['lost-villages'] }
    ],
    events: [
        { id: 'expansion-1937', year: 'c. 1937', title: 'Dibirou develops', locationId: 'village-centre', storyId: 'village-expansion' },
        { id: 'migration-1950', year: '1950s', title: 'Migration to Sierra Leone', locationId: 'village-centre', storyId: 'diaspora' },
        { id: 'mosque-1969', year: '1969', title: 'Central Mosque inauguration', locationId: 'central-mosque', storyId: 'central-mosque' },
        { id: 'reform-1970', year: '1970s', title: 'Religious reform movement', locationId: 'central-mosque', storyId: 'religious-reform' },
        { id: 'school-1984', year: '1984', title: 'Eight Villages’ School begins', locationId: 'arabic-schools', storyId: 'eight-villages-school' },
        { id: 'english-1998', year: '1998', title: 'English school inaugurated', locationId: 'english-school', storyId: 'english-education' },
        { id: 'water-2004', year: '2004', title: 'Borehole water project begins pumping', locationId: 'historic-wells', storyId: 'water-project' },
        { id: 'mosque-2016', year: '2016-2017', title: 'Central Mosque rebuilt', locationId: 'central-mosque', storyId: 'central-mosque' },
        { id: 'alkalo-2022', year: '22 May 2022', title: 'Marry Jagana assumes Alkalo role', locationId: 'village-centre', storyId: 'ten-leaders' }
    ]
};

(function (data) {
    const source = 'The History of New Demba Kunda';
    const additions = [];
    function add(id, name, category, icon, position, description, significance) {
        additions.push({ id: id, name: name, category: category, markerIcon: icon, mapPosition: position, positionType: 'illustrative', coordinates: null, description: description, historicalSignificance: significance || 'This map position is illustrative and is not a verified geographic coordinate.', people: [], bookReference: { source: source }, storyIds: [] });
    }
    [
        ['denghena-denghenan-koti', 'DENGHENA / DENGHENAN KOTI', [48, 39], 'Central neighbourhood of the Central Mosque, with Jaganara and Numuyel Jaganara compounds.'],
        ['bantan-kaanu', 'BANTAN KAANU', [47, 66], 'Southern neighbourhood named after Bantan Penda Camara of Kagorta Khore. Its western part is known as Jimba.'],
        ['charappu', 'CHARAPPU', [47, 17], 'Northern neighbourhood of Khonteh Kunda and the Traditional High School / Majlis.'],
        ['old-demba-kunda', 'Old Demba Kunda', [49, 6], 'A neighbouring village north of New Demba Kunda.'],
        ['demba-kunda-nyale', 'Demba Kunda Nyale', [78, 18], 'A neighbouring village that participated in the Eight Villages’ School project.'],
        ['malinkon-kaara', 'Malinkon Kaara', [87, 43], 'A neighbouring village.'],
        ['numuyel', 'Numuyel', [20, 29], 'A neighbouring village.'],
        ['gambisara', 'Gambisara', [7, 56], 'A neighbouring village on the westward road reference.'],
        ['sabi', 'Sabi', [83, 76], 'A neighbouring village.'],
        ['basse', 'Basse', [96, 56], 'The nearest city reference for the Bassen Kille farmland record.']
    ].forEach(function (entry) { add(entry[0], entry[1], entry[0].indexOf('demba-kunda') >= 0 || entry[0] === 'malinkon-kaara' || entry[0] === 'numuyel' || entry[0] === 'gambisara' || entry[0] === 'sabi' ? 'Neighbouring Village' : 'Nearest City', 'fa-map-signs', entry[2], entry[3]); });
    [
        ['khuban-ghede', 'KHUBAN GHEDE', [31, 44], 'At Seyinka Field west of the Central Mosque, associated with Foday Jagana and described as possibly the first well in the village.'],
        ['bunkhun-ghede', 'Bunkhun Ghede', null, 'A historic boundary well between Old and New Demba Kunda.', 'The book describes Bunkhun-Ghede as a boundary well between Old and New Demba Kunda.'],
        ['darbon-ghede', 'DARBON GHEDE', [67, 42], 'An east-side well dug by Sikhou Darbo, associated with fresh water and later rebuilding by Sharif Jagana.'],
        ['kaban-ghede', 'KABAN GHEDE', [55, 63], 'Beside Kaba Kunda south of the Central Mosque, dug by Nangou Kaba.'],
        ['bantan-ghede', 'BANTAN GHEDE', [35, 70], 'Southwest opposite Kagorta Khore, dug by Bantan Penda Camara.'],
        ['mayisin-ghede', 'MAYISIN GHEDE', [38, 18], 'The Traditional High School / Majlis well, dug by Kharamoko Hawa Khonteh.'],
        ['juman-ghede', 'JUMAN GHEDE', [44, 36], 'Next to the Central Mosque, dug by Sharif Jagana (Sirihi).'],
        ['garankan-ghede', 'GARANKAN GHEDE', [58, 78], 'South next to Fayinkeh Kunda, dug by Salim Fayinkeh.']
    ].forEach(function (entry) { add(entry[0], entry[1], 'Wells', 'fa-tint', entry[2], entry[3], entry[4]); });
    add('ballan-khole', 'BALLAN KHOLE AND STREAM CROSSINGS', 'Water', 'fa-water', [13, 43], 'Ballan Khole is part of the stream southwest of the village, where fishing and swimming took place and white clay was collected for painting and decorating houses. Kholi Khore is another section of the stream west of the village on the road toward Gambisara, where a bridge was built around 1966.', 'Ballan Khole and Kholi Khore are documented on printed pages 284-285.');
    add('water-project-2004', 'MODERN WATER PROJECT', 'Historic Infrastructure', 'fa-tint', [49, 52], 'A central borehole, two large water tanks holding 60,000 liters each and 74 water taps formed the village water supply project, which began operating in October 2004.');
    [
        ['misidin-kura', 'MISIDIN KURA', [34, 38], 'West of the Central Mosque, where elders rested and waited for prayers and funeral meetings.'],
        ['seyinkan-kura', 'SEYINKAN KURA', [29, 51], 'At the southern corner of Seyinka Field next to Khuban Ghede.'],
        ['mamadin-kura', 'MAMADIN KURA', [19, 48], 'At the western end of Seyinka Field, named after Mamadi Bouba Kurubally.'],
        ['kaban-kura', 'KABAN KURA', [57, 67], 'South of the Central Mosque and next to Kaban Ghede.'],
        ['bantan-kura', 'BANTAN KURA', [31, 73], 'At the entrance of Kagorta Khore and opposite Bantan Ghede.'],
        ['charappun-kura', 'CHARAPPUN KURA', [57, 16], 'At the entrance of Waggeh Kunda in Charappu.']
    ].forEach(function (entry) { add(entry[0], entry[1], 'Public Spaces / Bantaba', 'fa-users', entry[2], entry[3]); });
    [
        ['dala-gilleh', 'Dala Gilleh', [13, 61], 'A pond and forest area on the Gambisara road.'],
        ['hurunkun-dala', 'Hurunkun Dala', [20, 67], 'A village pond.'], ['dala-lemmeh', 'Dala Lemmeh', [26, 60], 'A village pond.'], ['jamban-dala', 'Jamban Dala', [18, 74], 'A village pond.'], ['simakhan-dala', 'Simakhan Dala', [25, 82], 'A village pond.'], ['kumma-kejugun-dala', 'Kumma Kejugun Dala', [15, 84], 'A village pond.'], ['dala-khore', 'Dala Khore', [8, 72], 'A village pond.'], ['sikhou-hounen-dala', 'Sikhou Hounen Dala', [11, 66], 'A village pond.'], ['khilin-dala', 'Khilin Dala', [20, 89], 'A village pond.'], ['saban-dala', 'Saban Dala', [29, 87], 'A village pond.'], ['khumba-janken-dala', 'Khumba Janken Dala', [32, 82], 'A village pond.']
    ].forEach(function (entry) { add(entry[0], entry[1], 'Ponds / Water Features', 'fa-water', entry[2], entry[3]); });
    ['Haaja', 'Bilalin Saro', 'Bassen Kille', 'Giden Kamma', 'Saro', 'Jalihara', 'Sabin Sagandu', 'Dandinghari', 'Ban Saro', 'Biraima Kaara', 'Simbanou', 'Tobali Kunda', 'Jinna Wurunde', 'Sirihin Kaara', 'Tumbun Khore', 'Tenkinam', 'Dindi Hori', 'Ha Dugu', 'Khole Halle', 'Tellutu', 'Numuyelin Tenu'].forEach(function (name, index) { add('farmland-' + index, name, 'Farmlands', 'fa-seedling', [8 + (index % 7) * 13, 79 + Math.floor(index / 7) * 7], 'A farming area associated with the village landscape.', 'This position is illustrative and represents a farming landscape, not a verified boundary.'); });
    ['Ha Dugu', 'Dala Gilleh', 'American Diga', 'Khole Halle Giden Kamma', 'Hulundumbu', 'Simbanou'].forEach(function (name, index) { add('forest-' + index, name, 'Forests', 'fa-tree', [13 + index * 14, 91], 'A nearby forest area associated with the village landscape.', 'This position is illustrative and represents a forest landscape, not a verified boundary.'); });
    add('kholi-khore-bridge', 'Kholi Khore Bridge', 'Historic Infrastructure', 'fa-archway', [12, 43], 'A bridge at Kholi Khore was built around 1966.', 'This bridge is connected to the Kholi Khore stream section; its map position is illustrative.');
    data.locations = data.locations.concat(additions);
    additions.forEach(function (location) {
        if (!waterSourceMedia || !Object.prototype.hasOwnProperty.call(waterSourceMedia, location.id)) return;
        location.media = { historicalImages: waterSourceMedia[location.id], currentImages: [], videos: [], audio: [], documents: [] };
    });
    data.features = [
        { id: 'village-context', category: 'Landscape', type: 'region', positionType: 'illustrative', label: 'New Demba Kunda village context', bounds: [[18, 15], [78, 85]] },
        { id: 'western-wetland-stream', category: 'Water', type: 'line', positionType: 'illustrative', label: 'Water / Stream', points: [[93, 7], [84, 12], [75, 10], [66, 16], [56, 12], [45, 18], [31, 13], [13, 18]], sections: ['Ballan Khole', 'Ba Malalin Khare', 'Khari Khulleh', 'Yelin Debe', 'Kholi Lemmeh', 'Kholi Khore', 'Hayiren Khole'] },
        { id: 'western-wetland', category: 'Water', type: 'region', positionType: 'illustrative', label: 'Wetland / stream west of the village', bounds: [[12, 0], [94, 16]] },
        { id: 'eastern-hillside', category: 'Landscape', type: 'region', positionType: 'illustrative', label: 'Hill / hillside east of the village', bounds: [[12, 85], [92, 100]] },
        { id: 'northern-road', category: 'Road', type: 'line', positionType: 'illustrative', label: 'Road toward Old Demba Kunda', points: [[42, 48], [24, 48], [6, 49]] }
    ];
    data.legend = ['Mosque', 'School', 'Family Compound', 'Well', 'Public Space', 'Water', 'Pond', 'Farmland', 'Forest', 'Neighbouring Village', 'Outgrowth Village', 'Lost Village', 'Road', 'Historic Infrastructure'];
}(villageHistoryData));

(function (data) {
    const source = 'The History of New Demba Kunda';
    const families = typeof museumCollections !== 'undefined' && museumCollections.families ? museumCollections.families.records : [];
    const educationPositions = [[34, 24], [22, 44], [28, 29], [53, 59], [36, 68], [60, 45], [50, 31], [42, 23], [27, 54], [45, 36], [61, 18], [70, 53], [64, 31], [74, 38], [58, 12], [72, 22], [80, 30]];
    const traditionalSchools = ['Khonteh Kunda', 'Kebela', 'Bakhaga Kunda', 'Kaba Kunda', 'Kagorta Khore', 'Dukurella', 'Numuyel Jaganara', 'Billen Chakeya', 'Babuchiya', 'Jaganara Khore', 'Waggeh Kunda', 'Dukkara Kunda', 'Drammeh Kunda', 'Jallow Kunda', 'Singhateh Kunda', 'Touray Kunda', 'Kurubally Kunda'];
    function addLocation(record) {
        data.locations.push(record);
    }
    families.forEach(function (family, index) {
        const position = [31 + (index % 7) * 6.5, 30 + Math.floor(index / 7) * 10];
        addLocation({ id: family.mapLocationId, name: family.name, category: 'Family Compound', markerIcon: 'fa-home', mapPosition: position, positionType: 'illustrative', coordinates: null, description: family.description, historicalSignificance: 'This family compound is represented with an illustrative map position, not a verified geographic coordinate.', people: [], bookReference: { source: family.source }, storyIds: [], familyId: family.familyId, neighborhood: family.neighborhood, compoundNumber: family.compoundNumber });
    });
    traditionalSchools.forEach(function (name, index) {
        const matchingFamily = families.find(function (family) { return family.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 || name.toLowerCase().indexOf(family.name.toLowerCase().replace(' family ', ' ')) >= 0; });
        addLocation({ id: 'traditional-school-' + index, name: name, category: 'Traditional Schools', markerIcon: 'fa-school', mapPosition: educationPositions[index], positionType: 'illustrative', coordinates: null, description: 'A traditional primary-school location where students learned Arabic, reading, writing and Qur’an.', historicalSignificance: 'This illustrative map record represents one of the 17 traditional primary-school locations.', people: [], bookReference: { source: source }, storyIds: ['traditional-education'], familyId: matchingFamily ? matchingFamily.familyId : null, mapLocationId: matchingFamily ? matchingFamily.mapLocationId : null });
    });
    [
        ['traditional-high-school-majlis', 'Traditional High School - Majlis', [41, 28], 'Education / Historical Institution', 'The Traditional High School / Majlis is associated with Charappu.', 'Advanced learners continued through the traditional Majlis, including Islamic jurisprudence and Qur’anic interpretation in Soninke.', ['traditional-education']],
        ['eight-villages-school', "Al-Jama'a Al-Salafiya Al-Islamiya School", [18, 58], 'Education / Historical Institution', "The school was known historically as The Eight Villages' School.", 'Eight neighbouring villages joined to begin a modern Arab-Islamic school project in 1984.', ['eight-villages-school']],
        ['dar-al-islam-al-salafiya-school', 'Dar Al-Islam Al-Salafiya School', [25, 62], 'Education / Historical Institution', 'Teaching associated with Dar al-Islam al-Salafiya began in a makeshift classroom around 1990.', 'The school was inaugurated in 1415H / 1995.', ['dar-al-islam']]
    ].forEach(function (entry) {
        addLocation({ id: entry[0], name: entry[1], category: entry[3], markerIcon: 'fa-school', mapPosition: entry[2], positionType: 'illustrative', coordinates: null, description: entry[4], historicalSignificance: entry[5], people: [], bookReference: { source: source }, storyIds: entry[6] });
    });
    data.legend.push('Traditional School', 'Education / Historical Institution');
}(villageHistoryData));

(function (data) {
    const source = 'The History of New Demba Kunda';
    function add(id, name, category, position, description, significance, relatedLocationIds) {
        data.locations.push({ id: id, name: name, category: category, markerIcon: category === 'Lost Villages' ? 'fa-landmark' : 'fa-route', mapPosition: position, positionType: 'illustrative', coordinates: null, description: description, historicalSignificance: significance, people: [], bookReference: { source: source }, storyIds: category === 'Outgrowth Villages' ? ['village-expansion'] : ['lost-villages'], relatedLocationIds: relatedLocationIds || [] });
    }
    [
        ['lost-tenkinam', 'Tenkinam', [6, 52], 'West on Gambisara road; associated with Samba Teneh, with mango, baobab and taba trees.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['gambisara', 'farmland-15']],
        ['lost-tobali-kunda', 'Tobali Kunda', [47, 91], 'South on Jidda Moudou road; associated with Demba Nyanjo, with an old well and two taba trees.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['farmland-11', 'jidda-moudou']],
        ['lost-jinna-wurunde', 'Jinna Wurunde', [53, 94], 'South after Tobali Kunda; associated with Saidou Kaara.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['lost-tobali-kunda', 'farmland-12']],
        ['lost-biraima-kaara', 'Biraima Kaara', [79, 83], 'Southeast between New Demba Kunda and Mampatayeli; two wells and mango, taba and baobab trees remain.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['farmland-9']],
        ['lost-simbanou', 'Simbanou', [86, 88], 'Southeast at Jalaja, associated with Bambadouga Jamiggeh.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['farmland-10']],
        ['lost-koba-kaara', 'Koba Kaara', [73, 91], 'Southwest from Biraima Kaara.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['lost-biraima-kaara']],
        ['lost-sirihin-kaara', 'Sirihin Kaara', [59, 96], 'South next to Jinna Wurunde, associated with Bakary Hydara, son of Ousman Hydara; now farmland.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['lost-jinna-wurunde', 'farmland-13']],
        ['lost-tumbun-khore', 'Tumbun Khore', [65, 98], 'South next to Sirihin Kaara.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['lost-sirihin-kaara', 'farmland-14']],
        ['lost-lambidou', 'Lambidou', [38, 96], 'South at the junction toward Lambatara and Jidda Moudou.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['jidda-moudou']],
        ['lost-bantin-koto', 'Bantin Koto', [33, 98], 'South next to Lambidou, associated with Tamba Sanyang.', 'Vanished settlement. Its map position is illustrative and not a verified geographic coordinate.', ['lost-lambidou']]
    ].forEach(function (entry) { add(entry[0], entry[1], 'Lost Villages', entry[2], entry[3], entry[4], entry[5]); });
    [
        ['dibirou', 'Dibirou', [86, 75], 'About 10 km southeast; established around 1937 by people who had lived in New Demba Kunda.', 'The distance and direction are preserved here; this map position is illustrative.', ['village-centre']],
        ['jidda-moudou', 'Jidda Moudou', [48, 98], 'About 6 km south; established around 1946 by people who had lived in New Demba Kunda.', 'The distance and direction are preserved here; this map position is illustrative.', ['village-centre']],
        ['simbi', 'Simbi', [12, 94], 'About 12 km southwest; established around 1950 by people who had lived in New Demba Kunda.', 'The distance and direction are preserved here; this map position is illustrative.', ['village-centre']]
    ].forEach(function (entry) { add(entry[0], entry[1], 'Outgrowth Villages', entry[2], entry[3], entry[4], entry[5]); });
    add('kholi-khore', 'Kholi Khore', 'Water', [13, 43], 'A section of the village stream.', 'This map position is illustrative and connects the stream with the historic bridge.', ['kholi-khore-bridge', 'gambisara']);
    data.features.push(
        { id: 'gambisara-road', category: 'Road', type: 'line', positionType: 'illustrative', label: 'Road toward Gambisara', points: [[46, 40], [55, 27], [56, 7]] },
        { id: 'basse-road', category: 'Road', type: 'line', positionType: 'illustrative', label: 'Road toward Basse', points: [[58, 48], [55, 75], [56, 96]] },
        { id: 'jidda-moudou-road', category: 'Road', type: 'line', positionType: 'illustrative', label: 'Road toward Jidda Moudou', points: [[48, 47], [72, 48], [98, 48]] },
        { id: 'lambatara-road', category: 'Road', type: 'line', positionType: 'illustrative', label: 'Road toward Lambatara', points: [[48, 44], [74, 35], [96, 33]] },
        { id: 'internal-village-routes', category: 'Road', type: 'line', positionType: 'illustrative', label: 'Internal village routes', points: [[34, 30], [46, 39], [55, 52], [42, 64], [32, 72]] }
    );
    data.locations.find(function (location) { return location.id === 'central-mosque'; }).relatedLocationIds = ['denghena-denghenan-koti', 'jaganara-khore-compound'];
    data.locations.find(function (location) { return location.id === 'kaban-kura'; }).relatedLocationIds = ['kaban-ghede'];
    data.locations.find(function (location) { return location.id === 'dala-khore'; }).relatedLocationIds = ['farmland-2'];
}(villageHistoryData));