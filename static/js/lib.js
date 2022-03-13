function throttle(func, wait, options) {
    let leading = true;
    let trailing = true;

    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }

    if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailer': trailing
    });
}