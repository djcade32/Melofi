function isSafariBrowser() {
  // Get the user-agent string
  let userAgentString = navigator.userAgent;

  // Detect Chrome
  let chromeAgent = userAgentString.indexOf("Chrome") > -1;

  // Detect Safari
  let safariAgent = userAgentString.indexOf("Safari") > -1;

  // Discard Safari since it also matches Chrome
  if (chromeAgent && safariAgent) {
    return false;
  }

  return safariAgent;
}

export { isSafariBrowser };
