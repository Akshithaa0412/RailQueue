/* =========================================================
   RAILQUEUE — CORE LOGIC & INTERACTIVE SUITE
   All data, bookings, PNRs, transactions, and outcomes are synthetic.
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function daysSince(dateString) {
  const start = new Date(`${dateString}T00:00:00`);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const difference = now - start;
  return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateComplaintId() {
  return `RQ-${randomNumber(100000, 999999)}`;
}

/* Toast Notifications */
function showToast(message, icon = "✓") {
  const container = $("#toastContainer");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s, transform 0.3s";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* =========================================================
   LOCALIZATION & MULTI-LANGUAGE SYSTEM
   ========================================================= */

const translations = {
  en: {
    heroEyebrow: "INDEPENDENT RAIL EXPERIENCE LAYER",
    heroTitle: "Tatkal should feel like a queue, not a lottery.",
    heroSub: "RailQueue makes the journey more transparent with visible queue position, deterministic mock PNR checks, payment evidence, refund tracking and correctly routed grievances.",
    heroCta: "Check Tatkal readiness →",
    heroNote: "Prototype only. No real bookings, payments, OTPs or personal data.",
    boardLabel: "SIMULATED LIVE TELEMETRY",
    boardLive: "DEMO LIVE",
    pageIntro: "Five small experience layers designed around one principle: show the user what is happening.",
    readinessEyebrow: "TATKAL READINESS ASSISTANT",
    readinessTitle: "Know when the window opens. Know where you stand.",
    readinessDesc: "Prepare your trip before the simulated Tatkal window opens. Once the countdown reaches zero, enter a visible synthetic queue instead of an opaque pass/fail flow.",
    passengerName: "Passenger name",
    fromStation: "From station",
    toStation: "To station",
    travelDate: "Travel date",
    startCountdown: "Start simulated countdown",
    windowOpens: "SIMULATED WINDOW OPENS IN",
    enterQueue: "Enter the simulated queue",
    yourPosition: "YOUR QUEUE POSITION",
    estimatedWait: "EST. WAIT",
    queueState: "QUEUE STATE",
    queueNote: "Mock fairness logic: one synthetic position is assigned from 1–40, then the outcome is determined deterministically by that position.",
    pnrEyebrow: "PNR STATUS CHECKER",
    pnrTitle: "A status view independent of booking-site uptime.",
    pnrDesc: "Enter any 10-digit mock PNR. The same PNR always returns the same synthetic result, making the demo reproducible for judges.",
    pnrLabel: "10-digit PNR",
    checkPnr: "Check mock PNR",
    productionNoteTitle: "Production note",
    productionNote: "A real implementation would query NTES or another authorised/public rail data source. This prototype never contacts a rail booking system.",
    paymentEyebrow: "PAYMENT FAILURE SAFETY NET",
    paymentTitle: "Turn a failed payment into organised evidence.",
    paymentDesc: "Log the transaction/UTR and amount locally so a user has a clear record when raising a refund dispute.",
    utrLabel: "Transaction / UTR ID",
    amountLabel: "Amount (₹)",
    logTransaction: "Log failed transaction",
    noTransactions: "No synthetic transactions logged yet.",
    localStorageNote: "Stored only in this browser using localStorage. No payment provider is contacted.",
    refundEyebrow: "REFUND TRACKER",
    refundTitle: "Know how long your refund has been waiting.",
    refundDesc: "Track a cancellation date locally. After seven days, the prototype flags the case for escalation.",
    refundPnrLabel: "PNR",
    cancelDateLabel: "Cancellation date",
    trackRefund: "Track refund",
    noRefunds: "No synthetic refunds being tracked yet.",
    grievanceEyebrow: "ONE-TAP GRIEVANCE FILER",
    grievanceTitle: "Point the problem at the right support channel.",
    grievanceDesc: "Generate a synthetic complaint ID and show the channel that would be appropriate in a production workflow.",
    issueLabel: "Issue category",
    issuePayment: "Payment deducted / no ticket",
    issueRefund: "Refund delayed (> 7 days)",
    issueLogin: "Login issue / session timeout",
    issueOther: "Other / Service Feedback",
    optionalPnr: "PNR (optional)",
    fileGrievance: "Generate mock grievance",
    complaintId: "MOCK COMPLAINT ID",
    wouldRoute: "WOULD ROUTE TO",
    finalTitle: "Transparency is a product feature.",
    finalDesc: "Every state shown here is synthetic, but the design principle is real: explain what happened and what the user can do next.",
    backTop: "Back to top ↑",
    invalidPnr: "Please enter exactly 10 digits.",
    queueJoining: "Joining synthetic queue…",
    queueComplete: "Queue simulation complete",
    queueOpen: "OPEN",
    queueReady: "READY",
    queueQueued: "QUEUED",
    queueWaiting: "WAITING",
    queueConfirmed: "CONFIRMED",
    queueRac: "RAC",
    queueWaitlisted: "WAITLISTED",
    evidenceLogged: "EVIDENCE LOGGED",
    overdue: "OVERDUE — FILE GRIEVANCE"
  },

  hi: {
    heroEyebrow: "स्वतंत्र रेल अनुभव प्रोटोटाइप",
    heroTitle: "Tatkal को लॉटरी नहीं, एक पारदर्शी कतार जैसा महसूस होना चाहिए।",
    heroSub: "RailQueue कतार की स्थिति, नकली PNR जांच, भुगतान प्रमाण, रिफंड ट्रैकिंग और सही शिकायत चैनल के जरिए यात्रा अनुभव को अधिक पारदर्शी बनाता है।",
    heroCta: "Tatkal readiness देखें →",
    heroNote: "केवल प्रोटोटाइप। कोई वास्तविक बुकिंग, भुगतान, OTP या व्यक्तिगत डेटा नहीं।",
    boardLabel: "सिम्युलेटेड लाइव टेलीमेट्री",
    boardLive: "डेमो लाइव",
    pageIntro: "पांच छोटे अनुभव स्तर, एक सिद्धांत के साथ: उपयोगकर्ता को बताएं कि क्या हो रहा है।",
    readinessEyebrow: "TATKAL तैयारी सहायक",
    readinessTitle: "विंडो कब खुलेगी और आप कतार में कहां हैं, जानें।",
    readinessDesc: "सिम्युलेटेड Tatkal विंडो खुलने से पहले अपनी यात्रा तैयार करें। Countdown खत्म होने पर एक पारदर्शी नकली कतार में प्रवेश करें।",
    passengerName: "यात्री का नाम",
    fromStation: "कहां से",
    toStation: "कहां तक",
    travelDate: "यात्रा की तारीख",
    startCountdown: "सिम्युलेटेड Countdown शुरू करें",
    windowOpens: "सिम्युलेटेड विंडो खुलेगी",
    enterQueue: "सिम्युलेटेड कतार में प्रवेश करें",
    yourPosition: "आपकी कतार स्थिति",
    estimatedWait: "अनुमानित प्रतीक्षा",
    queueState: "कतार स्थिति",
    queueNote: "नकली fairness logic: 1–40 के बीच एक synthetic position दी जाती है और परिणाम उसी position के आधार पर तय होता है।",
    pnrEyebrow: "PNR स्थिति जांच",
    pnrTitle: "बुकिंग साइट के uptime से स्वतंत्र स्थिति जांच।",
    pnrDesc: "कोई भी 10 अंकों का नकली PNR दर्ज करें। एक ही PNR हमेशा एक ही synthetic परिणाम देगा।",
    pnrLabel: "10 अंकों का PNR",
    checkPnr: "नकली PNR जांचें",
    productionNoteTitle: "Production note",
    productionNote: "वास्तविक संस्करण NTES या किसी अधिकृत/public rail data source से जानकारी लेगा। यह prototype किसी rail booking system से संपर्क नहीं करता।",
    paymentEyebrow: "भुगतान विफलता सुरक्षा",
    paymentTitle: "असफल भुगतान को व्यवस्थित प्रमाण में बदलें।",
    paymentDesc: "Transaction/UTR और राशि को स्थानीय रूप से दर्ज करें ताकि refund dispute के समय आपके पास स्पष्ट रिकॉर्ड हो।",
    utrLabel: "Transaction / UTR ID",
    amountLabel: "राशि (₹)",
    logTransaction: "विफल भुगतान दर्ज करें",
    noTransactions: "अभी कोई synthetic transaction दर्ज नहीं है।",
    localStorageNote: "डेटा केवल इस browser के localStorage में रखा जाता है। कोई payment provider संपर्क नहीं किया जाता।",
    refundEyebrow: "रिफंड ट्रैकर",
    refundTitle: "जानें आपका रिफंड कितने समय से लंबित है।",
    refundDesc: "Cancellation date को स्थानीय रूप से ट्रैक करें। सात दिनों के बाद prototype escalation के लिए मामला flag करता है।",
    refundPnrLabel: "PNR",
    cancelDateLabel: "Cancellation date",
    trackRefund: "रिफंड ट्रैक करें",
    noRefunds: "अभी कोई synthetic refund ट्रैक नहीं हो रहा है।",
    grievanceEyebrow: "एक-टैप शिकायत",
    grievanceTitle: "समस्या को सही support channel तक पहुंचाएं।",
    grievanceDesc: "एक synthetic complaint ID बनाएं और देखें कि production workflow में शिकायत किस channel पर जाएगी।",
    issueLabel: "समस्या की श्रेणी",
    issuePayment: "पैसे कटे / टिकट नहीं मिला",
    issueRefund: "रिफंड में देरी",
    issueLogin: "Login समस्या",
    issueOther: "अन्य",
    optionalPnr: "PNR (वैकल्पिक)",
    fileGrievance: "नकली शिकायत बनाएं",
    complaintId: "नकली शिकायत ID",
    wouldRoute: "कहां भेजी जाएगी",
    finalTitle: "पारदर्शिता भी एक product feature है।",
    finalDesc: "यहां दिखाया गया हर state synthetic है, लेकिन सिद्धांत वास्तविक है: बताएं कि क्या हुआ और उपयोगकर्ता आगे क्या कर सकता है।",
    backTop: "ऊपर जाएं ↑",
    invalidPnr: "कृपया ठीक 10 अंक दर्ज करें।",
    queueJoining: "सिंथेटिक कतार में शामिल हो रहे हैं…",
    queueComplete: "कतार सिमुलेशन पूरा हुआ",
    queueOpen: "खुला",
    queueReady: "तैयार",
    queueQueued: "कतार में",
    queueWaiting: "प्रतीक्षा",
    queueConfirmed: "पुष्टि",
    queueRac: "RAC",
    queueWaitlisted: "वेटलिस्ट",
    evidenceLogged: "प्रमाण दर्ज",
    overdue: "देरी — शिकायत दर्ज करें"
  },

  ta: {
    heroEyebrow: "சுயாதீன ரயில் அனுபவ முன்மாதிரி",
    heroTitle: "Tatkal ஒரு லாட்டரி போல அல்ல, ஒரு வெளிப்படையான வரிசை போல இருக்க வேண்டும்.",
    heroSub: "RailQueue வரிசை நிலை, போலி PNR சரிபார்ப்பு, கட்டண ஆதாரம், பணத்தைத் திரும்பப் பெறும் கண்காணிப்பு மற்றும் சரியான புகார் வழிமுறை மூலம் அனுபவத்தை வெளிப்படையாக்குகிறது.",
    heroCta: "Tatkal தயார்நிலையைப் பார்க்க →",
    heroNote: "முன்மாதிரி மட்டுமே. உண்மையான முன்பதிவு, பணம், OTP அல்லது தனிப்பட்ட தரவு இல்லை.",
    boardLabel: "செயற்கை நேரடி டெலிமெட்ரி",
    boardLive: "டெமோ நேரலை",
    pageIntro: "ஒரே கொள்கையை அடிப்படையாகக் கொண்ட ஐந்து அனுபவ அடுக்குகள்: என்ன நடக்கிறது என்பதை பயனருக்குக் காட்டுங்கள்.",
    readinessEyebrow: "TATKAL தயார்நிலை உதவியாளர்",
    readinessTitle: "சாளரம் எப்போது திறக்கும், நீங்கள் எங்கு இருக்கிறீர்கள் என்பதை அறியுங்கள்.",
    readinessDesc: "செயற்கை Tatkal சாளரம் திறப்பதற்கு முன் உங்கள் பயணத்தைத் தயாரிக்கவும். Countdown முடிந்ததும் வெளிப்படையான செயற்கை வரிசையில் சேருங்கள்.",
    passengerName: "பயணி பெயர்",
    fromStation: "புறப்படும் நிலையம்",
    toStation: "செல்லும் நிலையம்",
    travelDate: "பயண தேதி",
    startCountdown: "செயற்கை Countdown தொடங்கு",
    windowOpens: "செயற்கை சாளரம் திறக்க இன்னும்",
    enterQueue: "செயற்கை வரிசையில் சேரவும்",
    yourPosition: "உங்கள் வரிசை நிலை",
    estimatedWait: "மதிப்பிடப்பட்ட காத்திருப்பு",
    queueState: "வரிசை நிலை",
    queueNote: "செயற்கை fairness logic: 1–40 இடையே ஒரு நிலை வழங்கப்பட்டு, முடிவு அதைப் பொறுத்தே தீர்மானிக்கப்படுகிறது.",
    pnrEyebrow: "PNR நிலை சரிபார்ப்பு",
    pnrTitle: "முன்பதிவு தளத்தின் uptime-இலிருந்து சுயாதீனமான நிலை பார்வை.",
    pnrDesc: "எந்த 10 இலக்க போலி PNR-ஐயும் உள்ளிடவும். ஒரே PNR எப்போதும் ஒரே செயற்கை முடிவை வழங்கும்.",
    pnrLabel: "10 இலக்க PNR",
    checkPnr: "போலி PNR சரிபார்",
    productionNoteTitle: "Production குறிப்பு",
    productionNote: "உண்மையான பதிப்பு NTES அல்லது அங்கீகரிக்கப்பட்ட ரயில் தரவு மூலத்திலிருந்து தகவலைப் பெறும். இந்த முன்மாதிரி எந்த ரயில் முன்பதிவு அமைப்பையும் தொடர்பு கொள்ளாது.",
    paymentEyebrow: "கட்டண தோல்வி பாதுகாப்பு",
    paymentTitle: "தோல்வியடைந்த கட்டணத்தை ஒழுங்கான ஆதாரமாக மாற்றுங்கள்.",
    paymentDesc: "Refund dispute-க்கு தேவையான பதிவாக Transaction/UTR மற்றும் தொகையை உள்ளூரில் சேமிக்கவும்.",
    utrLabel: "Transaction / UTR ID",
    amountLabel: "தொகை (₹)",
    logTransaction: "தோல்வியடைந்த கட்டணத்தை பதிவு செய்",
    noTransactions: "இன்னும் செயற்கை பரிவர்த்தனைகள் எதுவும் இல்லை.",
    localStorageNote: "தரவு இந்த browser-இன் localStorage-ல் மட்டுமே சேமிக்கப்படுகிறது. எந்த payment provider-மும் தொடர்பு கொள்ளப்படாது.",
    refundEyebrow: "ரீஃபண்ட் கண்காணிப்பு",
    refundTitle: "உங்கள் ரீஃபண்ட் எவ்வளவு காலமாக காத்திருக்கிறது என்பதை அறியுங்கள்.",
    refundDesc: "Cancellation date-ஐ உள்ளூரில் கண்காணிக்கவும். ஏழு நாட்களுக்குப் பிறகு முன்மாதிரி escalation-ஐக் குறிக்கும்.",
    refundPnrLabel: "PNR",
    cancelDateLabel: "ரத்து தேதி",
    trackRefund: "ரீஃபண்ட் கண்காணி",
    noRefunds: "இன்னும் செயற்கை ரீஃபண்ட்கள் எதுவும் கண்காணிக்கப்படவில்லை.",
    grievanceEyebrow: "ஒரே-தொடுதல் புகார்",
    grievanceTitle: "பிரச்சினையை சரியான ஆதரவு சேனலுக்கு அனுப்புங்கள்.",
    grievanceDesc: "செயற்கை complaint ID உருவாக்கி, production workflow-ல் அது செல்ல வேண்டிய சேனலைக் காணுங்கள்.",
    issueLabel: "பிரச்சினை வகை",
    issuePayment: "பணம் கழிக்கப்பட்டது / டிக்கெட் இல்லை",
    issueRefund: "ரீஃபண்ட் தாமதம்",
    issueLogin: "Login பிரச்சினை",
    issueOther: "மற்றவை",
    optionalPnr: "PNR (விருப்பம்)",
    fileGrievance: "போலி புகாரை உருவாக்கு",
    complaintId: "போலி புகார் ID",
    wouldRoute: "செல்லும் சேனல்",
    finalTitle: "வெளிப்படைத்தன்மையும் ஒரு product feature.",
    finalDesc: "இங்கு காட்டப்படும் ஒவ்வொரு நிலையும் செயற்கையானது. ஆனால் கொள்கை உண்மையானது: என்ன நடந்தது, அடுத்து என்ன செய்யலாம் என்பதை விளக்குங்கள்.",
    backTop: "மேலே செல்ல ↑",
    invalidPnr: "சரியாக 10 இலக்கங்களை உள்ளிடவும்.",
    queueJoining: "செயற்கை வரிசையில் இணைகிறது…",
    queueComplete: "வரிசை simulation முடிந்தது",
    queueOpen: "திறந்தது",
    queueReady: "தயார்",
    queueQueued: "வரிசையில்",
    queueWaiting: "காத்திருக்கிறது",
    queueConfirmed: "உறுதி",
    queueRac: "RAC",
    queueWaitlisted: "காத்திருப்பு பட்டியல்",
    evidenceLogged: "ஆதாரம் பதிவு செய்யப்பட்டது",
    overdue: "தாமதம் — புகார் பதிவு செய்யவும்"
  },

  te: {
    heroEyebrow: "స్వతంత్ర రైలు అనుభవ ప్రోటోటైప్",
    heroTitle: "Tatkal లాటరీలా కాకుండా పారదర్శకమైన క్యూలా అనిపించాలి.",
    heroSub: "RailQueue క్యూ స్థానం, మాక్ PNR తనిఖీలు, చెల్లింపు ఆధారం, రీఫండ్ ట్రాకింగ్ మరియు సరైన ఫిర్యాదు మార్గంతో అనుభవాన్ని పారదర్శకంగా చేస్తుంది.",
    heroCta: "Tatkal సిద్ధతను చూడండి →",
    heroNote: "ప్రోటోటైప్ మాత్రమే. నిజమైన బుకింగ్, చెల్లింపులు, OTPలు లేదా వ్యక్తిగత డేటా లేవు.",
    boardLabel: "సిమ్యులేటెడ్ లైవ్ టెలిమెట్రీ",
    boardLive: "డెమో లైవ్",
    pageIntro: "ఒక సూత్రం చుట్టూ రూపొందించిన ఐదు అనుభవ స్థాయిలు: ఏమి జరుగుతుందో వినియోగదారుడికి చూపండి.",
    readinessEyebrow: "TATKAL సిద్ధత సహాయకుడు",
    readinessTitle: "విండో ఎప్పుడు తెరుచుకుంటుందో, మీరు ఎక్కడ ఉన్నారో తెలుసుకోండి.",
    readinessDesc: "సిమ్యులేటెడ్ Tatkal విండో తెరవడానికి ముందే మీ ప్రయాణాన్ని సిద్ధం చేసుకోండి. Countdown పూర్తయ్యాక పారదర్శకమైన సింథటిక్ క్యూలో చేరండి.",
    passengerName: "ప్రయాణికుడి పేరు",
    fromStation: "ప్రారంభ స్టేషన్",
    toStation: "గమ్య స్టేషన్",
    travelDate: "ప్రయాణ తేదీ",
    startCountdown: "సిమ్యులేటెడ్ Countdown ప్రారంభించండి",
    windowOpens: "సిమ్యులేటెడ్ విండో తెరుచుకోవడానికి",
    enterQueue: "సిమ్యులేటెడ్ క్యూలో చేరండి",
    yourPosition: "మీ క్యూ స్థానం",
    estimatedWait: "అంచనా వేచి ఉండే సమయం",
    queueState: "క్యూ స్థితి",
    queueNote: "సింథటిక్ fairness logic: 1–40 మధ్య ఒక స్థానం కేటాయించబడుతుంది మరియు ఫలితం అదే స్థానంపై ఆధారపడి ఉంటుంది.",
    pnrEyebrow: "PNR స్థితి తనిఖీ",
    pnrTitle: "బుకింగ్ సైట్ uptime నుండి స్వతంత్ర స్థితి వీక్షణ.",
    pnrDesc: "ఏదైనా 10 అంకెల మాక్ PNR నమోదు చేయండి. ఒకే PNR ఎల్లప్పుడూ ఒకే సింథటిక్ ఫలితాన్ని ఇస్తుంది.",
    pnrLabel: "10 అంకెల PNR",
    checkPnr: "మాక్ PNR తనిఖీ చేయండి",
    productionNoteTitle: "Production గమనిక",
    productionNote: "నిజమైన వెర్షన్ NTES లేదా అధీకృత రైలు డేటా మూలాన్ని ఉపయోగిస్తుంది. ఈ ప్రోటోటైప్ ఏ రైలు బుకింగ్ వ్యవస్థను సంప్రదించదు.",
    paymentEyebrow: "చెల్లింపు వైఫల్య భద్రత",
    paymentTitle: "విఫలమైన చెల్లింపును క్రమబద్ధమైన ఆధారంగా మార్చండి.",
    paymentDesc: "Refund dispute సమయంలో స్పష్టమైన రికార్డు కోసం Transaction/UTR మరియు మొత్తాన్ని స్థానికంగా నమోదు చేయండి.",
    utrLabel: "Transaction / UTR ID",
    amountLabel: "మొత్తం (₹)",
    logTransaction: "విఫలమైన చెల్లింపును నమోదు చేయండి",
    noTransactions: "ఇంకా సింథటిక్ లావాదేవీలు నమోదు కాలేదు.",
    localStorageNote: "డేటా ఈ browser localStorageలో మాత్రమే నిల్వ చేయబడుతుంది. ఏ payment providerనూ సంప్రదించదు.",
    refundEyebrow: "రీఫండ్ ట్రాకర్",
    refundTitle: "మీ రీఫండ్ ఎంతకాలంగా వేచి ఉందో తెలుసుకోండి.",
    refundDesc: "Cancellation dateను స్థానికంగా ట్రాక్ చేయండి. ఏడు రోజుల తర్వాత ప్రోటోటైప్ escalationను సూచిస్తుంది.",
    refundPnrLabel: "PNR",
    cancelDateLabel: "రద్దు తేదీ",
    trackRefund: "రీఫండ్ ట్రాక్ చేయండి",
    noRefunds: "ఇంకా సింథటిక్ రీఫండ్‌లు ట్రాక్ చేయబడలేదు.",
    grievanceEyebrow: "ఒక-ట్యాప్ ఫిర్యాదు",
    grievanceTitle: "సమస్యను సరైన support channelకు పంపండి.",
    grievanceDesc: "సింథటిక్ complaint ID రూపొందించి production workflowలో సరైన channelను చూపించండి.",
    issueLabel: "సమస్య వర్గం",
    issuePayment: "డబ్బు కట్ అయింది / టికెట్ లేదు",
    issueRefund: "రీఫండ్ ఆలస్యం",
    issueLogin: "Login సమస్య",
    issueOther: "ఇతర",
    optionalPnr: "PNR (ఐచ్ఛికం)",
    fileGrievance: "మాక్ ఫిర్యాదును రూపొందించండి",
    complaintId: "మాక్ ఫిర్యాదు ID",
    wouldRoute: "పంపబడే ఛానల్",
    finalTitle: "పారదర్శకత కూడా ఒక product feature.",
    finalDesc: "ఇక్కడ చూపించే ప్రతి state synthetic. కానీ సూత్రం నిజమైనది: ఏమి జరిగిందో మరియు తరువాత ఏమి చేయాలో వివరించండి.",
    backTop: "పైకి వెళ్లండి ↑",
    invalidPnr: "దయచేసి ఖచ్చితంగా 10 అంకెలు నమోదు చేయండి.",
    queueJoining: "సింథటిక్ క్యూలో చేరుతోంది…",
    queueComplete: "క్యూ సిమ్యులేషన్ పూర్తయింది",
    queueOpen: "తెరిచి ఉంది",
    queueReady: "సిద్ధం",
    queueQueued: "క్యూలో",
    queueWaiting: "వేచి ఉంది",
    queueConfirmed: "ధృవీకరించబడింది",
    queueRac: "RAC",
    queueWaitlisted: "వెయిట్‌లిస్ట్",
    evidenceLogged: "ఆధారం నమోదు చేయబడింది",
    overdue: "ఆలస్యం — ఫిర్యాదు నమోదు చేయండి"
  },

  ml: {
    heroEyebrow: "സ്വതന്ത്ര റെയിൽ അനുഭവ പ്രോട്ടോടൈപ്പ്",
    heroTitle: "Tatkal ഒരു ലോട്ടറി പോലെ അല്ല, സുതാര്യമായ ഒരു ക്യൂ പോലെ തോന്നണം.",
    heroSub: "RailQueue ക്യൂ സ്ഥാനം, mock PNR പരിശോധന, പേയ്മെന്റ് തെളിവ്, റീഫണ്ട് ട്രാക്കിംഗ്, ശരിയായ പരാതി ചാനൽ എന്നിവയിലൂടെ അനുഭവം കൂടുതൽ സുതാര്യമാക്കുന്നു.",
    heroCta: "Tatkal തയ്യാറെടുപ്പ് പരിശോധിക്കുക →",
    heroNote: "പ്രോട്ടോടൈപ്പ് മാത്രം. യഥാർത്ഥ ബുക്കിംഗ്, പേയ്മെന്റ്, OTP അല്ലെങ്കിൽ വ്യക്തിഗത ഡാറ്റ ഇല്ല.",
    boardLabel: "സിമുലേറ്റഡ് ലൈവ് ടെലിമെട്രി",
    boardLive: "ഡെമോ ലൈവ്",
    pageIntro: "ഒരു തത്വത്തെ അടിസ്ഥാനമാക്കിയുള്ള അഞ്ച് അനുഭവ ഘട്ടങ്ങൾ: എന്താണ് സംഭവിക്കുന്നതെന്ന് ഉപയോക്താവിനെ കാണിക്കുക.",
    readinessEyebrow: "TATKAL തയ്യാറെടുപ്പ് സഹായി",
    readinessTitle: "വിൻഡോ എപ്പോൾ തുറക്കും, നിങ്ങൾ എവിടെയാണെന്ന് അറിയുക.",
    readinessDesc: "സിമുലേറ്റഡ് Tatkal വിൻഡോ തുറക്കുന്നതിന് മുമ്പ് യാത്ര തയ്യാറാക്കുക. Countdown പൂർത്തിയായാൽ സുതാര്യമായ synthetic ക്യൂവിൽ പ്രവേശിക്കുക.",
    passengerName: "യാത്രക്കാരന്റെ പേര്",
    fromStation: "പുറപ്പെടുന്ന സ്റ്റേഷൻ",
    toStation: "എത്തുന്ന സ്റ്റേഷൻ",
    travelDate: "യാത്രാ തീയതി",
    startCountdown: "സിമുലേറ്റഡ് Countdown ആരംഭിക്കുക",
    windowOpens: "സിമുലേറ്റഡ് വിൻഡോ തുറക്കാൻ",
    enterQueue: "സിമുലേറ്റഡ് ക്യൂവിൽ പ്രവേശിക്കുക",
    yourPosition: "നിങ്ങളുടെ ക്യൂ സ്ഥാനം",
    estimatedWait: "കണക്കാക്കിയ കാത്തിരിപ്പ്",
    queueState: "ക്യൂ നില",
    queueNote: "Synthetic fairness logic: 1–40 ഇടയിൽ ഒരു സ്ഥാനം നൽകുകയും അതിന്റെ അടിസ്ഥാനത്തിൽ ഫലം തീരുമാനിക്കുകയും ചെയ്യുന്നു.",
    pnrEyebrow: "PNR നില പരിശോധന",
    pnrTitle: "ബുക്കിംഗ് സൈറ്റിന്റെ uptime-ൽ നിന്ന് സ്വതന്ത്രമായ നില.",
    pnrDesc: "ഏതെങ്കിലും 10 അക്ക mock PNR നൽകുക. ഒരേ PNR എല്ലായ്പ്പോഴും ഒരേ synthetic ഫലം നൽകും.",
    pnrLabel: "10 അക്ക PNR",
    checkPnr: "Mock PNR പരിശോധിക്കുക",
    productionNoteTitle: "Production കുറിപ്പ്",
    productionNote: "യഥാർത്ഥ പതിപ്പ് NTES അല്ലെങ്കിൽ അംഗീകൃത റെയിൽ ഡാറ്റ ഉറവിടം ഉപയോഗിക്കും. ഈ പ്രോട്ടോടൈപ്പ് റെയിൽ ബുക്കിംഗ് സംവിധാനവുമായി ബന്ധപ്പെടുന്നില്ല.",
    paymentEyebrow: "പേയ്മെന്റ് പരാജയ സുരക്ഷ",
    paymentTitle: "പരാജയപ്പെട്ട പേയ്മെന്റിനെ ക്രമപ്പെടുത്തിയ തെളിവാക്കി മാറ്റുക.",
    paymentDesc: "Refund dispute സമയത്ത് വ്യക്തമായ രേഖയ്ക്കായി Transaction/UTRയും തുകയും പ്രാദേശികമായി രേഖപ്പെടുത്തുക.",
    utrLabel: "Transaction / UTR ID",
    amountLabel: "തുക (₹)",
    logTransaction: "പരാജയപ്പെട്ട പേയ്മെന്റ് രേഖപ്പെടുത്തുക",
    noTransactions: "ഇതുവരെ synthetic transactions ഒന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",
    localStorageNote: "ഡാറ്റ ഈ browser-ന്റെ localStorage-ൽ മാത്രം സൂക്ഷിക്കുന്നു. Payment provider-നെ ബന്ധപ്പെടുന്നില്ല.",
    refundEyebrow: "റീഫണ്ട് ട്രാക്കർ",
    refundTitle: "നിങ്ങളുടെ റീഫണ്ട് എത്രകാലമായി കാത്തിരിക്കുകയാണെന്ന് അറിയുക.",
    refundDesc: "Cancellation date പ്രാദേശികമായി ട്രാക്ക് ചെയ്യുക. ഏഴ് ദിവസത്തിന് ശേഷം prototype escalation സൂചിപ്പിക്കും.",
    refundPnrLabel: "PNR",
    cancelDateLabel: "റദ്ദാക്കിയ തീയതി",
    trackRefund: "റീഫണ്ട് ട്രാക്ക് ചെയ്യുക",
    noRefunds: "ഇതുവരെ synthetic refunds ഒന്നും ട്രാക്ക് ചെയ്യുന്നില്ല.",
    grievanceEyebrow: "ഒറ്റ-ടാപ്പ് പരാതി",
    grievanceTitle: "പ്രശ്നം ശരിയായ support channel-ലേക്ക് എത്തിക്കുക.",
    grievanceDesc: "Synthetic complaint ID സൃഷ്ടിച്ച് production workflow-ൽ ഉപയോഗിക്കേണ്ട channel കാണുക.",
    issueLabel: "പ്രശ്ന വിഭാഗം",
    issuePayment: "പണം കുറച്ചു / ടിക്കറ്റ് ഇല്ല",
    issueRefund: "റീഫണ്ട് വൈകുന്നു",
    issueLogin: "Login പ്രശ്നം",
    issueOther: "മറ്റുള്ളവ",
    optionalPnr: "PNR (ഓപ്ഷണൽ)",
    fileGrievance: "Mock പരാതി സൃഷ്ടിക്കുക",
    complaintId: "Mock പരാതി ID",
    wouldRoute: "എവിടേക്ക് അയക്കും",
    finalTitle: "സുതാര്യതയും ഒരു product feature ആണ്.",
    finalDesc: "ഇവിടെ കാണുന്ന ഓരോ state-ഉം synthetic ആണ്. എന്നാൽ ആശയം യഥാർത്ഥമാണ്: എന്താണ് സംഭവിച്ചതെന്നും അടുത്തതായി എന്ത് ചെയ്യാമെന്നും വിശദീകരിക്കുക.",
    backTop: "മുകളിലേക്ക് ↑",
    invalidPnr: "ദയവായി കൃത്യമായി 10 അക്കങ്ങൾ നൽകുക.",
    queueJoining: "Synthetic ക്യൂവിൽ ചേരുന്നു…",
    queueComplete: "ക്യൂ സിമുലേഷൻ പൂർത്തിയായി",
    queueOpen: "തുറന്നു",
    queueReady: "തയ്യാർ",
    queueQueued: "ക്യൂവിൽ",
    queueWaiting: "കാത്തിരിക്കുന്നു",
    queueConfirmed: "സ്ഥിരീകരിച്ചു",
    queueRac: "RAC",
    queueWaitlisted: "വെയിറ്റ്‌ലിസ്റ്റ്",
    evidenceLogged: "തെളിവ് രേഖപ്പെടുത്തി",
    overdue: "കാലതാമസം — പരാതി നൽകുക"
  },

  kn: {
    heroEyebrow: "ಸ್ವತಂತ್ರ ರೈಲು ಅನುಭವ ಪ್ರೋಟೋಟೈಪ್",
    heroTitle: "Tatkal ಲಾಟರಿಯಂತೆ ಅಲ್ಲ, ಪಾರದರ್ಶಕ ಸರದಿಯಂತೆ ಅನಿಸಬೇಕು.",
    heroSub: "RailQueue ಸರದಿ ಸ್ಥಾನ, mock PNR ಪರಿಶೀಲನೆ, ಪಾವತಿ ಸಾಕ್ಷ್ಯ, ಮರುಪಾವತಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸರಿಯಾದ ದೂರು ಚಾನಲ್ ಮೂಲಕ ಅನುಭವವನ್ನು ಪಾರದರ್ಶಕಗೊಳಿಸುತ್ತದೆ.",
    heroCta: "Tatkal ಸಿದ್ಧತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ →",
    heroNote: "ಪ್ರೋಟೋಟೈಪ್ ಮಾತ್ರ. ನಿಜವಾದ ಬುಕ್ಕಿಂಗ್, ಪಾವತಿ, OTP ಅಥವಾ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಇಲ್ಲ.",
    boardLabel: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಲೈವ್ ಟೆಲಿಮೆಟ್ರಿ",
    boardLive: "ಡೆಮೋ ಲೈವ್",
    pageIntro: "ಒಂದು ತತ್ವದ ಸುತ್ತ ರೂಪಿಸಲಾದ ಐದು ಅನುಭವ ಪದರಗಳು: ಏನಾಗುತ್ತಿದೆ ಎಂಬುದನ್ನು ಬಳಕೆದಾರರಿಗೆ ತೋರಿಸಿ.",
    readinessEyebrow: "TATKAL ಸಿದ್ಧತಾ ಸಹಾಯಕ",
    readinessTitle: "ವಿಂಡೋ ಯಾವಾಗ ತೆರೆಯುತ್ತದೆ ಮತ್ತು ನೀವು ಎಲ್ಲಿದ್ದೀರಿ ಎಂದು ತಿಳಿಯಿರಿ.",
    readinessDesc: "ಸಿಮ್ಯುಲೇಟೆಡ್ Tatkal ವಿಂಡೋ ತೆರೆಯುವ ಮೊದಲು ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಸಿದ್ಧಪಡಿಸಿ. Countdown ಮುಗಿದ ನಂತರ ಪಾರದರ್ಶಕ synthetic ಸರದಿಗೆ ಸೇರಿ.",
    passengerName: "ಪ್ರಯಾಣಿಕರ ಹೆಸರು",
    fromStation: "ಪ್ರಾರಂಭದ ನಿಲ್ದಾಣ",
    toStation: "ಗಮ್ಯ ನಿಲ್ದಾಣ",
    travelDate: "ಪ್ರಯಾಣ ದಿನಾಂಕ",
    startCountdown: "ಸಿಮ್ಯುಲೇಟೆಡ್ Countdown ಪ್ರಾರಂಭಿಸಿ",
    windowOpens: "ಸಿಮ್ಯುಲೇಟೆಡ್ ವಿಂಡೋ ತೆರೆಯಲು",
    enterQueue: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಸರದಿಗೆ ಸೇರಿ",
    yourPosition: "ನಿಮ್ಮ ಸರದಿ ಸ್ಥಾನ",
    estimatedWait: "ಅಂದಾಜು ಕಾಯುವಿಕೆ",
    queueState: "ಸರದಿ ಸ್ಥಿತಿ",
    queueNote: "Synthetic fairness logic: 1–40ರ ನಡುವೆ ಒಂದು ಸ್ಥಾನ ನೀಡಲಾಗುತ್ತದೆ ಮತ್ತು ಫಲಿತಾಂಶ ಅದೇ ಸ್ಥಾನದ ಆಧಾರದ ಮೇಲೆ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ.",
    pnrEyebrow: "PNR ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ",
    pnrTitle: "ಬುಕಿಂಗ್ ಸೈಟ್ uptime‌ನಿಂದ ಸ್ವತಂತ್ರವಾದ ಸ್ಥಿತಿ ವೀಕ್ಷಣೆ.",
    pnrDesc: "ಯಾವುದೇ 10 ಅಂಕಿಯ mock PNR ನಮೂದಿಸಿ. ಒಂದೇ PNR ಯಾವಾಗಲೂ ಒಂದೇ synthetic ಫಲಿತಾಂಶ ನೀಡುತ್ತದೆ.",
    pnrLabel: "10 ಅಂಕಿಯ PNR",
    checkPnr: "Mock PNR ಪರಿಶೀಲಿಸಿ",
    productionNoteTitle: "Production ಟಿಪ್ಪಣಿ",
    productionNote: "ನಿಜವಾದ ಆವೃತ್ತಿಯು NTES ಅಥವಾ ಅಧಿಕೃತ ರೈಲು ಡೇಟಾ ಮೂಲವನ್ನು ಬಳಸುತ್ತದೆ. ಈ ಪ್ರೋಟೋಟೈಪ್ ಯಾವುದೇ ರೈಲು ಬುಕಿಂಗ್ ವ್ಯವಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸುವುದಿಲ್ಲ.",
    paymentEyebrow: "ಪಾವತಿ ವೈಫಲ್ಯ ಸುರಕ್ಷತೆ",
    paymentTitle: "ವಿಫಲವಾದ ಪಾವತಿಯನ್ನು ಕ್ರಮಬದ್ಧ ಸಾಕ್ಷ್ಯವನ್ನಾಗಿ ಮಾಡಿ.",
    paymentDesc: "Refund dispute ಸಮಯದಲ್ಲಿ ಸ್ಪಷ್ಟ ದಾಖಲೆಗಾಗಿ Transaction/UTR ಮತ್ತು ಮೊತ್ತವನ್ನು ಸ್ಥಳೀಯವಾಗಿ ದಾಖಲಿಸಿ.",
    utrLabel: "Transaction / UTR ID",
    amountLabel: "ಮೊತ್ತ (₹)",
    logTransaction: "ವಿಫಲವಾದ ಪಾವತಿ ದಾಖಲಿಸಿ",
    noTransactions: "ಇನ್ನೂ ಯಾವುದೇ synthetic transactions ದಾಖಲಾಗಿಲ್ಲ.",
    localStorageNote: "ಡೇಟಾವನ್ನು ಈ browser‌ನ localStorageನಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. ಯಾವುದೇ payment provider ಸಂಪರ್ಕಿಸುವುದಿಲ್ಲ.",
    refundEyebrow: "ರಿಫಂಡ್ ಟ್ರ್ಯಾಕರ್",
    refundTitle: "ನಿಮ್ಮ ರಿಫಂಡ್ ಎಷ್ಟು ಸಮಯದಿಂದ ಕಾಯುತ್ತಿದೆ ಎಂದು ತಿಳಿಯಿರಿ.",
    refundDesc: "Cancellation date ಅನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ. ಏಳು ದಿನಗಳ ನಂತರ prototype escalation ಅನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    refundPnrLabel: "PNR",
    cancelDateLabel: "ರದ್ದು ದಿನಾಂಕ",
    trackRefund: "ರಿಫಂಡ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    noRefunds: "ಇನ್ನೂ ಯಾವುದೇ synthetic refunds ಟ್ರ್ಯಾಕ್ ಆಗುತ್ತಿಲ್ಲ.",
    grievanceEyebrow: "ಒನ್-ಟ್ಯಾಪ್ ದೂರು",
    grievanceTitle: "ಸಮಸ್ಯೆಯನ್ನು ಸರಿಯಾದ support channel ಗೆ ಕಳುಹಿಸಿ.",
    grievanceDesc: "Synthetic complaint ID ರಚಿಸಿ ಮತ್ತು production workflow ನಲ್ಲಿ ಸೂಕ್ತ channel ಅನ್ನು ತೋರಿಸಿ.",
    issueLabel: "ಸಮಸ್ಯೆಯ ವರ್ಗ",
    issuePayment: "ಹಣ ಕಡಿತವಾಗಿದೆ / ಟಿಕೆಟ್ ಇಲ್ಲ",
    issueRefund: "ರಿಫಂಡ್ ವಿಳಂಬ",
    issueLogin: "Login ಸಮಸ್ಯೆ",
    issueOther: "ಇತರೆ",
    optionalPnr: "PNR (ಐಚ್ಛಿಕ)",
    fileGrievance: "Mock ದೂರು ರಚಿಸಿ",
    complaintId: "Mock ದೂರು ID",
    wouldRoute: "ಕಳುಹಿಸಲಾಗುತ್ತದೆ",
    finalTitle: "ಪಾರದರ್ಶಕತೆಯೂ ಒಂದು product feature.",
    finalDesc: "ಇಲ್ಲಿ ತೋರಿಸಿರುವ ಪ್ರತಿಯೊಂದು state synthetic ಆಗಿದೆ. ಆದರೆ ತತ್ವ ನಿಜವಾದದ್ದು: ಏನಾಯಿತು ಮತ್ತು ಮುಂದೆ ಏನು ಮಾಡಬಹುದು ಎಂಬುದನ್ನು ವಿವರಿಸಿ.",
    backTop: "ಮೇಲಕ್ಕೆ ↑",
    invalidPnr: "ದಯವಿಟ್ಟು ನಿಖರವಾಗಿ 10 ಅಂಕಿಗಳನ್ನು ನಮೂದಿಸಿ.",
    queueJoining: "Synthetic ಸರದಿಗೆ ಸೇರುತ್ತಿದೆ…",
    queueComplete: "ಸರದಿ simulation ಪೂರ್ಣಗೊಂಡಿದೆ",
    queueOpen: "ತೆರೆದಿದೆ",
    queueReady: "ಸಿದ್ಧ",
    queueQueued: "ಸರದಿಯಲ್ಲಿ",
    queueWaiting: "ಕಾಯುತ್ತಿದೆ",
    queueConfirmed: "ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    queueRac: "RAC",
    queueWaitlisted: "ವೇಟ್ಲಿಸ್ಟ್",
    evidenceLogged: "ಸಾಕ್ಷ್ಯ ದಾಖಲಿಸಲಾಗಿದೆ",
    overdue: "ವಿಳಂಬ — ದೂರು ದಾಖಲಿಸಿ"
  }
};

function getCurrentLanguage() {
  return localStorage.getItem("railqueue_language") || "en";
}

function getTranslation(key) {
  const language = getCurrentLanguage();
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language;

  $$("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      element.textContent = dictionary[key];
    }
  });

  // Sync the dropdown to the active language
  const langSelect = $("#langSelect");
  if (langSelect) langSelect.value = language;

  localStorage.setItem("railqueue_language", language);
}

