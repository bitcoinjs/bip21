# 2.0.0
__changed__
* `decode` does not throw an exception for an invalid address,  the address MUST be checked by the user
* `decode` returns `{ address, options }` instead of assigning the options to the parent decode object
