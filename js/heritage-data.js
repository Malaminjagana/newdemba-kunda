const heritagePlaces = {
    "first-mosque": {
        title: "New Demba Kunda First Mosque",
        category: "Mosque",
        intro: "A historic community mosque in New Demba Kunda Village that anchors daily prayer, teaching, and village gatherings.",
        metaDescription: "Explore New Demba Kunda First Mosque, its gallery, history, and community importance in the village heritage program.",
        heroImage: "../img/demba-kunda-village-mosque-gambia1.jpg",
        heroAlt: "New Demba Kunda Village first mosque with traditional Gambian architecture and peaceful village surroundings",
        heroCaption: "The first mosque in New Demba Kunda Village, welcoming worshippers from across the community.",
        description: "This mosque serves as one of the key spiritual centers in New Demba Kunda Village, providing a welcoming space for daily prayers, community meetings, and traditional teaching.",
        importance: "The first mosque is central to village life, holding generations of daily worship and supporting religious education for local families.",
        donationUrl: "#", // Replace this placeholder with your real donation/payment URL when ready.
        quickInfo: [
            { label: "Type", value: "Mosque" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Community worship & learning" }
        ],
        gallery: firstMosqueMedia.map(function (src, index) {
            return {
                src: src,
                alt: "Historical photograph " + (index + 1) + " of New Demba Kunda First Mosque.",
                caption: "New Demba Kunda First Mosque historical photograph " + (index + 1) + ".",
                loading: index === 0 ? "eager" : "lazy"
            };
        })
    },
    "second-mosque": {
        title: "New Demba Kunda Second Mosque",
        category: "Mosque",
        intro: "A second village mosque that serves local worshippers with a calm prayer environment and community support.",
        metaDescription: "Discover the second mosque of New Demba Kunda Village, its gallery, and why it matters to local residents.",
        heroImage: "../img/demba-kunda-village-mosque-gambia2.jpg",
        heroAlt: "New Demba Kunda Village second mosque featuring classic mud-brick design and a quiet community prayer area",
        heroCaption: "The second mosque in New Demba Kunda Village, built for neighborhood worship and prayer gatherings.",
        description: "This mosque is an important addition to village life, offering a serene place for worship while supporting nearby families and events.",
        importance: "The second mosque strengthens the religious infrastructure in New Demba Kunda, making prayer and teaching accessible to more community members.",
        donationUrl: "#",
        quickInfo: [
            { label: "Type", value: "Mosque" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Neighborhood worship" }
        ],
        gallery: [
            {
                src: "../img/mosques/second mosque1.webp",
                alt: "Exterior of the second mosque in New Demba Kunda Village.",
                caption: "The second mosque, a calm spiritual center for the neighborhood.",
                loading: "eager"
            },
            {
                src: "../img/mosques/second mosque2.webp",
                alt: "New Demba Kunda Second Mosque viewed from the village grounds.",
                caption: "New Demba Kunda Second Mosque from the village grounds.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/second mosque3.webp",
                alt: "New Demba Kunda Second Mosque and its surrounding community space.",
                caption: "The mosque and its surrounding community space.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/second mosque4.webp",
                alt: "New Demba Kunda Second Mosque building.",
                caption: "A further view of New Demba Kunda Second Mosque.",
                loading: "lazy"
            },
            {
                type: "youtube",
                videoId: "v32dhT4h55I",
                thumbnail: "https://i.ytimg.com/vi/v32dhT4h55I/hqdefault.jpg",
                alt: "Official video of New Demba Kunda Second Mosque.",
                caption: "Official video of New Demba Kunda Second Mosque."
            }
        ]
    },
    "third-mosque": {
        title: "New Demba Kunda Third Mosque",
        category: "Mosque",
        intro: "A third mosque in the village that supports daily prayer and cultural unity among local families.",
        metaDescription: "Learn about the third mosque in New Demba Kunda Village, its gallery, and its place in village heritage.",
        heroImage: "../img/demba-kunda-village-mosque-gambia3.jpg",
        heroAlt: "New Demba Kunda Village third mosque known for its simple structure and central role in daily worship",
        heroCaption: "The third mosque in New Demba Kunda Village, serving as a quiet and familiar worship space.",
        description: "This mosque is a simple yet important gathering place, helping preserve the village’s spiritual and cultural rhythm.",
        importance: "The third mosque plays an active role in daily prayer, community support, and local mentoring for younger worshippers.",
        donationUrl: "#",
        quickInfo: [
            { label: "Type", value: "Mosque" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Daily worship" }
        ],
        gallery: [
            {
                src: "../img/mosques/third mosque1.webp",
                alt: "New Demba Kunda Third Mosque, photograph 1.",
                caption: "New Demba Kunda Third Mosque, photograph 1.",
                loading: "eager"
            },
            {
                src: "../img/mosques/third mosque2.webp",
                alt: "New Demba Kunda Third Mosque, photograph 2.",
                caption: "New Demba Kunda Third Mosque, photograph 2.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/third mosque3.webp",
                alt: "New Demba Kunda Third Mosque, photograph 3.",
                caption: "New Demba Kunda Third Mosque, photograph 3.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/third mosque4.webp",
                alt: "New Demba Kunda Third Mosque, photograph 4.",
                caption: "New Demba Kunda Third Mosque, photograph 4.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/third mosque5.webp",
                alt: "New Demba Kunda Third Mosque, photograph 5.",
                caption: "New Demba Kunda Third Mosque, photograph 5.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/third mosque6.webp",
                alt: "New Demba Kunda Third Mosque, photograph 6.",
                caption: "New Demba Kunda Third Mosque, photograph 6.",
                loading: "lazy"
            },
            {
                src: "../img/mosques/third mosque7.webp",
                alt: "New Demba Kunda Third Mosque, photograph 7.",
                caption: "New Demba Kunda Third Mosque, photograph 7.",
                loading: "lazy"
            }
        ]
    },
    "first-arabic-school": {
        title: "First Arabic School",
        category: "Education",
        intro: "A traditional Arabic school focused on Quranic lessons and foundational Islamic education for the village youth.",
        metaDescription: "Visit the First Arabic School in New Demba Kunda, view its gallery, and learn its role in village learning.",
        heroImage: "../img/schools/Al-Salafiya2.webp",
        heroAlt: "New Demba Kunda Village Arabic school teaching Quranic studies and traditional Islamic education",
        heroCaption: "The first Arabic school in the village, a center for Quranic learning and cultural study.",
        description: "This school is dedicated to Arabic and religious education, helping village children learn the Quran and traditional values.",
        importance: "The school preserves important community knowledge by training young learners in language, faith, and local traditions.",
        donationUrl: "#",
        quickInfo: [
            { label: "Type", value: "Arabic School" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Quranic education" }
        ],
        gallery: firstArabicSchoolMedia.map(function (src, index) {
            return {
                src: src,
                alt: "First Arabic School photograph " + (index + 1) + ".",
                caption: "First Arabic School photograph " + (index + 1) + ".",
                loading: index === 0 ? "eager" : "lazy"
            };
        })
    },
    "english-school": {
        title: "English School",
        category: "Education",
        intro: "A local English school offering modern primary learning for children throughout New Demba Kunda Village.",
        metaDescription: "Discover the English School in New Demba Kunda Village with gallery photos and community importance.",
        heroImage: "../img/schools/english-school5.webp",
        heroAlt: "New Demba Kunda Village English primary school providing modern education for local children",
        heroCaption: "The village English school, supporting local children with academic learning and life skills.",
        description: "This English school supports the village’s next generation by offering classroom learning and foundational education.",
        importance: "The school is important for opening new opportunities and helping local children prepare for a changing future.",
        donationUrl: "#",
        quickInfo: [
            { label: "Type", value: "English School" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Primary education" }
        ],
        gallery: englishSchoolMedia.map(function (src, index) {
            return {
                src: src,
                alt: "English School photograph " + (index + 1) + ".",
                caption: "English School photograph " + (index + 1) + ".",
                loading: index === 0 ? "eager" : "lazy"
            };
        })
    },
    "second-arabic-school": {
        title: "Second Arabic School",
        category: "Education",
        intro: "A second Arabic school that continues the village’s tradition of Islamic learning and advanced study.",
        metaDescription: "Explore the Second Arabic School of New Demba Kunda Village, with gallery images and community details.",
        heroImage: "../img/schools/karahebrahimaarabic.webp",
        heroAlt: "New Demba Kunda Village second Arabic school focused on advanced Islamic learning and community teaching",
        heroCaption: "The second Arabic school, a place for deeper Quranic study and community religious education.",
        description: "This second Arabic school supports learners who want to continue Arabic language study and deepen their religious knowledge.",
        importance: "The school enriches village heritage by preserving advanced learning practices and cultural teachings.",
        donationUrl: "#",
        quickInfo: [
            { label: "Type", value: "Arabic School" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Advanced study" }
        ],
        gallery: [
            {
                src: "../img/schools/karahebrahimaarabic.webp",
                alt: "The Second Arabic School in New Demba Kunda Village.",
                caption: "The Second Arabic School in New Demba Kunda Village.",
                loading: "eager"
            },
            {
                src: "../img/schools/karahebrahimaarabic1.webp",
                alt: "A learning space at the Second Arabic School.",
                caption: "A learning space at the Second Arabic School.",
                loading: "lazy"
            },
            {
                type: "youtube",
                videoId: "v32dhT4h55I",
                thumbnail: "https://i.ytimg.com/vi/v32dhT4h55I/hqdefault.jpg",
                alt: "Official video of the Second Arabic School in New Demba Kunda Village.",
                caption: "Official video of the Second Arabic School in New Demba Kunda Village."
            }
        ]
    },
    "hospital": {
        title: "New Demba Kunda Village Hospital",
        category: "Healthcare",
        intro: "The village hospital is the main local healthcare facility, providing care and support for families in New Demba Kunda.",
        metaDescription: "Visit the New Demba Kunda Village Hospital page to see its gallery and learn about its role in community health.",
        heroImage: "../img/New health center 2 .webp",
        heroAlt: "New Demba Kunda Village hospital building serving as a community health center",
        heroCaption: "The village hospital building, providing health services to local residents.",
        description: "This hospital serves as the primary healthcare center for New Demba Kunda Village, supporting local families with medical care and wellness services.",
        importance: "The hospital plays a vital role in village life, helping residents stay healthy and offering urgent care when it is needed most.",
        donationUrl: "#",
        quickInfo: [
            { label: "Type", value: "Hospital" },
            { label: "Location", value: "New Demba Kunda, The Gambia" },
            { label: "Focus", value: "Community healthcare" }
        ],
        gallery: [
            {
                src: "../img/hospital1.webp",
                alt: "New Demba Kunda Village Hospital, photograph 1.",
                caption: "New Demba Kunda Village Hospital, photograph 1.",
                loading: "eager"
            },
            {
                src: "../img/hospital2.webp",
                alt: "New Demba Kunda Village Hospital, photograph 2.",
                caption: "New Demba Kunda Village Hospital, photograph 2.",
                loading: "lazy"
            },
            {
                src: "../img/hospital3.webp",
                alt: "New Demba Kunda Village Hospital, photograph 3.",
                caption: "New Demba Kunda Village Hospital, photograph 3.",
                loading: "lazy"
            },
            {
                src: "../img/New health center 2 .webp",
                alt: "New Demba Kunda Village Hospital, photograph 4.",
                caption: "New Demba Kunda Village Hospital, photograph 4.",
                loading: "lazy"
            }
        ]
    }
};