// Language dropdown change handler
const langSelectEl = $("#langSelect");
if (langSelectEl) {
  langSelectEl.addEventListener("change", () => {
    const chosen = langSelectEl.value;
    applyLanguage(chosen);
    refreshDynamicLanguage();
    const names = { en: "English", hi: "हिन्दी", ta: "தமிழ்", te: "తెలుగు", ml: "മലയാളം", kn: "ಕನ್ನಡ" };
    showToast(`Language: ${names[chosen] || chosen}`, "🌐");
  });
}

applyLanguage(getCurrentLanguage());

/* Quick Station Route Setter */
window.setStations = function(from, to) {
  const fromInput = $("#fromStation");
  const toInput = $("#toStation");
  if (fromInput && toInput) {
    fromInput.value = from;
    toInput.value = to;
    showToast(`Route set: ${from} ➔ ${to}`, "📍");
  }
};

/* Swap Station Button */
const btnSwapStations = $("#btnSwapStations");
if (btnSwapStations) {
  btnSwapStations.addEventListener("click", () => {
    const fromInput = $("#fromStation");
    const toInput = $("#toStation");
    if (fromInput && toInput) {
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
      showToast("Stations swapped", "⇄");
    }
  });
}

/* Booking Class Selector Pills */
let selectedClass = "3A";
$$(".class-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    $$(".class-pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    selectedClass = pill.dataset.class;
    const badge = $("#selectedClassBadge");
    if (badge) badge.textContent = selectedClass;
  });
});

