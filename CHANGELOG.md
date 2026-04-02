## Build
build: update packages version

## Style
style: remove redundant whitespace
style(Home.page): move conditional rendering of empty state outside return statement

## Refactor
refactor(Input-File): change title of FileSettingComponent to Settings
refactor: replace caller with scall
refactor(caller): remove unused utility
refactor: remove unused Title component
refactor(Context-Menu): change title and option text
refactor(Input-Select): change background color
refactor(Input-File): change background color
refactor: move useEffect that request confirm email into separate hook
refactor(Request-Confirm-Email): change email has been sended message
refactor: replace empty component with skeleton component
refactor: remove header from request-reset-password, request-confirm-email and reset-password sites
refactor(Request-Confirm-Email): add simple loading indicator
refactor(File-Explorer): show different empty message depends on is user verified or not
refactor(Home.page): remove redundant isAuthorizing from useEffect deps and useIsAuthorizing
refactor: move authorize function to separate utility module
refactor: move Form Header into Header Body
refactor(Form-Header): change tag from h4 to p
refactor(Form-Header): make font smaller
refactor(Form-Header): make font smaller
refactor: change default, focus and hover background color
refactor(Log-Up): add type submit to form button
refactor: add bigger gap between input and error message
refactor: replace paragraph with InputErrorMessage component
refactor(Form-Footer): remove font-size
refactor(Text-Button): remove border radius
refactor: change icon for password preview active state
refactor: add aria-label to go back button
refactor: rename navigation container selector
refactor: change log out button icon
refactor: change log out button icon
refactor: change log in button icon

## Fix
fix: error when trying check value type that is undefined
fix: user auth tokens validation has not worked correctly
fix: go back button was not disabled when user was not on File Explorer site

## Features
feat: add skeleton component for common use
feat(Log-up): change revalidation mode from onChange to onSubmit
