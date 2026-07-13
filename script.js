// Data storage (simulating local file storage)
const dataStore = {
    laws: [
        {
            id: 1,
            title: "Трудовой кодекс Республики Казахстан",
            type: "Кодекс",
            date: "2015-12-23",
            number: "466-V ЗРК",
            excerpt: "Кодекс регулирует трудовые отношения между работниками и работодателями, устанавливает права и обязанности сторон, порядок заключения и расторжения трудовых договоров.",
            tags: ["Труд", "Кодекс", "Основной"],
            content: "Полный текст Трудового кодекса..."
        },
        {
            id: 2,
            title: "Конституция Республики Казахстан",
            type: "Конституция",
            date: "1995-08-30",
            number: "",
            excerpt: "Основной закон государства, закрепляющий права и свободы граждан, в том числе в сфере труда и социальной защиты.",
            tags: ["Конституция", "Основной", "Права"],
            content: "Полный текст Конституции..."
        },
        {
            id: 3,
            title: "Социальный кодекс Республики Казахстан",
            type: "Кодекс",
            date: "2021-04-28",
            number: "322-VI ЗРК",
            excerpt: "Кодекс регулирует отношения в области социального обеспечения, пенсионного обеспечения, социальной защиты населения.",
            tags: ["Социальный", "Кодекс", "Защита"],
            content: "Полный текст Социального кодекса..."
        }
    ],
    court: [
        {
            id: 1,
            title: "Нормативное постановление Верховного Суда РК",
            type: "Постановление",
            date: "2023-06-15",
            number: "2",
            excerpt: "О практике применения судами законодательства при рассмотрении трудовых споров.",
            tags: ["Труд", "Споры", "Практика"],
            content: "Полный текст постановления..."
        },
        {
            id: 2,
            title: "Обзор судебной практики по делам о незаконном увольнении",
            type: "Обзор",
            date: "2023-03-20",
            number: "",
            excerpt: "Анализ судебных решений по делам о незаконном увольнении работников за 2022-2023 годы.",
            tags: ["Увольнение", "Обзор", "Практика"],
            content: "Полный текст обзора..."
        }
    ],
    explanations: [
        {
            id: 1,
            title: "Разъяснение Министерства труда",
            type: "Разъяснение",
            date: "2023-09-10",
            number: "15-2/1234",
            excerpt: "О порядке расчета отпускных выплат в соответствии с изменениями в трудовом законодательстве.",
            tags: ["Отпуск", "Расчет", "Минтруд"],
            content: "Полный текст разъяснения..."
        },
        {
            id: 2,
            title: "Разъяснение Министерства социальной защиты",
            type: "Разъяснение",
            date: "2023-08-05",
            number: "10-1/987",
            excerpt: "О порядке назначения социальных выплат при потере трудоспособности.",
            tags: ["Социальный", "Выплаты", "Минсоц"],
            content: "Полный текст разъяснения..."
        }
    ],
    favorites: [],
    notes: []
};

// Current state
let currentSection = 'laws';
let selectedDocument = null;

// DOM Elements
const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const navItems = document.querySelectorAll('.nav-item');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSection('laws');
    setupEventListeners();
});

function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            loadSection(section);
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function loadSection(section) {
    currentSection = section;
    contentArea.innerHTML = '';

    switch(section) {
        case 'laws':
            renderLaws();
            break;
        case 'court':
            renderCourt();
            break;
        case 'explanations':
            renderExplanations();
            break;
        case 'documents':
            renderDocuments();
            break;
        case 'favorites':
            renderFavorites();
            break;
        case 'settings':
            renderSettings();
            break;
    }
}

function renderLaws() {
    const aiSection = document.createElement('div');
    aiSection.className = 'ai-analysis';
    aiSection.innerHTML = `
        <h2>🤖 Выберите вопрос для анализа</h2>
        <div class="questions-grid">
            <button class="question-btn" onclick="showAnswer('увольнение')">📋 Как уволить работника?</button>
            <button class="question-btn" onclick="showAnswer('отпуск')">🏖️ Сколько дней отпуска?</button>
            <button class="question-btn" onclick="showAnswer('зарплата')">💰 Как выплачивать зарплату?</button>
            <button class="question-btn" onclick="showAnswer('испытательный')">⏱️ Испытательный срок</button>
            <button class="question-btn" onclick="showAnswer('перерыв')">☕ Перерыв на обед</button>
            <button class="question-btn" onclick="showAnswer('сверхурочные')">⏰ Сверхурочные работы</button>
            <button class="question-btn" onclick="showAnswer('больничный')">🏥 Больничный лист</button>
            <button class="question-btn" onclick="showAnswer('декрет')">👶 Декретный отпуск</button>
        </div>
        <div id="aiResult" class="ai-result">
            <h4>Результат анализа</h4>
            <div id="aiResultContent"></div>
        </div>
    `;
    contentArea.appendChild(aiSection);

    const title = document.createElement('h2');
    title.textContent = '📚 Законодательство';
    title.style.marginBottom = '1.5rem';
    contentArea.appendChild(title);

    dataStore.laws.forEach(law => {
        const card = createDocumentCard(law, 'laws');
        contentArea.appendChild(card);
    });
}

