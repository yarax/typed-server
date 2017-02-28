# Problems:
1. Flow types cannot contain logic (it needs to extract data from request).
Solution:
using Swagger (also is better for validation, then tcomb and no need to use babel)
2. Pipeline functions must pass not only body, but also headers and status.
Solution:
For `before` function it can be used ala middlewares: they accept req object and throw if error and return WHAT?
When controller should change status to error it should throw
When controller changes status to positive one (201) it should do WHAT?
