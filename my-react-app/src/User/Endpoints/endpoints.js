const BASE_URL = "http://localhost:5002/research-api/";
// const BASE_URL = "https://research1.passionit.com/research-api/";

export const LOGIN_API = `${BASE_URL}login`;
export const REGISTER_API = `${BASE_URL}register`;

////////////////////research button////////////////
export const GET_RESEARCH_API = `${BASE_URL}researchbot`
export const POST_RESEARCH_API = `${BASE_URL}research`;

/////////////////startup idea/////////////////
export const GET_STARTUP_API = `${BASE_URL}startupbot`
export const POST_STARTUP_API = `${BASE_URL}startup`;

/////////////////////patent/////////////////
export const GET_PATENT_API = `${BASE_URL}patentbot`
export const POST_PATENT_API = `${BASE_URL}patent`;

///////////////valuechain////////////////
export const GET_VALUECHAIN_API = `${BASE_URL}vcbot`
export const POST_VALUECHAIN_API = `${BASE_URL}valuechain`;

///////////////////sdg////////////////////////
export const GET_SDG_API = `${BASE_URL}sdgbot`
export const POST_SDG_API = `${BASE_URL}sdg`;

///////////////////////journal///////////////
export const POST_JOURNAL_API = `${BASE_URL}createjournal`;
export const GET_JOURNAL_API = `${BASE_URL}journals`;

///////////////////book////////////////////
export const POST_BOOK_API = `${BASE_URL}createbook`;
export const GET_BOOK_API = `${BASE_URL}books`;

///////////////////protectedroot///////////
export const GET_PROTECTED_API = `${BASE_URL}protected`;

/////////////////adminResearch////////////
export const DELETE_RESEARCH_API = (researchid) =>
    `${BASE_URL}researchbot/${researchid}`;
export const UPDATE_RESEARCH_API = (researchid) =>
    `${BASE_URL}researchbot/${researchid}`;

////////////adminStartup/////////////////////
export const DELETE_STARTUP_API = (startupid) =>
    `${BASE_URL}startupdb/${startupid}`;
export const UPDATE_STARTUP_API = (startupid) =>
    `${BASE_URL}startupdb/${startupid}`;

///////////////adminPatent///////////////////
export const DELETE_PATENT_API = (patentid) =>
    `${BASE_URL}patentdb/${patentid}`;
export const UPDATE_PATENT_API = (patentid) =>
    `${BASE_URL}patentdb/${patentid}`;

/////////////adminvc//////////////////
export const DELETE_VC_API = (valuechainid) =>
    `${BASE_URL}valuechaindb/${valuechainid}`;
export const UPDATE_VC_API = (valuechainid) =>
    `${BASE_URL}valuechaindb/${valuechainid}`;

//////////////adminsdg//////////////////
export const DELETE_SDG_API = (sdgid) =>
    `${BASE_URL}sdgdb/${sdgid}`;
export const UPDATE_SDG_API = (sdgid) =>
    `${BASE_URL}sdgdb/${sdgid}`;