/* =========================================================
   TATKAL READINESS ASSISTANT & QUEUE SIMULATION
   ========================================================= */

const readinessForm = $("#readinessForm");
const readinessPanel = $("#readinessPanel");
const countdownElement = $("#countdown");
const queueButton = $("#queueBtn");
const queueBoard = $("#queueBoard");
const queueTrackContainer = $("#queueTrackContainer");
const queueTrackFill = $("#queueTrackFill");
const queueProgressPct = $("#queueProgressPct");
const queuePositionElement = $("#queuePosition");
const estimatedWaitElement = $("#estimatedWait");
const queueStateElement = $("#queueState");
const queueExplanation = $("#queueExplanation");
const routeFrom = $("#routeFrom");
const routeTo = $("#routeTo");
const heroQueue = $("#heroQueue");
const heroStatus = $("#heroStatus");
const heroWait = $("#heroWait");
const boardingPassPreview = $("#boardingPassPreview");

let countdownTimer = null;
let countdownSeconds = 15;

function getStationCode(str) {
  if (!str) return "STN";
  const match = str.match(/\(([A-Z]+)\)/);
  if (match) return match[1];
  return str.split(" ").map(w => w[0]).join("").slice(0, 4).toUpperCase();
}

if (readinessForm) {
  readinessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const passenger = $("#passengerName").value.trim();
    const from = $("#fromStation").value.trim();
    const to = $("#toStation").value.trim();
    const date = $("#travelDate").value;

    if (!passenger || !from || !to || !date) return;

    readinessForm.querySelectorAll("input, button").forEach((el) => el.disabled = true);

    routeFrom.textContent = getStationCode(from);
    routeTo.textContent = getStationCode(to);

    readinessPanel.classList.remove("hidden");
    countdownSeconds = 15;
    updateCountdown();

    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      countdownSeconds--;
      updateCountdown();

      if (countdownSeconds <= 0) {
        clearInterval(countdownTimer);
        countdownFinished();
      }
    }, 1000);
    
    showToast("Simulated countdown started!", "⏱️");
  });
}

