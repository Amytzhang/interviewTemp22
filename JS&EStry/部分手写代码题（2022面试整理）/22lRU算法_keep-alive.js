class LRUCache {
  constructor(numbers) {
    this.size = numbers;
    this.cache = new Map();
  }
  get(keys) {
    if (this.cache.has(keys)) {
      let value = this.cache.get(keys);
      this.cache.delete(keys);
      this.cache.set(keys, value);
      return value;
    }
    return null;
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    if (this.cache.size >= this.size) {
      console.log(this.cache.keys());
      console.log("next:", this.cache.keys().next());
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}
const lruCache = new LRUCache(2);
lruCache.put(1, 1);
lruCache.put(2, 2);
const res1 = lruCache.get(1);
lruCache.put(3, 3);
const res2 = lruCache.get(2);
lruCache.put(4, 4);
const res3 = lruCache.get(1);
const res4 = lruCache.get(3);
const res5 = lruCache.get(4);
