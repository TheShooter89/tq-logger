// ############### DEFAULTS ###############
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
// ########################################

const logger = (component_name, global_options) => {
    let is_debugging = false;
    let isFirstRun = true;
    const current_options = global_options ?
        merge_options(global_options, OPTIONS) :
        OPTIONS;

    let {
        styles
    } = current_options;

    switch (current_options.mode) {
        case "debug":
            is_debugging = true;
            break;

        case "silent":
            is_debugging = false;
            break;

        default:
            break;
    }

    const log_wrapper = (...[message, log_level, log_section, ...rest]) => {
        let additional_params = rest;
        let time_stamp = getFormattedTimestamp();let parse_settings = check_settings(log_level, log_section);
        if (parse_settings.standard_args) {
            additional_params = [ ...parse_settings.standard_args, ...additional_params];
        }
        let level = parse_settings.level;
        let section= parse_settings.section;
        
        let output = [message, additional_params];

        //console.log("output: ", output);

        if (!is_debugging) {
            if (!isFirstRun) {
                return null;
            }
            console.log("--LOGGER SILENT MODE--");
            isFirstRun = false;
            return null;
        }

        render_result(output, component_name, time_stamp, styles, level, section);
    };

    return log_wrapper;
};

// ################ HELPERS ################
const getFormattedTimestamp = () => {
    let date = new Date();
    let {
        Y,
        M,
        D,
        h,
        m,
        s,
        ms
    } = {
        Y: date.getFullYear(),
        M: date.getMonth(),
        D: date.getDate() + 1,
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        ms: date.getMilliseconds()
    };
    let time_stamp = `${Y}-${M}-${D}: ${h}h:${m}m:${s}s:${ms}ms`;

    return time_stamp;
};

// --------------------------------------------------------
const check_level = lev => {
    if (lev && typeof lev === "string") {
        const _LEVEL = lev.toLocaleUpperCase();
        switch (_LEVEL) {
            case "ERROR":
                return _LEVEL;
                break;

            case "WARNING":
                return _LEVEL;
                break;

            case "INFO":
                return _LEVEL;
                break;

            case "DEBUG":
                return _LEVEL;
                break;

            default:
                return false;
                break;
        }
    } else {
        return "INFO";
    }
};

// --------------------------------------------------------
const check_section = sect => {
    if (sect && typeof sect === "string" && sect.slice(0, 4) === "ìì++") {
        return sect.slice(4);
    } else {
        return null;
    }
};

// --------------------------------------------------------
const check_settings = (...settings) => {
    let out_settings = {
        level: 'INFO',
        section: null,
        standard_args: null
    };

    let std_args = [];

    settings.map((el) => {
        check_level(el) ?
        out_settings.level = check_level(el) :
        check_section(el) ?
        out_settings.section = check_section(el) : std_args.push(el)
    });

    if (!std_args.length) {
        out_settings.standard_args = std_args;
    }

    return out_settings;
};

// --------------------------------------------------------
const merge_options = (opt, def_opt, partial_res) => {
    let temp_obj = {};

    const match = key => {
        if (opt[key] && typeof opt[key] === typeof def_opt[key]) {
            return true;
        } else {
            return false;
        }
    };

    Object.keys(def_opt).map(key => {
        if (typeof def_opt[key] === "object") {
            if (match(key)) {
                temp_obj[key] = merge_options(opt[key], def_opt[key]);
            } else {
                temp_obj[key] = def_opt[key];
            }
        } else {
            if (match(key)) {
                temp_obj[key] = opt[key];
            } else {
                temp_obj[key] = def_opt[key];
            }
        }
    });

    return temp_obj;
};

// --------------------------------------------------------
const render_result = (
    result = ["nothing to render..."],
    comp_name,
    time,
    style,
    level,
    section
) => {
    const wLog = console.log.bind(window.console);

    if (section) {
        console.group(
            `%c[${comp_name}]%c   %clevel: %c[${level}]%c   %ctimestamp: %c${time}`,
            style.heading[level],
            null,
            style.text[level],
            style.heading[level],
            null,
            style.text[level],
            style.heading[level]
        );
        console.group(`%c[${section}]:`, style.text[level]);
        let [msg, ...additional_opt] = result;
        wLog(...[msg].concat(...additional_opt));
        console.groupEnd();
        console.groupEnd();
    } else {
        console.group(
            `%c[${comp_name}]%c   %clevel: %c[${level}]%c   %ctimestamp: %c${time}`,
            style.heading[level],
            null,
            style.text[level],
            style.heading[level],
            null,
            style.text[level],
            style.heading[level]
        );
        let [msg, ...additional_opt] = result;

        //this is the right use of spread operator to work with console.log
        wLog(...[msg].concat(...additional_opt));
        console.groupEnd();
    }
};

export default logger;