function renderCourt() {
    const title = document.createElement('h2');
    title.textContent = '⚖️ Судебная практика';
    title.style.marginBottom = '1.5rem';
    contentArea.appendChild(title);

    dataStore.court.forEach(doc => {
        const card = createDocumentCard(doc, 'court');
        contentArea.appendChild(card);
    });
}

function renderExplanations() {
    const title = document.createElement('h2');
    title.textContent = '📋 Официальные разъяснения';
    title.style.marginBottom = '1.5rem';
    contentArea.appendChild(title);

    dataStore.explanations.forEach(doc => {
        const card = createDocumentCard(doc, 'explanations');
        contentArea.appendChild(card);
    });
}

function renderDocuments() {
    const title = document.createElement('h2');
    title.textContent = '📄 Документы';
    title.style.marginBottom = '1.5rem';
    contentArea.appendChild(title);

    const uploadArea = document.createElement('div');
    uploadArea.style.cssText = 'background: white; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 3rem; text-align: center; margin-bottom: 2rem; cursor: pointer;';
    uploadArea.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
        <p style="color: #718096; margin-bottom: 1rem;">Перетащите файлы сюда или нажмите для загрузки</p>
        <button style="padding: 0.75rem 1.5rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">Выбрать файл</button>
    `;
    contentArea.appendChild(uploadArea);

    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'Загруженные документы будут отображаться здесь';
    emptyState.style.textAlign = 'center';
    contentArea.appendChild(emptyState);
}

function renderFavorites() {
    const title = document.createElement('h2');
    title.textContent = '⭐ Избранное';
    title.style.marginBottom = '1.5rem';
    contentArea.appendChild(title);

    if (dataStore.favorites.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'У вас пока нет избранных документов';
        emptyState.style.textAlign = 'center';
        contentArea.appendChild(emptyState);
        return;
    }

    dataStore.favorites.forEach(doc => {
        const card = createDocumentCard(doc, 'favorites');
        contentArea.appendChild(card);
    });
}

function renderSettings() {
    const settingsPanel = document.createElement('div');
    settingsPanel.className = 'settings-panel';
    settingsPanel.innerHTML = `
        <h2>⚙️ Настройки</h2>
        
        <div class="settings-group">
            <h3>📥 Обновление данных</h3>
            <button onclick="updateLaws()">Обновить законодательство</button>
            <button onclick="updateCourt()">Обновить судебную практику</button>
            <button onclick="updateExplanations()">Обновить разъяснения</button>
        </div>
        
        <div class="settings-group">
            <h3>🗄️ Управление данными</h3>
            <button class="secondary" onclick="exportData()">Экспорт данных</button>
            <button class="secondary" onclick="importData()">Импорт данных</button>
            <button class="secondary" onclick="clearCache()">Очистить кэш</button>
        </div>
        
        <div class="settings-group">
            <h3>🔍 Настройки поиска</h3>
            <button class="secondary" onclick="reindexData()">Переиндексировать данные</button>
        </div>
        
        <div class="settings-group">
            <h3>🤖 Настройки AI</h3>
            <button class="secondary" onclick="selectModel()">Выбрать модель</button>
            <button class="secondary" onclick="clearAIHistory()">Очистить историю AI</button>
        </div>
    `;
    contentArea.appendChild(settingsPanel);
}

function createDocumentCard(doc, source) {
    const card = document.createElement('div');
    card.className = 'document-card';
    card.innerHTML = `
        <h3>${doc.title}</h3>
        <div class="meta">
            <span>${doc.type}</span>
            ${doc.number ? `<span> • ${doc.number}</span>` : ''}
            <span> • ${doc.date}</span>
        </div>
        <p class="excerpt">${doc.excerpt}</p>
        <div class="tags">
            ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => {
        selectDocument(doc, source);
    });
    
    return card;
}

