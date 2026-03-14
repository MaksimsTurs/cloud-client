## Chore

chore: update packages version

## Refactor

refactor: add serializion for errors that come from http
refactor: add imports for new hooks and components
refactor: replace caller with scall
refactor: replace Error with TypeError
refactor: rename Submit-Button to Text-Button
refactor: rename Button to Icon-Button
refactor: remove unused utilities
refactor: rename refresh-user-refresh-token to generate-refresh-token
refactor: replace fetcher utility with http implemintation
refactor(page/Log-Up): replace fetcher with http utility function
refactor(component/Header): migrate to newer utility functions, change folder structure
refactor(auth/use-with-auth): migrate from caller to scall utility function
refactor(service/auth): remove unused context properties
refactor(service/auth): update jsdoc, rename types for returning functions
refactor(service/auth): migrate from caller to scall utility
refactor: rename Button to Icon-Button
refactor: rename Submit-Button to Text-Button

## Feature

feat: add component to auth service so we can define auth layer to specific routes
feat: add hook use-auth-is-authorizing
feat: add new utility functions to convert one type to another
feat: add new utility for safe error handling
feat: add new http client
feat: add hook to work with url search params
feat: add hook use-auth-is-authorized
feat: add alert component
feat(page/Reset-Password): add page for creating a new password
feat(page/Request-Reset-Password): add page for requesting a password reseting
feat(page/Request-Confirm-Email): add page for requesting a new email for email confirmation
feat(page/Log-In): migrate to new utility functions and add aria attributes
feat(page/Log-Up): migrate to new utility functions and add aria attributes
feat(ui/Empty): add 'header', 'main' and optional 'footer' options

## Test
test: add test for to convert utility
test: add test for scall utility
test: add test for http utility