function updateCountdown() {
  const minutes = Math.floor(countdownSeconds / 60).toString().padStart(2, "0");
  const seconds = (countdownSeconds % 60).toString().padStart(2, "0");
  countdownElement.textContent = `${minutes}:${seconds}`;
}

function countdownFinished() {
  countdownElement.textContent = "00:00";
  countdownElement.style.color = "var(--emerald-400)";
  queueButton.disabled = false;
  queueButton.textContent = getTranslation("enterQueue");

  heroStatus.textContent = "OPEN";
  heroStatus.style.color = "var(--emerald-400)";
  showToast("Window open! Click to enter queue.", "🟢");
}

if (queueButton) {
  queueButton.addEventListener("click", () => {
    queueButton.disabled = true;
    queueButton.textContent = getTranslation("queueJoining");

    queueBoard.classList.remove("hidden");
    if (queueTrackContainer) queueTrackContainer.classList.remove("hidden");

    const position = randomNumber(1, 40);
    const estimatedMinutes = Math.max(1, Math.ceil(position * 0.8));

    queuePositionElement.textContent = `#${position}`;
    estimatedWaitElement.textContent = `${estimatedMinutes} min`;
    queueStateElement.textContent = getTranslation("queueWaiting");

    heroQueue.textContent = `#${position}`;
    heroWait.textContent = `${estimatedMinutes} MIN`;
    heroStatus.textContent = "QUEUED";
    heroStatus.style.color = "var(--amber-400)";

    queueExplanation.textContent = `Synthetic queue position #${position} assigned. The prototype will resolve the outcome from this position after a short simulated wait.`;

    // Dynamic animated queue track fill
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      if (queueTrackFill) queueTrackFill.style.width = `${Math.min(100, progress)}%`;
      if (queueProgressPct) queueProgressPct.textContent = `${Math.min(100, progress)}%`;
      if (progress >= 100) clearInterval(progressInterval);
    }, 150);

    const delay = Math.min(6000, 1200 + position * 100);

    setTimeout(() => {
      resolveQueue(position);
    }, delay);
  });
}

