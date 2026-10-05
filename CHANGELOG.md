## Fix
fix: error fixes
fix: bug when trying to serialize error
fix: bug with wrong z-index in pos-abs
fix(service/Auth-Route): isAuthorizing state has not been setted back to false when authorization fails

## Refactor
refactor: small refactor changes
refactor: rename isFetchDirectory with isLoading
refactor: add white background to File and Folder component
refactor: remove recursive remove checks (server do this yet)
refactor(features/modals-manager/components/Modal): remove state from parameter list
refactor: rename authorize event into onEnter
refactor: add background color to all pages
refactor: replace use-send-confirm-email with use-request-confirm-email
refactor: move formatter files into separate folder
refactor: move formatter files into separate folder
refactor: change style of side menu in file viewer page
refactor: add useEffect with cleanup function
refactor(ui/Alert): remove redundant format-title utility
refactor: replace custom component skeletons with one single common skeleton
refactor: replace react/jsx-runtime with react
refactor: remove box shadow
refactor: update the styles of log in and log up buttons in main menu
refactor: update the width of side menu and side menu skeleton
refactor: change the size of side menu in item preview page

## Style
style: replace single quotes with double quotes
style: rename file viewer skeleton scss file

## Features
feat(ui/Input-File): rewrite entierly
feat: add clamp utility
feat: add background image for file viewer page
feat: add file for constants
feat: remove text files from allowed list
feat: add more validation
feat: add content to error boundary component
feat: create function does not need a type of new item parameter anymore
feat: add type definitions for formatSecondsToTime and formatLeadingZeroCount utilities
feat: add formatter that add n count of leading zeros
feat: add formatter that format seconds to time (h, m, s)
feat: add custom video/audio controls

## Build
build: update libraries
