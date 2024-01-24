const axios = require('axios');


async function fetchChallenge(url) {
    try {
        const response = await axios.get(url, { responseType: 'json' });
    return response.data;
  } catch (error) {
      throw error;
    }
}
const endpoint = 'http://letsrevolutionizetesting.com/challenge.json';

async function followChallengeChain(url = endpoint) {
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
    console.log('the result is', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