function resolveQueue(position) {
  let outcome;
  let detail;

  if (position <= 12) {
    outcome = "CONFIRMED";
    detail = "Synthetic seat allocation available.";
    queueStateElement.style.color = "var(--emerald-400)";
    heroStatus.style.color = "var(--emerald-400)";
  } else if (position <= 26) {
    outcome = "RAC";
    detail = "Synthetic RAC position generated.";
    queueStateElement.style.color = "var(--amber-400)";
    heroStatus.style.color = "var(--amber-400)";
  } else {
    outcome = "WAITLISTED";
    detail = "Synthetic waitlist position generated.";
    queueStateElement.style.color = "var(--crimson-400)";
    heroStatus.style.color = "var(--crimson-400)";
  }

  queueStateElement.textContent = outcome;
  heroStatus.textContent = outcome;
  queueExplanation.textContent = `${outcome}: ${detail} This is a synthetic result determined deterministically by queue position #${position}.`;
  queueButton.textContent = getTranslation("queueComplete");

  // Render Boarding Pass outcome
  if (boardingPassPreview) {
    boardingPassPreview.classList.remove("hidden");
    const passPassenger = $("#passPassengerName");
    const passOutcome = $("#passOutcomeStatus");
    const passSeat = $("#passSeatBadge");
    const passPnr = $("#passPnrCode");
    
    if (passPassenger) passPassenger.textContent = $("#passengerName")?.value || "Aarav Sharma";
    if (passOutcome) {
      passOutcome.textContent = outcome;
      passOutcome.className = outcome === "CONFIRMED" ? "cnf" : (outcome === "RAC" ? "mono" : "mono");
      passOutcome.style.color = outcome === "CONFIRMED" ? "var(--emerald-400)" : (outcome === "RAC" ? "var(--amber-400)" : "var(--crimson-400)");
    }
    if (passSeat) {
      const coach = selectedClass === "3A" ? "B4" : (selectedClass === "2A" ? "A2" : (selectedClass === "1A" ? "H1" : "S4"));
      const berthType = ["LB", "MB", "UB", "SL", "SU"][position % 5];
      passSeat.textContent = outcome === "CONFIRMED" ? `${coach} / ${(position * 3) % 64 + 1} (${berthType})` : `${outcome} #${position}`;
    }
    if (passPnr) {
      passPnr.textContent = `PNR: ${randomNumber(4000000000, 8999999999)}`;
    }
  }

  showToast(`Queue resolved: ${outcome}!`, outcome === "CONFIRMED" ? "🎟️" : "ℹ️");
}

