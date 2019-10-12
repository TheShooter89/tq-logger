# @theshooter/tq-logger
![npm (scoped)](https://img.shields.io/npm/v/@theshooter/tq-logger)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@theshooter/tq-logger)

Very simple console.log wrapper tailored for tanque's unique job...

# Usage
> DISCLAIMER: this package is at ALPHA dev stage. Some legacy `console.log` features may not be available yet

## Installation
```javascript
npm install @theshooter/tq-logger
```
---

## Get started
Importing `tq-logger` returns a function to initialize the logger with your local settings

```javascript
import logger from '@theshooter/tq-logger'
```

Just create a wrapper calling `tq-logger` passing a string argument to set the local module name:

```javascript
const log = logger('Test Module');

log('Hello tq-logger!');
```
Output:
![alt text](https://drive.google.com/uc?export=view&id=1TgL1EZ57LHa68VsrGpw6EtW8Z86FutGO)

Or an optional object to override [default settings](#defaults):
```javascript
const log = logger('Test Module',{
    styles: {
        heading: {
            INFO: "background-color: blue; color: white;",
        },
        text: {
            INFO: "color: blue;",
        }
    }
});

log('Hello tq-logger!');
```
Output:
![alt text](https://drive.google.com/uc?export=view&id=1aspFtYquJItNyulqKcfOu0ebxNZctvWo)

---
## Set SILENT MODE
To disable logging and use SILENT MODE (i.e. in production) set the custom
settings object property `mode` to `'silent'`:

```javascript
const log = logger('Test Module',{
    mode: 'silent'
});

log('Hello tq-logger!');
```
Output:
![alt text](https://drive.google.com/uc?export=view&id=1ENoqWkhghATvk34f3pL7rpHFg4xXnnVe)

---
## Set Log Level
To set the log level, append a LEVEL string as second param:

```javascript
const log = logger('Test Module');

log('Hello tq-logger!', 'warning');
```
Output:
![alt text](https://drive.google.com/uc?export=view&id=1NAC4fz81QfHz_6I4t2k6QrQyFQu2J2CE)

---
## Set Section
To set a log section, append a SECTION string as second param:

```javascript
const log = logger('Test Module');

log('Hello tq-logger!', 'ìì++Test Section');
```
Output:
![alt text](https://drive.google.com/uc?export=view&id=19aWiYltko5TPsnsGZAIlM6OJFsb150UO)

---
## Set both Level & Section

```javascript
const log = logger('Test Module');

log('Hello tq-logger!', 'warning', 'ìì++Test Section');
```
or even:

```javascript
log('Hello tq-logger!', 'ìì++Test Section', 'warning');
```

Output:
![alt text](https://drive.google.com/uc?export=view&id=1o5RE7H0eUW-1xloN9X0bl2wy0G2ri9eo)

---
# Defaults <a name="defaults"></a>

Default options object:

```javascript
const OPTIONS = {
    mode: "debug",
    styles: {
        heading: {
            ERROR: "background-color: red; color: yellow;",
            WARNING: "background-color: yellow; color: red;",
            INFO: "background-color: green; color: white;",
            DEBUG: "background-color: blue; color: white;"
        },
        section: "font-style: italic",
        text: {
            ERROR: "color: red;",
            WARNING: "color: orange;",
            INFO: "color: green;",
            DEBUG: "color: blue;"
        }
    }
};
```
---
Log Levels IDENTIFIERS:

| level | identifier ||
|---|:---:|:---:|
|error|'ERROR'|'error'|
|warning|'WARNING'|'warning'|
|info|'INFO'|'info'|
|debug|'DEBUG'|'debug'|
|*default*| 'INFO'||