function selectDocument(doc, source) {
    selectedDocument = doc;
    updateRightPanel(doc, source);
}

function updateRightPanel(doc, source) {
    const relatedArticles = document.getElementById('related-articles');
    const relatedCases = document.getElementById('related-cases');
    const similarDocuments = document.getElementById('similar-documents');

    // Simulate related content
    relatedArticles.innerHTML = `
        <ul style="list-style: none;">
            <li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; cursor: pointer;">Статья 15 - Права работников</li>
            <li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; cursor: pointer;">Статья 23 - Трудовой договор</li>
            <li style="padding: 0.5rem 0; cursor: pointer;">Статья 45 - Расторжение договора</li>
        </ul>
    `;

    relatedCases.innerHTML = `
        <ul style="list-style: none;">
            <li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; cursor: pointer;">Дело №123/2023</li>
            <li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; cursor: pointer;">Дело №456/2023</li>
            <li style="padding: 0.5rem 0; cursor: pointer;">Дело №789/2022</li>
        </ul>
    `;

    similarDocuments.innerHTML = `
        <ul style="list-style: none;">
            <li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; cursor: pointer;">${dataStore.laws[0].title}</li>
            <li style="padding: 0.5rem 0; cursor: pointer;">${dataStore.laws[1].title}</li>
        </ul>
    `;
}

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    const results = [];
    
    // Search in all data sources
    ['laws', 'court', 'explanations'].forEach(source => {
        dataStore[source].forEach(doc => {
            if (doc.title.toLowerCase().includes(query) || 
                doc.excerpt.toLowerCase().includes(query) ||
                doc.tags.some(tag => tag.toLowerCase().includes(query))) {
                results.push({ ...doc, source });
            }
        });
    });

    contentArea.innerHTML = `
        < h2>🔍 Результаты поиска: "${searchInput.value}"</h2>
        <p style="color: #718096; margin-bottom: 1.5rem;">Найдено ${results.length} документов</p>
    `;

    if (results.length === 0) {
        contentArea.innerHTML += `
            <p class="empty-state" style="text-align: center;">По вашему запросу ничего не найдено</p>
        `;
        return;
    }

    results.forEach(doc => {
        const card = createDocumentCard(doc, doc.source);
        contentArea.appendChild(card);
    });
}

