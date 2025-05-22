const DEEPL_API_KEY = '18ff64e9-c1d2-4ae2-9cab-619f49f97ccb:fx';
let originalTexts = new Map();

document.querySelectorAll('#lang-select').forEach(select => {
    select.addEventListener('change', async (e) => {
        const lang = e.target.value;
        if (lang === 'FR') window.location.reload();
        else await translatePage(lang);
    });
});

async function translatePage(targetLang) {
    const elements = getTranslatableElements();
    
    // Stocker les textes originaux
    elements.forEach(el => {
        originalTexts.set(el, el.textContent);
    });

    // Traduction par lots
    const texts = Array.from(elements).map(el => el.textContent);
    const translated = await translateTexts(texts, targetLang);
    
    elements.forEach((el, index) => {
        el.textContent = translated[index];
    });
}

function getTranslatableElements() {
    return document.querySelectorAll('body [data-translate]:not([data-no-translate])');
}

async function translateTexts(texts, targetLang) {
    try {
        const response = await fetch('https://api-free.deepl.com/v2/translate', {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                text: texts,
                target_lang: targetLang,
            }),
        });
        
        const data = await response.json();
        return data.translations.map(t => t.text);
    } catch (error) {
        console.error('Erreur de traduction:', error);
        return texts; // Retourne le texte original en cas d'erreur
    }
}