#!/usr/bin/python3

'''
Basic cache
'''

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    Inherits from BaseCaching and is a caching system
    """

    def put(self, key, item):
        """
        Assign item for key of cache_data
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """
        Return value of cache_data linked to key
        """
        if key is None:
            return
        return self.cache_data.get(key, None)