function showAnswer(keyword) {
    const resultDiv = document.getElementById('aiResult');
    const resultContent = document.getElementById('aiResultContent');
    
    resultDiv.classList.add('active');
    resultContent.innerHTML = '<p>⏳ Анализируем вопрос...</p>';

    // Knowledge base for common questions
    const knowledgeBase = {
        'увольнение': {
            law: 'Статья 52 Трудового кодекса РК предусматривает следующие основания для расторжения трудового договора по инициативе работодателя: 1) ликвидация организации; 2) сокращение численности или штата работников; 3) несоответствие работника занимаемой должности; 4) неоднократное неисполнение работником без уважительных причин трудовых обязанностей; 5) однократное грубое нарушение трудовых обязанностей; 6) прогул; 7) появление на работе в состоянии алкогольного опьянения.',
            court: 'Нормативное постановление Верховного Суда РК №2 от 15.06.2023 разъясняет, что бремя доказывания законности увольнения лежит на работодателе. Суды проверяют соблюдение порядка увольнения, наличие предусмотренных законом оснований и надлежащее уведомление работника.',
            explanation: 'Министерство труда и социальной защиты населения в разъяснении от 10.09.2023 указывает, что при увольнении по инициативе работодателя необходимо соблюсти процедуру предварительного уведомления работника не менее чем за 1 месяц (за исключением случаев прогулов и грубых нарушений).',
            related: 'Статья 52, Статья 54, Статья 58 Трудового кодекса РК',
            conclusion: 'При увольнении необходимо: 1) документально зафиксировать нарушение; 2) соблюсти порядок уведомления; 3) выплатить все причитающиеся суммы; 4) выдать трудовую книжку. Нарушение процедуры может привести к восстановлению работника на работе.'
        },
        'отпуск': {
            law: 'Статья 88 Трудового кодекса РК устанавливает право работника на ежегодный оплачиваемый отпуск продолжительностью не менее 24 календарных дней. Статья 90 предусматривает дополнительные отпуска для работников с вредными условиями труда, инвалидов и других категорий.',
            court: 'Судебная практика показывает, что отказ в предоставлении отпуска является нарушением трудовых прав. Работодатель обязан предоставлять отпуск в соответствии с графиком отпусков, утвержденным не позднее 15 декабря текущего года.',
            explanation: 'Министерство труда разъясняет, что отпускные должны быть выплачены не позднее чем за три календарных дня до начала отпуска. При расчете отпускных учитывается среднедневной заработок за последние 12 месяцев.',
            related: 'Статья 88, Статья 90, Статья 92 Трудового кодекса РК',
            conclusion: 'Работник имеет право на отпуск не менее 24 дней в год. Отпускные выплачиваются за 3 дня до отпуска. Отказ в отпуске незаконен. При увольнении работнику выплачивается компенсация за неиспользованный отпуск.'
        },
        'зарплата': {
            law: 'Статья 106 Трудового кодекса РК гарантирует работнику получение заработной платы не реже одного раза в месяц. Месячная заработная плата работника не должна быть ниже минимального размера заработной платы, установленного законом.',
            court: 'Верховный Суд РК в постановлении №3 от 20.03.2023 указал, что задержка выплаты заработной платы более чем на один месяц является основанием для расторжения трудового договора по инициативе работника (статья 51 ТК РК).',
            explanation: 'Министерство труда разъясняет, что при задержке выплаты зарплаты работодатель обязан выплатить работнику не только задолженность, но и компенсацию в размере не менее 1% от суммы задолженности за каждый день задержки.',
            related: 'Статья 106, Статья 107, Статья 108 Трудового кодекса РК',
            conclusion: 'Зарплата должна выплачиваться ежемесячно не ниже МЗП. Задержка зарплаты более месяца дает право на увольнение по собственному желанию с выплатой компенсации. Работодатель обязан выплатить компенсацию за задержку.'
        },
        'испытательный': {
            law: 'Статья 32 Трудового кодекса РК устанавливает, что при заключении трудового договора может быть обусловлено соглашением сторон испытание работника в целях проверки его соответствия поручаемой работе. Срок испытания не может превышать 3 месяцев.',
            court: 'Судебная практика показывает, что отказ в приеме на работу после успешного прохождения испытательного срока без письменного обоснования является незаконным. Бремя доказывания несоответствия работника лежит на работодателе.',
            explanation: 'Министерство труда разъясняет, что испытательный срок не устанавливается для: беременных женщин, женщин, имеющих детей в возрасте до полутора лет, лиц до 18 лет, лиц, получивших среднее, средне специальное или высшее образование и впервые поступающих на работу.',
            related: 'Статья 32, Статья 33, Статья 34 Трудового кодекса РК',
            conclusion: 'Испытательный срок максимум 3 месяца. Не устанавливается для беременных, матерей с детьми до 1.5 лет, несовершеннолетних и выпускников. При неудовлетворительном результате работодатель предупреждает за 3 дня.'
        },
        'перерыв': {
            law: 'Статья 75 Трудового кодекса РК устанавливает, что работнику предоставляется перерыв для отдыха и питания продолжительностью не более одного часа. Перерыв не включается в рабочее время.',
            court: 'Судебная практика показывает, что непредоставление перерыва для отдыха и питания является нарушением трудового законодательства. Работодатель обязан обеспечить условия для приема пищи.',
            explanation: 'Министерство труда разъясняет, что время начала и окончания перерыва определяется правилами внутреннего трудового распорядка или трудовым договором. При работе более 4 часов подряд перерыв обязателен.',
            related: 'Статья 75, Статья 76, Статья 77 Трудового кодекса РК',
            conclusion: 'Перерыв для отдыха и питания - не более 1 часа, не включается в рабочее время. Обязателен при работе более 4 часов подряд. Время перерыва определяется правилами внутреннего распорядка.'
        },
        'сверхурочные': {
            law: 'Статья 78 Трудового кодекса РК устанавливает, что сверхурочные работы допускаются только с письменного согласия работника. Продолжительность сверхурочных работ не должна превышать 4 часов в течение двух дней подряд и 120 часов в год.',
            court: 'Верховный Суд РК указал, что работа сверх установленной нормы без согласия работника и без оплаты в повышенном размере является незаконной. Работник вправе отказаться от сверхурочной работы без уважительных причин.',
            explanation: 'Министерство труда разъясняет, что оплата сверхурочных работ производится в повышенном размере: первые 2 часа - не менее чем в 1,5 размере, последующие часы - не менее чем в 2 размере.',
            related: 'Статья 78, Статья 79, Статья 80 Трудового кодекса РК',
            conclusion: 'Сверхурочные только с письменного согласия. Максимум 4 часа за 2 дня, 120 часов в год. Оплата: первые 2 часа - 1.5x, далее - 2x. Отказ без уважительных причин допустим.'
        },
        'больничный': {
            law: 'Статья 96 Трудового кодекса РК гарантирует работнику временное освобождение от работы в случае болезни или травмы на основании листа нетрудоспособности. За период нетрудоспособности выплачивается социальное пособие.',
            court: 'Судебная практика показывает, что увольнение работника во время болезни по инициативе работодателя является незаконным, за исключением случаев ликвидации организации.',
            explanation: 'Министерство социальной защиты разъясняет, что размер пособия по временной нетрудоспособности зависит от стажа работы: до 5 лет - 60%, от 5 до 10 лет - 80%, свыше 10 лет - 100% от среднего заработка.',
            related: 'Статья 96, Статья 97, Статья 98 Трудового кодекса РК; Социальный кодекс РК',
            conclusion: 'Больничный оплачивается на основе листа нетрудоспособности. Размер зависит от стажа: до 5 лет - 60%, 5-10 лет - 80%, свыше 10 лет - 100%. Увольнение во время болезни запрещено.'
        },
        'декрет': {
            law: 'Статья 100 Трудового кодекса РК предоставляет женщинам отпуск по беременности и родам продолжительностью 126 календарных дней (70 дней до родов и 56 дней после). При осложненных родах - 140 дней, при рождении двух и более детей - 164 дня.',
            court: 'Судебная практика показывает, что увольнение беременных женщин или женщин в отпуске по беременности и родам по инициативе работодателя запрещено во всех случаях.',
            explanation: 'Министерство социальной защиты разъясняет, что пособие по беременности и родам выплачивается в размере 100% среднего заработка за весь период отпуска. Работодатель обязан сохранить рабочее место.',
            related: 'Статья 100, Статья 101 Трудового кодекса РК; Социальный кодекс РК',
            conclusion: 'Декретный отпуск: 126 дней (70 до + 56 после), при осложнениях - 140, при многоплодии - 164. Пособие 100% от зарплаты. Увольнение запрещено. Место сохраняется.'
        }
    };

    // Get the answer for the selected keyword
    const answer = knowledgeBase[keyword];

    // Simulate AI analysis with realistic response
    setTimeout(() => {
        resultContent.innerHTML = `
            <div class="result-section">
                <span class="result-label">📜 Норма закона:</span>
                <p>${answer.law}</p>
            </div>
            <div class="result-section">
                <span class="result-label">⚖️ Судебная практика:</span>
                <p>${answer.court}</p>
            </div>
            <div class="result-section">
                <span class="result-label">📋 Официальные разъяснения:</span>
                <p>${answer.explanation}</p>
            </div>
            <div class="result-section">
                <span class="result-label">🔗 Связанные статьи:</span>
                <p>${answer.related}</p>
            </div>
            <div class="result-section">
                <span class="result-label">💡 Практический вывод:</span>
                <p>${answer.conclusion}</p>
            </div>
        `;
    }, 1500);
}

// Settings functions (placeholders)
function updateLaws() {
    alert('Обновление законодательства...\nВ реальной реализации здесь будет скачивание и индексация документов.');
}

function updateCourt() {
    alert('Обновление судебной практики...\nВ реальной реализации здесь будет скачивание и индексация документов.');
}

function updateExplanations() {
    alert('Обновление разъяснений...\nВ реальной реализации здесь будет скачивание и индексация документов.');
}

function exportData() {
    alert('Экспорт данных...\nВ реальной реализации здесь будет экспорт всех данных в JSON.');
}

function importData() {
    alert('Импорт данных...\nВ реальной реализации здесь будет импорт данных из JSON файла.');
}

function clearCache() {
    if (confirm('Вы уверены, что хотите очистить кэш?')) {
        alert('Кэш очищен');
    }
}

function reindexData() {
    alert('Переиндексация данных...\nВ реальной реализации здесь будет переиндексация всех документов.');
}

function selectModel() {
    alert('Выбор модели...\nВ реальной реализации здесь будет выбор локальной LLM модели.');
}

function clearAIHistory() {
    if (confirm('Вы уверены, что хотите очистить историю AI?')) {
        alert('История AI очищена');
    }
}
