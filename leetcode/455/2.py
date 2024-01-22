class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort()
        s.sort()
        count=gIdx=sIdx=0
        while gIdx<len(g) and sIdx<len(s):
            if s[sIdx]>=g[gIdx]:
                gIdx+=1
                count+=1
            sIdx+=1
        return count