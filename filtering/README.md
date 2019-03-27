Dear applicant,

welcome to our coding challange!

Here you'll find an example of a piece of old production code.


```src/filter.js``` is a filter for search results where the additional tasks should be implemented.



# Task 1

**Observed:**
When entering a search term all matches are returned which contain the search term at any position.
When searching for "Bastian" than the returned result is e.g:
1.  Sebastian
2.  Bastian

**Wanted:**
Direkt matches of the string should be ranked on top e.g:
1.  Bastian
2.  Sebastian

# Task 2
**Observed:**
The results are not orderd by the fit of the match e.g.
When searching for "Basti" the result is
1. Sebastian
2. Basti
3. Bastian

**Wanted:**
The result should be ordered by a kind of fit factor:
1. Basti
2. Bastian
3. Sebastian

Good luck and have fun!
