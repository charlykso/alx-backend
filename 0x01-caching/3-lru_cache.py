#!/usr/bin/python3

'''
LRU Caching
'''
from collections import deque
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    Inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """
        Initialize
        """
        self.queued_item = deque()
        self.lru_item = []
        super().__init__()

    def put(self, key, item):
        """
       Print or discard the least recently used item (LRU algorithm)
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data[key] = item
                self.lru_item.remove(key)
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    del self.cache_data[self.lru_item[0]]
                    print("DISCARD:", self.lru_item[0])
                    self.lru_item.pop(0)
                self.cache_data[key] = item
            self.lru_item.append(key)

    def get(self, key):
        """
        Return value of cache_data linked to key
        """
        if key in self.cache_data:
            self.lru_item.remove(key)
            self.lru_item.append(key)
            return self.cache_data.get(key)
        else:
            return None
