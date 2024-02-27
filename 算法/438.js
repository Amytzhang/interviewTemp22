/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = (s, p) => {
  const res = [];
  const window = {};
  const needs = {};
  for (let c of p) {
    needs[c] = (needs[c] || 0) + 1;
  }
  let left = 0,
    right = 0,
    valid = 0;
  while (right < s.length) {
    const c = s[right];
    right++;
    if (needs[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === needs[c]) {
        valid++;
      }
    }
    while (right - left >= p.length) {
      if (valid === Object.keys(needs).length) {
        res.push(left);
      }
      const d = s[left];
      left++;
      if (needs[d]) {
        if (window[d] === needs[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  return res;
};
