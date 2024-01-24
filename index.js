const axios = require('axios');

const INIT_URL = 'http://letsrevolutionizetesting.com/challenge.json';

async function fetchChallenge(url) {
  try {
    const response = await axios.get(url, { responseType: 'json' });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function followChallengeChain(url = INIT_URL) {
  try {
    const challenge = await fetchChallenge(url);
    console.log(challenge);

    if (challenge.follow && challenge.follow.includes('challenge?')) {
      const nextUrl = challenge.follow.replace('challenge?', 'challenge.json?');
      return followChallengeChain(nextUrl);
    }

    return challenge;
  } catch (error) {
    throw error;
  }
}

(async () => {
  try {
    const result = await followChallengeChain();
    console.log('final result is', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