/* =========================================================
   PNR STATUS CHECKER & COACH SCHEMATIC
   ========================================================= */

const pnrForm = $("#pnrForm");
const pnrResult = $("#pnrResult");

window.testSamplePnr = function(pnr) {
  const input = $("#pnrInput");
  if (input) {
    input.value = pnr;
    pnrForm.dispatchEvent(new Event("submit"));
    showToast(`Decoded test PNR: ${pnr}`, "🔍");
  }
};

if (pnrForm) {
  pnrForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const pnr = $("#pnrInput").value.trim();

    if (!/^\d{10}$/.test(pnr)) {
      alert(getTranslation("invalidPnr"));
      return;
    }

    const result = deterministicPnrResult(pnr);

    $("#resultPnr").textContent = pnr;
    $("#pnrStatus").textContent = result.status;
    $("#pnrDetail").textContent = result.detail;

    const statusElement = $("#pnrStatus");
    statusElement.classList.remove("status-green");

    if (result.status === "CONFIRMED") {
      statusElement.style.color = "var(--emerald-400)";
    } else if (result.status === "RAC") {
      statusElement.style.color = "var(--amber-400)";
    } else {
      statusElement.style.color = "var(--crimson-400)";
    }

    // Build Coach Schematic
    const userCoachBox = $("#userCoachBox");
    if (userCoachBox) {
      if (result.status === "CONFIRMED") {
        const coachName = result.detail.split(" / ")[0] || "S2";
        userCoachBox.textContent = coachName;
        userCoachBox.style.display = "grid";
      } else {
        userCoachBox.textContent = "WL";
      }
    }

    pnrResult.classList.remove("hidden");
    showToast(`PNR Status: ${result.status} (${result.detail})`, "🚆");
  });
}

function deterministicHash(text) {
  let hash = 0;
  for (let index = 0; index < text.length; index++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function deterministicPnrResult(pnr) {
  const hash = deterministicHash(pnr);
  const resultType = hash % 3;

  if (resultType === 0) {
    const coach = `S${(hash % 8) + 1}`;
    const seat = (hash % 72) + 1;
    return {
      status: "CONFIRMED",
      detail: `${coach} / ${seat}`
    };
  }

  if (resultType === 1) {
    const rac = (hash % 24) + 1;
    return {
      status: "RAC",
      detail: `RAC ${rac}`
    };
  }

  const waitlist = (hash % 40) + 1;
  return {
    status: "WAITLIST",
    detail: `WL ${waitlist}`
  };
}

/* =========================================================
   PAYMENT FAILURE SAFETY NET
   ========================================================= */

const paymentForm = $("#paymentForm");
const paymentList = $("#paymentList");
const btnSamplePayment = $("#btnSamplePayment");

let selectedGateway = "UPI (GPay)";
$$(".gateway-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    $$(".gateway-pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    selectedGateway = pill.dataset.gw;
  });
});

if (btnSamplePayment) {
  btnSamplePayment.addEventListener("click", () => {
    $("#utrInput").value = `UTR-2026-${randomNumber(10000000, 99999999)}`;
    $("#amountInput").value = "1180";
    showToast("Sample failed transaction filled!", "💳");
  });
}

function getPaymentRecords() {
  try {
    return JSON.parse(localStorage.getItem("railqueue_payments")) || [];
  } catch {
    return [];
  }
}

function savePaymentRecords(records) {
  localStorage.setItem("railqueue_payments", JSON.stringify(records));
}

window.deletePaymentRecord = function(index) {
  const records = getPaymentRecords();
  records.splice(index, 1);
  savePaymentRecords(records);
  renderPayments();
  showToast("Record removed from local ledger", "🗑️");
};

window.copyPaymentEvidence = function(utr, amount, timestamp, gateway) {
  const text = `[RAILQUEUE PAYMENT DISPUTE EVIDENCE]\nUTR/Ref: ${utr}\nAmount: ₹${amount}\nGateway: ${gateway || 'UPI'}\nTimestamp: ${timestamp}\nReason: Amount debited, Tatkal ticket generation timed out.\nStatus: Synthetic local proof logged for Bank/RailMadad arbitration.`;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Dispute evidence copied to clipboard!", "📋");
  }).catch(() => {
    showToast("Evidence ready to copy", "📋");
  });
};

function renderPayments() {
  const records = getPaymentRecords();

  if (records.length === 0) {
    paymentList.className = "item-list empty-state";
    paymentList.textContent = getTranslation("noTransactions");
    return;
  }

  paymentList.className = "item-list";
  paymentList.innerHTML = records.map((record, index) => {
    const gw = record.gateway || "UPI (GPay)";
    return `
      <div class="data-item">
        <div class="data-item-main">
          <strong>${escapeHTML(record.utr)}</strong>
          <span>₹${escapeHTML(record.amount)} · ${escapeHTML(gw)} · ${escapeHTML(record.timestamp)}</span>
        </div>
        <div class="data-item-actions">
          <button type="button" class="btn-item-action" onclick="copyPaymentEvidence('${escapeHTML(record.utr)}', '${escapeHTML(record.amount)}', '${escapeHTML(record.timestamp)}', '${escapeHTML(gw)}')">
            📋 Copy Proof
          </button>
          <button type="button" class="btn-item-action delete" onclick="deletePaymentRecord(${index})" title="Delete">
            ✕
          </button>
        </div>
      </div>
    `;
  }).join("");
}

if (paymentForm) {
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const utr = $("#utrInput").value.trim();
    const amount = $("#amountInput").value.trim();

    if (!utr || !amount) return;

    const records = getPaymentRecords();
    records.unshift({
      utr,
      amount,
      gateway: selectedGateway,
      timestamp: new Date().toLocaleString("en-IN")
    });

    savePaymentRecords(records);
    paymentForm.reset();
    renderPayments();
    showToast("Failed transaction logged in local evidence vault!", "✓");
  });
}

renderPayments();

/* =========================================================
   REFUND TRACKER & SLA ESCALATION
   ========================================================= */

const refundForm = $("#refundForm");
const refundList = $("#refundList");
const btnSampleRefund = $("#btnSampleRefund");

if (btnSampleRefund) {
  btnSampleRefund.addEventListener("click", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const dateStr = pastDate.toISOString().split("T")[0];

    const records = getRefundRecords();
    records.unshift({
      pnr: `${randomNumber(4000000000, 8999999999)}`,
      cancelDate: dateStr
    });
    saveRefundRecords(records);
    renderRefunds();
    showToast("10-Day Overdue Refund injected for testing!", "⚠️");
  });
}

function getRefundRecords() {
  try {
    return JSON.parse(localStorage.getItem("railqueue_refunds")) || [];
  } catch {
    return [];
  }
}

function saveRefundRecords(records) {
  localStorage.setItem("railqueue_refunds", JSON.stringify(records));
}

window.deleteRefundRecord = function(index) {
  const records = getRefundRecords();
  records.splice(index, 1);
  saveRefundRecords(records);
  renderRefunds();
  showToast("Refund record deleted", "🗑️");
};

window.escalateRefund = function(pnr) {
  const grievancePnr = $("#grievancePnr");
  const issueCategory = $("#issueCategory");
  if (grievancePnr) grievancePnr.value = pnr;
  if (issueCategory) issueCategory.value = "refund";
  
  const grievanceSection = $("#grievance");
  if (grievanceSection) grievanceSection.scrollIntoView({ behavior: "smooth" });
  showToast(`Pre-filled Grievance Filer for PNR ${pnr}`, "🚀");
};

function renderRefunds() {
  const records = getRefundRecords();

  if (records.length === 0) {
    refundList.className = "item-list empty-state";
    refundList.textContent = getTranslation("noRefunds");
    return;
  }

  refundList.className = "item-list";
  refundList.innerHTML = records.map((record, index) => {
    const days = daysSince(record.cancelDate);
    const overdue = days > 7;
    const status = overdue ? "OVERDUE (>7 DAYS)" : `${days} DAY${days === 1 ? "" : "S"} ELAPSED`;
    const className = overdue ? "data-item-status overdue" : "data-item-status";

    return `
      <div class="data-item">
        <div class="data-item-main">
          <strong>PNR ${escapeHTML(record.pnr)}</strong>
          <span>Cancelled on ${escapeHTML(formatDate(record.cancelDate))}</span>
        </div>
        <div class="data-item-actions">
          <span class="${className}">${status}</span>
          ${overdue ? `<button type="button" class="btn-item-action" onclick="escalateRefund('${escapeHTML(record.pnr)}')">🚨 Escalate</button>` : ''}
          <button type="button" class="btn-item-action delete" onclick="deleteRefundRecord(${index})" title="Delete">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

if (refundForm) {
  refundForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const pnr = $("#refundPnr").value.trim();
    const cancelDate = $("#cancelDate").value;

    if (!pnr || !cancelDate) return;

    const records = getRefundRecords();
    records.unshift({ pnr, cancelDate });

    saveRefundRecords(records);
    refundForm.reset();
    renderRefunds();
    showToast(`Refund tracking active for PNR ${pnr}`, "⏱️");
  });
}

renderRefunds();

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) renderRefunds();
});

/* =========================================================
   ONE-TAP GRIEVANCE FILER
   ========================================================= */

const grievanceForm = $("#grievanceForm");
const grievanceResult = $("#grievanceResult");

const channelMap = {
  payment: "RailMadad / Bank PG Escalation",
  refund: "RailMadad Commercial Refund Cell",
  login: "IRCTC Account & Auth Support",
  other: "IRCTC General RailMadad Portal"
};

let currentComplaintData = null;

if (grievanceForm) {
  grievanceForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const category = $("#issueCategory").value;
    const pnr = $("#grievancePnr").value.trim();
    const complaintId = generateComplaintId();
    const channel = channelMap[category] || channelMap.other;

    $("#complaintId").textContent = complaintId;
    $("#routeChannel").textContent = channel;

    const pnrText = pnr ? ` for synthetic PNR ${pnr}` : "";
    $("#grievanceCopy").textContent = `Mock complaint ${complaintId} has been formatted and would be routed directly to ${channel}${pnrText}. No actual external request was transmitted.`;

    currentComplaintData = {
      id: complaintId,
      channel,
      category,
      pnr
    };

    grievanceResult.classList.remove("hidden");
    showToast(`Grievance registered: ${complaintId}`, "📋");
  });
}

const btnCopyComplaint = $("#btnCopyComplaint");
if (btnCopyComplaint) {
  btnCopyComplaint.addEventListener("click", () => {
    if (!currentComplaintData) return;
    navigator.clipboard.writeText(currentComplaintData.id).then(() => {
      showToast(`Complaint ID ${currentComplaintData.id} copied!`, "📋");
    });
  });
}

const btnCopyTweet = $("#btnCopyTweet");
if (btnCopyTweet) {
  btnCopyTweet.addEventListener("click", () => {
    if (!currentComplaintData) return;
    const tweet = `Attention @RailMinIndia @RailMadad: RailQueue synthetic dispute ticket ${currentComplaintData.id} filed for issue: ${currentComplaintData.category}${currentComplaintData.pnr ? ' (PNR: ' + currentComplaintData.pnr + ')' : ''}. Please resolve SLA breach.`;
    navigator.clipboard.writeText(tweet).then(() => {
      showToast("Grievance template copied to clipboard!", "🐦");
    });
  });
}

/* =========================================================
   1-CLICK GUIDED DEMO TOUR (FOR JUDGES & EVALUATION)
   ========================================================= */

const btnDemoTour = $("#btnDemoTour");
if (btnDemoTour) {
  btnDemoTour.addEventListener("click", () => {
    showToast("Starting 1-Click Guided Demo Tour…", "⚡");
    
    // Step 1: Scroll to Readiness & Start
    const readinessSec = $("#readiness");
    if (readinessSec) readinessSec.scrollIntoView({ behavior: "smooth" });
    
    setTimeout(() => {
      $("#passengerName").value = "Aarav Sharma";
      $("#fromStation").value = "Chennai (MAS)";
      $("#toStation").value = "Bengaluru (SBC)";
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      $("#travelDate").value = tomorrow.toISOString().split("T")[0];
      
      // Auto submit readiness
      if (readinessForm) readinessForm.dispatchEvent(new Event("submit"));
      
      // Accelerate countdown for demo
      countdownSeconds = 3;
      updateCountdown();
      
      setTimeout(() => {
        // Step 2: Auto enter queue
        if (queueButton && !queueButton.disabled) queueButton.click();
        
        setTimeout(() => {
          // Step 3: Scroll to PNR
          const pnrSec = $("#pnr");
          if (pnrSec) pnrSec.scrollIntoView({ behavior: "smooth" });
          testSamplePnr("4528193041");
          
          setTimeout(() => {
            // Step 4: Scroll to Payment & Add sample
            const paySec = $("#payment");
            if (paySec) paySec.scrollIntoView({ behavior: "smooth" });
            if (btnSamplePayment) btnSamplePayment.click();
            if (paymentForm) paymentForm.dispatchEvent(new Event("submit"));
            
            setTimeout(() => {
              // Step 5: Scroll to Refund
              const refundSec = $("#refunds");
              if (refundSec) refundSec.scrollIntoView({ behavior: "smooth" });
              if (btnSampleRefund) btnSampleRefund.click();
              
              showToast("Demo Tour Complete! All 5 modules demonstrated.", "🌟");
            }, 2500);
          }, 2500);
        }, 3500);
      }, 3200);
    }, 1000);
  });
}

function refreshDynamicLanguage() {
  renderPayments();
  renderRefunds();
}

/* =========================================================
   INITIAL UI & DATE INITIALIZATION
   ========================================================= */

heroQueue.textContent = "--";
heroStatus.textContent = "READY";
heroWait.textContent = "-- MIN";

const travelDateInput = $("#travelDate");
const cancelDateInput = $("#cancelDate");

const todayStr = new Date().toISOString().split("T")[0];
if (travelDateInput) {
  travelDateInput.min = todayStr;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  travelDateInput.value = tomorrow.toISOString().split("T")[0];
}

if (cancelDateInput) {
  cancelDateInput.max = todayStr;
  const past = new Date();
  past.setDate(past.getDate() - 3);
  cancelDateInput.value = past.toISOString().split("T")[0];
}
